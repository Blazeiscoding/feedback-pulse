import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const feedback = await prisma.feedback.findUnique({
      where: { id: params.id },
      include: { project: true },
    })

    if (!feedback) {
      return new NextResponse("Not found", { status: 404 })
    }

    if (feedback.project.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await prisma.feedback.delete({
      where: { id: params.id },
    })

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
