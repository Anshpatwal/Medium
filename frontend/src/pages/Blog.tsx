import Header from '@/components/Header'
import SingleSkeleton from '@/components/SingleSkeleton'
import useSingleBlog from '@/hooks/useSingleBlog'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const { id } = useParams()
  const { blog, loading, error } = useSingleBlog({ id })
  console.log(blog, loading, error)

  if (loading) {
    return <>
      <Header />
      <div className='flex items-center justify-center'>
        <div className='w-[800px]'>
          <SingleSkeleton />
        </div>
      </div>

    </> // Display loading message while fetching data
  }

  if (error) {
    return <p>Error: {error}</p> // Display error message if fetching fails
  }

  if (!blog) {
    return <p>Blog not found</p> // Display message if blog is not found
  }

  return (
    <>
      <Header />
      <div className='flex items-center justify-center'>
        <div className='w-[800px]'>
          <h2 className='text-4xl font-bold mb-[3rem] mt-8'>{blog.title}</h2>
          <p className='text-xl font-semibold text-slate-700'>{blog.description}</p>
        </div>
      </div>
    </>
  )
}

export default Blog
