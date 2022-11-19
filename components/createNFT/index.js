import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { uploadFileToIPFS } from "common/pinata";
import { useDispatch, useSelector } from "react-redux";
import { addNFTs } from "redux/actions/NFTAction";
import Select from "react-select";
import { getAllCollections } from "redux/actions/collectionAction";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "common/firebase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
//select options

const CreateNFT = () => {
	const [NFTImg, setNFTImg] = useState("");
	const [NFTImgUrl, setNFTImgUrl] = useState("");
	const [preImg, setPreImg] = useState("");
	const [fileURL, setFileURL] = useState(null);
	const [collection_id, setColletionId] = useState("");
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.user.currentUser);
	const collections = useSelector((state) => state.collection.collections);

	const router = useRouter();

	useEffect(() => {
		getAllCollections(dispatch);
	}, [dispatch]);

	//this is for notify messages
	function notify(msg) {
		toast(msg, {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}

	const options = collections.map((collection) => ({
		value: collection._id,
		label: collection.collectionName,
	}));

	//This function uploads the NFT image to IPFS
	async function uploadFileToFireStore(e) {
		const imgRef = ref(storage, `nft-${NFTImg.lastModifiedDate}`);
		uploadBytes(imgRef, NFTImg)
			.then(() => {
				getDownloadURL(imgRef)
					.then((url) => {
						console.log(`uploded img successfully ${url}`);
						setNFTImgUrl(url);
						const newNFT = {
							...e,
							Img: url,
							owner: currentUser.walletAdress,
							collectionId: collection_id.value,
							pinataurl: fileURL,
						};
						console.log(newNFT);
						//call add nft fuction
						addNFTs(dispatch, newNFT);
						notify("Create NFT successfully!");
						
                        setTimeout(() => {
							router.push({
							  pathname: "/nft/user",
							});
						  }, "3000");
					
						// alert("Create NFT successfully!");
					})
					.catch((err) => {
						// console.log(err);
						notify("something went wrong!");
					});
			})
			.catch((err) => {
				//console.log(err.message);
				notify("something went wrong!");
			});
	}

	//This function uploads the NFT image to IPFS
	async function uploadNftToPinata(file) {
		//check for file extension
		try {
			//upload the file to IPFS
			const response = await uploadFileToIPFS(file);
			if (response.success === true) {
				console.log("Uploaded image to Pinata: ", response.pinataURL);
				setFileURL(response.pinataURL);
			}
		} catch (e) {
			//console.log("Error during file upload", e);
			notify("something went wrong!");
		}
	}

	const handleClick = async (e, { resetForm }) => {
		const p = await uploadFileToFireStore(e);

		resetForm();
	};

	function previewImgFile(file) {
		const reader = new FileReader();

		reader.addEventListener(
			"load",
			() => {
				// convert image file to base64 string
				setPreImg(reader.result);
			},
			false
		);
		if (file) {
			reader.readAsDataURL(file);
		}
	}

	//validate
	const validate = Yup.object({
		NFTName: Yup.string().required("Required"),
		description: Yup.string().required("Required"),
	});

	return (
		<section className="bg-cream-lighter p-6 shadow flex">
			<ToastContainer />
			<Formik
				initialValues={{
					NFTName: "",
					description: "",
				}}
				validationSchema={validate}
				onSubmit={handleClick}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<div className="flex flex-col w-full">
						<div className="md:flex p-4">
							<h2 className="justify-center uppercase text-4xl font-bold font-mono tracking-tight text-gray-900">
								Create New NFT
							</h2>
						</div>
						<Form>
							<div className="md:flex mb-8 mt-5 p-4">
								<div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
									<div className="mb-4">
										<label className="block uppercase text-xl font-bold font-mono p-2">
											NFT Name
										</label>
										<input
											className="w-full shadow-inner p-4 border-0"
											type="text"
											name="NFTName"
											placeholder="Ex: CryptoPuppies"
											onChange={handleChange}
											required
										/>
										<ErrorMessage
											name="collectionName"
											component="div"
										/>
									</div>

									<div className="mb-4">
										<label className="block uppercase text-xl font-bold font-mono p-2">
											Description
										</label>
										<textarea
											className="w-full shadow-inner p-4 border-0"
											type="text"
											name="description"
											placeholder="Ex: Welcome to the home of Helions on OpenSea. Discover the best items in this collection."
											onChange={handleChange}
											required
										/>
										<ErrorMessage
											name="description"
											component="div"
										/>
									</div>
									<div className="mb-4">
										<div className="w-2/5">
											<Select
												options={options}
												placeholder="Select Collection..."
												className="createtaskuserselector"
												onChange={setColletionId}
											/>
										</div>
									</div>
									<div className="mb-4">
										<legend className="block uppercase text-xl font-bold font-mono p-2">
											Image
										</legend>

										<div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cusor-pointer relative mt-4">
											<label className="flex justify-center w-full max-w-xs h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
												{preImg && (
													<img
														id="banner"
														alt="Image previewban"
														src={preImg}
														className="w-full h-32 rounded-lg"
													/>
												)}
												{!preImg && (
													<span className="flex items-center space-x-2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="w-6 h-6 text-gray-600"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
															strokeWidth="2"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
															/>
														</svg>
														<span className="font-medium text-gray-600">
															Drop files to
															Attach, or
															<span className="text-blue-600 underline">
																browse
															</span>
														</span>
													</span>
												)}
												<input
													type="file"
													name="NFTImg"
													className="hidden"
													onChange={(e) => {
														setNFTImg(
															e.target.files[0]
														);
														previewImgFile(
															e.target.files[0]
														);
														uploadNftToPinata(
															e.target.files[0]
														);
													}}
													required
												/>
											</label>
										</div>
										<ErrorMessage
											name="NFTImg"
											component="div"
										/>
									</div>

									<button
										type="submit"
										disabled={isSubmitting}
										className="inline-block px-7 py-4 mt-5 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
									>
										Submit
									</button>
								</div>
							</div>
						</Form>
					</div>
				)}
			</Formik>
		</section>
	);
};

export default CreateNFT;
