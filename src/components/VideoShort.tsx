'use client'

import { useRef, useState } from 'react'
import { Heart, MessageCircle, Share, Music } from 'lucide-react'
import { Video } from '@/types'

interface VideoShortProps {
  video: Video
  onLike: (id: string) => void
}

const VideoShort = ({ video, onLike }: VideoShortProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLiked, setIsLiked] = useState(video.liked)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike(video.id)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      <div className="absolute bottom-20 left-4 right-16 z-10">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={video.author.avatar}
            alt={video.author.username}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white font-semibold text-sm">{video.author.username}</p>
            <p className="text-gray-200 text-xs flex items-center gap-1">
              <Music size={12} /> أصلي
            </p>
          </div>
        </div>
        <p className="text-white text-sm leading-relaxed">{video.title}</p>
      </div>

      <div className="absolute bottom-20 right-4 flex flex-col gap-4 z-10">
        <button
          onClick={handleLike}
          className={`flex flex-col items-center gap-2 p-2 rounded-full transition-colors ${
            isLiked ? 'text-red-500' : 'text-white hover:text-red-500'
          }`}
        >
          <Heart size={28} fill={isLiked ? 'currentColor' : 'none'} />
          <span className="text-xs text-white">{video.likes}</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-2 rounded-full text-white hover:text-primary transition-colors">
          <MessageCircle size={28} />
          <span className="text-xs text-white">{video.comments}</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-2 rounded-full text-white hover:text-primary transition-colors">
          <Share size={28} />
          <span className="text-xs text-white">{video.shares}</span>
        </button>
      </div>
    </div>
  )
}

export default VideoShort
