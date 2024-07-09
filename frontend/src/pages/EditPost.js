import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, Navigate } from 'react-router-dom'
const EditPost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://interview-voyage-backend.onrender.com/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                })
            })
    }, [])
    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        await fetch('https://interview-voyage-backend.onrender.com/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });

        setRedirect(true);
    }
    if (redirect)
        return <Navigate to={`/post/${id}`}></Navigate>
    return (
        <>
            <div className="createNewpost">
                Share your Interview experience and help others ace their preperation 👩🏻‍💻
            </div>
            <form onSubmit={updatePost}>
                <input type="text" placeholder={'Enter title for exmple: Interview Experience @ Company Name or Interview Experience for @ Position'}
                    value={title}
                    required={true}
                    onChange={ev => setTitle(ev.target.value)}
                />
                <input type="summary" placeholder={'Give a summary of your experience such as Positive / Negative Experience , CTC offered, On campus/ Off Campus, Selected/ Not Selected , Position appled for etc..'}
                    value={summary}
                    required={true}
                    onChange={ev => setSummary(ev.target.value)}
                />
                <input type="file"
                    // value={files}
                    onChange={ev => setFiles(ev.target.files)}
                />
                <ReactQuill className='quill'
                    value={content}
                    placeholder={'Upload image/logo of the company you interviewed in or any relevant image in the above space provided. Enter your Interview Experience in details here. Warning : DO NOT INCLUDE ANY CONFIDENTIAL DATA OR INVOLVE IN PIRACY.'}
                    onChange={newValue => setContent(newValue)}
                ></ReactQuill>
                <button style={{ marginTop: '10px', marginBottom: '170px' }}>Update</button>
            </form>
        </>
    )
}

export default EditPost