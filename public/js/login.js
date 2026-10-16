document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("API response:", data);

        alert(data.message);

        if (data.message && data.message.toLowerCase().includes("success")) {
            const userData = {
                name: data.user?.name || email.split("@")[0],
                email: data.user?.email || email
            };

            localStorage.setItem("user", JSON.stringify(userData));
            window.location.href = "dashboard.html";
        }
    } catch (error) {
        console.error(error);
        alert("Server error");
    }
});