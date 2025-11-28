import type { Feedback, FeedbackLabel } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { Bug, Lightbulb, MessageSquare, Trash2, Tag, Plus, BrainCircuit } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface FeedbackItemProps {
  item: Feedback & { labels?: FeedbackLabel[] }
}

export default function FeedbackItem({ item }: FeedbackItemProps) {
  const router = useRouter()
  // ... (rest of the component)


  const [isDeleting, setIsDeleting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAddingLabel, setIsAddingLabel] = useState(false)
  const [newLabel, setNewLabel] = useState("")

  const icons: Record<string, React.ReactNode> = {
    bug: <Bug className="w-4 h-4 text-red-500" />,
    feature: <Lightbulb className="w-4 h-4 text-yellow-500" />,
    other: <MessageSquare className="w-4 h-4 text-blue-500" />,
  }

  const badges: Record<string, string> = {
    bug: "bg-red-100 text-red-800",
    feature: "bg-yellow-100 text-yellow-800",
    other: "bg-blue-100 text-blue-800",
  }

  const sentimentColors: Record<string, string> = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-gray-100 text-gray-800",
    negative: "bg-red-100 text-red-800",
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

  async function handleAnalyze() {
    setIsAnalyzing(true)
    try {
      const response = await fetch(`/api/feedback/${item.id}/analyze`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to analyze")

      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to analyze sentiment")
    } finally {
      setIsAnalyzing(false)
    }
  }

  async function handleAddLabel(e: React.FormEvent) {
    e.preventDefault()
    if (!newLabel.trim()) return

    try {
      const response = await fetch(`/api/feedback/${item.id}/labels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel }),
      })

      if (!response.ok) throw new Error("Failed to add label")

      setNewLabel("")
      setIsAddingLabel(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to add label")
    }
  }

  return (
    <div className="p-6 hover:bg-gray-50 group dark:hover:bg-zinc-800/50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 w-full">
          <div className={`p-2 rounded-full ${badges[item.type]} dark:bg-opacity-20`}>
            {icons[item.type]}
          </div>
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badges[item.type]} dark:bg-opacity-20`}>
                {item.type.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500 dark:text-zinc-500">{formatDate(item.createdAt)}</span>
              
              {item.sentiment && sentimentColors[item.sentiment] && (
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${sentimentColors[item.sentiment]} dark:bg-opacity-20`}>
                  {item.sentiment.toUpperCase()}
                </span>
              )}

              {item.labels?.map((label) => (
                <span key={label.id} className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full flex items-center dark:bg-zinc-800 dark:text-zinc-400">
                  <Tag className="w-3 h-3 mr-1" />
                  {label.label}
                </span>
              ))}
            </div>
            
            <p className="mt-2 text-gray-900 dark:text-zinc-100">{item.message}</p>
            
            {item.email && (
              <p className="mt-1 text-sm text-gray-500 dark:text-zinc-500">From: {item.email}</p>
            )}

            <div className="mt-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {!item.sentiment && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="text-xs flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  <BrainCircuit className="w-3 h-3 mr-1" />
                  {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
                </button>
              )}
              
              <div className="relative">
                {isAddingLabel ? (
                  <form onSubmit={handleAddLabel} className="flex items-center">
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="px-2 py-0.5 text-xs border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
                      placeholder="Label..."
                      autoFocus
                      onBlur={() => setTimeout(() => setIsAddingLabel(false), 200)}
                    />
                    <button
                      type="submit"
                      className="px-2 py-0.5 text-xs text-white bg-blue-600 rounded-r-md hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                      Add
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingLabel(true)}
                    className="text-xs flex items-center text-gray-500 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Label
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors dark:text-zinc-600 dark:hover:text-red-400"
          title="Delete feedback"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
