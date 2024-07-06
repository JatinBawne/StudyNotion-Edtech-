import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
      };
  return (
    <>
      {Courses?.length ? (
            <Slider {...settings}>
          {Courses?.map((course, i) => (
              <Course_Card course={course} Height={"h-[250px]"} />
          ))}
            </Slider>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
