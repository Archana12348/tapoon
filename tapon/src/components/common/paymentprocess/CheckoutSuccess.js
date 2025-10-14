// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No session_id received in URL.");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // adjust the API url if needed
        const res = await fetch(
          `https://nfc.premierwebtechservices.com/api/checkout-success?session_id=${encodeURIComponent(
            sessionId
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            // If your backend needs auth cookies:
            // credentials: "include",
          }
        );

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message || JSON.stringify(json));
        }
        setData(json);
      } catch (err) {
        console.error("Error fetching checkout-success:", err);
        setError(err.message || "Unable to fetch payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(num ?? 0));

  if (loading)
    return (
      <div className="p-10 text-center text-lg">Loading payment details...</div>
    );

  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  if (!data)
    return (
      <div className="p-10 text-center text-red-500">
        No payment data found.
      </div>
    );

  const { success, message, customer, order } = data;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-8">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-lg w-full text-center">
        {success ? (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              Payment Successful 🎉
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="text-left space-y-3">
              <p>
                <strong>Customer:</strong>{" "}
                {customer?.name || customer?.email || "—"}
              </p>
              <p>
                <strong>Email:</strong> {customer?.email || "—"}
              </p>
              <p>
                <strong>Order Code:</strong> {order?.order_code || "—"}
              </p>
              <p>
                <strong>Total Amount:</strong>{" "}
                {order?.total_amount ? formatCurrency(order.total_amount) : "—"}
              </p>
              <p>
                <strong>Payment Status:</strong> {order?.payment_status || "—"}
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <Link
                to="/"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Back to Home
              </Link>

              {/* If you have an order details route */}
              {order?.id && (
                <Link
                  to={`/orders/${order.id}`}
                  className="inline-block bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  View Order
                </Link>
              )}
            </div>
          </>
        ) : (
          <h1 className="text-2xl font-semibold text-red-500">
            Payment Failed ❌
          </h1>
        )}
      </div>
    </div>
  );
}
