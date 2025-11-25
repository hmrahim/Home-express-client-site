import React from 'react';
import { Link } from 'react-router-dom';

const SignUpClient = () => {
    return (
        <div className="max-w-lg w-full">
                      <div className="bg-base-100 rounded-lg shadow-xl overflow-hidden">
                        <div className="pb-8 shadow-2xl">
                          <h1 className=" text-center text-2xl text-gray-900 font-bold">
                            SignUp Form
                          </h1>
                          <form method="POST" action="#" className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm">
                              <div>
                                <label className="sr-only" for="email">
                                  Email address
                                </label>
                                <input
                                  placeholder="Email address"
                                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                  required=""
                                  autocomplete="email"
                                  type="email"
                                  name="email"
                                  id="email"
                                />
                              </div>
                              <div className="mt-4">
                                <label className="sr-only" for="password">
                                  Password
                                </label>
                                <input
                                  placeholder="Password"
                                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                  required=""
                                  autocomplete="current-password"
                                  type="password"
                                  name="password"
                                  id="password"
                                />
                              </div>
                            </div>
        
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center">
                                <input
                                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                                  type="checkbox"
                                  name="remember-me"
                                  id="remember-me"
                                />
                                <label
                                  className="ml-2 block text-sm text-gray-400"
                                  for="remember-me"
                                >
                                  Remember me
                                </label>
                              </div>
        
                              <div className="text-sm">
                                <Link
                                  className="font-medium text-indigo-500 hover:text-indigo-400"
                                  href="#"
                                >
                                  Forgot your password?
                                </Link>
                              </div>
                            </div>
        
                            <div>
                              <button
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                type="submit"
                              >
                                Sign In
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="px-8 py-4 bg-gray-700 text-center">
                          <span className="text-gray-400">Don't have an account?</span>
                          <Link
                            className="font-medium text-indigo-500 hover:text-indigo-400"
                            href="#"
                          >
                            Sign up
                          </Link>
                        </div>
                      </div>
                    </div>
    );
};

export default SignUpClient;