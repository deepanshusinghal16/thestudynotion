import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const RequirementsField = ({ label, name, placeholder, register, errors, setValue, getValues }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    const addRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("")
        }
    }
    const removeRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    useEffect(() => {
        register(name, { required: true, validate: (value) => value.length > 0 })
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])

    return (



        <div className='px-1 space-y-1 '>
            <label htmlFor={name} > {label} <sup className='text-pink-500'>*</sup></label>
            <input
                type="text"
                id={name}
                setValue={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder='Enter Course Requirements or Instructions'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800  py-2 px-2 text-richblack-5"
            />
            {
                errors[name] && (
                    <span className='text-xs '>{label} is  Required</span>
                )
            }
            <button type='button' onClick={addRequirement} className='text-yellow-25 font-lg px-4 '> Add</button>

            {
                requirementList.length > 0 && (
                    <ul className=' self-start'>
                        {
                            requirementList.map((req, index) => (
                                <li key={index} className='my-1 flex items-center gap-2 text-richblack-50'>
                                    <span className='sm'>{req}</span>
                                    <button type='button' onClick={() => removeRequirement(index)}
                                        className='text-xs text-richblack-300'>
                                        Clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }



        </div>

    )
}

export default RequirementsField
