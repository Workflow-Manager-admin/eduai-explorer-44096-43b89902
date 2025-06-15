import React from "react";

// PUBLIC_INTERFACE
function ChatbotPanel() {
  /**
   * Chatbot Panel provides interface for AI-powered Q&A.
   */
  return (
    <section className="chatbot-panel panel">
      <h2>AI Assistant Chatbot</h2>
      <div style={{
        background: "var(--accent, #F5A623)",
        color: "var(--base-dark)",
        borderRadius: 8,
        padding: "24px 0",
        textAlign: "center",
        marginBottom: 16,
        fontWeight: 500,
        fontSize: "1.1rem"
      }}>
        [Chatbot interface mock – ask me anything!]
      </div>
      <div style={{fontSize: "1rem", color: "var(--text-secondary)"}}>
        Get explanations, step-by-step walkthroughs, or answers—AI is ready to help.
      </div>
    </section>
  );
}

export default ChatbotPanel;
