import React from 'react'

const Post = () => {
    return (
        <div className="post">
            <div className="image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Logo-pwc.png" alt="image" className="image" />

            </div>
            <div className="content">
                <h2>My Interview Experience @PWC India</h2>
                <p className="info">
                    <a className='author'>Rahul Kumar Saw</a>
                    <time> 06-04-2024 01:22</time>

                </p>
                <p className='summary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam totam ipsam fugiat deleniti tempore veniam ratione voluptatem cum nesciunt nemo minima doloremque, ex inventore, odio obcaecati? Inventore molestiae vel ad error officiis.</p>

            </div>
        </div>
    )
}

export default Post