"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { loggedUserCart } from "@/redux/cartSlice";
import { AppDispatch, RootState } from "../../../redux/store";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const numOfCartItems = useSelector(
    (state: RootState) => state?.cartSlice.numOfCartItems
  );
  useEffect(() => {
    dispatch(loggedUserCart());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LEFT: Logo + Links */}
          <div className="flex items-center gap-6">
            {session && (
              <Link href="/" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <span className="font-bold text-xl text-gray-800">MyShop</span>
              </Link>
            )}

            {/* Desktop Links */}
            {session && (
              <nav className="hidden lg:flex items-center gap-6 text-gray-600 font-medium text-base">
                <Link href="/" className="hover:text-indigo-500 transition">
                  Home
                </Link>
                <Link
                  href="/cart"
                  className="relative flex items-center gap-2 px-2 py-1 hover:text-indigo-500 transition-colors"
                >
                  <span>Cart</span>
                  {numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-fuchsia-800 rounded-full">
                      {numOfCartItems}
                    </span>
                  )}
                </Link>
                <Link
                  href="/products"
                  className="hover:text-indigo-500 transition"
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="hover:text-indigo-500 transition"
                >
                  Categories
                </Link>
                <Link
                  href="/brand"
                  className="hover:text-indigo-500 transition"
                >
                  Brands
                </Link>
              </nav>
            )}
          </div>

          {/* RIGHT: Social icons + Auth links */}
          <div className="flex items-center gap-6">
            {/* Social icons */}
            {session && (
              <div className="hidden md:flex items-center gap-4 text-gray-500 text-lg">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-blue-600"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-sky-500">
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-pink-500"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="TikTok" className="hover:text-black">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="hover:text-blue-700"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            )}

            {/* Auth links */}
            <div className="hidden md:flex items-center gap-4 font-medium text-base text-gray-600">
              {!session ? (
                <>
                  <Link
                    href="/register"
                    className="hover:text-indigo-500 transition"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="hover:text-indigo-500 transition"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-gray-800">
                    Hi, {session.user?.name}
                  </span>
                  <button
                    onClick={logOut}
                    className="hover:text-indigo-500 transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
              >
                <i
                  className={`fas ${
                    open ? "fa-times" : "fa-bars"
                  } text-xl text-gray-700`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-4 pt-4 pb-6 space-y-3 text-gray-600 font-medium text-base">
            {session ? (
              <>
                <Link
                  href="/"
                  className="block hover:text-indigo-500 transition"
                >
                  Home
                </Link>
                <Link
                  href="/cart"
                  className="block hover:text-indigo-500 transition"
                >
                  Cart
                </Link>
                <Link
                  href="/products"
                  className="block hover:text-indigo-500 transition"
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="block hover:text-indigo-500 transition"
                >
                  Categories
                </Link>
                <Link
                  href="/brand"
                  className="block hover:text-indigo-500 transition"
                >
                  Brands
                </Link>

                <div className="flex items-center gap-4 mt-4 text-lg text-gray-500">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="hover:text-blue-600"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="hover:text-sky-500"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="hover:text-pink-500"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" aria-label="TikTok" className="hover:text-black">
                    <i className="fab fa-tiktok"></i>
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="hover:text-blue-700"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>

                <button
                  onClick={logOut}
                  className="mt-4 block  hover:text-indigo-500 transition cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="block hover:text-indigo-500 transition"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="block hover:text-indigo-500 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
