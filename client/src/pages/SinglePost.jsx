import React from 'react'
import { useParams } from 'react-router-dom'
function SinglePost() {
    const {id} = useParams() ;
  return (
    <div>
        {console.log('helooo')}
    </div>
  )
}

export default SinglePost