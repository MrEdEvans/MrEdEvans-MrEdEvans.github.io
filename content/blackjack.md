---
title: "Blackjack Game"
date: 2024-10-10T12:17:00Z
draft: false
---

# Blackjack Game V1.0.0

<div id="blackjack-game"></div>

<script src="/js/blackjack.js"></script>
<link rel="stylesheet" href="/css/blackjack.css">

    <div id="game">
        <h1>Blackjack</h1>
        <div id="dealer">
            <h2>Dealer's Hand</h2>
            <div id="dealer-cards"></div>
        </div>
        <div id="player">
            <h2>Your Hand</h2>
            <div id="player-cards"></div>
        </div>
        <div id="info">
            <p>Total Cash: $<span id="cash">1000</span></p>
            <p>Bet: $<input type="number" id="betAmount" value="25" min="1" step="1"></p>
            <p>Wins: <span id="wins">0</span> | Losses: <span id="losses">0</span></p>
        </div>
        <div id="controls">
            <button onclick="hit()">Hit</button>
            <button onclick="stand()">Stand</button>
            <button onclick="doubleDown()">Double Down</button>
            <button onclick="split()">Split</button>
            <button onclick="newGame()">New Game</button>
        </div>
        <div id="result"></div>
    </div>