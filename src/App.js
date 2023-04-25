import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Bookmark from './Components/Bookmark';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  const searchimagesData = useRef(null);
   const [searchText,setSearchText] = useState('');
   const [imageData,setImageData] = useState([]); 
   

   useEffect(()=>{
       
      const params = {
         method:'flickr.photos.search',
         api_key: '9a0c4daa90a75d7767f8d2adfe536559',
         text:searchText,
         sort:"",
         per_page : 40,
         license: '4',
         extras :'owner_name , license',
         format: 'json',
         nojsoncallback :1
      }

      const parameters = new URLSearchParams(params);

      const url = `https://api.flickr.com/services/rest/?${parameters}`;

      axios.get(url).then((resp)=>{
        console.log(resp);
        const arr = resp.data.photos.photo.map((imageData)=>{
            return fetchFlickerImageUrl(imageData,`q`);
        });
        setImageData(arr);
      }).catch((err)=>{
           console.log(err,'err');
      })
   },[searchText]);

   const fetchFlickerImageUrl = (photo,size)=>{
        let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;

        if(size){
           url += `_${size}`;
        }

        url+= `.jpg`;
        return url;
   }

  return (
    <>
    {/* <BrowserRouter>
         <Routes>
             <Route  element={<Bookmark/>}/>
         </Routes>
    </BrowserRouter> */}
        <div className='Header'>
          <h1>React Photo Search App</h1>
          <div className='Container'>
            <input type='text' placeholder='Search free high revolution Images'
              id='search-box' onChange={((e)=>{searchimagesData.current=e.target.value})}/>

            <button id='button' onClickCapture={()=>setSearchText(searchimagesData.current)} className='search-button'>Search</button>
            <div className='bookMark'>
               <button className='bookMarks' type='submit'>Bookmark</button>
            </div>
          </div>

          <div className='images-container'>
               {
                imageData.map((imageUrl)=>{
                   return(
                      <div  key={imageUrl}>
                          <img src={imageUrl} className='images' alt='images' onClick={<Bookmark image={imageUrl}/>}/>
                      </div>
                   )
                })
               }
          </div>
        </div>
    </>
  )
}

export default App

