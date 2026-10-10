const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector("button");
    button.disabled = true;
    message.textContent = "Submitting registration...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed.");
        }

        message.textContent =
            `${result.message} Registration ID: ${result.registrationId}`;

        form.reset();
    } catch (error) {
        message.textContent = error.message;
    } finally {
        button.disabled = false;
    }
});
