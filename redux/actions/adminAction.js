import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerAdmin = createAsyncThunk(
    'admin/register',
    async ({ username, email, password, account, address, telNumber, img }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            console.log(username, password, email, account, address, telNumber);


            await axios.post(
                '/api/admin/add',
                { username, email, password, account, address, telNumber, img },
                config
            )
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const getAdminDetails = createAsyncThunk(
    'admin/getAdminDetails',
    async (arg, { getState, rejectWithValue }) => {
        try {
            // get user data from store
            const { user } = getState()

            // configure authorization header with user's token
            const config = {
                headers: {
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const { data } = await axios.get(`/api/admin`, config)
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const adminLogin = createAsyncThunk(
    'admin/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                '/api/auth/adminlogin',
                { email, password },
                config
            )

            // store user's token in local storage
            sessionStorage.setItem('adminToken', data.adminToken)

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const getAdmins = createAsyncThunk(
    'admin/admins',
    async (arg, { getState, rejectWithValue }) => {
        try {
            // get user data from store
            const { user } = getState()

            // configure authorization header with user's token
            const config = {
                headers: {
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const { data } = await axios.get(`/api/admin`, config)
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const getAdminData = createAsyncThunk(
    'admin/adminData',
    async (arg, { getState, rejectWithValue }) => {
        try {
            // get user data from store
            const { user } = getState()

            // configure authorization header with user's token
            const config = {
                headers: {
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const nfts = await (await axios.get(`/api/admin/nft`, config)).data
            const collections = await (await axios.get(`/api/admin/collection`, config)).data
            return { nfts, collections }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)