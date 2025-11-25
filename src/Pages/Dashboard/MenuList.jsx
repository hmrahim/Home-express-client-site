import React from "react";
import { Link, NavLink } from "react-router-dom";

const MenuList = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-accent">Users</h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md  hover:bg-primary ">
              <Link to="/dashboard/all-users" className="hover:text-white mt-1">
                All Users
              </Link>
            </li>
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-accent">Products</h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md  hover:bg-primary ">
              <Link
                to="/dashboard/all-product"
                className="hover:text-white mt-1"
              >
                All Products
              </Link>
            </li>
            <li className="text-black rounded-md  hover:bg-primary ">
              <Link
                to="/dashboard/add-product"
                className="hover:text-white mt-1 text-black rounded-md  hover:bg-primary"
              >
                Add Products
              </Link>
            </li>
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-accent">Category</h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md  hover:bg-primary ">
              <Link
                to="/dashboard/all-category"
                className="hover:text-white mt-1"
              >
                All Categorys
              </Link>
            </li>
            <li className="text-black rounded-md  hover:bg-primary ">
              <Link
                to="/dashboard/add-category"
                className="hover:text-white mt-1 text-black rounded-md  hover:bg-primary"
              >
                Add Category
              </Link>
            </li>
          </ul>
          ;
        </div>
      </div>
      <div className="collapse collapse-plus bg-white border border-base-300">
        <input type="radio" name="my-accordion-det-" defaultChecked />
        <h1 className="collapse-title font-semibold bg-accent">Orders</h1>
        <div className="collapse-content text-sm">
          <ul>
            <li className="text-black rounded-md  hover:bg-primary ">
              <Link
                to="/dashboard/orders"
                className="hover:text-white mt-1"
              >
                All Orders
              </Link>
            </li>
           
          </ul>
          ;
        </div>
      </div>
    </div>
  );
};

export default MenuList;
