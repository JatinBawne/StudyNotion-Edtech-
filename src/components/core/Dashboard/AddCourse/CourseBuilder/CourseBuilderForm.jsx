import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState:{errors} } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName){
      // we are editing the section name
      result = await updateSection(
        {
          sectionName : data.sectionName,
          sectionId : editSectionName,
          courseId : course._id,
        }, token
      )
    }

    else {
      result = await createSection({
        sectionName : data.sectionName,
        courseId : course._id,
      }, token)
    }

    //update values
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionName', "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course.courseContent.length === 0){
      toast.error("Please add at least one section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each subsection");
      return;
    }

    dispatch(setStep(3));
  }

  
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }


  return (

    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>

    // <div className='text-white'>
        
    //     <p>Course Builder</p>

    //     <form onSubmit={handleSubmit(onSubmit)}>

    //       <div>
    //         <label htmlFor='sectionName'> 
    //           Section name <sup>*</sup> 
    //         </label>
    //         <input
    //           id='sectionName'
    //           placeholder='Add section name'
    //           {...register("sectionName", {required:true})}
    //           className='w-full'
    //         />
    //         {errors.sectionName && (
    //           <span> Section Name is Required </span>
    //         )}

    //       </div>

    //       <div className='mt-10 flex w-full'>
    //         <IconBtn
    //         type = 'Submit'
    //         text = {editSectionName ? "Edit Section Name" : "Create Section"}
    //         outline = {true}
    //         customClasses={"text-white"}
    //         >
    //           <MdAddCircleOutline className='text-yellow-50' size={18}/>

    //         </IconBtn>
    //         {editSectionName && (
    //           <button
    //           type='button'
    //           onClick={cancelEdit}
    //           className='text-sm text-richblack-400 underline ml-5'>
    //             Cancel Edit
    //           </button>
    //         )}
    //       </div>
    //     </form> 


    //     {course?.courseContent?.length > 0 && (
    //       <NestedView  handleChangeEditSectionName={handleChangeEditSectionName}/>
    //     )}

    //     <div className='flex justify-end gap-x-3 mt-10'>
    //       <button
    //       onClick={goBack}
    //       className = "rounded-md cursor-pointer flex items-center">
    //         Back
    //       </button>

    //       <IconBtn text="Next" onclick={goToNext}>
    //         <MdNavigateNext/>
    //       </IconBtn>

    //     </div>


        

    // </div>

  )
}

export default CourseBuilderForm
