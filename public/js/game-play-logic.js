// This file contains the main logic utilized during active gameplay, before the game is declared over

function dealCard(hand, location) {
	var cardDrawn = cardsInDeck.pop();
	hand.push(cardDrawn);
	var index = hand.length - 1;

	// Create card image for card, hide initially so it doesn't impact transition
	var cardImage = $("<img>").attr("class", "card").attr("src", "images/" + hand[index].src).hide();
	cardImage.attr("id", currentTurn + "-card-" + index);

	// To create stacked card effect
	if (index === 0) {
		cardImage.appendTo($(location)).show();
	} else if (index > 0) {
		cardImage.appendTo($(location)).offset({left: -60}).css("margin-right", -60).show();	
	} 
	if (hand[index].name === "ace" && currentTurn != "dealer") {
		playerHasAce = true;
	}
	// Note: tried to dry this out by putting totals as a param but couldn't get it working yet
	if (currentTurn === "player") {
		playerHandTotal += hand[index].value;
	} else if (currentTurn === "playerSplit") {
		playerSplitHandTotal += hand[index].value;
	} else if (currentTurn === "dealer") {
		dealerHandTotal += hand[index].value;
	}	
	// Second card only for dealer should show face down
	if (dealerHand.length === 2 && currentTurn === "dealer") {
		cardImage.attr("src", "images/card_back.png");
	}
	updateVisibleHandTotals();
	evaluateGameStatus();
}

function evaluateGameStatus() {
	// Player can only split or double down after first 2 cards drawn
	if (playerHand.length === 3 || dealerStatus === "hit") {
		disableButton(doubleDownButton);
		disableButton(splitButton);
	}
	if (currentTurn != "dealer") {
		if (playerHasAce === true) {
			if (currentTurn === "player") {  // Dry out by having params in here
				reviewAcesValue(playerHand, playerHandTotal);
			} else if (currentTurn === "playerSplit") {
				reviewAcesValue(playerSplitHand, playerSplitHandTotal);
			}	
		} else {
			isPlayerDone();
		}
	}		
	if (currentTurn === "dealer" && dealerStatus === "hit") {
		dealerPlay();
	}
}


// The purpose of this function is to detect when a turn should be shifted without the player
// needing to click "stand". This is also an important step for determining what the next move
// is if there is a split deck. 
function isPlayerDone() {
	if (splitGame === false && playerHandTotal >= 21) {
		gameOver();
	} else if (splitGame === true) {
		if (currentTurn === "player") {
			if (playerHandTotal === 21) {
				gameOver();
			// If it's a split game, we can't just game over on the first hand if the player goes over
			} else if (playerHandTotal > 21)
				changeHand(playerStatus); 
		} else if (currentTurn === "playerSplit") {
			if (playerSplitHandTotal === 21) {
				gameOver();
			} else if (playerSplitHandTotal > 21) {
				// If the player was under 21 in their first game, the dealer should play before gameover
				if (playerHandTotal < 21) { 
					changeHand(playerSplitStatus);
				} else {
					gameOver();
				}
			}
		}
	}
}

function changeHand(currentDeckStatus) {
	currentDeckStatus = "stand";
	if (currentTurn === "player") {		
		if (splitGame === true) {
			currentTurn = "playerSplit";
			// Scale down the player deck as we change turns, but only on split hand
			scaleDownDeck(playerGameBoard, playerHandTotalDisplay);
			enlargeDeck(playerSplitGameBoard, playerSplitHandTotalDisplay);
		} else if (splitGame === false) {
			currentTurn = "dealer";
			dealerStatus = "hit";
		}
	} else if (currentTurn === "playerSplit") {
		currentTurn = "dealer";
		dealerStatus = "hit";
	}
	evaluateGameStatus(); 
}

function dealerPlay() {
	flipHiddenCard();
	disableButton(standButton);
	disableButton(hitButton);
	disableButton(splitButton);
	
	// Check if dealer has an ace and should adjust its value
	reviewAcesValue(dealerHand, dealerHandTotal);

	// After ace adjustment, check if dealer busts
	if (dealerHandTotal > 21) {
		setTimeout(function(){
			gameOver();  // End the game if dealer busts
		}, 10);  // Give a slight delay before declaring game over
		return;  // Exit to prevent further dealer actions
	}

	// The below logic is based on standard blackjack rules
	if (dealerHandTotal < 17) {
		setTimeout(function(){
			dealCard(dealerHand, dealerGameBoard);
		}, 10);
	} else if (dealerHandTotal >= 17 && dealerHandTotal <= 21) {
		setTimeout(function(){
			dealerStatus = "stand";
			gameOver();  // End the game if the dealer stands with 17 or more
		}, 10);
	}
}


function reviewAcesValue(hand, total) {	
	if (total > 21) {
		// Reduce ace value for both the player and dealer
		if (hand.length > 0) {
			reduceAcesValue(hand);
			// Check if the total is still over 21 after reducing the ace value
			if (currentTurn === "player" || currentTurn === "playerSplit") {
				isPlayerDone();
			} else if (currentTurn === "dealer") {
				dealerPlay(); // Continue dealer play after adjusting ace value
			}
		}
	} else {
		if (currentTurn === "player" || currentTurn === "playerSplit") {
			isPlayerDone();
		}
	}
}

function reduceAcesValue(deck) {
	for (var i = 0; i < deck.length; i++) {  
		// Only reduce aces that are currently valued at 11
		if (deck[i].name === "ace" && deck[i].value === 11) {
			deck[i].value = 1;
			// Adjust the respective hand total (player or dealer)
			if (currentTurn === "player") {
				playerHandTotal -= 10;
			} else if (currentTurn === "playerSplit") {
				playerSplitHandTotal -= 10;
			} else if (currentTurn === "dealer") {
				dealerHandTotal -= 10;
			}
			updateVisibleHandTotals();
			Materialize.toast("Ace value changed from 11 to 1", 1500);
			break; // Only reduce one ace at a time
		}
	}
}
