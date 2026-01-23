import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postContact } from "../../../api/AllApi";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => postContact(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success(
          "Your message send successfully, please wait for reply.",
          { autoClose: 1000 },
        );
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  
  
  };
  return (
    <div className="bg-white text-gray-800 overflow-hidden mt-10">
      <Helmet>
        <title>Moom24-Contact</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* ================= LEFT SIDE ================= */}
          <div>
            <h2 className="text-3xl font-bold mb-3">Get in Touch</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Have questions about our products or services? Our team is here to
              help and will respond as quickly as possible.
            </p>

            <div className="space-y-5">
              {/* Phone Card */}
              <div className="flex items-start gap-4 p-4 rounded-xl border bg-white shadow-sm">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
                  📞
                </div>
                <div>
                  <h4 className="font-semibold">Phone Support</h4>
                  <p className="text-gray-600 text-sm">
                    Speak directly with our support team
                  </p>
                  <p className="font-medium mt-1">+966 50 123 4567</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-4 rounded-xl border bg-white shadow-sm">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
                  📧
                </div>
                <div>
                  <h4 className="font-semibold">Email Address</h4>
                  <p className="text-gray-600 text-sm">
                    Send us your queries anytime
                  </p>
                  <p className="font-medium mt-1">support@yourcompany.com</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-start gap-4 p-4 rounded-xl border bg-white shadow-sm">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold">Office Location</h4>
                  <p className="text-gray-600 text-sm">
                    Visit our office during business hours
                  </p>
                  <p className="font-medium mt-1">Riyadh, Saudi Arabia</p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE FORM ================= */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="+966..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 10,
                      message: "Number must be at least 10 digits",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                {mutation.isPending ? "Message sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
