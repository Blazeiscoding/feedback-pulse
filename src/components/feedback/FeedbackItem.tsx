"use client"

import { Feedback } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { Bug, Lightbulb, MessageSquare, Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface FeedbackItemProps {
  item: Feedback
}

export default function FeedbackItem({ item }: FeedbackItemProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const icons = {
    bug: <Bug className="w-4 h-4 text-red-500" />,
    feature: <Lightbulb className="w-4 h-4 text-yellow-500" />,
    other: <MessageSquare className="w-4 h-4 text-blue-500" />,
  }

  const badges = {
    bug: "bg-red-100 text-red-800",
    feature: "bg-yellow-100 text-yellow-800",
    other: "bg-blue-100 text-blue-800",
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this feedback?")) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/feedback/${item.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to delete feedback")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-6 hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${badges[item.type]}`}>
            {icons[item.type]}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badges[item.type]}`}>
                {item.type.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">{formatDate(item.createdAt)}</span>
            </div>
            <p className="mt-1 text-gray-900">{item.message}</p>
            {item.email && (
              <p className="mt-1 text-sm text-gray-500">From: {item.email}</p>
            )}
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          title="Delete feedback"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
