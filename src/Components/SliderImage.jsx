import React, { useEffect, useState } from 'react'
import { BsArrowLeftCircleFill,BsArrowRightCircleFill } from 'react-icons/bs'
import './SliderImage.css'
 
const SliderImage = ({url, limit =5 , page=1}) => {
 
  const [images,setImages] = useState([])
  const [currentSlide,setCurrentSlide] = useState(0);
  const [errorMsg,setErrorMsg]= useState(null)
  const [loading,setLoading] = useState(false)

  async function fetchImage(getUrl){
    try{
       setLoading(true)

   const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
   const data = await response.json()

   if(data){
    setImages(data)
    setLoading(false)
   } 
    }
    catch(e){
      setErrorMsg(e.message)
    setLoading(false)
   
    }
  }

  function handleprev(){
  setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }

  function handlenext(){
 setCurrentSlide(currentSlide === images.length-1 ? 0 :currentSlide + 1)
  }

  useEffect(()=>{
   if(url !== '') fetchImage(url);
  },[url])

 

  if(loading){
    return <div>Loading data! please wait</div>
  }

  if(errorMsg !== null){
    return <div>Error occured ! {errorMsg}</div>
  }


  return (
    <div className='container'>
   <BsArrowLeftCircleFill onClick={handleprev} className="arrow arrow-left"/>
   {
    images && images.length ?
    images.map((imagesItem, index)=>(
      <img
      key={imagesItem.id}
      alt={imagesItem.download_url}
      src={imagesItem.download_url}
      className={currentSlide === index ?'current-image' : 'current-image hide-current-image'}
      />
    ))
    : null
   }
   <BsArrowRightCircleFill onClick={handlenext} className='arrow arrow-right'/>
   <span className='circle-indicator'>
   {
    images && images.length ? 
    images.map((_,index)=>
    <button
     key={index}
    className={currentSlide === index ? "current-indicator" : "current-indicator inactive-indicator"}
  onClick={()=>setCurrentSlide(index)}>

    </button>
    )
    : null
   }
   </span>
    </div>
  )
}

export default SliderImage