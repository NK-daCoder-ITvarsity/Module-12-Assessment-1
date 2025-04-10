import CONFIG from "./config.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('apiKeyForm');
    const apiKeyInput = document.getElementById('apiKey');
    const errorMessage = document.getElementById('errorMessage');
    const rootPath = `${CONFIG.rootPath}`;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.classList.add('hidden');
        
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            showError("Please enter an API key");
            return;
        }

        try {
            const response = await fetch(`${rootPath}controller/api-key/?apiKey=${encodeURIComponent(apiKey)}`);
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.text();
            
            if (data === "1") {
                localStorage.setItem("apiKey", CONFIG.apiKey);
                window.location.href = "/Module-12-Assessment-1/index.html";
            } else {
                showError(data || "Invalid API key entered");
            }
        } catch (error) {
            showError("Failed to verify API key. Please try again.");
            console.error("API Key verification error:", error);
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        apiKeyInput.focus();
    }
});