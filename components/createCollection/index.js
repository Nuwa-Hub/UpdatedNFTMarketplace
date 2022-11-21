import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { uploadFileToIPFS } from "common/pinata";
import { useDispatch, useSelector } from "react-redux";
import { addCollections } from "redux/actions/collectionAction";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "common/firebase";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CreateCollection = () => {
  const [loading, setloading] = useState(false);

  const [bannerImg, setBannerImg] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [bannImg, setBannImg] = useState("");
  const [proImg, setProImg] = useState("");

  const [msg, setMsg] = useState("");

  const [coltype, setcoltype] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  //get current user
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.userToken);

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

  const handleClick = async (e, { resetForm }) => {
    const bannerImgURL = "";
    const profileImgURL = "";

    // upload banner img
    if (bannerImg) {
      setloading(true);
      const imgRef1 = ref(storage, `BannerImg-${bannerImg.lastModifiedDate}`);
      uploadBytes(imgRef1, bannerImg)
        .then(() => {
          getDownloadURL(imgRef1)
            .then((url1) => {
              console.log(`uploded banner img successfully ${url1}`);

              if (profileImg) {
                const imgRef2 = ref(
                  storage,
                  `ProfileImg-${profileImg.lastModifiedDate}`
                );
                uploadBytes(imgRef2, profileImg)
                  .then(() => {
                    getDownloadURL(imgRef2)
                      .then((url2) => {
                        console.log(`uploded img successfully ${url2}`);

                        const newCollection = {
                          ...e,
                          bannerImg: url1,
                          profileImg: url2,
                          owner: currentUser.walletAdress,
                          type: coltype,
                        };
                        console.log(newCollection);
                        addCollections(dispatch, newCollection, token);
                        setloading(false);
                        notify("Collection Created Successfully!");
                        //alert("Collection Created");

                        setTimeout(() => {
                          router.push({
                            pathname: "/collection/user",
                          });
                        }, "3000");
                      })
                      .catch((err) => {
                        setloading(false);
                        notify("something went wrong!");
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    setloading(false);
                    notify("something went wrong!");
                    console.log(err.message);
                  });
              }
            })
            .catch((err) => {
              setloading(false);
              notify("something went wrong!");
              console.log(err);
            });
        })
        .catch((err) => {
          setloading(false);
          notify("something went wrong!");
          console.log(err.message);
        });
    }

    resetForm();
  };

  function previewBanFile(file) {
    // const preview = document.querySelector('img');
    // const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setBannImg(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function previewProFile(file) {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setProImg(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  //select options

  const options = [
    {
      value: "children",
      label: "Children",
    },
    {
      value: "artwork",
      label: "Art Work",
    },
    {
      value: "animals",
      label: "Animals",
    },
    {
      value: "vitual fashion",
      label: "Vitual Fashion",
    },
    {
      value: "gaming",
      label: "Gaming",
    },
  ];
  //validate
  const validate = Yup.object({
    collectionName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  return (
    <section className="bg-cream-lighter p-6 shadow">
      <Formik
        initialValues={{
          collectionName: "",
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
          <>
            <div className="md:flex p-4">
              <ToastContainer />
              <h2 className="justify-center uppercase text-4xl font-bold font-mono tracking-tight text-gray-900">
                Create New Collection
              </h2>
            </div>
            <Form>
              <div className="md:flex mb-8 mt-5 p-4">
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                  <div className="mb-4">
                    <label className="block uppercase text-xl font-bold font-mono p-2">
                      Collection Name
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="collectionName"
                      placeholder="Ex: CryptoPuppies"
                      onChange={handleChange}
                    />
                    <ErrorMessage name="collectionName" component="div" />
                  </div>

                  <div className="mb-4">
                    <label className="block uppercase text-xl font-bold font-mono p-2">
                      Select Type
                    </label>
                    <div className="w-2/5">
                      <Select
                        options={options}
                        placeholder="Select Collection Category"
                        className="createtaskuserselector"
                        onChange={(e) => {
                          setcoltype(e.value);
                        }}
                      />
                    </div>
                    <ErrorMessage name="description" component="div" />
                  </div>

                  <div className="mb-4">
                    <label className="block uppercase text-xl font-bold font-mono p-2">
                      Description
                    </label>
                    <textarea
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="description"
                      placeholder="Welcome to the home of Helions on OpenSea. Discover the best items in this collection."
                      onChange={handleChange}
                    />
                    <ErrorMessage name="description" component="div" />
                  </div>
                  <div className="mb-4">
                    <legend className="block uppercase text-xl font-bold font-mono p-2">
                      Cover Image
                    </legend>

                    <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cusor-pointer relative mt-4">
                      <label className="flex justify-center w-full max-w-xs h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        {bannImg && (
                          <img
                            id="banner"
                            alt="Image previewban"
                            src={bannImg}
                            className="w-full h-32 rounded-lg"
                          />
                        )}
                        {!bannImg && (
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
                              Drop files to Attach, or
                              <span className="text-blue-600 underline">
                                browse
                              </span>
                            </span>
                          </span>
                        )}

                        <input
                          type="file"
                          name="bannerImage"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            setBannerImg(e.target.files[0]);
                            previewBanFile(e.target.files[0]);
                          }}
                        />
                      </label>
                    </div>
                    <ErrorMessage name="bannerImage" component="div" />
                  </div>
                  <div className="mb-4">
                    <legend className="block uppercase text-xl font-bold font-mono p-2">
                      Collection Profile Image
                    </legend>

                    <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cusor-pointer relative mt-4">
                      <label className="flex justify-center w-full max-w-xs h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        {proImg && (
                          <img
                            id="banner"
                            alt="Image previewban"
                            src={proImg}
                            className="w-full h-32 rounded-lg"
                          />
                        )}
                        {!proImg && (
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
                              Drop files to Attach, or
                              <span className="text-blue-600 underline">
                                browse
                              </span>
                            </span>
                          </span>
                        )}
                        <input
                          type="file"
                          name="profileIamge"
                          className="hidden"
                          onChange={(e) => {
                            setProfileImg(e.target.files[0]);
                            previewProFile(e.target.files[0]);
                          }}
                        />
                      </label>
                    </div>
                    <ErrorMessage name="profileImage" component="div" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-block px-7 py-4 mt-5 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Submit
                  </button>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                   
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </section>
  );
};

export default CreateCollection;
