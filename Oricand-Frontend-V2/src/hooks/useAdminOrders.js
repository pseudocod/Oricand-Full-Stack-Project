import { useState, useEffect } from "react";
import { getAllOrdersForAdmin, getOrderByIdForAdmin, updateOrderStatusForAdmin } from "../services/adminOrderService";
import toast from "react-hot-toast";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(null);

  const loadOrders = async (filter = null) => {
    try {
      setLoading(true);
      const data = await getAllOrdersForAdmin(filter);
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const order = await getOrderByIdForAdmin(orderId);
      return order;
    } catch (error) {
      console.error('Failed to load order:', error);
      toast.error('Failed to load order details');
      return null;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatusForAdmin(orderId, newStatus);
      
      // Update the order in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? updatedOrder : order
        )
      );
      
      toast.success('Order status updated successfully');
      return updatedOrder;
    } catch (error) {
      console.error('Failed to update order status:', error);
      
      if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || 'Invalid status transition');
      } else {
        toast.error('Failed to update order status');
      }
      
      return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canTransitionTo = (currentStatus, newStatus) => {
    // Can't change from DELIVERED to PENDING
    if (currentStatus === 'DELIVERED' && newStatus === 'PENDING') {
      return false;
    }
    
    // Can't change from CANCELLED to anything else
    if (currentStatus === 'CANCELLED' && newStatus !== 'CANCELLED') {
      return false;
    }
    
    return true;
  };

  const getAvailableStatuses = (currentStatus) => {
    const allStatuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    return allStatuses.filter(status => canTransitionTo(currentStatus, status));
  };

  useEffect(() => {
    loadOrders(statusFilter);
  }, [statusFilter]);

  return {
    orders,
    loading,
    statusFilter,
    setStatusFilter,
    loadOrders,
    getOrderById,
    updateOrderStatus,
    formatDate,
    formatPrice,
    getStatusColor,
    canTransitionTo,
    getAvailableStatuses
  };
}; 