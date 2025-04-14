document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      const messageElement = document.getElementById("message");
  
      if (data.message === "Login successful") {
        window.location.href = `/welcome?username=${username}`;
      } else {
        messageElement.textContent = data.message;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });