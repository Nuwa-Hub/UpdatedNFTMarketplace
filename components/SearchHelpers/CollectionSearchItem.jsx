const CollectionSearchItem = (props) => {
	const { item } = props;
	console.log(item);
	return (
		<div className="m-4">
			<div className="flex h-24 bg-white py-6 px-2 rounded-lg shadow-lg hover:bg-green-50">
				<img alt="gallery" src={item.profileImg} />
				<h2 className=" p-4 text-s font-bold mb-2 text-gray-800">
					{item.collectionName}
				</h2>
			</div>
		</div>
	);
};

export default CollectionSearchItem;
