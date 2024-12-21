import React from 'react'

const BlogSkeleton = () => {
    return (
        <div className='w-[600px] border-b-[2px] mt-6 pb-6'>
            <div role="status" className="max-w-sm animate-pulse ">
                <svg className="w-12 h-12 text-gray-200 dark:text-gray-700 me-4 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-50 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[350px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[400px]"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[450px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[500px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[550px]"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default BlogSkeleton
