"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"
// import { nanoid } from "nanoid"

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
})

export default function CreateProjectModal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [createdProject, setCreatedProject] = useState<{ projectKey: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      const project = await response.json()
      setCreatedProject(project)
      form.reset()
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setCreatedProject(null)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Project
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-zinc-900 dark:border dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            {createdProject ? "Project Created!" : "Create New Project"}
          </h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {createdProject ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Your project has been created. Add this code to your website to start collecting feedback:
            </p>
            <div className="p-3 overflow-x-auto bg-gray-100 rounded-md dark:bg-zinc-950 dark:border dark:border-zinc-800">
              <code className="text-sm whitespace-pre dark:text-zinc-300">
                {`<script src="${window.location.origin}/widget.js" data-project="${createdProject.projectKey}"></script>`}
              </code>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `<script src="${window.location.origin}/widget.js" data-project="${createdProject.projectKey}"></script>`
                )
                alert("Copied to clipboard!")
              }}
              className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-950/30"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">Project Name</label>
              <input
                {...form.register("name")}
                type="text"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-500"
                placeholder="My Awesome Project"
                autoFocus
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                {isLoading ? "Creating..." : "Create Project"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
