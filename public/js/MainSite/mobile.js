document.addEventListener("DOMContentLoaded", function () {
  // Detect if the user is on a mobile device
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Additionally check for small screen width (e.g. resized windows or small devices)
  if (isMobile || window.innerWidth <= 500) {
    // Show the mobile unavailable message
    var mobileMessage = document.createElement("div");
    mobileMessage.id = "mobile-unavailable";
    mobileMessage.innerHTML = "Mobile Currently Unavailable";
    document.body.appendChild(mobileMessage);
    mobileMessage.style.display = "flex";
  }
});