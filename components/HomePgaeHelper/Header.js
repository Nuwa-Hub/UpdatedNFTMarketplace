import Link from "next/link";

export default function Header() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the
              harsh NFTs of a world that doesn't care if you live or die.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/1.jpeg?alt=media&token=168bcc19-4b51-4dd8-a985-6a8179b20ff3"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/7.jpeg?alt=media&token=d5b69195-1f41-45c6-96dc-e87140299f46"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/6.jpeg?alt=media&token=84b8917f-5627-4df3-a02e-908412033912"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/4.jpg?alt=media&token=4a8932de-72eb-4674-b48b-1bcb98effc86"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/5.jpeg?alt=media&token=4d32f861-8b62-42fd-add1-7768430abab7"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/4.jpeg?alt=media&token=9a848288-562f-4434-aa3b-d080167d91aa"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/3.jpeg?alt=media&token=23578fd9-1af3-4a7c-b848-da158bb9abc8"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link href={`/collection`} smooth={true} duration={500}>
              <button
                href="#"
                className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
