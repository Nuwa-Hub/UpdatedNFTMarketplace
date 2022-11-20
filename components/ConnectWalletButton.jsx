import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "redux/actions/userActions";
import { logout } from "redux/slices/userSlice";
import { adminLogout } from "redux/slices/adminSlices";
const ConnectWalletButton = () => {
	const disconnectWallet = () => {
		dispatch(logout());
		dispatch(adminLogout());
		setdata({
			address: "",
			Balance: null,
			walletButton: (
				<button
					onClick={connectWallet}
					className="bg-indigo-600 text-white px-4 py-2 rounded-md"
				>
					Connect Wallet
				</button>
			),
		});
	};
	async function handleEthereum() {
		const { ethereum } = window;
		if (ethereum) {
			console.log('Ethereum successfully detected!');
			const res = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const address = res[0];
			const balance = await window.ethereum.request({
				method: "eth_getBalance",
				params: [address, "latest"],
			});
			setdata({
				address,
				Balance: (
					parseInt(balance, 16) / 1000000000000000000
				).toPrecision(5),
				walletButton: (
					<button
						onClick={disconnectWallet}
						className="bg-indigo-600 text-white px-4 py-2 rounded-md"
					>
						Disconnect Wallet
					</button>
				),
			});
			dispatch(userLogin({ walletAdress: address }));
		} else {
			console.log('Please install MetaMask!');
			alert("install metamask extension!!");
		}
	}

	const connectWallet = async () => {
		if (window.ethereum) {
			handleEthereum();
		} else {
			window.addEventListener('ethereum#initialized', handleEthereum, {
				once: true,
			});
		}
	};
	const { currentUser, userToken } = useSelector((state) => state.user);
	// console.log(currentUser);
	const [data, setdata] = useState({
		address: "",
		Balance: null,
		walletButton: (
			<button
				onClick={connectWallet}
				className="bg-indigo-600 text-white px-4 py-2 rounded-md"
			>
				Connect Wallet
			</button>
		),
	});
	const dispatch = useDispatch();

	useEffect(() => {
		const getBalance = async () => {
			if (window.ethereum) {
				const res = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				const address = res[0];
				const balance = await window.ethereum.request({
					method: "eth_getBalance",
					params: [address, "latest"],
				});
				setdata({
					address,
					Balance: (
						parseInt(balance, 16) / 1000000000000000000
					).toPrecision(5),
					walletButton: (
						<button
							onClick={disconnectWallet}
							className="bg-indigo-600 text-white px-4 py-2 rounded-md"
						>
							Disconnect Wallet
						</button>
					),
				});
			}
		};
		if (currentUser) {
			getBalance();
		}
	});

	// let Button;
	// if (!currentUser || currentUser.address === "") {
	//     Button = <button onClick={connectWallet} className="bg-zinc-500 text-white px-4 py-2 rounded-md">Connect Wallet</button>
	// } else {
	//     Button = <button onClick={disconnectWallet} className="bg-zinc-500 text-white px-4 py-2 rounded-md">Disconnect Wallet</button>
	// }
	return (
		<div>
			{/* <div className="text-black truncate w-20 ">{data.address}</div>
            <div className="text-red-500" >{data.Balance}</div> */}
			{/* <div className="col-span-2 p-2">{data.walletButton}</div>
			{hover && (
				<div>
					<div className="text-black truncate w-20 ">
						{data.address}
					</div>
					<div className="text-red-500">{data.Balance}</div>
				</div>
			)} */}
			<div className="relative group p-2">
				{data.walletButton}

				<div className="absolute w-full invisible group-hover:visible bg-transparent p-4">
					<div>
						<div className="text-black truncate w-full">
							Address : {data.address}
						</div>
						<div className="text-red-500">
							{" "}
							Balance : {data.Balance}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConnectWalletButton;
