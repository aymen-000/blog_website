import React from 'react'
import { useParams } from 'react-router-dom'

function Home() {
  const {id} = useParams()
  return (
    <div>userId : {id}</div>
  )
}

export default Home