import React from "react";

// components

import AdminAuctionView from "components/Cards/AdminAuctionView";

// layout for page

import Admin from "layouts/Admin.js";

export default function Collections() {
    return (
        <>
                   <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4 pt-8">
                    <AdminAuctionView color='light' />
                </div>
            </div>
        </>
    );
}

Collections.layout = Admin;
