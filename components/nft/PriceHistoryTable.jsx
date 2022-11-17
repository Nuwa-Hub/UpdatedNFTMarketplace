const PriceHistoryTable = () => {
	return (
		<div>
			<table className="min-w-full leading-normal">
				<thead>
					<tr>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							Date
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							Price
						</th>
					</tr>
				</thead>
				<tbody>
					{[1, 2, 3, 4].map((item, index) => {
						return (
							<tr key={item}>
								<td className="text-center">2020/2/5</td>
								<td className="text-center">0.5eth</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default PriceHistoryTable;
