import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import FeedbackList from "@/components/feedback/FeedbackList"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      feedback: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <p>Key: <code className="px-2 py-1 bg-gray-100 rounded">{project.projectKey}</code></p>
            <span>•</span>
            <p>Created {new Date(project.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Feedback ({project.feedback.length})</h2>
        </div>
        <FeedbackList feedback={project.feedback} />
      </div>
    </div>
  )
}
