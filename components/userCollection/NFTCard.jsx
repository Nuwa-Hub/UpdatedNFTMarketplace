import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getUserNFTsByCollectionId } from "redux/actions/NFTAction";

export default function NFTCard() {
  //handle the routes
  const router = useRouter();
  const collection_id = router.query.id;

  const dispatch = useDispatch();

  useEffect(() => {
        collection_id &&  getUserNFTsByCollectionId(dispatch, collection_id);
    //console.log("sfsdfdf")
  }, [dispatch, collection_id]);

  //get all NFTs that include to the relevent collection
  const nfts = useSelector((state) => state.NFT.NFTs);
  //console.log(nfts);

  return (
    <section className="overflow-hidden text-gray-700 ">
      <div className="container px-2 py-2 mx-auto lg:pt-12 lg:px-2">
        <div className="flex flex-wrap -m-1 md:-m-2">
          {nfts.map((nft) => (
            <div
              key={nft._id}
              className="flex flex-wrap w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 "
            >
              <div className="group max-w-sm  m-4 bg-zinc-200 rounded-lg border border-gray-200  ">
                <Link href={`/nft/${nft._id}/list`}>
                  <div className="w-full aspect-square  overflow-hidden">
                    <img
                      alt="gallery"
                      className="block object-cover object-center w-full h-full rounded-lg hover:shadow-lg transition ease-in-out  hover:-translate-y-1 hover:scale-110"
                      src={nft.Img}
                    />
                  </div>
                </Link>

                <div className="px-5 pt-2">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    NFT Name
                  </h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    price
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 group-hover:hidden">
                    Last Sale
                  </p>
                </div>
                <button
                  type="button"
                  className="hidden flex h-10 bg-gradient-to-r from-indigo-800 via-green-500 to-teal-200  w-full rounded-none group-hover:block"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
