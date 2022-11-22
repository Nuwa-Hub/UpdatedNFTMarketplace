const ListingTable = ({ data }) => {
	return (
		<div>
			<table className="min-w-full  leading-normal">
				<thead>
					<tr>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							Price
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							Seller
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
							Date
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((list) => {
						return (
							<tr key={list._id}>
								<td className="text-center">{list.price} ETH</td>
								<td className="text-center">{list.seller}</td>
								<td className="text-center">{new Date(list.createdAt).toLocaleDateString()}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ListingTable;
