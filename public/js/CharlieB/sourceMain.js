
const thisStartButton = document.getElementById("newGameButton");
thisStartButton.addEventListener("click", checkThenStartGame);

var dealerCards = [];  // Arrays holding the DisplayCard objects used to show the cards
var playerCards = [];

dealerCards.count = 0;  // Number of cards actually in the dealer's hand
playerCards.count = 0;   // Number of cards actually in the player's hand

var deck = new Deck();
var gameInProgress = false;
var bet;
var betInput;
var money;
var moneyDisplay;
var dealer1;
var dealer2;
var dealer3;
var dealer4;
var dealer5;

var player1;
var player2;
var player3;
var player4;
var player5;
var player3value;
var player4value;
var player2value;
var player1value;

var dealer4value;
var dealer3value;
var dealer2value;
var dealer1value;

var message;
var standButton, hitButton, newGameButton, doubleButton;  // objects representing the buttons, so I can enable/disable them

function updateDisplay(playerTotal) {
    $("#display").html(playerTotal);
}

function updateDisplayDealer(dealerTotal) {
    $("#displaydealer").html(dealerTotal);
}

function setup() {
    for (var i = 1; i <= 5; i++) {
       dealerCards[i] = new DisplayedCard("dealer" + i);
       dealerCards[i].cardContainer.style.display = "none";
       playerCards[i] = new DisplayedCard("player" + i);
       playerCards[i].cardContainer.style.display = "none";
    }
    dealer1 = $("#dealer1");
    dealer2 = $("#dealer2");
    dealer3 = $("#dealer3");
    dealer4 = $("#dealer4");
    dealer5 = $("#dealer5");

    player1 = $("#player1");
    player2 = $("#player2");
    player3 = $("#player3");
    player4 = $("#player4");
    player5 = $("#player5");
    player3value = parseInt(player3.css('left'), 10);
    player4value = parseInt(player4.css('left'), 10);
    player2value = parseInt(player2.css('left'), 10);
    player1value = parseInt(player1.css('left'), 10);

    dealer4value = parseInt(dealer4.css('left'), 10);
    dealer3value = parseInt(dealer3.css('left'), 10);
    dealer2value = parseInt(dealer2.css('left'), 10);
    dealer1value = parseInt(dealer1.css('left'), 10);
    
    message = $("#message");
    standButton = $("#standButton");
    hitButton = $("#hitButton");
    doubleButton = $("#doubleButton");
    newGameButton = $("#newGameButton");
    moneyDisplay = $("#money");
    twox = $("#TwoX");
    money = parseFloat(localStorage.getItem("balanceupdate")) || 0;
    moneyDisplay.html("$" + money);
    betInput = $("#bet");
    betInput.val(1);
    standButton.prop("disabled", true);
    hitButton.prop("disabled", true);
    doubleButton.prop("disabled", true);
    newGameButton.prop("disabled", false);
}

function dealCard(cards, runOnFinish, faceDown) {
    var crd = deck.nextCard();
    cards.count++;
    let cardsDealt = true;
    if (faceDown)
        cards[cards.count].setFaceDown();
    else
        cards[cards.count].setFaceUp();
    
    cards[cards.count].setCard(crd);

    if (cards.count == 3) {
        player_two()
    }
    if (cards.count == 4) {
        player_three()
    }
    if (cards.count == 5) {
        player_four()
    }


    // Animate the card being dealt
    $(cards[cards.count].cardContainer).slideDown(500, function() {
        // Call runOnFinish if provided
        if (runOnFinish) {
            runOnFinish();
        }
    });
}


function getTotal(hand) {
   var total = 0;
   var ace = false;
   for (var i = 1; i <= hand.count; i++) {
       total += Math.min(10, hand[i].card.value); 
       if (hand[i].card.value == 1)
          ace = true;
   }
   if (total + 10 <= 21 && ace)
      total += 10;
   return total;
}

function getFirstDealerCardValue(hand) {
    if (hand.count > 0) {
        return Math.min(10, hand[1].card.value); // Returns 10 if face card, else card value
    } else {
        return 0; // No card in hand
    }
}



function dealer_one() {
    var currentLeft = parseInt(dealer1.css('left'), 10);
    var newLeft = currentLeft - 35;
    dealer1.css({
        left: newLeft + "px",
    });
}


