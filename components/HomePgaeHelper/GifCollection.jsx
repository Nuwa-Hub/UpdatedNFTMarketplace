import React from 'react'

const callouts = [
    {
      name: 'Bored Api Gifs',
      description: 'Gif collection of Bored Api',
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/1.gif?alt=media&token=2c264088-0291-4e3d-b79a-c9d97459f843',
      imageAlt: 'Gif collection of Bored Api',
      href: '#',
    },
    {
      name: 'Self-Improvement',
      description: 'Specialty items to organize your NFTs',
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/2.gif?alt=media&token=744cf6ab-70e7-4102-bb2c-dfd9bc2431e1',
      imageAlt: 'Specialty items to organize your NFTs',
      href: '#',
    },
    {
      name: 'Animations Gifs',
      description: 'Specialty items to organize your NFTs',
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/4.gif?alt=media&token=39c59a8d-6c87-4736-96f3-08b1e682a503',
      imageAlt: 'Specialty items to organize your NFTs',
      href: '#',
    },
    {
        name: 'Desk and Office',
        description: 'Specialty items to organize your NFTs Modern NFTs assets',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/5.gif?alt=media&token=7174ef44-5a6d-4518-b4f7-d39c09eceefb',
        imageAlt: 'Specialty items to organize your NFTs Modern NFTs assets',
        href: '#',
      },
      {
        name: 'Self-Improvement',
        description: 'Specialty items to organize your NFTs Modern NFTs assets',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/6.gif?alt=media&token=ed15f738-7426-4af3-87d5-7ec5df1a3498',
        imageAlt: 'Specialty items to organize your NFTs Modern NFTs assets',
        href: '#',
      },
      {
        name: 'Travel',
        description: 'Collection of four insulated travel bottles on wooden shelf.',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/7.gif?alt=media&token=f8e29866-cec5-44bf-8ead-b70672eb5c09',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
      },
  ]
  
const GifCollection = () => {
  return (
    <div className="bg-gray-100">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <h2 className="text-2xl font-bold text-gray-900">Gif Collections</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {callouts.map((callout) => (
            <div key={callout.name} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img
                  src={callout.imageSrc}
                  alt={callout.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href={callout.href}>
                  <span className="absolute inset-0" />
                  {callout.name}
                </a>
              </h3>
              <p className="text-base font-semibold text-gray-900">{callout.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  )
}

export default GifCollection