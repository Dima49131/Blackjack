
    // JavaScript to handle pop-up visibility
    const popup = document.getElementById('popup');
    const loginButton = document.getElementById('loginButton');
    const closePopup = document.getElementById('closePopup');
    const usernameInput = document.getElementById('email');
    const usernameName = document.getElementById('name');


    // Show the pop-up when the login button is clicked
    loginButton.addEventListener('click', () => {
        popup.style.display = 'block'; // Show pop-up
        console.log(usernameName);
        
        if (usernameName){
            usernameName.focus();
        } else {
            usernameInput.focus();    
        }

        
    });

    // Hide the pop-up when the close button is clicked
    closePopup.addEventListener('click', () => {
        console.log('Close button clicked'); // For debugging
        popup.style.display = 'none'; // Hide pop-up
    });

    // Optionally, hide the pop-up when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            console.log('Clicked outside pop-up'); // For debugging
            popup.style.display = 'none'; // Hide pop-up
        }
    });

    var tokenbalancepacman = 0

if (localStorage.getItem("firstLoad") === null) {
    // Set the initial token balance to 50
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
tokenbalance.innerHTML = localStorage.getItem("balanceupdate") + ".00 Tokens";



window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('fromRegister') === 'true') {
      document.getElementById("loginButton").click();
    }
  });
  
