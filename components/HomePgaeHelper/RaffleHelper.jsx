import Link from "next/link";

const features = [
  { name: "Origin", description: "Designed by Good Goods, Inc." },
  {
    name: "Material",
    description:
      "Solid walnut base with rare earth magnets and powder coated steel card cover",
  },
  { name: "Dimensions", description: '6.25" x 3.55" x 1.15"' },
  { name: "Finish", description: "Hand sanded and finished with natural oil" },
  { name: "Includes", description: "Wood card tray and 3 refill packs" },
  {
    name: "Considerations",
    description:
      "Made from natural materials. Grain and color vary with each item.",
  },
];

export default function RaffleHelper() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Now You can Join the Raffle
          </h2>
          <Link href="raffleNfts/">
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Go
            </button>
          </Link>{" "}
          <p className="mt-4 text-gray-500">
            The walnut wood card tray is precision milled to perfectly fit a
            stack of Focus cards. The powder coated steel divider separates
            active cards from new ones, or can be used to archive important task
            lists.
          </p>
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/1.jpeg?alt=media&token=168bcc19-4b51-4dd8-a985-6a8179b20ff3"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-Fri%20Nov%2011%202022%2013%3A18%3A49%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=738f8125-8de7-4153-b74f-5dd6e2a1fbc3"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/BannerImg-Wed%20Nov%2016%202022%2006%3A21%3A41%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=6c78f48a-7445-43aa-86a9-8d30f9526c36"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nft-marketplace-8fa87.appspot.com/o/nft-Mon%20Nov%2014%202022%2011%3A05%3A48%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=d98be0a3-d29e-420c-bfc8-64264eaefb3b"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
