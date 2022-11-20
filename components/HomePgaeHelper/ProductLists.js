import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { publicRequest } from 'utils/requestMethods';

const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-Thu%20Nov%2003%202022%2013%3A45%3A39%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=25480fb7-b1af-467c-8c17-4273c37d3e9e',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-Thu%20Nov%2003%202022%2013%3A45%3A39%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=25480fb7-b1af-467c-8c17-4273c37d3e9e',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-Thu%20Nov%2003%202022%2013%3A45%3A39%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=25480fb7-b1af-467c-8c17-4273c37d3e9e',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 4,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-Thu%20Nov%2003%202022%2013%3A45%3A39%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=25480fb7-b1af-467c-8c17-4273c37d3e9e',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },

    // More products...
  ]
const ProductLists = () => {

  const distpatch = useDispatch();
  const [nfts, setnfts] = React.useState([]);
 //console.log(nfts);
   useEffect(() => {
    
       publicRequest.get(`nft/mostvisited`).then((res) => {
         setnfts(res.data);
       });
     
    
   }, []);

  return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {nfts.map((product,index) => (
          <Link href={`/nft/${product._id}`}>
          <div key={index} className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                src={product.Img}
                alt="nft image"
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.NFTName}
                  </a>
                </h3>
              
              </div>
              <p className="text-sm font-medium text-gray-900">LEGENDARY</p>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                  Visits
                  </a>
                </h3>
               
              </div>
              <p className="text-sm font-medium text-gray-900">{product.visits}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                 Price
                  </a>
                </h3>
               
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price} ETH</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
  )
}

export default ProductLists