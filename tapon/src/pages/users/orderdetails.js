import React from "react";

const OrderDetails = ({ order }) => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Order Details</h2>
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
        <strong>Total Amount:</strong> ${order.total_amount}
      </p>
      <p>
        <strong>Order Status:</strong> {order.order_status}
      </p>
      <p>
        <strong>Payment Status:</strong> {order.payment_status}
      </p>

      <h3>NFC Card Details</h3>
      {order.nfc_order_detail.length > 0 ? (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sub Total</th>
              <th>Status</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {order.nfc_order_detail.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.sub_total}</td>
                <td>{item.status}</td>
                <td>{item.delivery_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No NFC card details available.</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <a
          href={order.detail_links.single_nfc_order}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Order JSON
        </a>
      </div>
    </div>
  );
};

export default OrderDetails;
