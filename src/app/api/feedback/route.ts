import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import * as z from "zod"

const feedbackSchema = z.object({
  projectKey: z.string(),
  type: z.enum(["bug", "feature", "other"]),
  message: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  metadata: z.any().optional(),
})

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { projectKey, type, message, email, metadata } = feedbackSchema.parse(body)

    const project = await prisma.project.findUnique({
      where: { projectKey },
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    const feedback = await prisma.feedback.create({
      data: {
        projectId: project.id,
        type,
        message,
        email: email || null,
        metadata: metadata || {},
      },
    })

    return NextResponse.json(feedback, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
