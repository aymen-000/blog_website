import React from 'react'
import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
function PostCard({ postTitle, postImg, postId }) {
    return (
        <Card className="max-w-sm relative overflow-hidden hover:scale-105">
            <div className="relative">
                <img
                    src={postImg}
                    alt="post cover"
                    className="w-full"
                />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 hover:opacity-100 flex justify-center items-center transition-opacity">
                    <Link to={"/posts/"+postId}>
                        <button className="text-white py-1 px-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {postTitle}
            </h5>
        </Card>
    )
}

export default PostCard