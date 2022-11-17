import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import userSlice from 'redux/slices/userSlice'
import adminSlice from 'redux/slices/adminSlices'
import collectionSlice from 'redux/slices/collectionSlice'

import { useRouter, makePublicRouterInstance } from 'next/router'

export function renderWithProviders(
    ui,
    {
        preloadedState = {
            admin: {
                currentAdmin: null,
                adminToken: null,
                pending: false,
                error: null,
            },
            collection: {
                collections: [],
                collection: "",
                isFetching: false,
                error: false,
            },
            user: {
                currentUser: null,
                userToken: null,
            }
        },
        // Automatically create a store instance if no store was passed in
        store = configureStore({ reducer: { user: userSlice, admin: adminSlice, collection: collectionSlice }, preloadedState }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}