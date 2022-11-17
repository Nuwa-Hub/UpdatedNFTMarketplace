import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import { publicRequest } from "utils/requestMethods";

export default function AdminStatsCardLineChart() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  function createChart() {
    var config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: 'NFTs',
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: data.nfts,
            fill: false,
          },
          {
            label: 'Collections',
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: data.collections,
          },
          {
            label: 'Listings',
            fill: false,
            backgroundColor: "#f0f",
            borderColor: "#f0f",
            data: data.listings,
          },
          {
            label: 'Auctions',
            fill: false,
            backgroundColor: "#0ff",
            borderColor: "#0ff",
            data: data.auctions,
          },
          {
            label: 'Raffles',
            fill: false,
            backgroundColor: "#ff0",
            borderColor: "#ff0",
            data: data.raffles,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Stats Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }

  useEffect(() => {
    publicRequest.get('admin/stats')
      .then(res => {
        setLoading(false)
        const data = {}
        for (const property in res.data) {
          let row = new Array(12).fill(0)
          for (let i = 0; i < 12; i++) {
            let obj = res.data[property].find(obj => obj._id.month == i + 1)
            if (obj) {
              row[i] = obj.count
            }
          }
          data[property] = row
        }
        setData(data)
        createChart()
        console.log(data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-slate-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Sales value</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-96">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
