import React, { useEffect, useState } from "react";

export default function CancelPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://nfc.premierwebtechservices.com/api/checkout-cancel")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p className="text-center">⏳ Loading...</p>;

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl text-red-600 font-bold">❌ Payment Cancelled</h1>
      <p className="mt-3 text-gray-700">{data.message}</p>
    </div>
  );
}
