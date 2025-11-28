import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(
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

    // Gemini analysis
    let sentiment: "positive" | "neutral" | "negative" = "neutral"

    if (process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenerativeAI } = require("@google/generative-ai")
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        const prompt = `Analyze the sentiment of the following text. Respond with only one word: positive, negative, or neutral.\n\nText: ${feedback.message}`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text().toLowerCase().trim()

        if (["positive", "negative", "neutral"].includes(text)) {
          sentiment = text as any
        }
      } catch (error) {
        console.error("Gemini API error:", error)
        // Fallback to mock or keep previous
      }
    } else {
      // Simple mock logic
      const text = feedback.message.toLowerCase()
      if (text.includes("great") || text.includes("love") || text.includes("awesome")) {
        sentiment = "positive"
      } else if (text.includes("bad") || text.includes("broken") || text.includes("hate")) {
        sentiment = "negative"
      }
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id: params.id },
      data: { sentiment },
    })

    return NextResponse.json(updatedFeedback)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
