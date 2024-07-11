import React, { useEffect, useState } from 'react'
import Post from '../Post'
import BounceLoader from "react-spinners/BounceLoader";
const MyExperience = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/userPosts', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const postsData = await response.json();
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="myExperiences">
        {
          loading ? <div className='loader'><BounceLoader color={'#ffffff'} loading={loading} /></div>
            : (<>{posts.length > 0 && posts.map(post => (
              <Post {...post} />
            ))}</>)
        }
      </div>
    </>
  )
}

export default MyExperience