import axios from "axios"
import { useEffect, useState } from "react"

interface singleBlog {
    id: string
}

const useSingleBlog = ({ id }: singleBlog) => {
    const [singleBlog, setSingleBlog] = useState(null) // Initially, it's null
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) {
            setLoading(false)
            //@ts-expect-error
            setError("No ID provided")
            return
        }

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                setSingleBlog(response.data.blog) // Set the fetched blog
                setLoading(false) // Set loading to false after fetching
            })
            .catch(err => {
                console.error("Error fetching blog:", err)
                setError("Error fetching blog") // Set error if fetching fails
                setLoading(false)
            })
    }, [id]) // Dependency on id

    return {
        blog: singleBlog,
        loading,
        error
    }
}

export default useSingleBlog
