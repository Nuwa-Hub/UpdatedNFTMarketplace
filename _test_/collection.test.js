
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils/test-utils'
import explorecollection from 'pages/collection/index'
import Collectioncard from '@/components/Collectioncard'
import Login from 'pages/auth/login'


import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'

const server = setupServer(
    rest.get('/api/collection', (req, res, ctx) => {
        return res(ctx.json([
            {
                _id: "632fd7ca01d65f44478b5404",
                owner: "633119bfaaefd45d27c94869",
                collectionName: "test",
                bannerImg: "https://gateway.pinata.cloud/ipfs/QmNUki7mQSCedPQ8R5LK6bR8K4Lk4pXFCp9TbP7vZHoVHQ",
                profileImg: "https://gateway.pinata.cloud/ipfs/QmYYMMbzDqneWaLghbRPUzFhn4gSoF3oCghHPEdvwRwkSW",
                description: "test",
                nfts: [
                    ""
                ],
                access: true,
                createdAt: "2022-09-25T04:23:38.975Z",
                updatedAt: "2022-09-25T04:23:38.975Z",
            },]

        ))
    }),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


// describe('Collection explorer page', () => {
//     it("renders Collections", async () => {
//         const page = explorecollection()
//         renderWithProviders(<page />);
//         expect(await screen.findByText(/test/i)).toBeInTheDocument();
//     });
// })

// describe('Login Page', () => {
//     it("renders Login Page", () => {
//         renderWithProviders(<Login />);
//         const button = screen.getByRole('button', { name: /Sign In/i });

//         expect(button).toBeInTheDocument();
//     });
// })
describe('Collectioncard', () => {
    it("renders Collectioncard", async () => {
        const collection = {
            _id: "632fd7ca01d65f44478b5404",
            owner: "633119bfaaefd45d27c94869",
            collectionName: "test",
            bannerImg: "https://gateway.pinata.cloud/ipfs/QmNUki7mQSCedPQ8R5LK6bR8K4Lk4pXFCp9TbP7vZHoVHQ",
            profileImg: "https://gateway.pinata.cloud/ipfs/QmYYMMbzDqneWaLghbRPUzFhn4gSoF3oCghHPEdvwRwkSW",
            description: "test",
            nfts: [
                ""
            ],
            access: true,
            createdAt: "2022-09-25T04:23:38.975Z",
            updatedAt: "2022-09-25T04:23:38.975Z",
        }
        renderWithProviders(<Collectioncard collection={collection} />);
        expect(await screen.findByText(/test/i)).toBeInTheDocument();
    });
})
// describe('Admin Side bar', () => {
//   it("renders Side bar", () => {
//     renderWithProviders(<Sidebar />);
//     const button = screen.getByRole('h6', { name: /Admin Pages/i });

//     expect(button).toBeInTheDocument();
//   });
// })
