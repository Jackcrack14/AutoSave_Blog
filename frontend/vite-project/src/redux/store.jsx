import {configureStore} from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'

export const store = configureStore({
    reducer: {
        auth:authReducer,
        blog: blogReducer
    }
})

