import { Alert } from 'flowbite-react'
import React from 'react'
import { HiEye, HiInformationCircle } from 'react-icons/hi';
import DeleteAlert from './DeleteAlert';
function Delete() {
    return (
        <div className='flex justify-center '>
            <Alert className='max-lg:w-2/3 lg:w-1/3 my-auto' additionalContent={<DeleteAlert />} color="warning" icon={HiInformationCircle}>
                <div className='mx-0 text-red-500 font-bold'> Delete Alert </div>
            </Alert>
        </div>
    )
}

export default Delete