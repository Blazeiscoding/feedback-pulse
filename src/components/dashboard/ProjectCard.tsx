import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { MessageSquare, Calendar, ArrowRight } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    projectKey: string
    createdAt: Date
    _count: {
      feedback: number
    }
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="p-6 transition-shadow bg-white border rounded-lg shadow-sm hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-500">Key: {project.projectKey}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>{project._count.feedback} Feedback</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(project.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={`/projects/${project.id}`}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 transition-colors border border-blue-600 rounded-md hover:bg-blue-50"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  )
}
