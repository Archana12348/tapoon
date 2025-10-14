import React, { useEffect, useState } from "react";

// PaymentSuccess.jsx
// Usage examples:
// 1) Put this component on the route /checkout-success and the component will try to read ?session_id= from the URL and fetch the API.
// 2) You can also pass `sessionId` or `apiUrl` props to override the fetch source.
// 3) For local testing you may pass `initialData` prop with the JSON object you already have.

export default function PaymentSuccess({ sessionId, apiUrl, initialData }) {
  const [data, setData] = useState(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  // Default API base (from user-provided link). If you deploy to other env, override with apiUrl prop.
  const defaultBase =
    "https://nfc.premierwebtechservices.com/api/checkout-success";

  useEffect(() => {
    if (initialData) return; // already have data

    // Determine session id from props or URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const sid = sessionId ?? urlSearchParams.get("session_id");
    if (!sid) {
      setError("No session_id provided in props or URL query.");
      setLoading(false);
      return;
    }

    const fetchUrl =
      apiUrl ?? `${defaultBase}?session_id=${encodeURIComponent(sid)}`;

    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        setData(json);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to fetch data");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [sessionId, apiUrl, initialData]);

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(num ?? 0));

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <div className="animate-pulse mb-4 text-2xl font-semibold">
            Loading...
          </div>
          <div className="text-sm text-gray-500">
            Fetching payment details...
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
        <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-sm text-gray-700">{error}</p>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">No data</h2>
          <p className="mt-2 text-sm text-gray-600">
            No payment data available.
          </p>
        </div>
      </div>
    );

  // Defensive chaining based on the JSON structure the user provided
  const success = data.success ?? true;
  const message = data.message ?? "Payment processed";
  const customer = data.customer ?? {};
  const order = data.order ?? {};
  const items = order.order_details ?? [];
  const delivery = data.delivery_address ?? data.shipping_address ?? {};

  // calculate totals (fall back to order.total_amount if present)
  const calculatedSubtotal = items.reduce(
    (s, it) => s + Number(it.sub_total ?? it.price ?? 0),
    0
  );
  const totalAmount = order.total_amount
    ? Number(order.total_amount)
    : calculatedSubtotal;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2a10 10 0 110 20 10 10 0 010-20z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Payment Successful</h1>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          <div className="ml-auto text-right">
            <span className="text-sm text-gray-500">Order</span>
            <div className="font-semibold">
              {order.order_code ?? order.id ?? "--"}
            </div>
            <div className="text-xs text-gray-400">
              {order.order_date ?? order.created_at ?? ""}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="mt-3 border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3">Item</th>
                    <th className="text-right p-3">Qty</th>
                    <th className="text-right p-3">Price</th>
                    <th className="text-right p-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-t">
                      <td className="p-3">
                        {it.nfccard_id
                          ? `Card #${it.nfccard_id}`
                          : `Item ${it.id}`}
                      </td>
                      <td className="p-3 text-right">{it.quantity}</td>
                      <td className="p-3 text-right">
                        {formatCurrency(it.price)}
                      </td>
                      <td className="p-3 text-right">
                        {formatCurrency(it.sub_total ?? it.price * it.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-4 flex justify-end items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Subtotal</div>
                  <div className="font-semibold">
                    {formatCurrency(calculatedSubtotal)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(totalAmount)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold">Customer</h4>
                <p className="text-sm">{customer.name ?? customer.email}</p>
                {customer.email && (
                  <p className="text-sm text-gray-500">{customer.email}</p>
                )}
                {customer.phone && (
                  <p className="text-sm text-gray-500">{customer.phone}</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold">Shipping Address</h4>
                <p className="text-sm">{delivery.name ?? customer.name}</p>
                <p className="text-sm text-gray-500">{delivery.line1}</p>
                {delivery.line2 && (
                  <p className="text-sm text-gray-500">{delivery.line2}</p>
                )}
                <p className="text-sm text-gray-500">
                  {delivery.city}, {delivery.state} {delivery.postal_code}
                </p>
                <p className="text-sm text-gray-500">{delivery.country}</p>
              </div>
            </div>
          </div>

          <aside className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold">Payment</h4>
            <p className="text-sm text-gray-600 mt-1">
              Method: {order.payment_type ?? "Card"}
            </p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-semibold">
                {order.payment_status ?? "paid"}
              </span>
            </p>

            <div className="mt-4">
              <button
                onClick={() => window.print()}
                className="w-full px-4 py-2 rounded-lg border hover:shadow"
              >
                Print / Save Receipt
              </button>
            </div>

            <div className="mt-3">
              <a
                href={data.site_url ?? "/"}
                className="block text-center text-sm"
              >
                Back to site
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
