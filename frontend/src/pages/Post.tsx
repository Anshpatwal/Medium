import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Post = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const handlePost = async () => {
        try {
            const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, {
                title,
                description
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            })
            if (!response) return
            navigate("/blog")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Header />
            <div className='flex items-center justify-center flex-col'>
                <div className='w-[65%]'>
                    <div className='mt-10'>
                        <h3 className='mb-3 text-3xl font-semibold'>Title:</h3>
                        <Input placeholder='Enter Title For Blog' type='text' className='h-[60px] text-2xl border' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='mt-5'>
                        <h3 className='mb-3 text-3xl font-semibold'>Description:</h3>
                        <textarea className='h-[300px] border w-[100%] p-5' placeholder='Write an Article' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <Button className='w-[100%] text-xl mt-5 py-7' onClick={() => handlePost()}>Publish</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post
