import React from 'react'
import { SingleAvatar } from './BlogCard'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-between py-3 px-8 border-b-[2px] '>
            <div className='text-3xl font-bold '>
                <Link to="/"> Medium</Link>
            </div >
            <div>
                <Button className='me-8' onClick={() => {
                    navigate("/post")
                }}>Add Post</Button>
                <SingleAvatar authorName='Ansh' />
            </div>
        </div >
    )
}

export default Header
