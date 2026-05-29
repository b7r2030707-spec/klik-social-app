'use client'

import { useEffect, useState } from 'react'
import BottomNav from '@/components/BottomNav'
import VideoShort from '@/components/VideoShort'
import { Video } from '@/types'

const mockVideos: Video[] = [
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
    url: 'https://videos.pexels.com/video-files/3574524/3574524-sd_640_360_25fps.mp4',
    thumbnail: 'https://via.placeholder.com/400x600',
    title: 'فيديو قصير مميز',
    duration: 15,
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
    url: 'https://videos.pexels.com/video-files/3574525/3574525-sd_640_360_25fps.mp4',
    thumbnail: 'https://via.placeholder.com/400x600',
    title: 'فيديو رائع آخر',
    duration: 20,
    likes: 567,
    comments: 123,
    shares: 89,
    createdAt: new Date(),
    liked: false,
  },
]

const HomePage = () => {
  const [videos, setVideos] = useState(mockVideos)

  const handleLike = (id: string) => {
    setVideos(
      videos.map((v) => (v.id === id ? { ...v, liked: !v.liked } : v))
    )
  }

  return (
    <div className="pb-16">
      {videos.map((video) => (
        <div key={video.id}>
          <VideoShort video={video} onLike={handleLike} />
        </div>
      ))}
      <BottomNav />
    </div>
  )
}

export default HomePage
