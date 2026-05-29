export interface User {
  id: string
  username: string
  email: string
  avatar: string
  bio: string
  followers: number
  following: number
  postsCount: number
  createdAt: Date
}

export interface Post {
  id: string
  author: User
  content: string
  image?: string
  video?: string
  likes: number
  comments: number
  shares: number
  createdAt: Date
  liked?: boolean
}

export interface Video {
  id: string
  author: User
  url: string
  thumbnail: string
  title: string
  duration: number
  likes: number
  comments: number
  shares: number
  createdAt: Date
  liked?: boolean
}

export interface Message {
  id: string
  sender: User
  content: string
  image?: string
  createdAt: Date
  read: boolean
}

export interface Conversation {
  id: string
  participants: User[]
  lastMessage: Message
  unreadCount: number
  isGroup: boolean
  name?: string
}

export interface Group {
  id: string
  name: string
  description: string
  avatar: string
  isPrivate: boolean
  members: User[]
  admin: User
  createdAt: Date
}

export interface AIGenerationRequest {
  type: 'image' | 'video'
  prompt: string
  style?: string
}

export interface Hashtag {
  id: string
  name: string
  count: number
  trending: boolean
}
