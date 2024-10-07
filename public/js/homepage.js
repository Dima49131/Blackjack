document.addEventListener("DOMContentLoaded", function () {
    
    

    const gameCollection = document.getElementById("gamecollection");
    

    Array.from(gameCollection.children).forEach(item => {gameCollection.appendChild(item.cloneNode(true),item.cloneNode());});
    Array.from(gameCollection.children).forEach(item => {gameCollection.appendChild(item.cloneNode(true),item.cloneNode());});
    Array.from(gameCollection.children).forEach(item => {gameCollection.appendChild(item.cloneNode(true),item.cloneNode());});
    Array.from(gameCollection.children).forEach(item => {gameCollection.appendChild(item.cloneNode(true),item.cloneNode());});
    Array.from(gameCollection.children).forEach(item => {gameCollection.appendChild(item.cloneNode(true),item.cloneNode());});
    Array.from(gameCollection.children).forEach(item => {gameCollection.appendChild(item.cloneNode(true),item.cloneNode());});
    Array.from(gameCollection.children).forEach(item => {gameCollection.appendChild(item.cloneNode(true),item.cloneNode());});

    
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
});
