document.addEventListener("DOMContentLoaded", function () {
    
    

    const gameCollection = document.getElementById("gamecollection");


    for (let i = 0; i < 7; i++) {
        Array.from(gameCollection.children).forEach(item => {gameCollection.appendChild(item.cloneNode(true),item.cloneNode());});
    } 

    gameCollection.scrollLeft= gameCollection.scrollWidth / 2;
    
    let isScrolling = false; 
    gameCollection.addEventListener("wheel", function (event) {
        event.preventDefault(); 
        gameCollection.scrollLeft += event.deltaY; 
        isScrolling = true;
    });

    function autoScroll() {
        if (!isScrolling) {
            gameCollection.scrollLeft += 1; 
            requestAnimationFrame(autoScroll); 
        }
    }

    // Uncomment to enable automatic scrolling
    autoScroll();


    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY; // Current scroll position
        var textContainers = document.querySelectorAll('.gameTile'); // Select specific elements to fade in/out
        textContainers.forEach(function(textContainer) {
            var containerOffset = textContainer.getBoundingClientRect().top + scrollPosition; // Top offset relative to the document
            var distanceFromTop = containerOffset - scrollPosition; // Distance from the current scroll position

            // Adjust this value based on when you want the fade effect to trigger
            if (distanceFromTop < window.innerHeight * 0.2) { // Fades in when 60% of the viewport is reached
                textContainer.classList.add('fade-in');
                textContainer.classList.remove('fade-out');
                console.log("fade out");
                
            } else {
                textContainer.classList.remove('fade-in');
                textContainer.classList.add('fade-out');
            }
        });
    });


});
