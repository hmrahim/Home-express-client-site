import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getCategoryById, putCategory } from "../../api/AllApi";
import { useMutation, useQuery } from "@tanstack/react-query";

  const imgbbKey = import.meta.env.VITE_API_KEY_IMGBB;

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch category
  const { data, isPending, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    retry: 1,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // ✅ Set default data
  useEffect(() => {
    if (data) {
      reset({
        name: data?.name || "",
      });
      setPreview(data?.image || "");
    }
  }, [data, reset]);

  // ✅ Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // ✅ Mutation
  const mutation = useMutation({
    mutationFn: (payload) => putCategory(id, payload),
    onSuccess: (res) => {

      toast.success("✅ Category Updated Successfully");
      setTimeout(() => {
        navigate("/dashboard/all-category");
      }, 1200);
    },
    onError: (error) => {
      console.error("UPDATE ERROR:", error);
      toast.error("❌ Update failed");
    },
  });

  // ✅ Image handler
  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 🔥 Validation
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // ✅ Submit
  const onSubmit = async (formData) => {
    try {
      setUploading(true);

      let image = data?.image || "";

      // 🔥 Upload new image if exists
      if (file) {
        const imgData = new FormData();
        imgData.append("image", file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          imgData
        );

        if (!res?.data?.success) {
          throw new Error("Image upload failed");
        }

        image = res.data.data.display_url;
      }

      const payload = {
        name: formData.name,
        image,
      };

      // console.log("FINAL PAYLOAD:", payload);

      mutation.mutate(payload);
    } catch (err) {
      console.error("SUBMIT ERROR:", err?.response || err);
      toast.error("❌ Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ❌ Error state
  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load category
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen pt-10 px-5">
      <Helmet>
        <title>Update Category</title>
      </Helmet>

      <div className="md:w-1/2 w-full mx-auto py-6 bg-base-100 rounded-2xl shadow-xl p-6 border border-success">
        <h1 className="text-2xl font-bold text-center text-primary mb-4">
          Update Category
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {isPending ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {/* Name */}
              <fieldset className="mb-4">
                <legend className="font-semibold">Category Name</legend>
                <input
                  type="text"
                  className="input input-success w-full"
                  {...register("name", {
                    required: "Category name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </fieldset>

              {/* Image */}
              <fieldset className="mb-4">
                <legend className="font-semibold">
                  Category Image (Optional)
                </legend>

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageChange}
                />

                <p className="text-xs text-gray-500 mt-1">
                  Max size: 2MB
                </p>
              </fieldset>

              {/* Preview */}
              {preview && (
                <div className="mb-4">
                  <p className="mb-2 font-medium">Preview</p>
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-52 object-cover rounded-xl border"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={uploading || mutation.isPending}
                className="btn btn-success w-full"
              >
                {uploading || mutation.isPending
                  ? "Updating..."
                  : "Update Category"}
              </button>
            </>
          )}
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateCategory;