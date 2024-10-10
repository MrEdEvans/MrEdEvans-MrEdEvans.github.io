let deck, dealerHand, playerHand, playerHands, cash = 1000, bet = 25, wins = 0, losses = 0;

function createDeck() {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    deck = shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function newGame() {
    const betInput = document.getElementById('betAmount').value;
    bet = parseInt(betInput) || 25; // Default to $25 if input is invalid
    if (bet > cash) {
        document.getElementById('result').innerText = 'Bet exceeds available cash.';
        return;
    }
    createDeck();
    dealerHand = [drawCard(), drawCard()];
    playerHand = [drawCard(), drawCard()];
    playerHands = [playerHand];
    updateUI();
    document.getElementById('result').innerText = '';
}

function drawCard() {
    return deck.pop();
}

function hit() {
    playerHands[0].push(drawCard());
    updateUI();
    if (getHandValue(playerHands[0]) > 21) {
        document.getElementById('result').innerText = 'Bust! You lose.';
        cash -= bet;
        losses++;
        updateInfo();
    }
}

function stand() {
    while (getHandValue(dealerHand) < 17) {
        dealerHand.push(drawCard());
    }
    updateUI();
    const playerValue = getHandValue(playerHands[0]);
    const dealerValue = getHandValue(dealerHand);
    if (dealerValue > 21 || playerValue > dealerValue) {
        document.getElementById('result').innerText = 'You win!';
        cash += bet;
        wins++;
    } else if (playerValue < dealerValue) {
        document.getElementById('result').innerText = 'You lose.';
        cash -= bet;
        losses++;
    } else {
        document.getElementById('result').innerText = 'It\'s a tie.';
    }
    updateInfo();
}

function doubleDown() {
    if (cash < bet * 2) {
        document.getElementById('result').innerText = 'Not enough cash to double down.';
        return;
    }
    bet *= 2;
    hit();
    if (getHandValue(playerHands[0]) <= 21) {
        stand();
    }
    bet /= 2;
}

function split() {
    if (playerHand.length === 2 && playerHand[0].value === playerHand[1].value) {
        playerHands = [[playerHand[0]], [playerHand[1]]];
        playerHands[0].push(drawCard());
        playerHands[1].push(drawCard());
        updateUI();
    } else {
        document.getElementById('result').innerText = 'Cannot split.';
    }
}

function getHandValue(hand) {
    let value = 0;
    let aceCount = 0;
    for (let card of hand) {
        if (card.value === 'A') {
            aceCount++;
            value += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    }
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
}

function updateUI() {
    document.getElementById('dealer-cards').innerHTML = dealerHand.map(card => `<div class="card ${getSuitClass(card.suit)}">${card.value}${card.suit}</div>`).join('');
    document.getElementById('player-cards').innerHTML = playerHands[0].map(card => `<div class="card ${getSuitClass(card.suit)}">${card.value}${card.suit}</div>`).join('');
}

function updateInfo() {
    document.getElementById('cash').innerText = cash;
    document.getElementById('bet').innerText = bet;
    document.getElementById('wins').innerText = wins;
    document.getElementById('losses').innerText = losses;
}

function getSuitClass(suit) {
    switch (suit) {
        case '♠': return 'spades';
        case '♣': return 'clubs';
        case '♥': return 'hearts';
        case '♦': return 'diamonds';
    }
}

// Start a new game when the page loads
newGame();
