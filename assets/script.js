const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS = [{
    name: 'paper', 
    emoji: '📃',
    beats: ['spock', 'rock']
  },
  {
    name: 'rock',
    emoji: '🪨',
    beats: ['lizard', 'scissors']

  },
  {
    name: 'scissors',
    emoji: '✂',
    beats: ['paper', 'lizard']
  },
  {
    name: 'lizard',
    emoji: '🦎',
    beats: ['paper', 'spock']
  },
  {
    name: 'spock',
    emoji: '🖖',
    beats: ['rock', 'scissors']
  },
]; 


/** Function that adds an event listener for clicks on each button and make the selection when clicked */
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

/**Function that determines the winner based on the selection */
function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)   
    
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)

}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
} 

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

/** This funtion checks if the oppponent selection beats your selection by returning the 'beats' value with 'name'
 *  value from the keys of the array obejcts. 
  */
 function isWinner(selection, opponentSelection) {
    return selection.beats.includes(opponentSelection.name);
  }
  
  const paper = SELECTIONS[0];
  const rock = SELECTIONS[1];
  const scissors = SELECTIONS[2];
  const lizard = SELECTIONS[3];
  const spock = SELECTIONS[4];

/**Function that randomizes the computers choice of the objects from the array by multiplying random number  from 
 * 0<1 with the arrays length.  */
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}