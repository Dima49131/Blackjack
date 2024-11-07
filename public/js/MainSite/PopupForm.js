// JavaScript to handle pop-up visibility
const loginButton = document.getElementById('loginButton');
const formContainer = document.getElementById('formContainer');

// HTML for the login and registration forms
const formsHTML = `
    <div id="popup" class="popup-background">
        <div class="popup-form">
            <button id="closePopup" class="close-button">X</button>

            <!-- Login Form -->
            <div id="loginForm" class="form-container">
                <h1 class="loginHeader">Login</h1>
                <form action="/login" method="POST">
                    <div class="error-message" id="errorMessage" style="display: none;"></div>
                    <div>
                        <label for="loginEmail" class="emailLabel">Email Or Username</label>
                        <input type="text" id="loginEmail" name="email" required>
                    </div>
                    <div>
                        <label for="loginPassword" class="passwordLabel">Password</label>
                        <input type="password" id="loginPassword" name="password" required>
                    </div>
                    <button type="submit" class="loginButton">LOGIN</button>
                </form>
                <div class="sub-container">
                    <p class="subText">Don't Have an Account?</p>
                    <p class="subText">Create an Account for 50 tokens</p>
                    <button id="showRegisterLink" class="registerLink">Register</button>
                  
                    </div>
            </div>

            <!-- Registration Form -->
            <div id="registerForm" class="form-container hidden">
                <h1 class="registerHeader">Register</h1>
                <form action="/register" method="POST">
                    <div class="error-message" id="registerErrorMessage" style="display: none;"></div>
                    <div class="form-group">
                        <label for="name" class="emailLabel">Username</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="registerEmail" class="emailLabel">Email</label>
                        <input type="email" id="registerEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="registerPassword" class="passwordLabel">Password</label>
                        <input type="password" id="registerPassword" name="password" required>
                    </div>
                    <button type="submit" class="loginButton">REGISTER</button>
                </form>
                <div class="sub-container">
                    <p class="subText">Already Have an Account?</p>
                    <button id="showLoginLink" class="registerLink">Login</button>
                </div>
            </div>
        </div>
    </div>
`;

// Show the pop-up when the login button is clicked
loginButton.addEventListener('click', () => {
    formContainer.innerHTML = formsHTML; // Insert the forms
    const popup = document.getElementById('popup');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const closePopup = document.getElementById('closePopup');
    const usernameInput = document.getElementById('loginEmail'); // Correct ID for login email
    const usernameName = document.getElementById('name'); // Correct ID for registration username

    popup.style.display = 'block'; 
    loginForm.style.display = 'none';  // Show the login form
    registerForm.style.display = 'block'; // Hide the registration form
    usernameInput.focus(); // Focus on login email input

    // Hide the pop-up when the close button is clicked
    closePopup.addEventListener('click', () => {
        console.log('Close button clicked'); // For debugging
        popup.style.display = 'none'; // Hide pop-up
        formContainer.innerHTML = ''; // Clear forms when closed
    });

    // Optionally, hide the pop-up when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            console.log('Clicked outside pop-up'); // For debugging
            popup.style.display = 'none'; // Hide pop-up
            formContainer.innerHTML = ''; // Clear forms when closed
        }
    });

    // Handle switching between forms
    const showRegisterLink = document.getElementById('showRegisterLink');
    const showLoginLink = document.getElementById('showLoginLink');

    showRegisterLink.addEventListener('click', () => {
        loginForm.style.display = 'none'; // Hide login form
        registerForm.style.display = 'block'; // Show registration form
        usernameName.focus(); // Focus on registration username input
    });

    showLoginLink.addEventListener('click', () => {
        registerForm.style.display = 'none'; // Hide registration form
        loginForm.style.display = 'block'; // Show login form
        usernameInput.focus(); // Focus on login email input
    });
});

// Initialize local storage for token balance
if (localStorage.getItem("firstLoad") === null) {
    // Set the initial token balance to 10
    localStorage.setItem("balanceupdate", 10);
    // Mark that the user has loaded the page, so it doesn't happen again
    localStorage.setItem("firstLoad", "false");
} else {
    // If it's not the first time, make sure the existing balance is used
    if (!localStorage.getItem("balanceupdate")) {
        localStorage.setItem("balanceupdate", 0); // Initialize if no balance exists
    }
}

// Update the token balance display
const tokenbalance = document.getElementById("tokenbalance"); // Ensure this element exists
if (tokenbalance) {
    tokenbalance.innerHTML = localStorage.getItem("balanceupdate") + " Tokens";
}

// Check for URL parameters on page load
window.addEventListener('load', () => {
    console.log("Page loaded"); // Debugging line
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('loginFailed') === 'true') {
        loginButton.click(); // Simulate click to open the login popup
    }
});
