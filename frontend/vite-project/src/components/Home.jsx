import React from 'react'
import PostList from './PostList'
export default function Home({posts}) {
  return (
    <div>
        <h1>MERN Autosave Blog</h1>
        <button onClick={() => window.location.href = '/add'}>Add Post</button>
        <PostList posts={posts} />
    </div>
  )
}
