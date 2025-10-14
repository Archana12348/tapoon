import React from "react";
import OrderDetails from "./orderdetails";

const orderData = {
  id: 9,
  company_name: "",
  user: null,
  order_code: "ORD-DHZJNUVV",
  shipping_address: "",
  billing_address: "",
  transaction_id: null,
  payment_type: "Card",
  total_amount: "1600.00",
  order_date: "2025-10-07",
  phone: null,
  designation: null,
  payment_receipt: "",
  order_status: "pending",
  cancellation_reason: null,
  payment_status: "unpaid",
  session_id:
    "cs_test_b1QqGDil8Hcn3kVQLHzoEkIlw08miAqKvoXEM1NxZtKMcx8ySRl8Olm0iR",
  created_at: "2025-10-07 16:18:51",
  updated_at: "2025-10-07 16:18:51",
  nfc_order_detail: [
    {
      id: 9,
      my_nfc_card_id: 9,
      nfccard_id: 1,
      payment_id: null,
      price: 800,
      sub_total: 800,
      tax: 0,
      shipping_cost: 0,
      quantity: 1,
      payment_status: "unpaid",
      transaction_id: null,
      customer_id: null,
      payment_type: null,
      delivery_status: "Pending",
      billing_address: null,
      status: "unpaid",
      created: 0,
      card_expire: null,
      card_name: null,
      card_email: null,
      remarks: null,
      created_at: "2025-10-07T10:48:51.000000Z",
      updated_at: "2025-10-07T10:48:51.000000Z",
    },
    {
      id: 10,
      my_nfc_card_id: 9,
      nfccard_id: 1,
      payment_id: null,
      price: 800,
      sub_total: 800,
      tax: 0,
      shipping_cost: 0,
      quantity: 1,
      payment_status: "unpaid",
      transaction_id: null,
      customer_id: null,
      payment_type: null,
      delivery_status: "Pending",
      billing_address: null,
      status: "unpaid",
      created: 0,
      card_expire: null,
      card_name: null,
      card_email: null,
      remarks: null,
      created_at: "2025-10-07T10:48:51.000000Z",
      updated_at: "2025-10-07T10:48:51.000000Z",
    },
  ],
  detail_links: {
    single_nfc_order: "https://nfc.premierwebtechservices.com/api/orders/9",
  },
};

function App() {
  return (
    <div className="App">
      <OrderDetails order={orderData} />
    </div>
  );
}

export default App;
