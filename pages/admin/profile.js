import React from "react";

// components

import CardAdminProfile from "components/Cards/CardAdminProfile";


// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4 pt-8">
                    <CardAdminProfile />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = Admin;
