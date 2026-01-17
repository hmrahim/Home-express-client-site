// import { useEffect, useState } from "react";

// const API_URL = "https://api.example.com/product/1"; // 🔥 change only this

// export default function ProductDetails() {
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [activeImg, setActiveImg] = useState(0);
//   const [qty, setQty] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch product
//   useEffect(() => {
//     fetch(API_URL)
//       .then(res => res.json())
//       .then(data => {
//         setProduct(data);
//         setSelectedVariant(data.variants[0]); // default variant
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p className="text-center py-20">Loading...</p>;
//   }

//   const colors = [...new Set(product.variants.map(v => v.color))];
//   const sizes = [...new Set(product.variants.map(v => v.size))];

//   const selectVariant = (color, size) => {
//     const match = product.variants.find(
//       v => v.color === color && v.size === size
//     );
//     if (match) {
//       setSelectedVariant(match);
//       setActiveImg(0);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

//       {/* IMAGE */}
//       <div>
//         <div className="border rounded-xl overflow-hidden">
//           <img
//             src={selectedVariant.images[activeImg]}
//             className="w-full h-[450px] object-cover"
//             alt="product"
//           />
//         </div>

//         <div className="flex gap-3 mt-4">
//           {selectedVariant.images.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               onClick={() => setActiveImg(i)}
//               className={`w-20 h-20 object-cover rounded cursor-pointer border
//                 ${i === activeImg ? "border-black" : "border-gray-300"}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* INFO */}
//       <div>
//         <h1 className="text-2xl font-semibold">{product.name}</h1>

//         <div className="text-sm text-gray-500 mt-1">
//           ⭐ {product.rating} ({product.reviews} reviews)
//         </div>

//         <div className="text-3xl font-bold mt-4">
//           ৳ {selectedVariant.price}
//         </div>

//         {/* COLOR */}
//         <div className="mt-6">
//           <p className="font-medium mb-2">Color</p>
//           <div className="flex gap-3">
//             {colors.map(color => (
//               <button
//                 key={color}
//                 onClick={() =>
//                   selectVariant(color, selectedVariant.size)
//                 }
//                 className={`px-4 py-2 border rounded
//                   ${selectedVariant.color === color
//                     ? "border-black font-semibold"
//                     : "border-gray-300"}`}
//               >
//                 {color}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* SIZE */}
//         <div className="mt-6">
//           <p className="font-medium mb-2">Size</p>
//           <div className="flex gap-3">
//             {sizes.map(size => {
//               const exists = product.variants.find(
//                 v =>
//                   v.size === size &&
//                   v.color === selectedVariant.color
//               );

//               return (
//                 <button
//                   key={size}
//                   disabled={!exists}
//                   onClick={() =>
//                     selectVariant(selectedVariant.color, size)
//                   }
//                   className={`px-4 py-2 border rounded
//                     ${selectedVariant.size === size
//                       ? "border-black font-semibold"
//                       : "border-gray-300"}
//                     ${!exists && "opacity-40 cursor-not-allowed"}`}
//                 >
//                   {size}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* QTY */}
//         <div className="mt-6 flex items-center gap-4">
//           <button
//             onClick={() => setQty(q => Math.max(1, q - 1))}
//             className="w-9 h-9 border rounded"
//           >
//             −
//           </button>
//           <span>{qty}</span>
//           <button
//             onClick={() => setQty(q => q + 1)}
//             className="w-9 h-9 border rounded"
//           >
//             +
//           </button>
//         </div>

//         {/* ADD TO CART */}
//         <button
//           disabled={selectedVariant.stock === 0}
//           className={`mt-8 w-full py-4 rounded text-white text-lg
//             ${selectedVariant.stock === 0
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-black hover:bg-gray-800"}`}
//           onClick={() =>
//             console.log("ADD TO CART", {
//               productId: product.id,
//               variantId: selectedVariant.id,
//               qty
//             })
//           }
//         >
//           {selectedVariant.stock === 0
//             ? "Out of Stock"
//             : "Add to Cart"}
//         </button>
//       </div>
//     </div>
//   );
// }
