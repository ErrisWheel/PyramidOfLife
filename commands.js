document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login");
    const modal = document.getElementById("loginModal");
    const closeBtn = document.querySelector(".close");
    
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const message = document.getElementById("message");

    // show modal
    loginBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // close modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        message.innerHTML = "";
    });

    // to log in
    loginTab.addEventListener("click", () => {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        loginTab.classList.add("active-tab");
        signupTab.classList.remove("active-tab");
    });

    // to sign up
    signupTab.addEventListener("click", () => {
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        signupTab.classList.add("active-tab");
        loginTab.classList.remove("active-tab");

        modal.style.display = "flex";
    });

    // handle sign up
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newUser = document.getElementById("signupUsername").value;
        const newPass = document.getElementById("signupPassword").value;
        const newEmail = document.getElementById("signupEmail").value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            message.innerHTML = "Invalid email format";
            message.style.color = "red";
            return;
        }

        if (localStorage.getItem(newUser)) {
            message.innerHTML = "Username already exists!";
            message.style.color = "red";
        } else {
            localStorage.setItem(newUser, newPass);
            message.innerHTML = "Account created successfully!";
            message.style.color = "green";
            signupForm.reset();
        }
    });

    // handle log in
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const user = document.getElementById("loginUsername").value;
        const pass = document.getElementById("loginPassword").value;

        if (localStorage.getItem(user) === pass) {
            message.innerHTML = "Login successful!";
            message.style.color = "green";
            setTimeout(() => { modal.style.display = "none"; }, 1000);
        } else {
            message.innerHTML = "Invalid username or password!";
            message.style.color = "red";
        }
    });
});

async function loginUser(username, password) {
    const response = await fetch('/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);
}

async function signUpUser(username, password, email) {
    const response = await fetch('/api/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email })
    });

    const data = await response.json();
    alert(data.message);
}
