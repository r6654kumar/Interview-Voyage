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
        fetch(`http://localhost:4000/post/${id}`)
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
        await fetch('http://localhost:4000/post', {
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
                <input type="text" placeholder={'Title'}
                    value={title}
                    required={true}
                    onChange={ev => setTitle(ev.target.value)}
                />
                <input type="summary" placeholder={'Summary'}
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
                    onChange={newValue => setContent(newValue)}
                ></ReactQuill>
                <button style={{ marginTop: '10px', marginBottom: '170px' }}>Update</button>
            </form>
        </>
    )
}

export default EditPost