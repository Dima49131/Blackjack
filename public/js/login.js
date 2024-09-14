
    // JavaScript to handle pop-up visibility
    const popup = document.getElementById('popup');
    const loginButton = document.getElementById('loginButton');
    const closePopup = document.getElementById('closePopup');

    // Show the pop-up when the login button is clicked
    loginButton.addEventListener('click', () => {
        console.log('Login button clicked'); // For debugging
        popup.style.display = 'block'; // Show pop-up
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
