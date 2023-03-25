import React, { useState } from "react";
import './MediaGallery.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
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
        nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
        prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
        
      };

  return (
    <Slider {...settings}>
        {images.map(imageurl =>(
            <div>
            <img style={{maxWidth:450, height:'auto'}} src={imageurl} />
            </div>
        ))}
      
    </Slider>
  );
};

export default Gallery;
