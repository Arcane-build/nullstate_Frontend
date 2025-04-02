"use client";

import { getProviders, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [providers, setProviders] = useState<Record<
    string,
    { id: string; name: string }
  > | null>(null);

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov));
  }, []);

  if (!providers) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-gray-800 to-black">
        <div className="p-8 rounded-lg shadow-lg bg-gray-900">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-indigo-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse delay-150"></div>
          </div>
          <p className="mt-4 text-gray-300 font-medium">
            Loading authentication options...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-b pt-20 from-[#5539A8] via-[rgba(116,14,63,40%)] to-black p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-indigo-700 to-purple-700">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 p-3 rounded-full shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="px-6 pt-16 pb-8">
          <h1 className="text-center text-3xl font-bold text-gray-100 mb-2">
            Please Sign In
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Please sign in to continue
          </p>

          <div className="space-y-4">
            {Object.values(providers).map(
              (provider: { id: string; name: string }) => (
                <div key={provider.id} className="flex justify-center">
                  <button
                    onClick={() => signIn(provider.id, { callbackUrl })}
                    className={`
                    w-full py-3 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center
                    ${
                      provider.id === "google"
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-600"
                        : ""
                    }
                    ${
                      provider.id === "github"
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                        : ""
                    }
                    ${
                      provider.id === "facebook"
                        ? "bg-blue-800 hover:bg-blue-700 text-white"
                        : ""
                    }
                    ${
                      provider.id === "twitter"
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : ""
                    }
                    ${
                      !["google", "github", "facebook", "twitter"].includes(
                        provider.id
                      )
                        ? "bg-indigo-800 hover:bg-indigo-700 text-gray-100"
                        : ""
                    }
                  `}
                  >
                    {/* Provider Icons */}
                    {provider.id === "google" && (
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    {provider.id === "github" && (
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    )}
                    {provider.id === "facebook" && (
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    )}
                    {provider.id === "twitter" && (
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    )}
                    {/* Default icon for other providers */}
                    {!["google", "github", "facebook", "twitter"].includes(
                      provider.id
                    ) && (
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    )}
                    Sign in with {provider.name}
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
          <p className="text-center text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
