import { useRouter } from "next/router";
const NftSearchItem = (props) => {
	const { item } = props;
	console.log(item);
	const router = useRouter();
	const handleClick = (e) => {
		router.push(`/nft/${item._id}`);
	};
	return (
		<div className="m-4">
			<div
				onClick={handleClick}
				className="flex h-24 bg-white py-6 px-2 rounded-lg shadow-lg hover:bg-green-50"
			>
				<img alt="gallery" src={item.pinataurl} />
				<h2 className=" p-4 text-s font-bold mb-2 text-gray-800">
					{item.NFTName}
				</h2>
			</div>
		</div>
	);
};

export default NftSearchItem;
