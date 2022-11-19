import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function index() {

    const [values, setValues] = useState({
        walletaddres: "",
        name: "",
        telno: "",
        email: "",
        message: "",
    });

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

    const sendEmail = () => {


        emailjs
            .send(
                "service_tauvlp1",
                "template_p5cjqco",
                values,
                "-7OFYjgL5ylBIjUBR"
            )
            .then(
                (result) => {
                    notify("Complaint added Successfully!");
                },
                (error) => {
                    notify("Something went wrong!");
                }
            );
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        sendEmail()
    };
    return (
        <>
            <div>
            <ToastContainer />
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                         <img src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-lawsuit-1-million.jpg?alt=media&token=b33c1d0d-7ae7-4128-a5be-483f33dd1d9b"
                            className="m-1 mt-16 rounded-t-2xl"
                         />
                        </div>
                        <div className="px-4 sm:px-0">
                         <img src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/complain.jpg?alt=media&token=eb1ead9d-51ad-4295-abd6-9e946d33ded3"
                            className="m-1 rounded-b-2xl"
                         />
                        </div>
                    </div>
                    
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleClick}>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Complaint Form</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information won't be displayed publicly.
                            </p>
                        </div>
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">

                                                <input
                                                    onChange={onChange}
                                                    type="text"
                                                    name="name"
                                                    id="company-website"
                                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Tedd Codd"
                                                    
                                                    title="only include letters"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Wallet Addrress
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">

                                                <input
                                                    onChange={onChange}
                                                    type="text"
                                                    name="walletaddres"
                                                    id="company-website"
                                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Tedd Codd"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">

                                                <input
                                                    onChange={onChange}
                                                    type="text"
                                                    name="telno"
                                                    id="company-website"
                                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="+94-234233244"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                E-mail
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">

                                                <input
                                                    onChange={onChange}
                                                    type="email"
                                                    name="email"
                                                    id="company-website"
                                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="www.example.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Complaint
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                onChange={onChange}
                                                id="about"
                                                name="message"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="you@example.com"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description
                                        </p>
                                    </div>




                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button

                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}