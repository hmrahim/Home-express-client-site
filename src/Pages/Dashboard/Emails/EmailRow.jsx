import React, { useState } from "react";
import VIewEmail from "./VIewEmail";
import { Link } from "react-router-dom";

const EmailRow = ({index,email}) => {
     function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }
  
  return (
    <>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
        <td class="px-4 py-3 text-sm text-gray-800">{email?.name}</td>
        <td class="px-4 py-3 text-sm text-gray-800">{email?.email}</td>
        <td class="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">
         {truncate(email?.message,20) }
        </td>
        <td class="px-4 py-3 text-sm text-gray-800 space-x-2">
         <Link className="btn btn-primary btn-xs" to={`/dashboard/view-emails/${email?._id}`}>View</Link>
          <button class="btn btn-error btn-xs ">
            Delete
          </button>
        </td>
      </tr>
     
      
    </>
  );
};

export default EmailRow;
