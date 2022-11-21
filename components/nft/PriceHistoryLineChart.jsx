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
						backgroundColor: "#ffffff",
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
								fontColor: "#000000",
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
								color: "#f2fffb",
								zeroLineColor: "#000000",
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
					yAxes: [
						{
							ticks: {
								fontColor: "#000000",
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
								color: "#f2fffb",
								zeroLineColor: "#000000",
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
			<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-green-50 p-2">
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
