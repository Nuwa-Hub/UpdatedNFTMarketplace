import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "utils/requestMethods";

const index = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [listing, setListing] = React.useState([]);
console.log(user)
  useEffect(() => {
    if (user) {
      publicRequest.get(`listing/user/${user.walletAdress}`).then((res) => {
        setListing(res.data);
      });
    }
    // publicRequest.get(`nft/mostvisited`).then((res) => {
    //   setnfts(res.data);
    // });
  }, [user]);
  return (
    <div className="">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* <!-- Profile Card --> */}
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img className="h-auto w-full mx-auto" src={user?.img || `https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/no.jpeg?alt=media&token=fbda54a5-085f-40fa-a2e9-0f67d98bae62`} alt="" />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {user?.username || "unnamed"}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {}
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
              {user?.about || "none"}
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">Nov 07, 2022</span>
                </li>
              </ul>
            </div>
            {/* <!-- End of profile card --> */}
            <div className="my-4"></div>
            {/* <!-- Friends card --> */}
            <div className="bg-white p-3 hover:shadow">
              <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>My Fovourites</span>
                <Link href="favourite/">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Go
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-Thu%20Nov%2003%202022%2013%3A44%3A54%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=ca790875-c4c0-4065-9a86-5c3ef2b4eefa"
                    alt=""
                  />
                  <a href="#" className="text-main-color">
                    Kojstantin
                  </a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/ProfileImg-Wed%20Sep%2028%202022%2011%3A23%3A38%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=c97ca83d-8d50-43e4-82cc-175858c911f7"
                    alt=""
                  />
                  <a href="#" className="text-main-color">
                    James
                  </a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-Mon%20Nov%2014%202022%2014%3A18%3A56%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=bdcaff0b-a695-456f-85c6-6a9e2a8565cb"
                    alt=""
                  />
                  <a href="#" className="text-main-color">
                    Natie
                  </a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/BannerImg-Thu%20Nov%2003%202022%2013%3A45%3A32%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=542259eb-69be-4cef-a962-6ca6e32b5585"
                    alt=""
                  />
                  <a href="#" className="text-main-color">
                    Casey
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- End of friends card --> */}
          </div>
          {/* <!-- Right Side --> */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* <!-- Profile tab -->
                <!-- About Section --> */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">Jane</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">Doe</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">Female</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+11 998001001</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">
                      Beech Creek, PA, Pennsylvania
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Permanant Address
                    </div>
                    <div className="px-4 py-2">
                      Arlington Heights, IL, Illinois
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        jane@example.com
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">Feb 06, 1998</div>
                  </div>
                </div>
              </div>
              <Link href="updateuser/">
                <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                  Edit Information
                </button>
              </Link>
            </div>
            {/* <!-- End of about section --> */}

            <div className="my-4"></div>

            {/* <!-- Experience and education --> */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Listing History</span>
                  </div>
                  <ul className="list-inside space-y-2 overflow-y-scroll max-h-56 scrollbar-hide">
                  {listing.map((list) => (
                    <li>
                      <div className="text-teal-600">
                       NFT ID : {list.nft.slice(0,20)}...
                      </div>
                      <div className="text-gray-500 text-xs">
                        Date : {list.createdAt.slice(0,10)}
                      </div>
                    </li>
                  ))}
          
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Bidding History</span>
                  </div>
                  <ul className="list-inside space-y-2 overflow-y-scroll max-h-56 scrollbar-hide">
                    <li>
                      <div className="text-teal-600">
                      NFT ID : 63742f8408c32584ce7b...
                      </div>
                      <div className="text-gray-500 text-xs">
                      Date : 2022-11-16
                      </div>
                    </li>
                    <li>
                      <div className="text-teal-600">
                      NFT ID : 63742f8408c32584ce7b...
                      </div>
                      <div className="text-gray-500 text-xs">
                      Date : 2022-11-16
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <> <!-- End of Experience and education grid --></> */}
            </div>
            {/* <!-- End of profile tab --> */}

            <div className="my-4"></div>
            {/* <!-- Experience and education --> */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="bg-white p-3 hover:shadow">
                  <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-green-500">
                      <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span>My Collections</span>
                    <Link href="collection/user">
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Go
                      </button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 mx-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/BannerImg-Wed%20Nov%2002%202022%2010%3A25%3A35%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=75900de2-e82b-434b-a4e3-426585a1a6f1"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Dogss loverssss
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16  mx-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/BannerImg-Thu%20Nov%2003%202022%2013%3A45%3A32%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=542259eb-69be-4cef-a962-6ca6e32b55854"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Art scripts areaa
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16  mx-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/ProfileImg-Wed%20Nov%2016%202022%2006%3A21%3A51%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=01cd6313-3434-43aa-af4a-12e4048d21b8"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Natie
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16  mx-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/BannerImg-Sun%20Nov%2013%202022%2011%3A36%3A37%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=db5b83a1-6ee1-4083-97d8-1a0cbc3011c6"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Game Plazzaaa
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 hover:shadow">
                  <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-green-500">
                      <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span>My NFTs</span>
                    <Link href="nft/user">
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Go
                      </button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16  mx-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/1.jpeg?alt=media&token=168bcc19-4b51-4dd8-a985-6a8179b20ff3"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Kojstantin
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16  mx-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/2.jpeg?alt=media&token=9ab80e18-8147-4fca-94fb-40d340dae154"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        James
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16  mx-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/3.jpeg?alt=media&token=23578fd9-1af3-4a7c-b848-da158bb9abc8"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Natie
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16  mx-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/4.jpeg?alt=media&token=9a848288-562f-4434-aa3b-d080167d91aa"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Casey
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <> <!-- End of Experience and education grid --></> */}
            </div>
            {/* <!-- End of profile tab --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
