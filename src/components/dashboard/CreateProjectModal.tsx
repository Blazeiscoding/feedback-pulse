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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {createdProject ? "Project Created!" : "Create New Project"}
          </h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {createdProject ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Your project has been created. Add this code to your website to start collecting feedback:
            </p>
            <div className="p-3 overflow-x-auto bg-gray-100 rounded-md">
              <code className="text-sm whitespace-pre">
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
              className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                {...form.register("name")}
                type="text"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
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
