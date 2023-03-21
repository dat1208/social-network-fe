import React, { useState } from "react";
import './MediaGallery.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import RotatingGallery from "./RotatingGallery ";

interface GalleryProps {
  images: string[];
}




function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      />
    );
  }

const Gallery: React.FC<GalleryProps> = ({ images }) => {
 
  const [loading, setloading] = React.useState(true);


  React.useEffect(() =>{
    const t = setTimeout(() =>{
        setloading(false);
    }, 3000);
    return () => {
        clearTimeout(t);
    };
   },[]);


    var settings = {
        className: "slider variable-width",
        dots: true,
        centerMode: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        adaptiveHeight: true
        
      };

  return (

    
    <div style={{marginTop:30, marginBottom:20}}>

      {loading ? (<div>
        <RotatingGallery></RotatingGallery>
      </div>):(
      
      <Slider {...settings}>
              {images.map(imageurl =>(
                  <div>
                  <img id="img-cmpnt-W" src={imageurl} />
                  </div>
              ))}
            
      </Slider>
    
    )} 

      
    </div>
    
  );
};

export default Gallery;
