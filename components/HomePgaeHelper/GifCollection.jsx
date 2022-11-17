import React from 'react'

const callouts = [
    {
      name: 'Desk and Office',
      description: 'Work from home accessories',
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/1.gif?alt=media&token=2c264088-0291-4e3d-b79a-c9d97459f843',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Self-Improvement',
      description: 'Journals and note-taking',
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/2.gif?alt=media&token=744cf6ab-70e7-4102-bb2c-dfd9bc2431e1',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Travel',
      description: 'Daily commute essentials',
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/4.gif?alt=media&token=39c59a8d-6c87-4736-96f3-08b1e682a503',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
    {
        name: 'Desk and Office',
        description: 'Work from home accessories',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/5.gif?alt=media&token=7174ef44-5a6d-4518-b4f7-d39c09eceefb',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
      },
      {
        name: 'Self-Improvement',
        description: 'Journals and note-taking',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/6.gif?alt=media&token=ed15f738-7426-4af3-87d5-7ec5df1a3498',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
      },
      {
        name: 'Travel',
        description: 'Daily commute essentials',
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