// import React, { useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { X } from "lucide-react";
// import { FaTrashAlt } from "react-icons/fa";
// import { removeFromCart, updateQuantity } from "../../../redux/cartSlice";
// import Button from "../../ui/Button";
// import { createPortal } from "react-dom";

// const CartDrawer = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cartItems = useSelector((state) => state.cart.items);

//   // 🧮 Get total quantity from Redux state
//   const totalQuantity = useSelector((state) => state.cart.totalQuantity);

//   // 🧮 Calculate total price
//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.sale_price * item.quantity,
//     0
//   );

//   // ✅ Close on ESC key
//   useEffect(() => {
//     const handleEsc = (e) => e.key === "Escape" && onClose();
//     if (isOpen) document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [isOpen, onClose]);

//   // ✅ Disable body scroll when drawer open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//   }, [isOpen]);

//   const handleIncrease = useCallback(
//     (id) => {
//       const item = cartItems.find((i) => i.id === id);
//       if (item) dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
//     },
//     [cartItems, dispatch]
//   );

//   const handleDecrease = useCallback(
//     (id) => {
//       const item = cartItems.find((i) => i.id === id);
//       if (item) {
//         if (item.quantity > 1) {
//           dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
//         } else {
//           dispatch(removeFromCart(id));
//         }
//       }
//     },
//     [cartItems, dispatch]
//   );

//   const handleRemoveItem = useCallback(
//     (id) => dispatch(removeFromCart(id)),
//     [dispatch]
//   );

//   return (
//     (
//       <>
//         {/* Overlay */}
//         {isOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-40 z-40"
//             onClick={onClose}
//           />
//         )}

//         {/* Drawer */}
//         <div
//           role="dialog"
//           aria-modal="true"
//           className={`fixed top-0 right-0 h-screen w-[430px] bg-white z-[1001] shadow-lg transition-transform duration-300 ${
//             isOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <div className="flex flex-col h-full overflow-y-auto">
//             {/* Header */}
//             <div className="flex items-center justify-between px-4 py-3 border-b">
//               <h2 className="font-bold text-sm uppercase">
//                 Shopping Cart ({totalQuantity})
//               </h2>
//               <button onClick={onClose}>
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Cart Items */}
//             <div className="p-4 space-y-4 flex-1 overflow-y-auto">
//               {cartItems.length > 0 ? (
//                 cartItems.map((item) => {
//                   const productName = item?.name || "Unnamed Product";
//                   const productImage = item?.card_image || "/placeholder.png";
//                   const size = item?.size?.name;
//                   const color = item?.color?.name;
//                   const quantity = item?.quantity;

//                   return (
//                     <div key={item.id} className="flex gap-4 border-b pb-3">
//                       <img
//                         src={productImage}
//                         alt={productName}
//                         className="w-[80px] h-[100px] object-cover rounded"
//                       />

//                       <div className="flex-1 text-sm">
//                         {/* Product Name */}
//                         <h4 className="font-semibold">{productName}</h4>

//                         {size && <p className="text-gray-500">Size: {size}</p>}
//                         {color && (
//                           <p className="text-gray-500">Color: {color}</p>
//                         )}

//                         {/* ✅ Price Section */}
//                         <div className="flex justify-between items-center mt-2">
//                           <span className="font-semibold text-lg">
//                             AED{(item.sale_price * item.quantity).toFixed(2)}
//                           </span>
//                           <div className="flex items-center gap-2 border rounded-2xl px-2 py-1 bg-gray-100">
//                             <button
//                               className="text-lg px-2"
//                               onClick={() => handleDecrease(item.id)}
//                             >
//                               −
//                             </button>
//                             <span>{quantity}</span>
//                             <button
//                               className="text-lg px-2"
//                               onClick={() => handleIncrease(item.id)}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Remove Item */}
//                       <button
//                         className="self-start mt-2"
//                         onClick={() => handleRemoveItem(item.id)}
//                       >
//                         <FaTrashAlt className="text-red-600 hover:text-red-800" />
//                       </button>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                   <p>Your cart is empty</p>
//                 </div>
//               )}
//             </div>

//             {/* Summary & Actions */}
//             {cartItems.length > 0 && (
//               <div className="p-4 border-t text-sm pb-6 mt-auto">
//                 <div className="flex justify-between mb-4">
//                   <span>{totalQuantity} items</span>
//                   <span className="font-bold text-red-600">
//                     AED{totalPrice.toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="flex gap-3">
//                   <Button
//                     className="w-full text-white py-2 rounded font-semibold"
//                     onClick={() => {
//                       onClose();
//                       navigate("/information/form");
//                     }}
//                   >
//                     VIEW CART
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     ),
//     document.body
//   );
// };

// export default CartDrawer;

"use client";

