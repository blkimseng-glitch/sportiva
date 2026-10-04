import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // 1. ពិនិត្យមើលថា Env Variables ត្រូវបានទាញយកមកឬនៅ
    if (!botToken || !chatId) {
      console.error("❌ Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return NextResponse.json(
        { error: "Missing environment variables for Telegram bot" },
        { status: 500 }
      );
    }

    const text = `
📩 *New Contact Message - Sportiva*

👤 *Name:* ${firstName || ""} ${lastName || ""}
📧 *Email:* ${email || ""}
📞 *Phone:* ${phone || ""}
💬 *Message:*
${message || ""}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // 2. ផ្ញើ Request ទៅ Telegram
    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    const telegramData = await res.json();

    // 3. ប្រសិនបើ Telegram ឆ្លើយតបមកថា Error (ឧទាហរណ៍ Chat ID ខុស)
    if (!res.ok) {
      console.error("❌ Telegram Error Response:", telegramData);
      return NextResponse.json(
        { error: telegramData.description || "Failed to send Telegram message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Sent successfully!" });
  } catch (error: any) {
    console.error("❌ Server Catch Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}