'use client'

import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import PostCard from '@/components/PostCard'
import { Post, Hashtag } from '@/types'

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'أحمد علي',
      email: 'ahmad@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      bio: 'مصور ومنتج محتوى',
      followers: 1500,
      following: 300,
      postsCount: 45,
      createdAt: new Date(),
    },
    content: 'منشور رائع جداً! #الاستكشاف #الفن',
    image: 'https://via.placeholder.com/500x300',
    likes: 234,
    comments: 45,
    shares: 12,
    createdAt: new Date(),
    liked: false,
  },
  {
    id: '2',
    author: {
      id: '2',
      username: 'فاطمة محمد',
      email: 'fatima@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      bio: 'مدونة وكاتبة',
      followers: 2000,
      following: 500,
      postsCount: 89,
      createdAt: new Date(),
    },
    content: 'يوم جميل مع الطبيعة 🌿 #الطبيعة #التصوير',
    likes: 567,
    comments: 123,
    shares: 89,
    createdAt: new Date(),
    liked: false,
  },
]

const mockHashtags: Hashtag[] = [
  { id: '1', name: 'التكنولوجيا', count: 15230, trending: true },
  { id: '2', name: 'الفن', count: 12450, trending: true },
  { id: '3', name: 'السفر', count: 8900, trending: true },
]

const ExplorePage = () => {
  const [posts, setPosts] = useState(mockPosts)

  const handleLike = (id: string) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    )
  }

  return (
    <div className="flex gap-4 pb-20 max-w-6xl mx-auto">
      {/* Posts Feed */}
      <div className="flex-1">
        <div className="sticky top-0 bg-dark/95 backdrop-blur p-4 border-b border-secondary z-50">
          <h1 className="text-2xl font-bold mb-3">الاستكشاف</h1>
          <input
            type="search"
            placeholder="ابحث عن منشورات أو هاشتاجات"
            className="w-full px-4 py-2 bg-dark-light border border-secondary rounded-full text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="p-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))}
        </div>
      </div>

      {/* Hashtags Sidebar */}
      <div className="w-80 hidden lg:block">
        <div className="bg-dark-light rounded-lg p-4 border border-secondary sticky top-20">
          <h2 className="text-xl font-bold mb-4">هاشتاجات رائجة</h2>
          <div className="space-y-3">
            {mockHashtags.map((tag) => (
              <button
                key={tag.id}
                className="w-full text-right p-3 hover:bg-dark rounded-lg transition-colors border border-transparent hover:border-secondary"
              >
                <p className="font-semibold text-sm">#{tag.name}</p>
                <p className="text-xs text-gray-500">{tag.count.toLocaleString()} منشور</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default ExplorePage
