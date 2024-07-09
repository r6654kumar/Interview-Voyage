import React from 'react'
import { Link } from 'react-router-dom'
const CategoryButton = ()=>{
    return (
      <div className="categoryMenu">
       <Link to="/all_experiences">
          <button type="button" className="categoryButton">All</button>
        </Link>
        <Link to="/amazon_experiences">
          <button type="button" className="categoryButton">Amazon</button>
        </Link>
        <Link to="/google_experiences">
          <button type="button" className="categoryButton">Google</button>
        </Link>
        <Link to="/microsoft_experiences">
          <button type="button" className="categoryButton">Microsoft</button>
        </Link>
        <Link to="/meta_experiences">
          <button type="button" className="categoryButton">Meta</button>
        </Link>
      </div>
        )
  }

export default CategoryButton