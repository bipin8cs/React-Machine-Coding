import React, { useEffect, useState } from 'react'
const softwareDevImageUrls = [
  "https://img.freepik.com/free-vector/software-development-life-cycle-infographic_23-2148819604.jpg",
  "https://img.freepik.com/free-vector/agile-methodology-concept-illustration_114360-7343.jpg",
  "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg",
  "https://img.freepik.com/free-vector/software-development-process-flowchart_23-2148819605.jpg"
];
//you can use cdn for fetching these images as reduces the image size
// opimizing js css means you can write better recat code then minify js css file
// tailwind automatically minify the css file removes the unused css it only ships the css that is used in the project

//object-contain fixing the steching

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(()=>{
    const interval = setInterval(() => {
      setActiveIndex((a) => {
        if (a === softwareDevImageUrls.length - 1) {
          return 0
        } else {
          return a + 1
        }
      })
    }, 2000);
    return () => clearInterval(interval)
  },[activeIndex])//forces to render the page
  return (
    <div className='flex justify-center'>
      <button className='font-bold p-4 m-10' onClick={() => {
        if (activeIndex === 0) {
          setActiveIndex(softwareDevImageUrls.length - 1)
        } else {
          setActiveIndex((a) => a - 1)
        }

      }}>prev</button>
      {/* <img src={softwareDevImageUrls[activeIndex]} className="w-[700px] h-[500px] object-contain"></img> */}
      {
        softwareDevImageUrls.map((e, i) => {
          return <img src={e} key={i}  className={"w-[700px] h-[500px] object-contain" + (activeIndex === i ? " block" : " hidden")} />
        })
      }
      <button className='font-bold p-4 m-10' onClick={() => {
        //the component re-render the older tag image tag is remored and new img tag iscretaed new image new request happen
        //bcause of this happens <img src={softwareDevImageUrls[activeIndex]} className="w-[700px] h-[500px] object-contain"></img> 
        // slotion rendering all the images in that browser that it should not create new it should use existing one
        if (activeIndex === softwareDevImageUrls.length - 1) {
          setActiveIndex(0)
        } else {
          setActiveIndex((a) => a + 1)
        }
      }}>Next</button>
    </div>
  )
}

export default ImageSlider