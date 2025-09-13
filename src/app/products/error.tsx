"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">😞</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-600">
        Please try again later or go back to the homepage.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