import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart, updateQuantity } from "../../../redux/cartSlice";
import Button from "../../ui/Button";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const totalPrice = cartItems.reduce((acc, item) => {
    const regularPrice = Number(item.regular_price) || 0;
    const salePrice = Number(item.sale_price) || 0;
    const finalPrice = salePrice < regularPrice ? salePrice : regularPrice;
    return (
      acc +
      finalPrice * (item.pack ? Number(item.pack) : Number(item.quantity || 1))
    );
  }, 0);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleIncrease = useCallback(
    (id) => {
      const item = cartItems.find((i) => i.id === id);
      if (item) {
        dispatch(
          updateQuantity({
            id,
            quantity: item.quantity + 1,
            color: item.color || null,
            pack: item.pack || null,
            material: item.material || null,
            type: item.type || null,
            smart_card: item.smart_card || null,
          })
        );
      }
    },
    [cartItems, dispatch]
  );

  const handleDecrease = useCallback(
    (id) => {
      const item = cartItems.find((i) => i.id === id);
      if (item) {
        if (item.quantity > 1) {
          dispatch(
            updateQuantity({
              id,
              quantity: item.quantity - 1,
              color: item.color || null,
              pack: item.pack || null,
              material: item.material || null,
              type: item.type || null,
              smart_card: item.smart_card || null,
            })
          );
        } else {
          dispatch(removeFromCart(id));
        }
      }
    },
    [cartItems, dispatch]
  );

  const handleRemoveItem = useCallback(
    (id) => dispatch(removeFromCart(id)),
    [dispatch]
  );

  return createPortal(
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1000]"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-screen bg-white z-[1001] shadow-lg transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-full sm:w-80 md:w-96 lg:w-[430px]`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="font-bold text-sm uppercase">
              Shopping Cart ({totalQuantity})
            </h2>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const productName = item?.name || "Unnamed Product";
                const productImage = item?.card_image || "/placeholder.png";
                const quantity = item?.quantity;
                const regularPrice = Number(item.regular_price) || 0;
                const salePrice = Number(item.sale_price) || 0;
                const hasDiscount = salePrice < regularPrice;
                console.log(
                  "Product Name:",
                  (
                    salePrice *
                    (item.pack ? Number(item.pack) : Number(item.quantity || 1))
                  ).toFixed(2)
                );

                return (
                  <div key={item.id} className="flex gap-4 border-b pb-3">
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-[80px] h-[100px] object-cover rounded"
                    />

                    <div className="flex-1 text-sm">
                      <h4 className="font-semibold">{productName}</h4>

                      {item.color && (
                        <p className="text-gray-500 capitalize">
                          Color: {item.color}
                        </p>
                      )}
                      {item.material && (
                        <p className="text-gray-500 capitalize">
                          Material: {item.material}
                        </p>
                      )}
                      {item.type && (
                        <p className="text-gray-500 capitalize">
                          Type: {item.type}
                        </p>
                      )}
                      {item.smart_card && (
                        <p className="text-gray-500 capitalize">
                          Smart Card: {item.smart_card}
                        </p>
                      )}
                      {item.pack ? (
                        <p className="text-gray-500 capitalize">
                          Pack: {item.pack}
                        </p>
                      ) : (
                        <p className="text-gray-500 capitalize">
                          Quantity: {item.quantity}
                        </p>
                      )}

                      {/* Price & Quantity */}
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          {hasDiscount ? (
                            <div className="flex flex-col">
                              <span className="text-sky-600 font-semibold text-lg">
                                AED
                                {(
                                  salePrice *
                                  (item.pack
                                    ? Number(item.pack)
                                    : Number(item.quantity || 1))
                                ).toFixed(2)}
                              </span>
                              <span className="text-gray-400 line-through text-xs">
                                AED
                                {(
                                  regularPrice *
                                  (item.pack
                                    ? Number(item.pack)
                                    : Number(item.quantity || 1))
                                ).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-semibold text-lg">
                              AED
                              {(
                                salePrice *
                                (item.pack
                                  ? Number(item.pack)
                                  : Number(item.quantity || 1))
                              ).toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* <div className="flex items-center gap-2 border rounded-2xl px-2 py-1 bg-gray-100">
                          <button
                            className="text-lg px-2"
                            onClick={() => handleDecrease(item.id)}
                          >
                            −
                          </button>
                          <span>{quantity}</span>
                          <button
                            className="text-lg px-2"
                            onClick={() => handleIncrease(item.id)}
                          >
                            +
                          </button>
                        </div> */}
                      </div>
                    </div>

                    <button
                      className="self-start mt-2"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrashAlt className="text-red-600 hover:text-red-800" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Your cart is empty</p>
              </div>
            )}
          </div>

          {/* Summary & Actions */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t text-sm pb-6 mt-auto">
              <div className="flex justify-between mb-4">
                <span>{totalQuantity} items</span>
                <span className="font-bold text-sky-600">
                  AED{totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  className="w-full text-white py-2 rounded font-semibold"
                  onClick={() => {
                    onClose();
                    navigate("/checkout");
                  }}
                >
                  VIEW CART
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default CartDrawer;
