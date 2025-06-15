import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * ChatbotPanelProps for eventual AI backend/chat integration.
 * @typedef {Object} ChatbotPanelProps
 * @property {Array<Object>} [messages] - Chat message array [{role: 'user'|'ai', text: string}]
 * @property {boolean} [disabled] - If true, disables chat input
 * @property {Function} [onSend] - Handler for new message submission (stub)
 */

// PUBLIC_INTERFACE
function ChatbotPanel({ messages: externalMessages = null, disabled = false, onSend = null }) {
  /**
   * AI Assistant Chatbot panel.
   * - Displays (mock) chat history and input for Q&A.
   * - API integration hooks commented/stubbed below.
   * - To connect: manage message list in parent, pass `onSend`
   */
  // Local mock state fallback if parent does not control
  const [messages, setMessages] = useState([
    { role: "ai", text: "👋 Hi! I'm your EduAI Assistant. Ask me anything about experiments or science!" },
    { role: "user", text: "What is Ohm's Law?" },
    { role: "ai", text: "Ohm’s Law states that V = I × R, where V is voltage, I is current, and R is resistance." }
  ]);
  const [input, setInput] = useState("");
  const [awaiting, setAwaiting] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to end on each message update (for UX)
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [externalMessages || messages]);

  // Submit or send handler (stub: integrate with onSend/API later)
  const handleSend = () => {
    const text = input.trim();
    if (!text || awaiting || disabled) return;
    setInput("");
    // If external handler given, use it instead of local simulation (future)
    if (typeof onSend === "function") {
      onSend(text);
      return;
    }
    // Otherwise, append locally (mock exchange)
    setMessages((msgs) => [
      ...msgs,
      { role: "user", text },
      { role: "ai", text: smartReply(text) }
    ]);
    setAwaiting(false);
  };

  // Press "Enter" to send
  const handleInputKey = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Dev simulation of simple AI reply (can be replaced by API call)
  function smartReply(q) {
    // TODO: Replace with actual backend integration / API call
    if (/ohm/i.test(q)) return "Ohm’s Law: V = I × R (voltage = current × resistance).";
    if (/photosynthesis/i.test(q)) return "Photosynthesis is how green plants turn sunlight, carbon dioxide, and water into sugars and oxygen.";
    return "I’ll look that up for you! [In real version: fetch response from AI backend here.]";
  }

  const chatMessages = externalMessages || messages;

  return (
    <section className="chatbot-panel panel">
      <h2>AI Assistant Chatbot</h2>
      <div style={{
        flex: "1 1 auto",
        marginBottom: 14,
        minHeight: 140,
        maxHeight: 210,
        overflowY: "auto",
        background: "#fff7ef",
        color: "#183050",
        borderRadius: 8,
        padding: "12px 14px 8px 14px",
        fontSize: "1.04rem",
        boxShadow: "0 1px 6px 0 rgba(90,60,0,0.06)"
      }}>
        {/* Show mock or externally provided messages */}
        {chatMessages.length === 0 ? (
          <div style={{ color: "#bf9100", fontStyle: "italic" }}>
            No messages yet. Say hello to start!
          </div>
        ) : (
          chatMessages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                margin: "8px 0",
                textAlign: msg.role === "user" ? "right" : "left"
              }}
            >
              <span
                style={{
                  background:
                    msg.role === "ai" ? "var(--accent, #F5A623)" : "#d6f2f1",
                  color:
                    msg.role === "ai"
                      ? "var(--base-dark, #173077)"
                      : "var(--base-dark, #111b22)",
                  padding: "6px 10px",
                  borderRadius: 14,
                  fontWeight: msg.role === "ai" ? 600 : 400,
                  display: "inline-block",
                  maxWidth: "80%",
                  wordBreak: "break-word",
                  fontSize: 15.5
                }}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
        <div ref={chatEndRef}></div>
      </div>
      <form
        style={{
          display: "flex",
          marginTop: 0,
          gap: 10,
          alignItems: "flex-end"
        }}
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        autoComplete="off"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKey}
          disabled={awaiting || disabled}
          maxLength={400}
          placeholder="Ask a question about science, math, or a model..."
          style={{
            flex: "1 1 0",
            fontSize: 15,
            borderRadius: 7,
            border: "1px solid var(--border-color, #eee)",
            padding: "8px 12px"
          }}
        />
        <button
          type="submit"
          className="btn"
          style={{ fontSize: 14, padding: "8px 16px" }}
          tabIndex={0}
          disabled={!input.trim() || awaiting || disabled}
          title="Send"
        >
          Send
        </button>
      </form>
      <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: 7 }}>
        {/* For developer clarity, show integration instructions */}
        Get explanations, step-by-step walkthroughs, or answers—AI is ready to help!
        <br />
        <span style={{ fontSize: ".97em", color: "#9c8307" }}>
          {/* To integrate: Submit questions to AI backend, display response here. */}
        </span>
      </div>
      {/* 
        API INTEGRATION STUB:
        1. To connect real chatbot, provide `messages` and `onSend` props from parent.
        2. Call chat/QA endpoint in `onSend` to get AI response.
        3. Show loading spinner during response; stream or display answer below.
      */}
    </section>
  );
}

ChatbotPanel.propTypes = {
  messages: PropTypes.array,
  disabled: PropTypes.bool,
  onSend: PropTypes.func,
};

export default ChatbotPanel;
