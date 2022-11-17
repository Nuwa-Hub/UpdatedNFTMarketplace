import React from "react";

// components

import UserView from "components/Cards/UserView.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4 pt-8">
          <UserView />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
