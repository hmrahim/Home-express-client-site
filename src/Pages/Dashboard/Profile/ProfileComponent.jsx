import React, { useState, useRef, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Edit,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfileData, updateProfile } from "../../../api/AllApi";
import { data } from "autoprefixer";
import { AuthContextDashboard } from "../AuthClient/AuthContextDashboard";

export default function ProfileComponent() {
  const { email } = useContext(AuthContextDashboard);

  const [edit, setEdit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(
    "https://i.pravatar.cc/220?img=12",
  );
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/220?img=12",
  );
  const fileInputRef = useRef(null);

  const { data, isPending } = useQuery({
    queryKey: ["getProfileData", email],
    queryFn: () => getProfileData(email),
    refetchInterval: 5000,
  });
  const [profile, setProfile] = useState({
    name: data?.name,
    role: data?.title,
    email: email,
    phone: data?.phone,
    location: data?.location,
    skills: data?.skills,
    bio: data?.bio,
  });

  useEffect(() => {
    if (data) {
      setProfile({
        name: data?.name,
        role: data?.title,
        email: email,
        phone: data?.phone,
        location: data?.location,
        skills: data?.skills,
        bio: data?.bio,
      });
      setProfileImage(data?.image);
    }
  }, [data, email]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
  });

  // Image upload to imgbb
  const uploadToImgbb = async (file) => {
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("image", file);

    // Replace with your imgbb API key
    const API_KEY = import.meta.env.VITE_API_KEY_IMGBB; // Get from https://api.imgbb.com/

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (data.success) {
        const imageUrl = data.data.url;
        setProfileImage(imageUrl);
        setValue("profileImage", imageUrl);
        setPreviewImage(imageUrl);
        return imageUrl;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed. Please try again.");
      return null;
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview image immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);

      // Upload to imgbb
      uploadToImgbb(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleEdit = () => {
    reset(profile);
    setPreviewImage(profile.profileImage);
    setEdit(true);
  };

  const mutation = useMutation({
    mutationFn: (data) => updateProfile(data, email),
    onSuccess: (res) => {
      if (res.status == 200) {
        setEdit(false);
      }
    },
  });
  const profilePhoto = data?.image;

  const onSubmit = (data) => {
    setProfile(data);
    // setEdit(false);
    const profile = {
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone,
      bio: data.bio,
      location: data.location,
      profileImage: data.profileImage ? data.profileImage : profilePhoto,
      skills: data.skills,
    };

    mutation.mutate(profile);
  };

  const handleCancel = () => {
    reset(profile);
    setPreviewImage(profile.profileImage);
    setEdit(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-lg from-green-100 via-emerald-50 to-green-200 p-6 flex flex-col items-center justify-center">
      {/* ===== TOP TITLE ===== */}
      <div className="mb-6 text-center animate-fadeDown">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 tracking-tight">
          My Profile Dashboard
        </h1>
        <p className="text-green-600 mt-2">
          Manage your personal information beautifully
        </p>
      </div>

      {/* ===== CARD ===== */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-200 animate-fadeUp">
        {!edit ? (
          // ================= VIEW MODE =================
          <div className="grid md:grid-cols-3">
            {/* Left */}
            <div className="bg-gradient-to-b from-green-600 to-emerald-500 text-white p-8 text-center flex flex-col items-center animate-slideInLeft">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
                  onError={(e) => {
                    e.target.src = "https://i.pravatar.cc/220?img=12";
                  }}
                />
              </div>

              <h2 className="text-3xl font-bold">{profile.name}</h2>
              <p className="mt-2 text-green-100">{profile.role}</p>

              <button
                onClick={handleEdit}
                className="mt-6 px-6 py-3 bg-white text-green-700 rounded-full font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            </div>

            {/* Right */}
            <div className="md:col-span-2 p-8 grid md:grid-cols-2 gap-5 animate-slideInRight">
              {[
                ["Email", profile.email],
                ["Phone", profile.phone],
                ["Location", profile.location],
                ["Skills", profile.skills],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="bg-green-50 p-5 rounded-2xl hover:shadow-md transition"
                >
                  <h4 className="font-semibold text-green-700 mb-2">{label}</h4>
                  <p>{value}</p>
                </div>
              ))}

              <div className="bg-green-50 p-5 rounded-2xl md:col-span-2 hover:shadow-md transition">
                <h4 className="font-semibold text-green-700 mb-2">Bio</h4>
                <p>{profile.bio}</p>
              </div>
            </div>
          </div>
        ) : (
          // ================= EDIT MODE =================
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3">
              {/* Left */}
              <div className="bg-gradient-to-b from-green-600 to-emerald-500 text-white p-8 text-center flex flex-col items-center animate-slideInLeft">
                {/* Profile Image Upload Section */}
                <div className="relative mb-6">
                  <div className="relative group" onClick={handleImageClick}>
                    <img
                      src={previewImage ? previewImage : data?.image}
                      alt="profile preview"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Upload Progress */}
                  {uploading && (
                    <div className="mt-4 w-32 mx-auto bg-white bg-opacity-20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-300 shadow-lg"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  {/* Upload Status */}
                  {uploading ? (
                    <div className="flex items-center gap-2 mt-2 text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading... {Math.round(uploadProgress)}%</span>
                    </div>
                  ) : uploadProgress === 100 ? (
                    <div className="mt-2 text-sm bg-green-500 bg-opacity-30 px-3 py-1 rounded-full">
                      ✅ Upload Complete!
                    </div>
                  ) : null}
                </div>

                <input
                  {...register("name", { required: "Name required" })}
                  className="w-full p-3 rounded-xl text-gray-700 mb-2 text-lg font-semibold text-center"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}

                <input
                  {...register("role", { required: "Role required" })}
                  className="w-full p-3 rounded-xl text-gray-700 mb-6 text-center"
                  placeholder="Your Role"
                />
                {errors.role && (
                  <p className="text-red-300 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-3 bg-white text-green-700 rounded-full font-semibold shadow-lg hover:scale-105 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={uploading}
                    className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </div>

              {/* Right */}
              <div className="md:col-span-2 p-8 grid md:grid-cols-2 gap-5 animate-slideInRight">
                {["email", "phone", "location", "skills"].map((field) => (
                  <div key={field} className="bg-green-50 p-5 rounded-2xl">
                    <h4 className="font-semibold text-green-700 mb-2 capitalize">
                      {field}
                    </h4>
                    <input
                      {...register(field, {
                        required: `${field.charAt(0).toUpperCase() + field.slice(1)} required`,
                      })}
                      className="w-full p-3 rounded-xl border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field].message}
                      </p>
                    )}
                  </div>
                ))}

                <div className="bg-green-50 p-5 rounded-2xl md:col-span-2">
                  <h4 className="font-semibold text-green-700 mb-2">Bio</h4>
                  <textarea
                    rows="4"
                    {...register("bio")}
                    className="w-full p-3 rounded-xl border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none resize-none transition"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Hidden profileImage field */}
                <input type="hidden" {...register("profileImage")} />
              </div>
            </div>
          </form>
        )}
      </div>

      {/* ===== RAW CSS ANIMATION ===== */}
      <style jsx ={true}>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-fadeDown {
          animation: fadeDown 0.6s ease-out;
        }

        .animate-fadeUp {
          animation: fadeUp 0.7s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
