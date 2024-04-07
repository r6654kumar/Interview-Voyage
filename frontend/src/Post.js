import React from 'react'
const Post = ({title,summary,cover,content,createdAt,author}) => {
    const date = new Date(createdAt);
    const indianTimeZone = 'Asia/Kolkata';
    const options = { timeZone: indianTimeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return (
        
        <div className="post">
            <div className="image">
                <img src={'http://localhost:4000/'+cover} alt="image" className="image" />

            </div>
            <div className="content">
                <h2>{title}</h2>
                <p className="info">
                    <a className='author'>{author.userName}</a>
                    <time>{ new Intl.DateTimeFormat('en-IN', options).format(date)}</time>

                </p>
                <p className='summary'>{summary}</p>

            </div>
        </div>
    )
}

export default Post