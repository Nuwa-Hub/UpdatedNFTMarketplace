import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

import { useSelector } from 'react-redux'
export default function Admin({ children }) {
  const admin = useSelector((state) => state.admin.currentAdmin);
  if (!admin) {
    return <>
      {/* not authorize error */}
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-col flex-1">
          <main className="flex flex-col flex-1">
            <div className="flex items-center justify-center flex-1 h-full">
              <div className="max-w-sm p-6 space-y-4 text-center">
                <h1 className="text-5xl font-bold text-gray-900">401</h1>
                <p className="text-xl font-medium text-gray-600">Not authorized</p>
                <p className="text-gray-500">You are not authorized to access this page.</p>
                <a href="/" className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Home Page</a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>;
  }
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        {/* <AdminNavbar /> */}
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 h-screen md:px-10 mx-auto w-full -m-24">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
