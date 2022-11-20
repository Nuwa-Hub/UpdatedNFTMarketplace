import { RiAuctionFill } from "react-icons/ri";
import { useState } from "react";
import { publicRequest } from "utils/requestMethods";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const HighestBidModal = ({ closeBidNFT, auction }) => {
  const [bid, setBid] = useState(0);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const formik = useFormik({
    initialValues: {
      bid: 0,
    },
    onSubmit: (values) => {
      publicRequest
        .post("bid", {
          auctionId: auction._id,
          bidder: user.walletAdress,
          value: values.bid,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(values);
    },
    validationSchema: Yup.object({
      bid: Yup.number()
        .required("Starting price is required")
        .positive("Starting price must be positive")
        .moreThan(
          auction.startingPrice,
          "Bid must be greater than starting price"
        )
        .moreThan(
          auction.winningBid ? auction.winningBid.value : auction.startingPrice,
          "Bid must be greater than current bid"
        ),
    }),
  });
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form onSubmit={formik.handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <RiAuctionFill />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg font-medium leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Bid Now
                      </h3>

                      <div className="flex py-2">
                        Floor price : {auction.startingPrice} ETH
                      </div>
                      <div className="flex py-2">
                        Current highest bid :{" "}
                        {auction.winningBid == null
                          ? auction.startingPrice
                          : auction.winningBid.value}{" "}
                        ETH
                      </div>
                      <div className="mt-2">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="bid"
                          name="bid"
                          type="text"
                          placeholder="Place your bid"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.bid}
                        />
                        {formik.touched.bid && formik.errors.bid ? (
                          <div className="text-red-500">
                            {formik.errors.bid}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Bid Now
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeBidNFT(false);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {/* warning for 'please don't bid if you not have enough ETH to pay you will be get blocked */}

              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Warning!!! </strong>
                <span className="block sm:inline">
                  Please don't bid if you not have enough ETH to pay you will be
                  get blocked
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighestBidModal;
