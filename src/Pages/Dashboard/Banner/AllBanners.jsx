import React from "react";
import { Helmet } from "react-helmet-async";
import PreBackButton from "../../Components/PreBackButton";
import BannerRow from "./BannerRow";
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "../../../api/AllApi";

const AllBanners = () => {
  const {data,isPending} = useQuery({
    queryKey: ["banner"],
    queryFn: getBanner,
    refetchInterval: 1000,
  });

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <Helmet>
          <title>Dashboard-Add-Category</title>
        </Helmet>
        <div className="md:w-4/5 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="All Banner" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <div class=" bg-gray-100 ">
            <div class=" mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* <!-- Table --> */}
              <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                  <thead class="bg-gray-50">
                    <tr class="text-left text-gray-600 text-sm uppercase tracking-wider">
                      <th class="px-6 py-4">Preview</th>
                      <th class="px-6 py-4">Title</th>
                      <th class="px-6 py-4">Description</th>
                      <th class="px-6 py-4">Created</th>
                      <th class="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody class="divide-y">
                    {/* <!-- Row --> */}
                    {
                        data?.data?.map(banner=> <BannerRow key={banner._id} data={banner} />)
                    }
                    

                    {/* <!-- Duplicate rows as needed --> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBanners;
