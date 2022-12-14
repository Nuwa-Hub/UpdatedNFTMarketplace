// import Accordion from "react-bootstrap/Accordion";

import ItemActivityTable from "./ItemActivityTable";
import ListingTable from "./ListingTable";
import PriceHistoryLineChart from "./PriceHistoryLineChart";
import PriceHistoryTable from "./PriceHistoryTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { publicRequest } from "utils/requestMethods";
const Accordion_ = () => {
	//get current NFT id
	const router = useRouter();
	const nft_id = router.query.id;
	const [data, setdata] = useState(false);
	const [prices, setprices] = useState(false);
	const [dates, setdates] = useState(false);
	const [listing, setlisting] = useState([]);
	useEffect(() => {
		if (nft_id) {
			publicRequest.get(`nft/price/${nft_id}`).then((res) => {
				if (res.data.length > 1) {
					setdata(res.data);
					setprices(res.data[0].map((item) => item.toString()));
					setdates(res.data[1].map((item) => item.toString()));
				}
			});
			publicRequest.get(`nft/listinghistory/${nft_id}`).then((res) => {
				setlisting(res.data);
			});
		}
	}, [nft_id]);
	useEffect(() => {
		if (data?.length > 1) {
			setprices(data[0].map((item) => item.toString()));
			setdates(data[1].map((item) => item.toString()));
		}
	}, [data]);

	return (
		<div className="mt-10">
			<div className="bg-white w-full border border-blue-300 divide-y divide-gray-200">
				<details>
					<summary className="question py-3 px-4 cursor-pointer select-none w-full outline-none">
						Price History
					</summary>
					{data && (
						<PriceHistoryLineChart
							dates={dates}
							prices={prices}
						//	dates={["2022/08/", "2022/08/03", "2022/08/03"]}
						//	prices={["0.1", "0.2", "0.1"]}
						/>
					)}
					{/* <PriceHistoryTable /> */}
				</details>
				<details>
					<summary className="question py-3 px-4 cursor-pointer select-none w-full">
						Listings
					</summary>
					<ListingTable data={listing} />
				</details>
				{/* <details>
          <summary className="question py-3 px-4 cursor-pointer select-none w-full">
            Item Activity
          </summary>
          <ItemActivityTable />
        </details> */}
			</div>

			{/* <Accordion defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>Price History</Accordion.Header>
					<Accordion.Body>
						<PriceHistoryTable />
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Listings</Accordion.Header>
					<Accordion.Body>
						<ListingTable />
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>Item Activity</Accordion.Header>
					<Accordion.Body>
						<ItemActivityTable />
					</Accordion.Body>
				</Accordion.Item>
			</Accordion> */}
		</div>
	);
};

export default Accordion_;
