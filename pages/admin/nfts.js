import React from "react";

// components

import NFTTable from "components/Cards/NFTTable";

// layout for page

import Admin from "layouts/Admin.js";

export default function NFTs() {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4 pt-8">
                    <NFTTable color='light' />
                </div>
            </div>
        </>
    );
}

NFTs.layout = Admin;
