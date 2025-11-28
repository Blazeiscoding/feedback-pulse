import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import ProjectCard from "@/components/dashboard/ProjectCard"
import CreateProjectModal from "@/components/dashboard/CreateProjectModal"

export default async function DashboardPage() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      redirect("/signin")
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        _count: {
          select: { feedback: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Your Projects</h1>
          <CreateProjectModal />
        </div>

        {projects.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed rounded-lg bg-gray-50 dark:bg-zinc-900/50 dark:border-zinc-800">
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-zinc-200">No projects yet</h2>
            <p className="mb-4 text-gray-500 dark:text-zinc-400">Create your first project to start collecting feedback.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    )
  } catch (error: any) {
    return (
      <div className="p-8 text-red-600">
        <h1 className="text-2xl font-bold">Error Loading Dashboard</h1>
        <p className="mt-4">{error.message}</p>
        <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto text-sm text-black">
          {error.stack}
        </pre>
      </div>
    )
  }
}
