import React, { useState } from 'react'

function Bookmark({image}) {
    const[bookMarks,setBookMarks] = useState(false)
  return (
    <div>
      <h3>Bookmarks</h3>

      <ul>
         {
            image.map((bookmark)=>(
                <li>
                    {bookmark.image}
                </li>
            ))
         }
      </ul>
    </div>
  )
}

export default Bookmark
