import React, { useEffect, useState } from 'react'
import { Photo } from '../components/main/Photo';
import {
  GetPhotosAPI
} from "../services/APIRoutes";

export const Gallery = () => {

  const [photos, setPhotos] = useState({})
  const token = localStorage.getItem("userToken");

  useEffect(() => {

    async function fetchData() {

      const response = await fetch(GetPhotosAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const all_photos = await response.json();
      setPhotos(all_photos.photos)

    }

    fetchData();


  }, []);
  
  return (
    <>
      <div className='photos-container'>
        {
          Object.keys(photos).length===0 && <h1 className='no-photo'>No Photos Found...!!!</h1>
        }
        {
          Object.keys(photos).length!==0 && (
            photos.map((photo)=>
              <Photo key={photo._id} photo={photo} />
            )
          )
        }
      </div>
    </>
    
  )
}
