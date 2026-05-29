import { create } from 'zustand'
import { Post } from '@/types'

interface PostsState {
  posts: Post[]
  isLoading: boolean
  fetchPosts: () => Promise<void>
  likePost: (postId: string) => void
  addPost: (post: Post) => void
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  isLoading: false,
  fetchPosts: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      set({ posts: data, isLoading: false })
    } catch (error) {
      console.error('خطأ في جلب المنشورات:', error)
      set({ isLoading: false })
    }
  },
  likePost: (postId: string) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1, liked: !post.liked } : post
      ),
    }))
  },
  addPost: (post: Post) => {
    set((state) => ({
      posts: [post, ...state.posts],
    }))
  },
}))
