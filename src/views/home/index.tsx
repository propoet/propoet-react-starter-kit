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
    <div>
      <h2>帖子列表</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

