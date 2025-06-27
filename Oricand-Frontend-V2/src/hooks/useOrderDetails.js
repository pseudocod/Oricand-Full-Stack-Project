import { useState } from "react";
import { cancelOrder } from "../services/orderService";
import toast from "react-hot-toast";

export const useOrderDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'PENDING': return 'Your order is being processed and can be cancelled';
      case 'CONFIRMED': return 'Your order has been confirmed and is being prepared';
      case 'SHIPPED': return 'Your order is on its way';
      case 'DELIVERED': return 'Your order has been delivered';
      case 'CANCELLED': return 'This order was cancelled and product stock was restored';
      default: return '';
    }
  };

  const canCancelOrder = (status) => {
    return status === 'PENDING';
  };

  const handleCancelOrder = async (orderId, onSuccess) => {
    setIsLoading(true);
    try {
      await cancelOrder(orderId);
      toast.success('Order cancelled successfully. Product stock has been restored.');
      onSuccess();
    } catch (error) {
      console.error('Failed to cancel order:', error);
      if (error.response?.status === 403) {
        toast.error('You are not authorized to cancel this order');
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || 'Order cannot be cancelled in its current state');
      } else {
        toast.error(error.response?.data?.message || 'Failed to cancel order');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getStatusColor,
    formatDate,
    formatPrice,
    getStatusMessage,
    canCancelOrder,
    handleCancelOrder
  };
}; 