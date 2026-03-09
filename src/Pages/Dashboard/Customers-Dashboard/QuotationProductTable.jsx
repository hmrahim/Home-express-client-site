import { useEffect, useState } from "react";
import PreBackButton from "../../Components/PreBackButton";
import QuotationModalForm from "./QuotationModalForm";

export default function QuotationProductTable() {
  const [products, setProducts] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("quotationProducts");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    localStorage.setItem("quotationProducts", JSON.stringify(updated));
  };

  const totalQuantity = products.reduce(
    (acc, item) => acc + Number(item.quantity),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <PreBackButton title="Quotation Product List" />
        <hr className="h-1 bg-primary" />

        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No products added yet.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">No</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">unit</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Color</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3">{product?.quantity}</td>
                      <td className="p-3">{product?.unit}</td>
                      <td className="p-3">{product?.size}</td>
                      <td className="p-3">{product?.color}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleRemove(product.id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="bg-gray-100 border-t">
                    <td className="p-3 font-semibold" colSpan="2">
                      Total Quantity
                    </td>
                    <td className="p-3 font-semibold">{totalQuantity}</td>
                    <td colSpan="3"></td>
                  </tr>
                </tfoot>
              </table>
              <button
                className="btn btn-sm bg-green-400 mt-5 justify-end font-bold"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Submit Quotatoin
              </button>

              <dialog id="my_modal_3" className="modal ">
                <div className="modal-box ">
                  <form method="dialog">
                    {/* if there is a button in form, it will c-lose the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                
                <QuotationModalForm id="my_modal_3" setProducts={setProducts}/>
                </div>
              </dialog>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
