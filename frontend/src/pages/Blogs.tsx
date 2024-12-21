import BlogCard from '@/components/BlogCard'
import BlogSkeleton from '@/components/BlogSkeleton'
import Header from '@/components/Header'
import useBlog from '@/hooks/useBlog'


const Blogs = () => {
    const { blogs, loading } = useBlog()
    if (loading) {
        return <>
            <div className='flex justify-center flex-col mx-auto items-center'>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </>
    }
    return (
        <>
            <Header />
            <div className='flex justify-center flex-col mx-auto items-center'>
                {blogs.map((value) => {
                    return <div>
                        <BlogCard id={value.id} authorName={value.author.name} title={value.title} description={value.description} publishedDate='27/07/2004' />
                    </div>
                })}
            </div>
        </>
    )
}

export default Blogs
