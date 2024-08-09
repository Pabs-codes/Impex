// *********************
// Role of the component: Topbar of the header
// Name of the component: HeaderTop.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <HeaderTop />
// Input parameters: no input parameters
// Output: topbar with phone, email and login and register links
// *********************

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  }
  return (
      <div
          className="text-white bg-gradient-animated max-md:flex-col max-md:items-center whitespace-nowrap py-4">
        <div
            className="flex justify-between h-full max-md:flex-col max-md:items-center w-full max-w-screen-2xl mx-auto px-5 max-md:px-2">
          <ul className="flex flex-wrap items-center h-full gap-x-5 max-md:flex-col max-md:gap-y-2 max-[370px]:text-sm max-[370px]:gap-x-2">
            <li className="flex items-center gap-x-2 font-semibold">
              <FaHeadphones className="text-white"/>
              <span>07384699096 / 0044 7384699096</span>
            </li>
            <li className="flex items-center gap-x-2 font-semibold">
              <FaRegEnvelope className="text-white text-xl"/>
              <span>Supersupplyimpex@gmail.com</span>
            </li>
          </ul>
          <ul className="flex flex-wrap items-center gap-x-5 h-full max-md:flex-col max-md:gap-y-2 max-[370px]:text-sm max-[370px]:gap-x-2 font-semibold max-md:mt-2 justify-end">
            {!session ? (
                <>
                  <li className="flex items-center">
                    <Link href="/login" className="flex items-center gap-x-2 font-semibold">
                      <FaRegUser className="text-white"/>
                      <span>Login</span>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link href="/register" className="flex items-center gap-x-2 font-semibold">
                      <FaRegUser className="text-white"/>
                      <span>Register</span>
                    </Link>
                  </li>
                </>
            ) : (
                <>
                  <span className="ml-10 text-base max-md:ml-0">{session.user?.email}</span>
                  <li className="flex items-center">
                    <button onClick={() => handleLogout()} className="flex items-center gap-x-2 font-semibold">
                      <FaRegUser className="text-white"/>
                      <span>Log out</span>
                    </button>
                  </li>
                </>
            )}
          </ul>
        </div>
      </div>

  );
};

export default HeaderTop;
