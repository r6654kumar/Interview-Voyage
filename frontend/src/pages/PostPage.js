import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../UserContext.js';
import { Link } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";
const PostPage = () => {
    const indianTimeZone = 'Asia/Kolkata';
    const options = { timeZone: indianTimeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [nextPost, setNextPost] = useState(null);
    const [previousPost, setPreviousPost] = useState(null);

    useEffect(() => {
        fetchPostAndNavigation(id);
    }, [id]);

    const fetchPostAndNavigation = (postId) => {
        setLoading(true);
        fetch(`http://localhost:4000/post/${postId}`)
            .then(response => response.json())
            .then(postInfo => {
                setPostInfo(postInfo);
                setLoading(false);
            });

        fetch(`http://localhost:4000/post/${postId}/next`)
            .then(response => response.json())
            .then(nextPost => setNextPost(nextPost));

        fetch(`http://localhost:4000/post/${postId}`)
            .then(response => response.json())
            .then(previousPost => setPreviousPost(postInfo));
    };

    const handleNavigation = (newPost) => {
        fetchPostAndNavigation(newPost._id);
    };
    // if (!postInfo) return '';
    return (
        <>
            {
                loading ? (<div className='loader'><BounceLoader color={'#ffffff'} loading={loading} /></div>)
                    :
                    (
                        <div className="insidepost">
                            <div className="navigation-buttons">
                                {previousPost && (
                                    <button className="pTab" onClick={() => handleNavigation(previousPost)}>Back to Previous</button>
                                )}
                                {nextPost && (
                                    <button className="nTab" onClick={() => handleNavigation(nextPost)}>Read New Experience</button>
                                )}
                            </div>
                            <h1>{postInfo.title}</h1>
                            <time className='postedattime'>{new Intl.DateTimeFormat('en-IN', options).format(new Date(postInfo.createdAt))}</time>
                            <div className="postedbyauthor">by {postInfo.author.userName}</div>
                            {userInfo.id === postInfo.author._id && (
                                <div className='edit-row'>
                                    <Link className='edit-btn' to={`/edit/${postInfo._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>

                                        Edit your post </Link>
                                </div>
                            )}
                            <div className="imageinsidepost">
                                <img src={`data:${postInfo.cover.contentType};base64,${postInfo.cover.data}`} alt="" />
                            </div>
                            <div className='insidepostcontent' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                        </div>
                    )
            }
        </>

    )
}

export default PostPage