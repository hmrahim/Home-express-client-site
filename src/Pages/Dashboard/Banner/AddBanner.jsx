import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { postBanner } from "../../../api/AllApi";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import PreBackButton from "../../Components/PreBackButton";

export default function AddBanner() {
  const imgbbKey = import.meta.env.VITE_API_KEY_IMGBB;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const image = watch("image");

  // Preview
  useEffect(() => {
    if (image && image[0]) {
      const file = image[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [image]);

  const mutation = useMutation({
    mutationFn: (bannerData) => postBanner(bannerData),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success("Banner added succesfully", { autoClose: 1000 });
        reset();
      }
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`, // <-- replace with your API
        formData,
        {
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          },
        },
      );

      console.log();
      const bannerData = {
        image: res.data.data.display_url,
        title: data.title,
        desc: data.desc,
      };
      mutation.mutate(bannerData);

      setPreview(null);
      setProgress(0);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
          <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
            <Helmet>
              <title>Dashboard-Add-Category</title>
            </Helmet>
            <div className=" md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
              <PreBackButton title="Add Banner" />
              <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Banner</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Image */}
          <div>
            <label className="block mb-2 font-medium">Banner Image</label>

            <label className="flex items-center justify-center h-40 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden">
              {preview ? (
                <img src={preview} className="h-full object-contain" />
              ) : (
                <span className="text-gray-400">Click to upload</span>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  required: "Image is required",
                })}
              />
            </label>

            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <input
              placeholder="Banner title"
              className="w-full border p-3 rounded-xl"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Description"
              className="w-full border p-3 rounded-xl"
              {...register("desc", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Button */}
          <button
            disabled={uploading}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Banner"}
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}
