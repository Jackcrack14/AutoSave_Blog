import { createSlice } from "@reduxjs/toolkit"


const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        posts: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        addPost: (state, action) => {
            // Check if action.payload is not empty before pushing
            if (action.payload.title && action.payload.content) {
              state.posts.push(action.payload);
            }
          },
          updatePost: (state, action) => {
            const updatedPost = action.payload;
            const updatedPosts = state.posts.map((post) =>
                post._id === updatedPost._id ? { ...post, ...updatedPost } : post
            );
            state.posts = updatedPosts;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload)
        }
    }
})
export default blogSlice.reducer
export const { setPosts, addPost, updatePost, deletePost } = blogSlice.actions