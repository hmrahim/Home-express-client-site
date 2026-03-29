import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchAllCategorys,
  getAllProductByCategory,
} from "../../../api/AllApi";
import ProductCard from "../../Components/ProductCard";
import { MdCategory } from "react-icons/md";

const Category = () => {
  const { category } = useParams();
  const { data, isPending } = useQuery({
    queryKey: "getAllProductByCategory",
    queryFn: () => getAllProductByCategory(category),
    refetchInterval:1000
  });

  const { data: catData, isPending: catIspedning } = useQuery({
    queryKey: ["fetchAllCategorys"],
    queryFn: fetchAllCategorys,
  });

  console.log(catData);
  return (
    <div>
      <div class="min-h-screen bg-gray-100 flex mt-32">
        {/* <!-- Sidebar --> */}
        <aside class="w-64 bg-white shadow-lg p-5 hidden md:block">
          <h2 class="text-xl font-bold mb-6 text-gray-800">Categories</h2>

          <ul class="space-y-3">
            {
                catData?.map((cat)=> {
                    return   <li>
              <Link to={`/category/${cat.name}`}
                href="/category/shoes"
                class="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition font-medium flex items-center gap-2"
              >
                <p className="text-gray-800">
                  {" "}
                  {
                    cat.image ? <img src={cat.image} className="h-4 w-4" alt="" /> : <MdCategory />
                  }
                  
                </p>{" "}
                {cat.name}
              </Link>
            </li>

                })
            }
          
          </ul>
        </aside>

        {/* <!-- Main Content --> */}
        <main class="flex-1 p-6">
          {/* <!-- Header --> */}
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-800">
              {category} Collection
            </h1>
            <span class="text-sm text-gray-500">
              {data?.length} items found
            </span>
          </div>

          {/* <!-- Product Grid --> */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
            data?.length !== 0 ?
            <>
            {data?.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
            </>
            : <h1>Loading...</h1>
        }
          </div>
        </main>
      </div>
    </div>
  );
};

export default Category;
