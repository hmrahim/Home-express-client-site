import React from "react";
import { NavLink } from "react-router-dom";

const MenuList = () => {
  return (
    <div
      className="flex flex-col gap-2 mb-20
    overflow-y-scroll
  [&::-webkit-scrollbar]:w-1 
 
  [&::-webkit-scrollbar-thumb]:bg-red
    [&::-webkit-scrollbar-thumb]:rounded-xl
    
    "
    >
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-gradient-to-r from-green-500 to-emerald-600">
          Users
        </h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md  ">
              <NavLink
                to="/dashboard/all-users"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800"
              >
                All Users
              </NavLink>
            </li>
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-gradient-to-r from-green-500 to-emerald-600">
          Products
        </h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md   ">
              <NavLink
                to="/dashboard/all-product"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800"
              >
                All Products
              </NavLink>
            </li>
            <li className="text-black rounded-md   ">
              <NavLink
                to="/dashboard/add-product"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800 text-black rounded-md  "
              >
                Add Products
              </NavLink>
            </li>
           
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-gradient-to-r from-green-500 to-emerald-600">
          Category
        </h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md   ">
              <NavLink
                to="/dashboard/all-category"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800"
              >
                All Categorys
              </NavLink>
            </li>
            <li className="text-black rounded-md   ">
              <NavLink
                to="/dashboard/add-category"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800 text-black rounded-md "
              >
                Add Category
              </NavLink>
            </li>
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-gradient-to-r from-green-500 to-emerald-600">
          Orders
        </h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md   ">
              <NavLink to="/dashboard/orders" className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800">
                All Orders
              </NavLink>
            </li>
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-gradient-to-r from-green-500 to-emerald-600">
          Settings
        </h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md   ">
              <NavLink
                to="/dashboard/settings"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800"
              >
                Home Settings
              </NavLink>
            </li>
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-gradient-to-r from-green-500 to-emerald-600">
          Promo Code
        </h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md   ">
              <NavLink
                to="/dashboard/add-promocode"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800"
              >
                Add Promocode
              </NavLink>
            </li>
            <li className="text-black rounded-md   ">
              <NavLink
                to="/dashboard/all-promocode"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800"
              >
                All Promocode
              </NavLink>
            </li>
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-gradient-to-r from-green-500 to-emerald-600">
          Visitors
        </h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md   ">
              <NavLink
                to="/dashboard/visitors"
                className="hover:text-white  mt-1    hover:bg-gradient-to-l from-gray-600 to-gray-800"
              >
                All Visitors
              </NavLink>
            </li>
          </ul>
          ;
        </div>
      </div>
     
    
    </div>
  );
};

export default MenuList;
