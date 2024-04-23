import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";



function OneComment({id ,  numLikes, Likes, comment, userId, postId , time}) {
    const [photoUrl, setPhotoUrl] = useState(null);
    const [fill, setFill] = useState(Likes.includes(userId));
    const [likes, setLikes] = useState(numLikes);
    const [userName , setUserName] = useState(null)
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/getUserById/${userId}`)
            .then((result) => {
                if (result.data !== 'not found') {
                    setPhotoUrl(result.data.photoURL);
                    setUserName(result.data.username)
                } else {
                    setPhotoUrl('https://firebasestorage.googleapis.com/v0/b/mern-7f320.appspot.com/o/profile.jpg?alt=media&token=f245bbbf-e69c-4669-bb4d-0642d4370f25');
                }
            });
    }, [userId]);

    const handleLikeClick = () => {
        setFill((prevFill) => !prevFill);
        setLikes((prevLikes) => (fill ? prevLikes - 1 : prevLikes + 1));
    };

    useEffect(() => {
        axios.post('http://localhost:3000/api/updateCommentsInfo', {id ,  num : likes, userId, postId , fill})
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log("err");
                console.log(err.message);
            });
        
    }, [postId, userId , likes, fill]); // Consider if you need to include postId here

    return (
        
            <div className="space-y-4">
                <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                        <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={photoUrl} alt="png" />
                    </div>
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                        <strong>{userName}</strong> <span className="text-xs text-gray-400">{time}</span>
                        <p className="text-sm">{comment}</p>
                        <div className="mt-4 flex items-center">
                            <div className="flex w-full justify-between items-center">
                                <div className="text-sm text-gray-500 font-semibold">
                                    {likes} likes
                                </div>
                                <div className="cursor-pointer" onClick={handleLikeClick}>
                                    {fill ? <AiFillLike className="text-2xl" /> : <AiOutlineLike className="text-2xl" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
}

export default OneComment;
