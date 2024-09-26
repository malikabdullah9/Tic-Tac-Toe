console.log("Welcome to Tic Tac Toe");
let audioturn = new Audio("click.m4a");
let audiowon = new Audio("won.wav");
let audiogameover = new Audio("over.wav");
let turn = "X";

// Function to change turn
const changeturn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check win
const checkWin = () => {
    let boxes = document.getElementsByClassName("boxtext");
    let winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Check for winning conditions
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText && boxes[a].innerText !== '') {
            document.querySelector('.info').innerText = boxes[a].innerText + " has won!";
            audiowon.play(); // Play win sound
            document.querySelector('.imgbox').style.display = 'block';
            document.getElementById('replayBtn').style.display = 'block';
            Array.from(boxes).forEach(box => {
                box.parentElement.style.pointerEvents = 'none'; 
            });

            // Show the winning line
            const winningLine = document.getElementById('winningLine');
            winningLine.style.display = 'block';

            // Determine the winning line style
            if (a === 0 && b === 1 && c === 2) {
                winningLine.classList.add('horizontal');
                winningLine.style.top = 'calc(100% / 3 * 1 + 10px)';
            } else if (a === 3 && b === 4 && c === 5) {
                winningLine.classList.add('horizontal');
                winningLine.style.top = 'calc(100% / 3 * 2 + 10px)';
            } else if (a === 6 && b === 7 && c === 8) {
                winningLine.classList.add('horizontal');
                winningLine.style.top = 'calc(100% / 3 * 3 + 10px)';
            } else if (a === 0 && b === 3 && c === 6) {
                winningLine.classList.add('vertical');
                winningLine.style.left = 'calc(100% / 3 * 0 + 10px)';
                winningLine.style.height = 'calc(100% - 20px)'; 
            } else if (a === 1 && b === 4 && c === 7) {
                winningLine.classList.add('vertical');
                winningLine.style.left = 'calc(100% / 3 * 1 + 10px)';
                winningLine.style.height = 'calc(100% - 20px)';
            } else if (a === 2 && b === 5 && c === 8) {
                winningLine.classList.add('vertical');
                winningLine.style.left = 'calc(100% / 3 * 2 + 10px)';
                winningLine.style.height = 'calc(100% - 20px)'; 
            } else if (a === 0 && b === 4 && c === 8) {
                winningLine.classList.add('diagonal');
                winningLine.style.transform = 'rotate(45deg)';
                winningLine.style.top = '0';
                winningLine.style.left = '0';
            } else if (a === 2 && b === 4 && c === 6) {
                winningLine.classList.add('diagonal');
                winningLine.style.transform = 'rotate(-45deg)';
                winningLine.style.top = '0';
                winningLine.style.left = '0';
            }

            return true;
        }
    }

    // Check for draw condition
    const isDraw = Array.from(boxes).every(box => box.innerText !== '');
    if (isDraw) {
        document.querySelector('.info').innerText = "It's a draw!";
        audiogameover.play(); 
        document.querySelector('.imgbox').style.display = 'block';
        document.getElementById('replayBtn').style.display = 'block';
        Array.from(boxes).forEach(box => {
            box.parentElement.style.pointerEvents = 'none'; 
        });
        return true;
    }

    return false;
};


// Game logic
let boxes = document.getElementsByClassName("box");
const initializeGame = () => {
    turn = "X"; 
    document.querySelector('.info').innerText = "Turn for " + turn; 
    document.querySelector('.imgbox').style.display = 'none'; 
    document.getElementById('replayBtn').style.display = 'none'; 

    // Clear the board
    Array.from(boxes).forEach(box => {
        box.querySelector('.boxtext').innerText = ''; 
        box.parentElement.style.pointerEvents = 'auto'; 
    });
};

// Add event listener to boxes
Array.from(boxes).forEach((element) => {
    element.addEventListener('click', () => {
        let boxtext = element.querySelector('.boxtext');
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            audioturn.play();
            if (!checkWin()) {
                turn = changeturn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Initialize game on page load
initializeGame();

// Add event listener for replay button
document.getElementById('replayBtn').addEventListener('click', () => {
    initializeGame(); 
})