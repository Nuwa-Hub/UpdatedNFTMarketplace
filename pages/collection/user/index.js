import React, { useEffect } from "react";

import { getAllCollections, getCollectionByUserId } from "redux/actions/collectionAction";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "utils/requestMethods";
import Collectioncard from "@/components/AllCollections/Collectioncard";
import { wrapper } from "redux/store";
import { getCollectionsSuccess } from "redux/slices/collectionSlice";

//  export async function getServerSideProps(context) {
//   const res = await publicRequest.get(`/collection`);

//   const collections = await res.data;
//   return {
//     props: {collections},
//   };
// }

// export const getServerSideProps = wrapper.getServerSideProps(

//   (store) => async () => {
//     const res = await publicRequest.get(`/collection`);
//    console.log(res.data)
//     store.dispatch(getCollectionsSuccess(res.data));
// })

const explorecollection = () => {
  //console.log(collections);
  //const collections=[]
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser?.walletAdress);
  const collections = useSelector((state) => state.collection.collections);
 
  useEffect(() => {
    if(currentUser){  
        console.log(currentUser)
        getCollectionByUserId(dispatch, currentUser);}
  }, [dispatch,currentUser]);


  return (
    <div className="overflow-hidden">
      <h1 className="m-5 font-mono tracking-tight text-bold dark:text-white text-left sm:text-4xl  md:text-4xl lg:text-6xl">
        Explore Collections
      </h1>
      <div className="overflow-hidden text-gray-700">
        <div className="px-1 py-1 mx-auto lg:pt-12 lg:px-2">
          <div className="flex flex-wrap -m-1 md:-m-2 ">
            {collections?.map((collection) => (
              <div
                className="flex flex-wrap w-full  sm:w-full md:w-1/2 lg:w-1/3"
                key={collection._id}
              >
                <Collectioncard key={collection._id} collection={collection} user="user" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default explorecollection;