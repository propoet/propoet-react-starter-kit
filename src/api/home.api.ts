import http from '@/utils/http'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export const getPosts = (): Promise<Post[]> => {
  return http.get('/posts?_limit=5')
}
