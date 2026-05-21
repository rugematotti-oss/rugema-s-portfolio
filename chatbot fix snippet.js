// ════════════════════════════════════════════════════════
//  REPLACE the try block inside cbSend() in index.html
//  with this code (lines ~972–1000)
// ════════════════════════════════════════════════════════

  try {
    const isLocal = window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1';

    // Production (GitHub Pages) → must use local proxy server
    // Local dev                 → hits Flask on port 5000
    const endpoint = isLocal
      ? 'http://localhost:5000/chat'
      : 'http://localhost:5000/chat'; // ← swap this for your deployed server URL when you host it

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 300,
        messages: [{ role: 'system', content: CB_SYSTEM }, ...cbHistory]
      })
    });

    const data = await res.json();
    console.log('Groq response:', data);
    if (data.error) throw new Error(data.error.message);
    const reply = data.choices?.[0]?.message?.content || "I'm not sure about that!";

    const unsure = /don't have that info|i don't know|not sure|cannot find|no information/i.test(reply);
    if (unsure) cbLogUnknown(msg);

    cbHistory.push({ role: 'assistant', content: reply });
    cbBotMsg(reply);

  } catch(e) {
    console.error('Chatbot error:', e);
    cbBotMsg("⚠️ Couldn't reach the AI right now. Try again in a moment!");
    cbLogUnknown(msg);
  }