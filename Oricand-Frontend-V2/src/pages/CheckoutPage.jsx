import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { useAddresses } from "../hooks/useAddresses";
import { useLoyaltyCard } from "../hooks/useLoyaltyCard";
import useCheckout from "../hooks/useCheckout";
import useCheckoutValidation from "../hooks/useCheckoutValidation";
import FormButton from "../components/common/Button/FormButton";
import CartTable from "../components/cart/CartTable";
import LoadingState from "../components/common/LoadingState/LoadingState";
import ContactInformationSection from "../components/checkout/ContactInformationSection";
import AddressSection from "../components/checkout/AddressSection";
import GuestAddressSection from "../components/checkout/GuestAddressSection";
import GuestInformationSection from "../components/checkout/GuestInformationSection";
import CheckoutModeSelector from "../components/checkout/CheckoutModeSelector";
import PaymentMethodSection from "../components/checkout/PaymentMethodSection";
import LoyaltyDiscountInfo from "../components/checkout/LoyaltyDiscountInfo";
import { useAuth } from "../context/UserContext";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, loading: cartLoading, refreshCart } = useCart();
  const { loyaltyData } = useLoyaltyCard();
  const { checkout, loading: placingOrder, error, isAuthenticated } = useCheckout();
  const { addresses, loading: addressesLoading } = useAddresses(!!user); // Only fetch if user exists
  const { validateContactInfo, isContactInfoComplete } = useCheckoutValidation();
  const navigate = useNavigate();

  // Guest/User mode state
  const [isGuestCheckout, setIsGuestCheckout] = useState(!isAuthenticated);

  // User checkout states
  const [selectedDeliveryId, setSelectedDeliveryId] = useState("new");
  const [selectedBillingId, setSelectedBillingId] = useState("new");
  const [sameAsDelivery, setSameAsDelivery] = useState(true);

  const [newDeliveryAddr, setNewDeliveryAddr] = useState({
    streetLine: "",
    postalCode: "",
    city: "",
    county: "",
    country: "",
  });

  const [newBillingAddr, setNewBillingAddr] = useState({
    streetLine: "",
    postalCode: "",
    city: "",
    county: "",
    country: "",
  });

  // Contact information state (for authenticated users)
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // Guest checkout states
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subscribeToNewsletter: false,
    allowMarketing: false,
  });

  const [guestDeliveryAddr, setGuestDeliveryAddr] = useState({
    streetLine: "",
    postalCode: "",
    city: "",
    county: "",
    country: "",
  });

  const [guestBillingAddr, setGuestBillingAddr] = useState({
    streetLine: "",
    postalCode: "",
    city: "",
    county: "",
    country: "",
  });

  const [guestSameAsDelivery, setGuestSameAsDelivery] = useState(true);

  const [paymentType, setPaymentType] = useState("CASH");

  // Populate contact info from user when user loads
  useEffect(() => {
    if (user) {
      setContactInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
      setIsGuestCheckout(false);
    }
  }, [user]);

  // Pre-select default addresses when user and addresses are loaded  
  useEffect(() => {
    if (user && addresses.length > 0) {
      // Set default delivery address if exists
      if (user.defaultDeliveryAddressId) {
        const defaultDeliveryExists = addresses.find(addr => addr.id === user.defaultDeliveryAddressId);
        if (defaultDeliveryExists) {
          setSelectedDeliveryId(user.defaultDeliveryAddressId.toString());
        }
      }

      // Set default billing address if exists and different from delivery
      if (user.defaultBillingAddressId) {
        const defaultBillingExists = addresses.find(addr => addr.id === user.defaultBillingAddressId);
        if (defaultBillingExists) {
          setSelectedBillingId(user.defaultBillingAddressId.toString());
          // If billing address is different from delivery, uncheck "same as delivery"
          if (user.defaultBillingAddressId !== user.defaultDeliveryAddressId) {
            setSameAsDelivery(false);
          }
        }
      }
    }
  }, [user, addresses]);

  const validateGuestInfo = () => {
    const { firstName, lastName, email } = guestInfo;
    
    if (!firstName.trim()) {
      return "First name is required";
    }
    if (!lastName.trim()) {
      return "Last name is required";
    }
    if (!email.trim()) {
      return "Email is required";
    }
    if (!email.includes("@") || !email.includes(".")) {
      return "Please enter a valid email address";
    }
    
    return null;
  };

  const validateGuestAddress = (address, addressType) => {
    const required = ["streetLine", "city", "postalCode", "county", "country"];
    
    for (const field of required) {
      if (!address[field].trim()) {
        return `${addressType} ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isGuestCheckout) {
      // Guest checkout validation
      const guestValidation = validateGuestInfo();
      if (guestValidation) {
        alert(guestValidation);
        return;
      }

      const deliveryValidation = validateGuestAddress(guestDeliveryAddr, "Delivery");
      if (deliveryValidation) {
        alert(deliveryValidation);
        return;
      }

      if (!guestSameAsDelivery) {
        const billingValidation = validateGuestAddress(guestBillingAddr, "Billing");
        if (billingValidation) {
          alert(billingValidation);
          return;
        }
      }

      // Prepare guest order data
      const guestOrderData = {
        cartId: cart.id,
        email: guestInfo.email,
        firstName: guestInfo.firstName,
        lastName: guestInfo.lastName,
        phoneNumber: guestInfo.phoneNumber,
        paymentType,
        deliveryAddress: guestDeliveryAddr,
        invoiceAddress: guestSameAsDelivery ? null : guestBillingAddr,
        useSameInvoiceAddress: guestSameAsDelivery,
        subscribeToNewsletter: guestInfo.subscribeToNewsletter,
        allowMarketing: guestInfo.allowMarketing,
      };

      try {
        const orderResponse = await checkout(guestOrderData, true);
        await refreshCart(); 
        navigate("/order-confirmation", { state: { order: orderResponse } });
      } catch {
        return;
      }
    } else {
      // Authenticated user checkout (existing logic)
      if (!validateContactInfo(contactInfo)) {
        return;
      }

      const orderData = {
        cartId: cart.id,
        paymentType,
      };

      // Handle delivery address
      if (selectedDeliveryId === "new") {
        orderData.deliveryAddress = newDeliveryAddr;
      } else {
        orderData.deliveryAddressId = parseInt(selectedDeliveryId);
      }

      // Handle billing address
      if (sameAsDelivery) {
        if (selectedDeliveryId === "new") {
          orderData.useSameInvoiceAddress = true;
        } else {
          orderData.invoiceAddressId = parseInt(selectedDeliveryId);
        }
      } else {
        if (selectedBillingId === "new") {
          orderData.invoiceAddress = newBillingAddr;
        } else {
          orderData.invoiceAddressId = parseInt(selectedBillingId);
        }
      }

      try {
        const orderResponse = await checkout(orderData, false);
        await refreshCart(); 
        navigate("/order-confirmation", { state: { order: orderResponse } });
      } catch {
        return;
      }
    }
  };

  if (cartLoading || (isAuthenticated && addressesLoading)) return <LoadingState />;

  if (!cart.entries.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p>Your cart is empty.</p>
        <Link to="/products" className="underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  const itemCount = cart.entries.reduce((n, e) => n + e.quantity, 0);

  // Calculate discount for authenticated users with loyalty cards
  const discountPercentage = isAuthenticated && loyaltyData ? loyaltyData.discountPercentage : 0;
  const discountAmount = (cart.totalPrice * discountPercentage) / 100;
  const finalTotal = cart.totalPrice - discountAmount;

  return (
    <section className="px-6 max-w-6xl mx-auto py-16 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl uppercase font-semibold">CHECKOUT</h1>
        <Link to="/cart" className="relative group">
          <ShoppingBagIcon className="w-8 h-8" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-yellow-400 text-[10px] font-semibold text-black flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Checkout Mode Selector */}
          <CheckoutModeSelector
            isGuest={isGuestCheckout}
            onModeChange={setIsGuestCheckout}
            isAuthenticated={isAuthenticated}
          />

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border">
            {isGuestCheckout ? (
              // Guest Checkout Form
              <>
                <GuestInformationSection
                  guestInfo={guestInfo}
                  setGuestInfo={setGuestInfo}
                />

                <GuestAddressSection
                  title="Delivery Address"
                  address={guestDeliveryAddr}
                  onAddressChange={setGuestDeliveryAddr}
                />

                <GuestAddressSection
                  title="Billing Address"
                  address={guestBillingAddr}
                  onAddressChange={setGuestBillingAddr}
                  showSameAsDelivery={true}
                  sameAsDelivery={guestSameAsDelivery}
                  onSameAsDeliveryChange={setGuestSameAsDelivery}
                />
              </>
            ) : (
              // Authenticated User Checkout Form
              <>
                <ContactInformationSection
                  contactInfo={contactInfo}
                  setContactInfo={setContactInfo}
                />

                <AddressSection
                  title="Delivery Address"
                  addresses={addresses}
                  selectedAddressId={selectedDeliveryId}
                  onAddressSelect={setSelectedDeliveryId}
                  newAddress={newDeliveryAddr}
                  onAddressChange={setNewDeliveryAddr}
                />

                <AddressSection
                  title="Billing Address"
                  addresses={addresses}
                  selectedAddressId={selectedBillingId}
                  onAddressSelect={setSelectedBillingId}
                  newAddress={newBillingAddr}
                  onAddressChange={setNewBillingAddr}
                  showSameAsDelivery={true}
                  sameAsDelivery={sameAsDelivery}
                  onSameAsDeliveryChange={setSameAsDelivery}
                />
              </>
            )}

            <PaymentMethodSection
              paymentType={paymentType}
              onPaymentTypeChange={setPaymentType}
            />

            {/* Loyalty Program Information */}
            <LoyaltyDiscountInfo 
              loyaltyData={loyaltyData} 
              isAuthenticated={isAuthenticated && !isGuestCheckout} 
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Show validation message if contact info is incomplete (for authenticated users) */}
            {!isGuestCheckout && !isContactInfoComplete(contactInfo) && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Please complete all required contact information fields before placing your order.
                </p>
              </div>
            )}

            <FormButton 
              loading={placingOrder} 
              loadingText="Placing Order..."
              disabled={placingOrder}
            >
              Place Order
            </FormButton>
          </form>
        </div>

        <div className="space-y-6">
          <div className="sticky top-4 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <CartTable entries={cart.entries} compact />
            
            {/* Order Summary */}
            <div className="space-y-2 mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-lg">
                <span className="font-light">Subtotal</span>
                <span>{cart.totalPrice} lei</span>
              </div>
              
              {discountPercentage > 0 && (
                <>
                  <div className="flex justify-between text-lg text-green-600">
                    <span className="font-light">
                      Loyalty Discount ({discountPercentage}%)
                    </span>
                    <span>-{Math.round(discountAmount)} lei</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-xl font-medium">
                      <span>Total</span>
                      <span>{Math.round(finalTotal)} lei</span>
                    </div>
                  </div>
                </>
              )}
              
              {discountPercentage === 0 && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-xl font-medium">
                    <span>Total</span>
                    <span>{cart.totalPrice} lei</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
