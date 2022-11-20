import React from "react";

// components

import RafflesTable from "components/Cards/RafflesTable";

// layout for page

import Admin from "layouts/Admin.js";

export default function Collections() {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4 pt-8">
                    <RafflesTable color='light' />
                </div>
            </div>
        </>
    );
}

Collections.layout = Admin;
