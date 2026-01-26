import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PreBackButton from "../../Components/PreBackButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEmailsById, sendEmail } from "../../../api/AllApi";
import { useParams } from "react-router-dom";
import LoadingSpiner from "../../Components/Loader/LoadingSpiner";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const VIewEmail = () => {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["getEmailsById", id],
    queryFn: () => getEmailsById(id),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn:(data)=> sendEmail(data),
    onSuccess:(res)=> {
        console.log(res);
        if(res.status === 200){
            toast.success("Email send successfully")
            reset()
        }
    }
  })

  const onSubmit = async (data) => {
    mutation.mutate(data)
  };

  

  if (isPending) {
    return <LoadingSpiner />;
  }

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0 ">
        <Helmet>
          <title>Dashboard-All-Emails</title>
        </Helmet>
        <div
          style={{ overflow: "scroll" }}
          className=" md:w-5/6 w-full max-h-screen   mx-auto py-5 bg-base-100 rounded-lg shadow-lg  border border-success"
        >
          <PreBackButton title="All Emails" />
          <hr className="h-1 bg-primary mx-5" />
          <div className="p-6  mx-auto">
            {/* Email Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                View Email
              </h1>
              <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">From:</span> {data?.data.name}{" "}
                  ({data?.data.email})
                </p>
              </div>
            </div>

            {/* Original Message */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Message
              </h2>
              <p className="text-gray-700">{data?.data.message}</p>
            </div>

            {/* Previous Replies */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Previous Replies
              </h2>
              {/* <div className="space-y-4">
                {emailData.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <p className="text-gray-700">{reply.message}</p>
                    <p className="text-gray-400 text-sm mt-1">{reply.date}</p>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Reply Button */}
            <div className="text-right mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Reply
              </button>
            </div>

            {/* Reply Modal */}
            {isModalOpen && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                  <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Send Reply
                      </h2>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 font-bold text-xl"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="px-6 py-4 space-y-3">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          To
                        </label>
                        <input
                          {...register("email", {
                            required: "Recipient email required",
                          })}
                          type="text"
                          value={data?.data.email}
                          readOnly
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-gray-100 cursor-not-allowed"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Subject
                        </label>
                        <input
                          {...register("subject", {
                            required: "Subject required",
                          })}
                          placeholder="Subject"
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-gray-100 "
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Message
                        </label>
                        <textarea
                          {...register("message", {
                            required: "Message is required",
                            minLength: {
                              value: 5,
                              message: "Message must be at least 5 characters",
                            },
                            maxLength: {
                              value: 1000,
                              message: "Message cannot exceed 1000 characters",
                            },
                          })}
                          rows="4"
                          placeholder="Write your reply here..."
                          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                            errors.message
                              ? "border-red-500 focus:ring-red-400"
                              : "border-gray-300 focus:ring-blue-400"
                          }`}
                        ></textarea>
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                          Close
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-primary text-white font-semibold rounded-lg hover:bg-green-600">
                         {mutation.isPending ? "Sending..." : "Send"} 
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIewEmail;
