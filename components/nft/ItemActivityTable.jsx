const ItemActivityTable = () => {
	return (
		<div className="overflow-scroll">
			<table className="min-w-full table-auto overflow-scroll leading-normal">
				<thead>
					<tr>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							Event
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							Price
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							From
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							To
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							Date
						</th>
					</tr>
				</thead>
				<tbody>
					{[1, 2, 3, 4].map((item, index) => {
						return (
							<tr key={item}>
								<td className="text-center">Minted</td>
								<td className="text-center">2 eth</td>
								<td className="text-center"> 0x123456789</td>
								<td className="text-center"> 0x1523456789</td>
								<td className="text-center"> 12/12/2021</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ItemActivityTable;
