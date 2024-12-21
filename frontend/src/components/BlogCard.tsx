import { Link } from "react-router-dom"

interface BlogCardProps {
    id:string,
    authorName: string,
    title: string,
    description: string,
    publishedDate: string
}

const BlogCard = ({
    id,
    authorName,
    title,
    description,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} >
            <div className="w-[600px] border-b-[2px] mt-6 pb-6">
                <div className="flex items-center">
                    <div className="me-3">
                        <SingleAvatar authorName={authorName} />
                    </div>
                    <span className="font-semibold me-2">   {authorName}</span> &#x2022; <span className="ms-2 text-slate-600"> {publishedDate}</span>
                </div>
                <div className="text-2xl font-bold my-3">
                    {title}
                </div>
                <div className="text-xl mb-3 font-semibold">
                    {description.slice(0, 120) + "..."}
                </div>
                <div className="text-slate-500">
                    {`${Math.ceil(description.length / 100)} minutes read`}
                </div>
            </div>
        </Link >
    )
}

export function SingleAvatar({ authorName }: { authorName: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
        </div>
    )

}

export default BlogCard 
