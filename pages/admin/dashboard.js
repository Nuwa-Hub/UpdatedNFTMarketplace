import React, { useEffect } from "react";
import { getAdminData } from "redux/actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
// components

import AdminStatsCardLineChart from "components/Cards/AdminStatsCardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import AdminCollectionCard from "components/Cards/AdminCollectionCard.js";
import AdminNFTCard from "components/Cards/AdminNFTCard.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.admin.data);
  useEffect(() => {
    if (!data) {
      dispatch(getAdminData());
    }
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <AdminStatsCardLineChart />
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div> */}
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
          <AdminNFTCard />
        </div>
        <div className="w-full xl:w-5/12 px-4">
          <AdminCollectionCard />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
