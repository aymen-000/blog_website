import React from 'react'
import { useParams } from 'react-router-dom'
import Delete from '../components/Delete'

function Home() {
  const {id} = useParams()
  return (
    <div>
      <Delete/>
    </div>
  )
}

export default Home