function dealer_two() {
    var currentLeft = parseInt(dealer1.css('left'), 10);
    var currentLeft2 = parseInt(dealer2.css('left'), 10);
    var newLeft = currentLeft - 35;
    dealer1.css({
        left: newLeft + "px",
    });
    var newLeft2 = currentLeft2 - 35;
    dealer2.css({
        left: newLeft2 + "px",
    });
}

function dealer_three() {
    var currentLeft = parseInt(dealer1.css('left'), 10);
    var newLeft = currentLeft - 35;
    dealer1.css({
        left: newLeft + "px",
    });
    var currentLeft2 = parseInt(dealer2.css('left'), 10);
    var newLeft2 = currentLeft2 - 35;
    dealer2.css({
        left: newLeft2 + "px",
    });
    var currentLeft3 = parseInt(dealer3.css('left'), 10);
    var newLeft3 = currentLeft3 - 35;
    dealer3.css({
        left: newLeft3 + "px",
    });
}

function dealer_four() {
    var currentLeft = parseInt(dealer1.css('left'), 10);
    var newLeft = currentLeft - 35;
    dealer1.css({
        left: newLeft + "px",
    });
    var currentLeft2 = parseInt(dealer2.css('left'), 10);
    var newLeft2 = currentLeft2 - 35;
    dealer2.css({
        left: newLeft2 + "px",
    });
    var currentLeft3 = parseInt(dealer3.css('left'), 10);
    var newLeft3 = currentLeft3 - 35;
    dealer3.css({
        left: newLeft3 + "px",
    });
    var currentLeft3 = parseInt(dealer4.css('left'), 10);
    var newLeft3 = currentLeft3 - 35;
    dealer4.css({
        left: newLeft3 + "px",
    });
}

function player_one() {
    var currentLeft = parseInt(player1.css('left'), 10);
    var newLeft = currentLeft - 15;
    player1.css({
        left: newLeft + "px",
    });
}

function player_two() {
    var currentLeft = parseInt(player1.css('left'), 10);
    var newLeft = currentLeft - 15;
    player1.css({
        left: newLeft + "px",
    });
    var currentLeft = parseInt(player2.css('left'), 10);
    var newLeft = currentLeft - 15;
    player2.css({
        left: newLeft + "px",
    });
    
}

function player_three() {
    var currentLeft = parseInt(player1.css('left'), 10);
    var newLeft = currentLeft - 15;
    player1.css({
        left: newLeft + "px",
    });
    var currentLeft = parseInt(player2.css('left'), 10);
    var newLeft = currentLeft - 15;
    player2.css({
        left: newLeft + "px",
    });
    var currentLeft = parseInt(player3.css('left'), 10);
    var newLeft = currentLeft - 15;
    player3.css({
        left: newLeft + "px",
    });
}

function player_four() {
    var currentLeft = parseInt(player1.css('left'), 10);
    var newLeft = currentLeft - 15;
    player1.css({
        left: newLeft + "px",
    });
    var currentLeft = parseInt(player2.css('left'), 10);
    var newLeft = currentLeft - 15;
    player2.css({
        left: newLeft + "px",
    });
    var currentLeft = parseInt(player3.css('left'), 10);
    var newLeft = currentLeft - 15;
    player3.css({
        left: newLeft + "px",
    });
    var currentLeft = parseInt(player4.css('left'), 10);
    var newLeft = currentLeft - 15;
    player4.css({
        left: newLeft + "px",
    });
}


function reset_cards() {

    player4.css({
        left: player4value,
    });
    player3.css({
        left: player3value,
    });
    player2.css({
        left: player2value,
    });
    player1.css({
        left: player1value,
    });
    dealer4.css({
        left: dealer4value,
    });
    dealer3.css({
        left: dealer3value,
    });
    dealer2.css({
        left: dealer2value,
    });
    dealer1.css({
        left: dealer1value,
    });
}

/*
#dealer1 { left: 385px; top: 2%;}
    #dealer2 { left: 455px; top: 2%; }
    #dealer3 { left: 525px; top: 2%; }
    #dealer4 { left: 595px; top: 2%; }
    #dealer5 { left: 665px; top: 2%; }
    #player1 { left: 385px; top: 260px; }
    #player2 { left: 400px; top: 260px; }
    #player3 { left: 445px; top: 260px; }
    #player4 { left: 475px; top: 260px; }
    #player5 { left: 505px; top: 260px; }
*/

