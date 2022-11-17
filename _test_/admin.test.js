
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils/test-utils'
import AdminsTable from '@/components/Cards/AdminsTable'
import UsersTable from '@/components/Cards/UsersTable'
import Login from 'pages/auth/login'


import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'

const server = setupServer(
    rest.get('/api/admin/admins', (req, res, ctx) => {
        return res(ctx.json({
            admins: [
                {
                    _id: "63309fab8b35b4f43c1355ff",
                    username: "test1",
                    password: "U2FsdGVkX18eseefOEqjEJYM6hC6inT+tYLCRSmHi+M=",
                    email: "test1@gmail.com",
                    account: "0x1ac816038ff7caf6479e21cea27195348f62d0c7",
                    address: "asd",
                    telNumber: "zxczx",
                    img: "",
                    createdAt: "2022-09-25T18:36:27.326Z",
                    updatedAt: "2022-09-25T18:36:27.326Z"
                }]
        }))
    }),
    rest.get('/api/admin/users', (req, res, ctx) => {
        return res(ctx.json({
            users: [
                {
                    _id: "632ff1281b4497fb14e8d986",
                    username: "Unnamed",
                    img: "",
                    walletAdress: "0x1ac816038ff7caf6479e21cea27195348f62d0c7",
                    favoriteList: [
                        ""
                    ],
                    access: true,
                    createdAt: "2022-09-25T06:11:52.084Z",
                    updatedAt: "2022-09-25T06:11:52.084Z",
                }]
        }))
    }),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('AdminTable', () => {
    it("renders AdminsTable", async () => {

        renderWithProviders(<AdminsTable color="light" />);
        expect(await screen.findByText(/0x1ac816038ff7caf6479e21cea27195348f62d0c7/i)).toBeInTheDocument();
    });
})

describe('Login Page', () => {
    it("renders Login Page", () => {
        renderWithProviders(<Login />);
        const button = screen.getByRole('button', { name: /Sign In/i });

        expect(button).toBeInTheDocument();
    });
})
describe('UsersTable', () => {
    it("renders UsersTable", async () => {

        renderWithProviders(<UsersTable color="light" />);
        expect(await screen.findByText(/0x1ac816038ff7caf6479e21cea27195348f62d0c7/i)).toBeInTheDocument();
    });
})
// describe('Admin Side bar', () => {
//   it("renders Side bar", () => {
//     renderWithProviders(<Sidebar />);
//     const button = screen.getByRole('h6', { name: /Admin Pages/i });

//     expect(button).toBeInTheDocument();
//   });
// })
