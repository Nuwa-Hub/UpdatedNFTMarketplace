import React, { useEffect, useState } from "react";

import { getAllCollections } from "redux/actions/collectionAction";
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
  const [coltype, setcoltype] = useState("");
  const [allcollections, setallcollection] = useState([]);
  const collections = useSelector((state) => state.collection.collections);

  useEffect(() => {
    getAllCollections(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (coltype != "") {
      console.log(collections);
      const filtercollections = collections?.filter((col) => {
        return col.type == coltype;
      });
      setallcollection(filtercollections);
    } else {
      setallcollection(collections);
    }
    //console.log(filtercollections)
  }, [coltype, collections]);
  return (
    <div className="overflow-hidden">
      <h1 className="m-5 font-mono tracking-tight text-bold dark:text-white text-left sm:text-4xl  md:text-4xl lg:text-6xl sm:scroll-auto w-fit">
        Explore Collections
      </h1>
      <div
        className="
       bg-black
        h-14 flex justify-around
         items-center 
         text-xl text-white overflow-x-auto  space-x-8 w-full sm:overflow-x-auto"
      >
        <button
          onClick={() => {
            setcoltype("children");
          }}
        >
          <div className="hover:animate-bounce">Children</div>
        </button>
        <button
          onClick={() => {
            setcoltype("artwork");
          }}
        >
          <div className="hover:animate-bounce">Artwork</div>
        </button>
        <button
          onClick={() => {
            setcoltype("animals");
          }}
        >
          <div className="hover:animate-bounce">Animals</div>
        </button>
        <button
          onClick={() => {
            setcoltype("vitual fashion");
          }}
        >
          <div className="hover:animate-bounce">Virtual Fashion</div>
        </button>
        <button
          onClick={() => {
            setcoltype("gaming");
          }}
        >
          <div className="hover:animate-bounce">Gaming</div>
        </button>
        <button
          onClick={() => {
            setcoltype("memes");
          }}
        >
          <div className="hover:animate-bounce">Memes</div>
        </button>
      </div>
      <div className="overflow-hidden text-gray-700">
        <div className="px-1 py-1 mx-auto lg:pt-12 lg:px-2">
          <div className="flex flex-wrap -m-1 md:-m-2 ">
            {allcollections?.map((collection) => (
              <div
                className="flex flex-wrap w-full  sm:w-full md:w-1/2 lg:w-1/3"
                key={collection._id}
              >
                <Collectioncard key={collection._id} collection={collection} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default explorecollection;
