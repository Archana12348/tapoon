import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    fetch(`http://localhost:3000/checkout-success`)
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading)
    return <p className="text-center">⏳ Loading payment status...</p>;

  if (!response)
    return <p className="text-center text-red-500">❌ No data found.</p>;

  return (
    <div className="p-10 text-center">
      {response.success ? (
        <>
          <h1 className="text-3xl text-green-600 font-bold mb-4">
            ✅ Payment Successful!
          </h1>
          <p className="mb-6">{response.message}</p>
          <pre className="text-left bg-gray-100 p-4 rounded-lg">
            {JSON.stringify(response.order, null, 2)}
          </pre>
        </>
      ) : (
        <h1 className="text-2xl text-red-600 font-semibold">
          ❌ {response.message}
        </h1>
      )}
    </div>
  );
}
