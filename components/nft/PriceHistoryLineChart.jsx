import React from "react";
import Chart from "chart.js";

export default function PriceHistoryLineChart(props) {
	const { dates, prices } = props;
	React.useEffect(() => {
		var config = {
			type: "line",
			data: {
				labels: dates,
				datasets: [
					{
						label: new Date().getFullYear(),
						backgroundColor: "#F9F2F2",
						borderColor: "#4c51bf",
						data: prices,
						fill: false,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: false,
					text: "Sales Charts",
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
	}, []);
	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-700 ">
				<div className="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full max-w-full flex-grow flex-1"></div>
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
