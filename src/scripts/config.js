const CONFIG = {
    rootPath: "https://mysite.itvarsity.org/api/ContactBook/",
    get apiKey() {
        return this.validateApiKey();
    }
};

CONFIG.validateApiKey = function() {
    try {
        const apiKey = localStorage.getItem("apiKey");
        if (!apiKey) {
            window.location.href = "../pages/enter-api-key.html";
            return null; // Explicit return for clarity
        }
        return apiKey;
    } catch (error) {
        console.error("Error accessing localStorage:", error);
        window.location.href = "../pages/enter-api-key.html";
        return null;
    }
};

// Freeze object to prevent modifications
Object.freeze(CONFIG);

// Export as module (if using ES modules)
export default CONFIG;