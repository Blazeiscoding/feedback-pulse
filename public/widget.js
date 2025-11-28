(function () {
  const script = document.currentScript;
  const projectKey = script.getAttribute("data-project");

  if (!projectKey) {
    console.error("Feedback Pulse: Missing data-project attribute");
    return;
  }

  // Create styles
  const style = document.createElement("style");
  style.innerHTML = `
    .fp-widget-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }
    .fp-widget-button:hover {
      transform: scale(1.1);
    }
    .fp-widget-modal {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 350px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      display: none;
      font-family: system-ui, -apple-system, sans-serif;
      overflow: hidden;
      color: #111827;
    }
    .fp-widget-header {
      background: #f3f4f6;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e7eb;
    }
    .fp-widget-header h3 {
      margin: 0;
      font-size: 16px;
      color: #111827;
    }
    .fp-widget-close {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      color: #6b7280;
    }
    .fp-widget-body {
      padding: 16px;
    }
    .fp-form-group {
      margin-bottom: 12px;
    }
    .fp-label {
      display: block;
      margin-bottom: 4px;
      font-size: 14px;
      color: #374151;
    }
    .fp-input, .fp-textarea, .fp-select {
      width: 100%;
      padding: 8px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
      background-color: #ffffff;
      color: #111827;
    }
    .fp-textarea {
      resize: vertical;
      min-height: 80px;
    }
    .fp-submit {
      width: 100%;
      background: #2563eb;
      color: white;
      border: none;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }
    .fp-submit:hover {
      background: #1d4ed8;
    }
    .fp-submit:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }
    .fp-success {
      text-align: center;
      padding: 20px;
      color: #059669;
    }
  `;
  document.head.appendChild(style);

  // Create button
  const button = document.createElement("button");
  button.className = "fp-widget-button";
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;
  document.body.appendChild(button);

  // Create modal
  const modal = document.createElement("div");
  modal.className = "fp-widget-modal";
  modal.innerHTML = `
    <div class="fp-widget-header">
      <h3>Send Feedback</h3>
      <button class="fp-widget-close">&times;</button>
    </div>
    <div class="fp-widget-body">
      <form id="fp-form">
        <div class="fp-form-group">
          <label class="fp-label">Type</label>
          <select class="fp-select" name="type">
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="fp-form-group">
          <label class="fp-label">Message</label>
          <textarea class="fp-textarea" name="message" required placeholder="Tell us what you think..."></textarea>
        </div>
        <div class="fp-form-group">
          <label class="fp-label">Email (optional)</label>
          <input class="fp-input" type="email" name="email" placeholder="your@email.com">
        </div>
        <button type="submit" class="fp-submit">Submit Feedback</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // State
  let isOpen = false;

  // Event listeners
  button.addEventListener("click", () => {
    isOpen = !isOpen;
    modal.style.display = isOpen ? "block" : "none";
  });

  modal.querySelector(".fp-widget-close").addEventListener("click", () => {
    isOpen = false;
    modal.style.display = "none";
  });

  const form = modal.querySelector("#fp-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector(".fp-submit");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);
    const data = {
      projectKey,
      type: formData.get("type"),
      message: formData.get("message"),
      email: formData.get("email"),
      metadata: {
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    };

    try {
      // Use script src origin for API call
      const apiUrl = new URL(script.src).origin + "/api/feedback";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      modal.querySelector(".fp-widget-body").innerHTML = `
        <div class="fp-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 10px; display: block;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <p>Thank you for your feedback!</p>
        </div>
      `;

      setTimeout(() => {
        isOpen = false;
        modal.style.display = "none";
        // Reset form after closing (optional, but here we replaced body so need to reload page or re-render to reset properly, but for simple widget this is fine)
      }, 3000);
    } catch (error) {
      console.error(error);
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Feedback";
      alert("Failed to submit feedback. Please try again.");
    }
  });
})();
