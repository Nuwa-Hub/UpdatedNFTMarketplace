import React from "react";

// components

import CardAddAdmin from "components/Cards/CardAddAdmin.js";
import CardProfile from "components/Cards/CardProfile.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function AddAdmin() {
  return (
    <>
      {/* <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4 "> */}
      <CardAddAdmin />
      {/* </div> */}
      {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      {/* </div> */}
    </>
  );
}

AddAdmin.layout = Admin;
