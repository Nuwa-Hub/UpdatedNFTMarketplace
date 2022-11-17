import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// components

export default function CardAdminProfile() {
  const router = useRouter()
  const dispatch = useDispatch();
  const { currentAdmin } = useSelector((state) => state.admin);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('adminToken')) {
      router.push('/auth/login')
    }
    setLoading(true)

    fetch(`/api/admin/${currentAdmin._id}`, {})
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data)
      });
  }, []);

  const handleClick = async (e, { resetForm }) => {

    resetForm()
    const JSONdata = JSON.stringify(e)
    const endpoint = `/api/admin/${currentAdmin._id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    if (result.errors) {
      setFormError(result)
    } else {
      console.log(result);
      // router.push('/admin/admins')
    }
  };
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  return (
    <>
      <Formik
        initialValues={{
          username: data.username,
          password: "",
          email: data.email,
          account: data.account,
          address: data.address,
          telNumber: data.telNumber,
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          account: Yup.string().required("Required"),
          telNumber: Yup.string().required("Required"),
          address: Yup.string().required("Required"),
        })}
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
        }) => (
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-slate-700 text-xl font-bold">Account Details</h6>

              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <Form >
                <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-username"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={values.username}
                        onChange={handleChange}
                        name="username"
                      />
                      <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-email"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={values.email}
                        onChange={handleChange}
                        name="email"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-account"
                      >
                        Wallet address
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={values.account}
                        onChange={handleChange}
                        name="account"
                      />
                      <ErrorMessage name="account" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue=""
                        onChange={handleChange}
                        name="password"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-slate-300" />

                <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>

                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-address"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={values.address}
                        onChange={handleChange}
                        name="address"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-tel"
                      >
                        Telephone Number
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={values.telNumber}
                        onChange={handleChange}
                        name="telNumber"
                      />
                      <ErrorMessage name="telNumber" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                </div>


                <hr className="mt-6 border-b-1 border-slate-300" />
                <button
                  className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>

    </>
  );
}
