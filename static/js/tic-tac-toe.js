// Azure Cosmos DB configuration
// const cosmosConfig = {
//     endpoint: "YOUR_COSMOS_DB_ENDPOINT",
//     key: "YOUR_COSMOS_DB_PRIMARY_KEY",
//     databaseId: "YOUR_DATABASE_ID",
//     containerId: "YOUR_CONTAINER_ID"
// };

// Cosmos DB client setup
// const { CosmosClient } = require("@azure/cosmos");
// const client = new CosmosClient({
//     endpoint: cosmosConfig.endpoint,
//     key: cosmosConfig.key
// });

// const database = client.database(cosmosConfig.databaseId);
// const container = database.container(cosmosConfig.containerId);

const gameBoard = document.getElementById('game-board');
let currentPlayer = 'X';
let gameEnded = false;

// Example: Creating the game board dynamically
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', (event) => {
        if (!event.target.textContent && !gameEnded) {
            event.target.textContent = currentPlayer;
            if (checkWinner()) {
                gameEnded = true;
                // saveGameResult('Player X', 'Player O', currentPlayer);
                alert(`${currentPlayer} wins!`);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
    gameBoard.appendChild(cell);
}

// Function to check for a winner
function checkWinner() {
    const cells = document.querySelectorAll('.cell');
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        );
    });
}

// Function to save game result to Azure Cosmos DB
// async function saveGameResult(player1, player2, winner) {
//     const { resource: createdItem } = await container.items.create({
//         player1: player1,
//         player2: player2,
//         winner: winner
//     });
//     console.log(`Created item with id: ${createdItem.id}`);
// }
