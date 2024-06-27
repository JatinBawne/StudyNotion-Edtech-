import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    // navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)

    const courseStatus = getValues("public")
    ? COURSE_STATUS.PUBLISHED
    : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)

    setLoading(true)
    const result = await editCourseDetails(formData, token)
    // console.log("Result---> ", result)
    // console.log("THIS IS RESULT=---->", result)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    console.log("This is data---->",  data)
    handleCoursePublish()
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}


// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import IconBtn from '../../../../common/IconBtn';
// import { COURSE_STATUS } from '../../../../../utils/constants';
// import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
// import { setStep } from '../../../../../slices/courseSlice';
// import { resetCourseState } from '../../../../../slices/courseSlice';

// export default function PublishCourse()  {

//     const { register, handleSubmit, setValue, getValues } = useForm()
//     const {course} = useSelector((state) => state.course)
//     const dispatch = useDispatch()
//     const {token} = useSelector((state) => state.auth)
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         if(course?.status === COURSE_STATUS.PUBLISHED){
//             setValue("public", true);
//         }
//     }, []);

//     const goBack = () => {
//         dispatch(setStep(2));
//     }

//     const goToCourses = () => {
//         dispatch(resetCourseState());
//         //navigate("./dashboard/my-courses");
//     }

//     const handleCoursePublish = async() => {
//         if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") == true || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
//             //no updation in form
//             //no need to make api call
//             goToCourses();
//             return;
//         }

//         //if form data updated
//         const formData = new FormData()
//         formData.append("courseId", course._id)
//         const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED  : COURSE_STATUS.DRAFT
//         formData.append("status", courseStatus)

//         setLoading(true);
//         const result = await editCourseDetails(formData, token);

//         if(result){
//             goToCourses()
//         }
//         setLoading(false)

//     }

//     const onSubmit = () => {
//         handleCoursePublish();
//     }


//   return (
//     <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-white'>
//         <p> Publish Course </p>



//         <form onSubmit={handleSubmit(onSubmit)}>

//             <div> 
//                 <label htmlFor='public'>
//                     <input
//                         type='checkbox'
//                         id='public'
//                         {...register("public")}
//                         className='rounded h-4 w-4'
//                     />
//                     <span className='ml-3'>
//                         Make this course as public
//                     </span>
//                 </label>
//             </div>


//             <div className='flex justify-end gap-x-3'>
//                 <button
//                     disabled={loading}
//                     type='button'
//                     onClick={goBack}
//                     className='flex items-center rounded-md bg-richblack-300 p-6'
//                 >
//                     Back
//                 </button>

//                 <IconBtn disabled={loading} text="save changes"/>
//             </div>


//         </form>
      
//     </div>
//   )
// }

