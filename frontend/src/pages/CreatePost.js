import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom'
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        const response = await fetch('https://interview-voyage-dkbv.onrender.com/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        })
        if (response.ok) {
            alert("Posted Successfully");
            setRedirect(true);
        }
        else {
            alert("Failed! Please try again later");
        }
    }
    if (redirect)
        return <Navigate to={'/'}></Navigate>
    return (
        <>
            <div className="createNewpost">
                Share your Interview experience and help others ace their preperation 👩🏻‍💻
            </div>
            <form onSubmit={createNewPost}>
                <input type="text" placeholder={'Enter title for exmple: Interview Experience @ Company Name or Interview Experience for @ Position'}
                    value={title}
                    required={true}
                    onChange={ev => setTitle(ev.target.value)}
                />
                <input type="summary" placeholder={'Give a summary of your experience such as Positive / Negative Experience , CTC offered, On campus/ Off Campus, Selected/ Not Selected , Position appled for etc..'}
                    value={summary} s
                    required={true}
                    onChange={ev => setSummary(ev.target.value)}
                />
                <input type="file"
                    // value={files}
                    required={true}
                    onChange={ev => setFiles(ev.target.files)}
                />
                <ReactQuill className='quill'
                    placeholder={'Upload image/logo of the company you interviewed in or any relevant image in the above space provided. Enter your Interview Experience in details here. Warning : DO NOT INCLUDE ANY CONFIDENTIAL DATA OR INVOLVE IN PIRACY.'}
                    value={content}
                    onChange={newValue => setContent(newValue)}
                ></ReactQuill>
                <button style={{ marginTop: '10px', marginBottom: '170px' }}>Share Experience</button>
            </form>
        </>
    )
}

export default CreatePost