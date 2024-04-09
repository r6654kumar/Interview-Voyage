import React, { useEffect, useState } from 'react'
import Post from '../Post'
const Homepage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      })
    })
  }, []);
  return (
    <>
      <div className='welcome'>
        Share your Interview Experience and help others ace their preperation 👩🏻‍💻
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>

      </div>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  )
}

export default Homepage