import Link from "next/link";
import { useEffect, useState } from "react";
//import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Logo_dark from "../assets/logo-dark.svg";
import Logo from "../assets/logo.svg";
import ConnectWalletButton from "./ConnectWalletButton";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "utils/requestMethods";
import { useRouter } from "next/router";
import NavbarHelper from "./SearchHelpers/NavbarHelper";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [collection_search_result, setCollectionSearchResult] = useState([]);
  const [nft_search_result, setNftSearchResult] = useState([]);
  const [search, setSearch] = useState(false);
  const handleClick = () => setNav(!nav);
  const handleClose = () => setNav(!nav);
  const [adminButton, setAdminButton] = useState(null);
  const [term, setTerm] = useState("");
  const { currentUser, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      setAdminButton(
        <div className="relative group pr-12 pt-4">
          <Link href="/auth/login">Admin</Link>
        </div>
      );
    } else {
      setAdminButton(null);
    }
  }, [userToken, dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTerm(e.target.value);
    // console.log(term);
    const collection_res = await publicRequest.get(
      `/collection/keyword?keyword=${term}`
    );
    // console.log(term);
    const nft_res = await publicRequest.get(`/nft/keyword?keyword=${term}`);
    setCollectionSearchResult(collection_res.data);
    setNftSearchResult(nft_res.data);
    setSearch(true);
    // console.log(nft_res.data);
    // console.log(collection_res.data);
    // console.log(collection_search_result);
    // console.log(nft_search_result);
  };

  const handleSearchClose = () => {
    setSearch(false);
    setTerm("");
    setCollectionSearchResult([]);
    setNftSearchResult([]);
  };
  return (
    <div className="w-full h-[80px] z-10 bg-gray-50 sticky top-0 ">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <Link href={`/`} smooth={true} duration={500}>
            <img className="w-16" src={Logo.src} alt="logo" />
          </Link>
          <h2 className="text-xl font-bold mr-4 sm:text-2xl">
            Kryptonaut
          </h2>
        </div>
        <form className="w-[50%]">
          {/* <label
						htmlFor="default-search"
						className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
					>
						Search
					</label> */}
          <div className="p-2 relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-auto">
              <button onClick={handleSubmit}>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
            <input
              onChange={handleChange}
              onSubmit={handleSubmit}
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search items, collections"
              required
            />
          </div>
          {search && (
            <NavbarHelper
              handleClose={handleSearchClose}
              collection_search_result={collection_search_result}
              nft_search_result={nft_search_result}
            />
          )}
        </form>
        <div className="hidden md:flex pr-4">
          <div className="relative group pr-12 pt-4 cursor-pointer">
            Explore
            <div className="absolute w-200 invisible group-hover:visible bg-gray-50 pt-4">
              <div>
                <div className="text-black w-full p-4">
                  <Link
                    href={`/collection`}
                    smooth={true}
                    duration={500}
                  >
                    <a>Explore Collections</a>
                  </Link>
                </div>
                <div className="text-black w-full p-4">
                  {" "}
                  <Link
                    href={`/nft`}
                    smooth={true}
                    duration={500}
                  >
                    <a>Explore NFT</a>
                  </Link>
                </div>
                <div className="text-black w-full p-4">
                  <Link
                    href={`/raffleNfts/`}
                    smooth={true}
                    duration={500}
                  >
                    <a>Explore Raffles</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
						<Link href={`/collection`} smooth={true} duration={500}>
							<a>Explore Collections</a>
						</Link>
					</div> */}

          <div className="relative group pr-12 pt-4 cursor-pointer">
            Create
            <div className="absolute w-200 invisible group-hover:visible bg-gray-50 pt-4">
              <div>
                <div className="text-black w-full p-4">
                  <Link
                    href={`/collection/create`}
                    smooth={true}
                    duration={500}
                  >
                    <a>Create Collection</a>
                  </Link>
                </div>
                <div className="text-black w-full p-4">
                  {" "}
                  <Link
                    href={`/nft/create`}
                    smooth={true}
                    duration={500}
                  >
                    <a>Create NFT</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* <li className="p-4">
							<Link
								href={`/collection/create`}
								smooth={true}
								duration={500}
							>
								<a>Create Collections</a>
							</Link>

						
						</li> */}
          {/* <div>
						<Link
							href={`/collection/create`}
							smooth={true}
							duration={500}
						>
							<a>Create Collection</a>
						</Link>
					</div> */}

          <div className="relative group pr-12">
            <CgProfile size={50} />
            <div className="absolute w-200 invisible group-hover:visible bg-gray-50 pt-4">
              <div>
                <div className="text-black w-full p-4">
                  <Link
                    href={`/collection/user`}
                    smooth={true}
                    duration={500}
                  >
                    <a>My Collections</a>
                  </Link>
                </div>
                <div className="text-black w-full p-4">
                  {" "}
                  <Link
                    href={`/nft/user`}
                    smooth={true}
                    duration={500}
                  >
                    <a>My NFTs</a>
                  </Link>
                </div>
                <div className="text-black w-full p-4">
                  {" "}
                  <Link
                    href={`/favourite/`}
                    smooth={true}
                    duration={500}
                  >
                    <a>My Favourites</a>
                  </Link>
                </div>
                <div className="text-black w-full p-4">
                  {" "}
                  <Link
                    href={`/complainform/`}
                    smooth={true}
                    duration={500}
                  >
                    <a>Complaints</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* {currentUser && currentUser.isAdmin ? (
              <li className="p-4">
                <Link href="/auth/login" >
                  Admin
                </Link>
              </li>
            ) : null} */}
          {adminButton}

          {/* <li><Link to="platforms" smooth={true} offset={-100} duration={500}>Platforms</Link></li>
            <li><Link to="pricing" smooth={true} offset={-50} duration={500}>Pricing</Link></li> */}

          {/* <button className='border-none bg-transparent text-black mr-4'>
            Sign In
          </button> */}
          {/* <ConnectButton  moralisAuth={true} /> */}
        </div>

        <ConnectWalletButton />
      </div>

      <ul
        className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}
      >
        <li className="border-b-2 border-zinc-300 w-full">
          <Link href={`/collection`} smooth={true} duration={500}>
            <a>Explore</a>
          </Link>
        </li>
        <li className="border-b-2 border-zinc-300 w-full">
          <Link href={`/nft/create`} smooth={true} duration={500}>
            <a>Create</a>
          </Link>
        </li>
        <li className="border-b-2 border-zinc-300 w-full">
          <Link href={`/`} smooth={true} duration={500}>
            <a>Stats</a>
          </Link>
        </li>

        <div className="flex flex-col my-4">
          <ConnectWalletButton />
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
