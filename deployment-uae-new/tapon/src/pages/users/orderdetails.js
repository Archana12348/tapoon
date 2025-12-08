import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Checking cookies:", document.cookie);

        const response = await axios.get(
          "https://nfc.premierwebtechservices.com/api/get-user-order-details",
          {
            headers: {
              Accept: "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("Fetched order data:", response.data.data);
        setOrders(response.data.data || []); // ✅ Handle array data
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized: Invalid or expired cookie token");
        } else {
          setError("Failed to fetch order details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-sky-500 text-lg">
        Loading order details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  if (!orders.length)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        No orders found.
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-sky-600 mb-8 text-center">
        My Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="mb-10 bg-white dark:bg-sky-950/30 shadow-lg rounded-xl border border-sky-200 p-6"
        >
          {/* ---- ORDER HEADER ---- */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <p>
              <strong>Order Code:</strong> {order.order_code}
            </p>
            <p>
              <strong>Order Date:</strong> {order.order_date}
            </p>
            <p>
              <strong>Payment Type:</strong> {order.payment_type}
            </p>
            <p>
              <strong>Total Amount:</strong> AED{order.total_amount}
            </p>
            <p>
              <strong>Order Status:</strong> {order.order_status}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.payment_status}
            </p>
          </div>

          {/* ---- CUSTOMER INFO ---- */}
          <div className="bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-sky-500 mb-2">
              Customer Information
            </h3>
            <p>
              <strong>Name:</strong> {order.user?.name}
            </p>
            <p>
              <strong>Email:</strong> {order.user?.email}
            </p>
            <p>
              <strong>Shipping Address:</strong> {order.shipping_address}
            </p>
          </div>

          {/* ---- NFC CARD DETAILS ---- */}
          {/* ---- NFC CARD DETAILS ---- */}
          <h3 className="text-2xl font-semibold text-sky-600 mb-4">
            NFC Card Details
          </h3>

          {order.nfc_order_detail?.length > 0 ? (
            <div
              className="overflow-x-auto relative"
              style={{
                WebkitOverflowScrolling: "touch", // smooth scroll on iOS
                scrollbarWidth: "thin", // Firefox thin scrollbar
                scrollbarColor: "#bae6fd transparent", // Sky-blue thumb
              }}
            >
              <table className="min-w-full text-sm border border-sky-200 rounded-lg">
                <thead className="bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                  <tr>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Card Name</th>
                    <th className="py-2 px-4 border">Image</th>
                    <th className="py-2 px-4 border">Color</th>
                    <th className="py-2 px-4 border">Pack</th>
                    <th className="py-2 px-4 border">Material</th>
                    <th className="py-2 px-4 border">Type</th>
                    <th className="py-2 px-4 border">Smart Card</th>
                    <th className="py-2 px-4 border">Price</th>
                    <th className="py-2 px-4 border">Quantity</th>
                    <th className="py-2 px-4 border">Sub Total</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Delivery Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order.nfc_order_detail.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-sky-50 dark:hover:bg-sky-900/40"
                    >
                      <td className="py-2 px-4 border text-center">
                        {item.id}
                      </td>
                      <td className="py-2 px-4 border">
                        {item.nfccard_id?.name ?? "N/A"}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        <img
                          src={item.nfccard_id?.card_image}
                          alt={item.nfccard_id?.name}
                          className="w-16 h-16 object-cover rounded-md mx-auto border border-sky-200"
                        />
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {item.color}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {item.pack}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {item.material}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {item.type}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {item.smart_card}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        AED{item.price}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {item.quantity}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        AED{item.sub_total}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {item.status}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {item.delivery_status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No NFC card details available.</p>
          )}

          {/* ---- ORDER LINK ---- */}
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
