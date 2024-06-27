import React from 'react'

import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {FreeMode, pagination} from "swiper"

import Course_Card from './Course_Card'
import { Pagination } from 'swiper/modules'

const CourseSlider = ({Courses}) => {

  return (
    <>

        {
            Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={50}
                    pagination={true}
                    modules={[Pagination]}
                    className='mySwiper'
                >
                    {
                        Courses?.map((course, index) => {
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"h-[250px]"}/>
                            </SwiperSlide>
                        })
                    }

                </Swiper>
            ) : (
                <p> No Course Found </p>
            )
        }

    </>
  )
}

export default CourseSlider
