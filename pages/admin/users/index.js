import React from "react";

// components

import UsersTable from "components/Cards/UsersTable.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4 pt-8">
          <UsersTable />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
