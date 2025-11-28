"use client"

import { useState } from "react"
import { Feedback, FeedbackType } from "@prisma/client"
import FeedbackItem from "./FeedbackItem"
import { Filter } from "lucide-react"

interface FeedbackListProps {
  feedback: Feedback[]
}

export default function FeedbackList({ feedback }: FeedbackListProps) {
  const [filter, setFilter] = useState<FeedbackType | "ALL">("ALL")
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const filteredFeedback = feedback.filter((item) => {
    if (filter === "ALL") return true
    return item.type === filter
  })

  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage)
  const paginatedFeedback = filteredFeedback.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as FeedbackType | "ALL")
              setPage(1)
            }}
            className="text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="ALL">All Types</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="divide-y">
        {paginatedFeedback.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No feedback found.
          </div>
        ) : (
          paginatedFeedback.map((item) => (
            <FeedbackItem key={item.id} item={item} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
