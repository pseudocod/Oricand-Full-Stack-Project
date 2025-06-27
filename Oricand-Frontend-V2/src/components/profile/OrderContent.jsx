import { useState } from "react";
import OrderList from "./OrderList";
import OrderDetailsModal from "./OrderDetailsModal";

export default function OrderContent({ orders, loading, loadOrders }) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statuses = ["ALL", "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

  const filteredOrders = statusFilter === "ALL" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderUpdate = () => {
    loadOrders(); 
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders && orders.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                statusFilter === status
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {status === "ALL" ? "All Orders" : status}
              {status !== "ALL" && orders && (
                <span className="ml-1">
                  ({orders.filter(order => order.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <OrderList orders={filteredOrders} onOrderClick={handleOrderClick} />
      
      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
} 