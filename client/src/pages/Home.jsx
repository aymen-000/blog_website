import React from 'react'
import { useParams } from 'react-router-dom'
import Delete from '../components/Delete'
import Commontaire from '../components/Commontaire'

function Home() {
  const {id} = useParams()
  return (
    <div className='flex justify-center'>
      <Commontaire/>
    </div>
  )
}

export default Home