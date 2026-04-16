import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deletedUser, updateUserRoll } from "../../../api/AllApi";
import { toast } from "react-toastify";
import { useDeleteUser } from "react-firebase-hooks/auth";
import Auth from "../../../firebase.init";
import { getAuth, deleteUser } from "firebase/auth";

const UserRow = ({ users, refetch, index }) => {
  const [rol, setRol] = useState("");
  const [deleteUser, loading, error] = useDeleteUser(Auth);
const user = Auth.currentUser;
  const mutation = useMutation({
    mutationFn: (data) => updateUserRoll(data),
    onSuccess: (res) => {
      console.log(res);
      if (res?.status === 200) {
        toast.success("User role updated successfully");
      }
    },
  });

  const updateRol = () => {
    const data = { rol: rol, email: users?.email };
    mutation.mutate(data);
  };
  const deleteMutation = useMutation({
    mutationFn: (id) => deletedUser(id)
   
  });

  const deleteUserById = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
      //  await deleteUser(user)
        deleteMutation.mutate(id);
    
        // axios.delete(`https://moom24-backend-production.up.railway.app/api/category/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  refetch();
  return (
    <tr className="bg-base-200 text-center">
      <th>{index + 1}</th>
      <td>{users?.name}</td>
      <td>{users?.email}</td>
      <td>
        <div className="flex gap-2 justify-center items-center">
          <select
            onChange={(e) => setRol(e.target.value)}
            defaultValue={users?.rol}
            className={`rounded-lg ${users?.rol === "admin" ? "bg-blue-500 text-white" : users?.rol === "rider" ? "bg-green-500 text-white" : "bg-gray-500 text-white"} text-center `}
          >
            <option disabled={true}>{users?.rol}</option>
            <option value="admin">Admin</option>
            <option value="rider">Rider</option>
            <option value="user">User</option>
          </select>
          <button onClick={updateRol} className="btn btn-xs btn-primary">
            update
          </button>
        </div>
      </td>
      <td className="flex gap-3 justify-center items-center">
        <Link
          disabled
          to={`/dashboard/update-category/${users?._id}`}
          className="btn btn-xs btn-primary"
        >
          Edit
        </Link>
        <button
        
          onClick={() => deleteUserById(users._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