/*
if (userId != ''){
        fetch(`/incrementTokens/${userId}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                // Add authentication headers if needed
            },
        })
        .then(response => response.json())
        .then(data => {
            
            if (data.message){
                stored = state;
                setState(PAUSE);
                audio.pause();
                map.draw(ctx);
                dialog("Add More Tokens to Play");           
                console.error('Error:', data.message);
            } else {
                updateUIWithNewTokens(data.tokens);

                startNewGame();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

*/


function checkThenStartGame() {
    const betElement = document.getElementById('bet');
    const betValue = parseInt(betElement.value, 10); // Get the bet value from the element

    if (userId !== '' && !isNaN(betValue)) {
        // Step 1: Fetch current token balance
        fetch(`/getTokens/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            const currentTokens = data.tokens;
            console.log(currentTokens);
            console.log(betValue);

            // Step 2: Check if user has enough tokens
            if (currentTokens >= betValue) {
                // Step 3: Deduct tokens if sufficient
                fetch(`/finalTokens/${userId}?valueToUpdate=${-betValue}`, {  // Negative to decrement tokens
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        console.error('Error:', data.message);
                    } else {
                        updateUIWithNewTokens(data.tokens);  // Update UI with new token count
                        startGame();  // Start the game after updating tokens
                    }
                })
                .catch(error => {
                    console.error('Error updating tokens:', error);
                });
            } else {
                console.error('Not enough tokens to place the bet.');
            }
        })
        .catch(error => {
            console.error('Error fetching tokens:', error);
        });
    } else {
        console.error('Invalid bet value or user ID.');
    }
}



function startGame() {
    reset_cards()
    if (!gameInProgress) {
        var betText = betInput.val();
        if (!betText.match(/^[0-9]+$/) || betText < 1 || betText > 10) {
            flashAlert("Bet must be a number between 1 and 10");
            message.html("Bet must be a number between 1 and " + money + 
                 ".<br>Fix this problem and press New Game again.");
            $("#betdiv").effect("shake"); // jQuery UI method
            return;
        }
        betInput.prop("disabled", true);
        bet = Number(betText);

        

        //twox.prop("disabled", true);
        for (var i = 1; i <= 5; i++) {
            playerCards[i].cardContainer.style.display = "none";
            playerCards[i].setFaceDown();
            dealerCards[i].cardContainer.style.display = "none";
            dealerCards[i].setFaceDown();
        }
        message.html("Dealing Cards");
        deck.shuffle();
        dealerCards.count = 0;
        playerCards.count = 0;

        // Deal cards one by one
        dealCard(playerCards, function() {
            // First player's card dealt
            dealCard(dealerCards, function() {
                // Dealer's first card dealt
                player_one()
                dealCard(playerCards, function() {
                    // Second player's card dealt
                    dealer_one()
                    dealCard(dealerCards, function() {
                        // Dealer's second card (face down) dealt
                        standButton.prop("disabled", false);
                        hitButton.prop("disabled", false);
                        doubleButton.prop("disabled", false);
                        newGameButton.prop("disabled", true);
                        gameInProgress = true;
                        var dealerTotal = getTotal(dealerCards);
                        var dealerTotalDisplay = getFirstDealerCardValue(dealerCards)
                        updateDisplayDealer(dealerTotalDisplay)
                        var playerTotal = getTotal(playerCards);
                        updateDisplay(playerTotal);
                        
                        if (dealerTotal === 21) {
                            if (playerTotal === 21)
                                endGame(false, "You both have Blackjack, but dealer wins on ties.");
                            else
                                endGame(false, "Dealer has Blackjack.");
                        } else if (playerTotal === 21) {
                            endGame(true, "You have Blackjack.");
                        } else {
                            message.html("You have " + playerTotal + ". Hit or Stand?");
                        }
                    }, true); // Last card for dealer, face down
                });
            });
        });
    }
}


function isBlackjack(hand) {
    return (hand.count === 2 && ((hand[1].card.value === 1 && hand[2].card.value >= 10) || (hand[1].card.value >= 10 && hand[2].card.value === 1)));
}


function endGame(win, why) {
    // Clear displays with delays
    setTimeout(function() {
        updateDisplayDealer('');
    }, 1500);
    setTimeout(function() {
        updateDisplay('');
    }, 1500);

    // Update message display
    message.html(
        why + (money > 0 ? "<br>Click New Game to play again." : "<br>Looks like you've run out of money!")
    );

    // Disable buttons
    standButton.prop("disabled", true);
    hitButton.prop("disabled", true);
    doubleButton.prop("disabled", true);
    newGameButton.prop("disabled", true);
    gameInProgress = false;

    // Flip last dealer card if it's face down
    if (dealerCards[2].faceDown) {
        dealerCards[2].cardContainer.style.display = "none";
        dealerCards[2].setFaceUp();
        $(dealerCards[2].cardContainer).slideDown(500, function() {
            handlePostGame();
        });
    } else {
        handlePostGame();
    }

    // Process win/loss and update money
    setTimeout(() => {
        let payout = 0;

        if (win) {
            if (isBlackjack(playerCards)) {
                payout = bet * 1.5; // 3:2 payout for blackjack
                money += payout;
                flashAlert("Blackjack! You win " + payout + " tokens!");
            } else {
                payout = bet * 2; // Regular win payout
                money += payout;
                flashAlert("You win " + payout + " tokens!");
            }
        } else {
            //payout = -bet;
            //money += payout; // Deduct bet amount on loss
            flashAlert("Sorry! You lose " + Math.abs(payout) + " tokens.");
        }

        // Save updated balance in local storage
        localStorage.setItem("balanceupdate", money);

        // Optionally, update user balance on the server
        updateUserBalanceOnServer(payout);

    }, 900);
}

// Optional function to update user balance on the server
function updateUserBalanceOnServer(payout) {
    if (userId) {
        fetch(`/finalTokens/${userId}?valueToUpdate=${payout}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.error('Error updating balance:', data.message);
            } else {
                updateUIWithNewTokens(data.tokens); // Refresh UI with new token count
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}


function handlePostGame() {
    reset_cards()
    moneyDisplay.fadeOut(500, function() {
        moneyDisplay.html("$" + money);
        moneyDisplay.fadeIn(500, function() {
            localStorage.setItem("balanceupdate",money)
            if (money <= 0) {
                betInput.val("BUSTED");
                $("#moneyDisplay").effect("shake"); // jQuery UI method
            } else {
                if (bet > money)
                    betInput.val(money);
                standButton.prop("disabled", true);
                hitButton.prop("disabled", true);
                doubleButton.prop("disabled", true);
                newGameButton.prop("disabled", false);
                
            }
        });
    });


    setTimeout(() => {
        // Remove all dealer and player cards after the alert
        for (let i = 1; i <= 5; i++) {
        dealerCards[i].cardContainer.style.display = "none"; // Hide dealer cards
        playerCards[i].cardContainer.style.display = "none"; // Hide player cards
    }
    }, 1500); 
    
}

function dealersTurnAndEndGame() {
    message.html("Dealer's turn...");
    dealerCards[2].cardContainer.style.display = "none";
    dealerCards[2].setFaceUp();
    var takeNextCardOrFinish = function() {
       $(dealerCards[dealerCards.count].cardContainer).slideDown(500, function() {
          var dealerTotal = getTotal(dealerCards);
          setTimeout(function() {
            updateDisplayDealer(dealerTotal)
        }, 0);

          if (dealerCards.count < 5 && dealerTotal <= 16) {
              if (dealerCards.count == 2) {
                dealer_two()
              }
              if (dealerCards.count == 3) {
                dealer_three()
              }
              if (dealerCards.count == 4) {
                dealer_four()
              }
              dealerCards.count++;
              dealerCards[dealerCards.count].setCard(deck.nextCard());
              dealerCards[dealerCards.count].setFaceUp();
              
              takeNextCardOrFinish();
          }
          else if (dealerTotal > 21) {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            endGame(true, "Dealer has gone over 21."); // Ends the game immediately after setting the timeout
            }
          else if (dealerCards.count == 5) {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            endGame(false, "Dealer took 5 cards without going over 21."); // E timeout
            }
          else {
             var playerTotal = getTotal(playerCards);
             if (playerTotal > dealerTotal) {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            endGame(true, "You have " + playerTotal + ". Dealer has " + dealerTotal + "."); 
            }
             else if (playerTotal < dealerTotal) {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            endGame(false, "You have " + playerTotal + ". Dealer has " + dealerTotal + ".");
            }

             else {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            endGame(false, "You and the dealer are tied at " + playerTotal + ".");
            }

    
          }
       });
    };
    takeNextCardOrFinish();
}

function hit() {
   if (!gameInProgress) {
      return;
   }
   
   standButton.prop("disabled", true);
   doubleButton.prop("disabled", true);
   hitButton.prop("disabled", true);
   
   dealCard(playerCards, function() {
      var playerTotal = getTotal(playerCards);
      updateDisplay(playerTotal); // Update the display with the current total
      
      if (playerTotal > 21) {
         setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
         }, 1500);

         setTimeout(function() {
            updateDisplay(''); // Clears the player's display after 0.5s
         }, 1500);
         
         endGame(false, "YOU WENT OVER 21!");
      }
      else if (playerCards.length == 5) {  // Use length instead of count
        setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
         }, 1500);

         setTimeout(function() {
            updateDisplay(''); // Clears the player's display after 0.5s
         }, 1500);
         endGame(true, "You took 5 cards without going over 21.");
      }
      else if (playerTotal == 21) {
         dealersTurnAndEndGame();
      }
      else {
         message.html("You have " + playerTotal + ". Hit or Stand?");
         hitButton.prop("disabled", false);
         doubleButton.prop("disabled", false);
         standButton.prop("disabled", false);
      }
   });
}


