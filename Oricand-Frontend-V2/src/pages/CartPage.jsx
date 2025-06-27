import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLoyaltyCard } from "../hooks/useLoyaltyCard";
import { useAuth } from "../context/UserContext";
import CartTable from "../components/cart/CartTable";
import LoadingState from "../components/common/LoadingState/LoadingState";

export default function CartPage() {
  const { cart, loading } = useCart();
  const { loyaltyData } = useLoyaltyCard();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) return <LoadingState />;
  if (!cart.entries.length)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p>Your cart is empty.</p>
        <Link to="/products" className="underline">
          Continue shopping
        </Link>
      </div>
    );

  const discountPercentage = user && loyaltyData ? loyaltyData.discountPercentage : 0;
  const discountAmount = (cart.totalPrice * discountPercentage) / 100;
  const finalTotal = cart.totalPrice - discountAmount;

  return (
    <section className="px-6 max-w-6xl mx-auto py-16 space-y-8">
      <h1 className="text-4xl uppercase font-light">Cart</h1>

      <CartTable entries={cart.entries} />

      <div className="space-y-2">
        <div className="flex justify-end text-xl">
          <span className="font-light mr-4">Subtotal</span>
          <span className="font-medium">{cart.totalPrice} lei</span>
        </div>
        
        {discountPercentage > 0 && (
          <>
            <div className="flex justify-end text-lg text-green-600">
              <span className="font-light mr-4">
                Loyalty Discount ({discountPercentage}%)
              </span>
              <span>-{Math.round(discountAmount)} lei</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-end text-xl font-medium">
                <span className="mr-4">Total</span>
                <span>{Math.round(finalTotal)} lei</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/checkout")}
          className="bg-black text-white px-8 py-3 tracking-widest uppercase hover:bg-white hover:text-black transition"
        >
          Checkout
        </button>
      </div>
    </section>
  );
}
