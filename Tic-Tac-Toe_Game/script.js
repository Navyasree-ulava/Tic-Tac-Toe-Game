let boxes = document.querySelectorAll('.box');
let msg = document.querySelector('.msg');
let reset = document.querySelector('.reset-btn');
let count = 0;
let isWin = false;
let turnO = true;  // Player X, Player O
// create a 2D Array to store the winninng patterns
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// when we click on the buttons some action need to be performed that can done using event listeners
// add event listeners for each box in boxes nodeList using forEach loop

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        count++;
        console.log('The box was clicked');
        if(turnO){
            box.innerText = "O"; // Player O Turn
            box.style.color = 'red';
            turnO = false; // Mark as false for next turn
        }
        else{
            box.innerText = "X"; // Player X Turn
            box.style.color = 'rgb(124, 219, 29)';
            turnO = true; // Mark as true for next turn
        }
        box.disabled = true;

        // whenever we click a button we need to check if the player is he winning or not
        // we can do this by using a checkWinner Function

        checkWinner();
    })
});

const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
};

const showWinner = (pos1) => {
    // show msg when winner has won and display its css by adding the css msg-viewer class to it
    msg.innerText = `Congratulations! Player '${pos1}' has won`;
    msg.classList.add("msg-viewer");
    // after anyone has won, we should make sure to disable all the buttons so that game can't be continued
    disableBoxes();
};

const showTie = () => {
    msg.innerText = `The Game was a Tie, Play Again!`;
    msg.classList.add("msg-viewer");
};

const isTie = () => {
    if(!isWin)
    {
        showTie();
    }
};

const checkWinner = () => {

    for(pattern of winPatterns){
        //console.log(pattern);
        //console.log(pattern[0], pattern[1], pattern[2]);
        //console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        // we are checking each col of a pattern-row of winPatterns
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        // if all position texts are not empty then we can check if it is a winner
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                console.log(pos1+" has WON");
                showWinner(pos1);
                isWin = true;
                return;
            }
        }
    }
    if(count===9 && isWin==false)
    {
        isTie();
    }
};

const resetGame = () => {

    turnO = true;
    count = 0;
    isWin = false;
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    msg.classList.remove('msg-viewer');
    msg.innerText = "";
};

reset.addEventListener('click', resetGame);



