import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import productUnits from "../Product/unit";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchSeacrhProduct } from "../../../api/AllApi";

export default function QuotationForm() {
  const [query, setQuery] = useState("");

  const [showDropdown, setShowDropdown] = useState(true);

  const [showFields, setShowFields] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  const { register, handleSubmit, reset, watch } = useForm();

  const productName = watch("productName");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("quotationProducts");
    if (stored) {
      setCartProducts(JSON.parse(stored));
    }
  }, []);

  const onSubmit = (data) => {
    if (!data.name || !data.quantity) return;

    const newProduct = {
      id: Date.now(),
      ...data,
    };

    const updated = [...cartProducts, newProduct];

    setCartProducts(updated);
    localStorage.setItem("quotationProducts", JSON.stringify(updated));

    reset();
    setShowFields(false);
  };

  const handleRemove = (id) => {
    const filtered = cartProducts?.filter((p) => p.id !== id);
    setCartProducts(filtered);
    localStorage.setItem("quotationProducts", JSON.stringify(filtered));
  };

  const handleConfirmQuotation = () => {
    console.log(cartProducts);

    localStorage.removeItem("quotationProducts");
    setCartProducts([]);
    alert("Quotation Confirmed!");
  };

  const {data,isPending} = useQuery({
    queryKey: ["products", query],
    queryFn: () => fetchSeacrhProduct(query),
    onSuccess: (data) => {
      if (data?.length > 0) {
        setShowDropdown(true);
      }
    },
    refetchInterval: 1000,
     
  })



  const handleSelect = (product) => {
    setQuery(product.name);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col ">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Create New Quotation
          </h1>

          <div className="flex gap-4 ">
            <Link
              to="/dashboard/all-quotations"
              className="btn btn-md btn-primary"
            >
              View Product List
              <div className="badge ">{cartProducts?.length}</div>
            </Link>
            <Link
              to="/dashboard/quotation-list"
              className="btn btn-md btn-primary"
            >
              Quot list
            </Link>
          </div>
        </div>

        {/* Product Input Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 p-6 rounded-xl shadow-sm"
        >
          <div className="flex gap-4 relative">
            <input
              {...register("name", { required: true })}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Product Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
         {
              showDropdown && data?.length > 0 && (
                <ul className="max-w-52 absolute top-10 z-50 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {data?.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {product?.name}
                  </li>
                ))}
             
              </ul>
                  )}
          

            <button
              type="button"
              onClick={() => setShowFields(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Add
            </button>
          </div>

          {showFields && (
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <input
                type="number"
                placeholder="Quantity"
                {...register("quantity", { required: true })}
                className="border rounded-lg px-4 py-2"
              />

              <input
                type="text"
                placeholder="Size"
                {...register("size")}
                className="border rounded-lg px-4 py-2"
              />

              <input
                type="text"
                placeholder="Color"
                {...register("color")}
                className="border rounded-lg px-4 py-2"
              />

              <select
                {...register("unit")}
                className="border rounded-lg px-4 py-2"
              >
                <option value="">Pick a Unit</option>
                {productUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Confirm Product
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