function TwoX() {
    // Get the current bet value
    let currentBet = parseFloat($("#bet").val());

    // Check if the current bet is a number and within the allowed range
    if (!isNaN(currentBet) && currentBet > 0) {
        // Only double the bet if it's 5 or less
        if (currentBet <= 5) {
            // Double the bet
            let newBet = currentBet * 2;
            /** go herre **************** */
            // Update the bet display
            updateBetDisplay(newBet);
        } else {
            flashAlert("Bet can not exceed 10 Tokens");
        }
    } else {
        alert("Please enter a valid bet amount greater than 0.");
    }
}



// Double down
function doubledown() { 
    if (!gameInProgress) return;

    

    if (playerCards.count > 2) {
        message.html("You can only double down with two cards.");
        flashAlert("You can only double down with two cards!");
        return;
    }


    const betElement = document.getElementById('bet');
    const betValue = parseInt(betElement.value, 10); // Get the bet value from the element
    if (userId !== '' && !isNaN(betValue)) {
        fetch(`/getTokens/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            const currentTokens = data.tokens;
            console.log(currentTokens);
            console.log(betValue);
     
    var newBet = bet * 2; 
    if (newBet > currentTokens) {
        message.html("You do not have enough money to double down!");
        $("#betdiv").effect("shake"); // jQuery UI method
        flashAlert("You do not have enough money to double down!");
        return;
    }

    standButton.prop("disabled", true);
    hitButton.prop("disabled", true);
    doubleButton.prop("disabled", true);

    bet = newBet;
    updateBetDisplay(bet); 

    dealCard(playerCards, function() {
        var playerTotal = getTotal(playerCards);
        updateDisplay(playerTotal); // Update the display with the current total
        if (playerTotal > 21) {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            endGame(false, "YOU WENT OVER 21!");
        } else if (playerCards.count == 5) {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            endGame(true, "You took 5 cards without going over 21.");
        } else if (playerTotal == 21) {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            dealersTurnAndEndGame();
        } else {
            setTimeout(function() {
            updateDisplayDealer(''); // Clears the dealer's display after 0.5s
            }, 1500);
            setTimeout(function() {
            updateDisplay(''); // Clears the dealer's display after 0.5s
            }, 1500);
            dealersTurnAndEndGame();
            
        }
    });
});
}
}

// Function to update the displayed bet amount
function updateBetDisplay(bet) {
    $("#bet").val(bet); // Update the bet input field
}

function stand() {
   if (!gameInProgress)
      return;
   hitButton.prop("disabled", true);
   doubleButton.prop("disabled", true);
   standButton.prop("disabled", true);

   var playerTotal = getTotal(playerCards);
   updateDisplay(playerTotal); // Update the display with the current total
   dealersTurnAndEndGame();
}

function flashAlert(message) {
    // Create a div for the alert
    const alertDiv = $('<div></div>');
    alertDiv.html(message);
    alertDiv.css({
        position: 'absolute',
        top: '47%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(100, 149, 237)',
        color: 'white',
        padding: '20px',
        borderRadius: '5px',
        zIndex: '1000',
        fontSize: '24px',
        textAlign: 'center',
        opacity: '1'
    });

    if (window.matchMedia('(min-width: 700px)').matches) {
    alertDiv.css({
        width: '635.2px', // or any desired width
        height: '350px',
        position: 'relative',
        bottom: '268px',
        display: 'flex', // Enable Flexbox
        alignItems: 'center', // Vertically center the content
        justifyContent: 'center', // Horizontally center the content
        textAlign: 'center',
    });
    } 

    $('body').append(alertDiv);

    // Flash effect
    alertDiv.fadeTo(1200, 0, function() {
        $(this).remove(); // Remove the alert after fading out
    });

}
/*
let hasMovedCards2 = false;
let hasMovedCards = false; // Flag to track if cards have been moved
let lastWidth = window.innerWidth; // Track the last known width
let cardsDealt = false;

function handleSmallScreen() {
    // Check if the cards have already been moved
    if (hasMovedCards) return;
    

    // Move each dealer card 200px to the left
    dealer1.css({ left: parseInt(dealer1.css('left'), 10) - 200 + "px" });
    dealer2.css({ left: parseInt(dealer2.css('left'), 10) - 200 + "px" });
    dealer3.css({ left: parseInt(dealer3.css('left'), 10) - 200 + "px" });
    dealer4.css({ left: parseInt(dealer4.css('left'), 10) - 200 + "px" });
    dealer5.css({ left: parseInt(dealer5.css('left'), 10) - 200 + "px" });

    // Move each player card 200px to the left
    player1.css({ left: parseInt(player1.css('left'), 10) - 200 + "px" });
    player2.css({ left: parseInt(player2.css('left'), 10) - 200 + "px" });
    player3.css({ left: parseInt(player3.css('left'), 10) - 200 + "px" });
    player4.css({ left: parseInt(player4.css('left'), 10) - 200 + "px" });
    player5.css({ left: parseInt(player5.css('left'), 10) - 200 + "px" });

    // Set the flag to true to indicate cards have been moved
    hasMovedCards = true;
    hasMovedCards2 = false;
}


function handleLargeScreen() {
    // Check if the cards have already been moved
    if (hasMovedCards2) return;
    

    // Move each dealer card 200px to the right
    dealer1.css({ left: parseInt(dealer1.css('left'), 10) + 200 + "px" });
    dealer2.css({ left: parseInt(dealer2.css('left'), 10) + 200 + "px" });
    dealer3.css({ left: parseInt(dealer3.css('left'), 10) + 200 + "px" });
    dealer4.css({ left: parseInt(dealer4.css('left'), 10) + 200 + "px" });
    dealer5.css({ left: parseInt(dealer5.css('left'), 10) + 200 + "px" });

    // Move each player card 200px to the right
    player1.css({ left: parseInt(player1.css('left'), 10) + 200 + "px" });
    player2.css({ left: parseInt(player2.css('left'), 10) + 200 + "px" });
    player3.css({ left: parseInt(player3.css('left'), 10) + 200 + "px" });
    player4.css({ left: parseInt(player4.css('left'), 10) + 200 + "px" });
    player5.css({ left: parseInt(player5.css('left'), 10) + 200 + "px" });

    // Set the flag to true to indicate cards have been moved
    hasMovedCards2 = true;
    hasMovedCards = false; // Reset the first flag
    }


// Function to check screen size
function checkScreenSize() {
    const currentWidth = window.innerWidth;

    // Ensure the screen size checks only happen after cards have been dealt

    // Check if the screen size has crossed the threshold
    if (currentWidth < 700 && lastWidth >= 700) {
        handleSmallScreen();
    } else if (currentWidth >= 700 && lastWidth < 700) {
        handleLargeScreen();
    }

    // Update the last known width
    lastWidth = currentWidth;
}


// Set up event listener for window resize
window.addEventListener('resize', checkScreenSize);

// Initial check
checkScreenSize();
*/


$(document).ready(setup);

function updateUIWithNewTokens(tokens) {
    // Assuming you have an element to show the token balance
    const tokenDisplay = document.getElementById('tokenbalance');
    if (tokenDisplay) {
        tokenDisplay.textContent = `Tokens: ${tokens.toFixed(2)}`;
    }
}