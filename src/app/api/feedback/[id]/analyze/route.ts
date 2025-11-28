import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // Mock OpenAI analysis if no key
    let sentiment: "positive" | "neutral" | "negative" = "neutral"

    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "Analyze the sentiment of the following text. Respond with only one word: positive, negative, or neutral.",
              },
              {
                role: "user",
                content: feedback.message,
              },
            ],
          }),
        })

        const data = await response.json()
        const result = data.choices[0].message.content.toLowerCase().trim()

        if (["positive", "negative", "neutral"].includes(result)) {
          sentiment = result as any
        }
      } catch (error) {
        console.error("OpenAI API error:", error)
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
