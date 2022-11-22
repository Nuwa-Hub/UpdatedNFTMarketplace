import { useRouter } from "next/router";
import Link from "next/link";
const CollectionSearchItem = (props) => {
	const { item } = props;
	console.log(item);
	const router = useRouter();
	const handleClick = (e) => {
		router.push(`/collection/${item._id}`);
	};

	return (
		<div className="m-4">
			<div
				className="flex h-24 bg-white py-6 px-2 rounded-lg shadow-lg hover:bg-green-50"
				onClick={handleClick}
			>
				<img alt="gallery" src={item.profileImg} />
				{/* <Link href={"/collection/${jj}"}> */}
				<h2 className=" p-4 text-s font-bold mb-2 text-gray-800">
					{item.collectionName}
				</h2>
				{/* </Link> */}
			</div>
		</div>
	);
};

export default CollectionSearchItem;
