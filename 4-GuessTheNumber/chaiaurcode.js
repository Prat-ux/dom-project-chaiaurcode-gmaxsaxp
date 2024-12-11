let randomNumber = Math.ceil((Math.random())*100)

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField') 
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHigh = document.querySelector('.lowOrHi')
const StartOver = document.querySelector('.resultParas')

const p = document.createElement('p')


let prevGuess = []
let numGuess = 1

let playGame = true

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault()
        const guess = parseInt(userInput.value)
        // console.log(guess);
        
        validateGuess(guess)
    })
}

function validateGuess(guess){
    if(guess=='' || guess<1|| guess>100 || isNaN(guess)){
        alert(`Please enter a valid number`)
    }else {
        prevGuess.push(guess)
        if(numGuess===11){
            displayGuess(guess)
            displayMessage(`Game Over. Random number was ${randomNumber}`)
            endGame()
        }else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
        
}   

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`you guessed it right`)
        endGame()
    }else if(guess < randomNumber){
        displayMessage(`low`)
    }else if(guess > randomNumber){
        displayMessage(`high`)
    }
}

function displayGuess(guess){
    userInput.value =''
    guessSlot.innerHTML += `${guess}, `
    numGuess++
    remaining.innerHTML = `${11-numGuess}`
}

function displayMessage(message){
    lowOrHigh.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    userInput.value =''
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    StartOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        let randomNumber = Math.ceil((Math.random())*100)
        prevGuess=[]
        numGuess=1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11 - numGuess}`
        userInput.removeAttribute('disabled')
        StartOver.removeChild(p)
        playGame = true
    })
}