import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Edit, Save, X } from "lucide-react";

export default function ProfileComponent() {
  const [edit, setEdit] = useState(false);

  const [profile, setProfile] = useState({
    name: "Amr Khan",
    role: "Frontend Developer",
    email: "amr@example.com",
    phone: "+8801XXXXXXXXX",
    location: "Dhaka, Bangladesh",
    skills: "React, Tailwind CSS, Node.js",
    bio: "Creative developer with passion for modern UI and scalable frontend systems.",
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: profile,
  });

  const handleEdit = () => {
    reset(profile);
    setEdit(true);
  };

  const onSubmit = (data) => {
    setProfile(data);
    // setEdit(false);
    console.log(data);
  };

  const handleCancel = () => {
    reset(profile);
    setEdit(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 p-6 flex flex-col items-center justify-center">

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
              <img
                src="https://i.pravatar.cc/220?img=12"
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 hover:scale-110 transition-transform duration-300"
              />

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
                <div key={i} className="bg-green-50 p-5 rounded-2xl hover:shadow-md transition">
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

                <img
                  src="https://i.pravatar.cc/220?img=12"
                  alt="profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
                />

                <input
                  {...register("name", { required: "Name required" })}
                  className="w-full p-3 rounded-xl text-gray-700 mb-2"
                />

                <input
                  {...register("role", { required: "Role required" })}
                  className="w-full p-3 rounded-xl text-gray-700"
                />

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-green-700 rounded-full font-semibold shadow-lg hover:scale-105 transition flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition flex items-center gap-2"
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
                      {...register(field, { required: `${field} required` })}
                      className="w-full p-3 rounded-xl border"
                    />
                  </div>
                ))}

                <div className="bg-green-50 p-5 rounded-2xl md:col-span-2">
                  <h4 className="font-semibold text-green-700 mb-2">Bio</h4>
                  <textarea
                    rows="4"
                    {...register("bio")}
                    className="w-full p-3 rounded-xl border resize-none"
                  />
                </div>

              </div>
            </div>
          </form>
        )}
      </div>

      {/* ===== RAW CSS ANIMATION ===== */}
      <style>{`
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