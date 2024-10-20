import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let personalInfo: string | null = null;

async function loadPersonalInfo() {
  if (personalInfo === null) {
    const filePath = path.join(process.cwd(), "public", "personal_info.txt");
    personalInfo = await fs.readFile(filePath, "utf-8");
  }
  return personalInfo;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { message } = body;

  try {
    // Reload personal info every 10 messages or if it's not loaded
    await loadPersonalInfo();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant with a slight nerdy flair. You have access to the following information about the developer:

${personalInfo}

Use this information to answer questions about the developer's experience, skills, and background. Your responses should be:
1. Primarily professional and informative
2. Occasionally (about 5% of the time) include a subtle pirate reference or phrase
3. Sometimes include nerdy references or tech jokes when appropriate

For questions about years of experience or specific timeframes, calculate based on the current year and the information provided. If you don't have enough information to answer a question, politely say so and offer to provide related information if available.

Format your response using simple HTML elements for easy rendering:
- Use <p> for paragraphs
- Use <ul> and <li> for lists
- Use <strong> for emphasis
- Use <em> for slight emphasis or technical terms
- Use <code> for code snippets or technical abbreviations
- Use <h3> for subheadings if needed
- Use <a href="URL" target="_blank" rel="noopener noreferrer">Link text</a> for clickable links to open in a new tab

Example format:
<p>Here's the main information.</p>
<ul>
  <li>Point 1</li>
  <li>Point 2</li>
</ul>
<p>Additional <strong>important</strong> details. Here's a nerdy bit: <em>technical term</em>.</p>
<p>And remember, <code>code</code> is a pirate's treasure! Arrr!</p>`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.6,
      max_tokens: 150,
    });

    const botResponse = completion.choices[0].message.content;

    return NextResponse.json({ response: botResponse });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 },
    );
  }
}
