import React from 'react'
import {Link, useParams} from 'react-router-dom'

const Floor = () => {
  return (
    <>
        <div>
            <h2>Floor</h2>
            <Link to="/floor-6">
                <button>Floor 6th</button>
            </Link>
            <p>This is floor 6th.</p>
        </div>
    </>
  )
}

export default Floor