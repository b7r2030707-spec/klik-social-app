'use client'

import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import { Send, Plus, Search, X } from 'lucide-react'
import { Conversation, Message } from '@/types'

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: '2',
        username: 'فاطمة محمد',
        email: 'fatima@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
        bio: 'مدونة',
        followers: 500,
        following: 300,
        postsCount: 20,
        createdAt: new Date(),
      },
    ],
    lastMessage: {
      id: '1',
      sender: {
        id: '2',
        username: 'فاطمة',
        email: 'fatima@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
        bio: 'مدونة',
        followers: 500,
        following: 300,
        postsCount: 20,
        createdAt: new Date(),
      },
      content: 'كيف حالك؟',
      createdAt: new Date(),
      read: false,
    },
    unreadCount: 2,
    isGroup: false,
  },
  {
    id: '2',
    participants: [
      {
        id: '3',
        username: 'المجموعة',
        email: 'group@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Group',
        bio: 'مجموعة',
        followers: 100,
        following: 50,
        postsCount: 10,
        createdAt: new Date(),
      },
    ],
    lastMessage: {
      id: '2',
      sender: {
        id: '3',
        username: 'أحمد',
        email: 'ahmad@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
        bio: 'مصور',
        followers: 1000,
        following: 500,
        postsCount: 50,
        createdAt: new Date(),
      },
      content: 'السلام عليكم يا جماعة',
      createdAt: new Date(),
      read: true,
    },
    unreadCount: 0,
    isGroup: true,
    name: 'مجموعة الأصدقاء',
  },
]

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])\n  const [input, setInput] = useState('')

  const handleSend = () => {\n    if (!input.trim()) return\n    // Handle send\n    setInput('')\n  }

  const selectedConv = mockConversations.find((c) => c.id === selectedConversation)

  return (\n    <div className="flex h-screen bg-dark pb-16">\n      {/* Conversations List */}\n      <div\n        className={`w-full md:w-80 bg-dark-light border-r border-secondary flex flex-col ${\n          selectedConversation ? 'hidden md:flex' : 'flex'\n        }`}\n      >\n        <div className="p-4 border-b border-secondary">\n          <h1 className="text-2xl font-bold mb-3">الرسائل</h1>\n          <div className="relative">\n            <Search size={16} className="absolute right-3 top-3 text-gray-500" />\n            <input\n              type="search"\n              placeholder="ابحث عن محادثة"\n              className="w-full pl-3 pr-9 py-2 bg-dark border border-secondary rounded-full text-sm focus:outline-none focus:border-primary"\n            />\n          </div>\n        </div>\n\n        <button className="m-4 px-4 py-2 bg-primary text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">\n          <Plus size={20} />\n          محادثة جديدة\n        </button>\n\n        <div className="flex-1 overflow-y-auto">\n          {mockConversations.map((conv) => (\n            <button\n              key={conv.id}\n              onClick={() => setSelectedConversation(conv.id)}\n              className="w-full p-4 border-b border-secondary hover:bg-dark transition-colors text-right flex items-center gap-3"\n            >\n              <img\n                src={conv.participants[0].avatar}\n                alt={conv.participants[0].username}\n                className="w-12 h-12 rounded-full flex-shrink-0"\n              />\n              <div className="flex-1 min-w-0">\n                <p className="font-semibold text-sm">{conv.name || conv.participants[0].username}</p>\n                <p className="text-xs text-gray-500 truncate">{conv.lastMessage.content}</p>\n              </div>\n              {conv.unreadCount > 0 && (\n                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full flex-shrink-0">\n                  {conv.unreadCount}\n                </span>\n              )}\n            </button>\n          ))}\n        </div>\n      </div>\n\n      {/* Chat View */}\n      {selectedConversation && selectedConv && (\n        <div className="flex-1 flex flex-col">\n          {/* Header */}\n          <div className="bg-dark-light border-b border-secondary p-4 flex items-center justify-between">\n            <h2 className="font-semibold">{selectedConv.name || selectedConv.participants[0].username}</h2>\n            <button\n              onClick={() => setSelectedConversation(null)}\n              className="md:hidden text-gray-500 hover:text-white"\n            >\n              <X size={24} />\n            </button>\n          </div>\n\n          {/* Messages */}\n          <div className="flex-1 overflow-y-auto p-4 space-y-3">\n            {messages.length === 0 && (\n              <div className="flex items-center justify-center h-full text-gray-500">\n                <p>لا توجد رسائل بعد</p>\n              </div>\n            )}\n          </div>\n\n          {/* Input */}\n          <div className="bg-dark-light border-t border-secondary p-4 flex gap-2">\n            <input\n              type="text"\n              placeholder="اكتب رسالة..."\n              value={input}\n              onChange={(e) => setInput(e.target.value)}\n              onKeyPress={(e) => e.key === 'Enter' && handleSend()}\n              className="flex-1 px-4 py-2 bg-dark border border-secondary rounded-full text-sm focus:outline-none focus:border-primary"\n            />\n            <button\n              onClick={handleSend}\n              className="px-4 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition-colors"\n            >\n              <Send size={20} />\n            </button>\n          </div>\n        </div>\n      )}\n      <BottomNav />\n    </div>\n  )\n}\n\nexport default MessagesPage
