import {useEffect,useState} from 'react'
import {getPosts} from '@/api/home.api'
import type {Post} from '@/api/home.api'


export default function Home() {
  const [posts,setPosts] = useState<Post[]>([])
  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await getPosts()
      setPosts(res)
    }
    fetchPosts()
  },[])
  return(
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">帖子列表</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">
              {post.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

