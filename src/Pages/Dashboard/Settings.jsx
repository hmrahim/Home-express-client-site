import React from "react";
import PreBackButton from "../Components/PreBackButton";

const Settings = () => {
  return (
    <div>
      <div className="bg-base-200  pt-10 px-5 md:px-0">
        <div className=" md:w-4/5 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="Home Settings" />{" "}
          <hr className="h-1 bg-primary" />
          <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2 my-5">
              <div>
                <label
                  for="first_name"
                  class="block mb-2.5 text-sm font-medium text-heading"
                >
                  Website Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Website Name"
                  required
                />
              </div>
              <div>
                <label class="block mb-2.5 text-sm font-medium text-heading">
                  Email
                </label>
                <input
                  type="email"
                  class="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Email"
                />
              </div>
              <div>
                <label
                  for="company"
                  class="block mb-2.5 text-sm font-medium text-heading"
                >
                  Facebook Url
                </label>
                <input
                  type="url"
                  id="company"
                  class="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Facebook Url"
                />
              </div>
              <div>
                <label class="block mb-2.5 text-sm font-medium text-heading">
                  Instagram Url
                </label>
                <input
                  type="url"
                  class="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Instagram url"
                />
              </div>
              <div>
                <label class="block mb-2.5 text-sm font-medium text-heading">
                  Twitter Url
                </label>
                <input
                  type="url"
                  id="website"
                  class="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Twitter"
                />
              </div>
              <div>
                <label class="block mb-2.5 text-sm font-medium text-heading">
                  Copy Right Text
                </label>
                <input
                  type="text"
                  class="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Copy Right"
                />
              </div>
              <div>
                <label class="block mb-2.5 text-sm font-medium text-heading">
                  About Text
                </label>
                <textarea
                    
                  type="text"
                  class="bg-base-300 border min-h-40 border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="About Text"
                ></textarea>
              </div>
              <div>
                <label class="block mb-2.5 text-sm font-medium text-heading">
                  Website Logo
                </label>

                <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                  <div class="md:flex">
                    <div class="w-full ">
                      <div class="relative h-40 rounded-lg border-2 border-gray-600 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <div class="absolute flex flex-col items-center">
                          <img
                            alt="File Icon"
                            class="mb-3"
                            src="https://img.icons8.com/dusk/64/000000/file.png"
                          />
                          <span class="block text-gray-500 font-semibold">
                            Drag &amp; drop your files here
                          </span>
                          <span class="block text-gray-400 font-normal mt-1">
                            or click to upload
                          </span>
                        </div>

                        <input
                          name=""
                          class="h-full w-full opacity-0 cursor-pointer"
                          type="file"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
               <div>
                <button className="btn btn-primary min-w-full" >Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
