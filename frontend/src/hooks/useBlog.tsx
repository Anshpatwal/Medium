import axios from "axios"
import { useEffect, useState } from "react"

const useBlog = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type":"application/json"
            }
        }).then(response => {
            setBlogs(response.data.blog)
            setLoading(false)
        })

    }, [])

    return {
        blogs,
        loading
    }
}

export default useBlog
