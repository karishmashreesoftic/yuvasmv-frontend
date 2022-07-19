import React, { useState, useEffect } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { DeletePhotoAPI } from '../../services/APIRoutes';
import Popup from '../../screens/Popup';
import Loading from '../Loading';

export const Photo = ({photo}) => {

    const [show, setShow] = useState("none")
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("userToken");

    useEffect(() => {

    }, [loading]);

    const showDelete = () => {
        setShow("block")
    }
    const hideDelete = () => {
        setShow("none")
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const deletePhoto = async () => {

        setLoading(true)
        const response = await fetch(`${DeletePhotoAPI}/${photo._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });

        if(response.status===200){
            setLoading(false)
            window.location.reload()
        }
    }

  return (
    <>
        {loading && <Loading />}
        <div className='imagecontainer' onMouseOver={showDelete} onMouseOut={hideDelete}>
            <div className='delete-photo' style={{display:show}}><AiFillDelete onClick={togglePopup}/></div>
            {isOpen &&
            <Popup
                content={
                <div style={{textAlign: "center"}}>
                    <div>Are you sure about deleting this image ?</div>
                    <div className='delete-popup-image'><img src={photo.purl} alt="event"/></div>
                    <div>
                    <button onClick={togglePopup} className="btn btn-style popup-cancel">Cancel</button>
                    <button onClick={deletePhoto} className="btn btn-style popup-delete">Delete</button>
                    </div>
                </div>
                }
                handleClose={togglePopup}
            />
            }
            <img src={photo.purl} alt="event"/>
        </div>
    </>
  )
}
