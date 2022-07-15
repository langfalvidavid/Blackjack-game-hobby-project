
const cardsDP = document.getElementById("cards") //div that cards are generated into
const sumDP = document.getElementById("sum") //Sum of cards
const messageDP = document.getElementById("message") //Message that is visible
const balance = document.getElementById("balance") //Player's balance
const bet = document.getElementById("bet") //Bet amount
const errorMsg = document.getElementById("error-msg") //Error message

const newCardBtn = document.getElementById("new-card-btn") //Button that randomly generates a new card
const restartGameBtn = document.getElementById("restart-game-btn") //Button that restarts game
const stopBtn = document.getElementById("stop-btn") //Button that stops player action / starts dealer action

const bet10 = document.getElementById("bet-10")
const bet50 = document.getElementById("bet-50")
const bet100 = document.getElementById("bet-100")
const bet200 = document.getElementById("bet-200")

const cards = ["2_of_clubs.png","2_of_diamonds.png","2_of_hearts.png","2_of_spades.png",
            "3_of_clubs.png","3_of_diamonds.png","3_of_hearts.png","3_of_spades.png",
            "4_of_clubs.png","4_of_diamonds.png","4_of_hearts.png","4_of_spades.png",
            "5_of_clubs.png","5_of_diamonds.png","5_of_hearts.png","5_of_spades.png",
            "6_of_clubs.png","6_of_diamonds.png","6_of_hearts.png","6_of_spades.png",
            "7_of_clubs.png","7_of_diamonds.png","7_of_hearts.png","7_of_spades.png",
            "8_of_clubs.png","8_of_diamonds.png","8_of_hearts.png","8_of_spades.png",
            "9_of_clubs.png","9_of_diamonds.png","9_of_hearts.png","9_of_spades.png",
            "10_of_clubs.png","10_of_diamonds.png","10_of_hearts.png","10_of_spades.png",
            "ace_of_clubs.png","ace_of_diamonds.png","ace_of_hearts.png","ace_of_spades.png",
            "jack_of_clubs2.png","jack_of_diamonds2.png","jack_of_hearts2.png","jack_of_spades2.png",
            "king_of_clubs2.png","king_of_diamonds2.png","king_of_hearts2.png","king_of_spades2.png",
            "queen_of_clubs2.png","queen_of_diamonds2.png","queen_of_hearts2.png","queen_of_spades2.png"]  


// ---- Preloading images ----

let preloaded = 0;
 
function preLoader(e) {
    for (let i = 0; i < cards.length; i++) {
        let tempImage = new Image();
         
        tempImage.addEventListener("load", progress, true);
        tempImage.src = cards[i];
    }
}
 

//random card generator

function randomCard() {
    return cards[Math.floor(Math.random()*cards.length)]
    
}
let newCard = randomCard() //variable for the generated card (i.e. "2_of_clubs-min.jpg")

//function that gives the random card value
function cardValue() {
    if(newCard[0] === "2" || newCard[0] === "3" || newCard[0] === "4" || newCard[0] === "5" || newCard[0] === "6" 
        || newCard[0] === "7" || newCard[0] === "8" || newCard[0] === "9"  )
        {
            return Number(newCard[0])
        }
        else{
            let string = ""
            let i = 0;
            while(newCard[i] != '_'){
                string += newCard[i]
                i++
            }
            switch(string){
                case "10":return 10
                case "ace":return 11
                case "jack":return 10
                case "queen":return 10
                case "king":return 10
            }
        }
}

// ---- New card button ----

let sumVal = 0 //sum of cards
 newCardBtn.addEventListener("click", function() {
    if (totalBet != 0) {
    if (inGame && !stopPressed) {
    let value = cardValue() //value of generated card
    //generating new elements for each card
    cardsDP.insertAdjacentHTML("beforeend", `<img src="cards/${newCard}" id="img" alt="Player's card with value ${value}">`)
    sumVal += value
    sumDP.textContent = `Sum: ${sumVal}`//displaying current sum
    gameLogic() // decides whether player has lost or still in game
    newCard = randomCard() // pulling new card from deck
}}
else {
    messageDP.textContent = "Place your bets first!"
    messageDP.style.color = "red"
    setTimeout(() => { 
        messageDP.textContent = message[0]
        messageDP.style.color = "#fff" 
        }, 2000)
}
})



let inGame = true //if false, game is over
let message = 
["Do you want to draw a new card? 😉",
"Congrats! You've got blackjack! 🥳",
"Sorry, you're out of the game! 😭",
"Let's see the dealer's cards! 🤞",
"It's a draw! The dealer wins. 😤",
"Dealer is out! You win! 🥳",
"Sorry, you lost! 😥",
"Congrats! You won! 😃",
"You don't have enough balance!"
]

// ---- Game logic ----

let win = false
function gameLogic() {
        if (sumVal <= 21) {messageDP.textContent=message[0]}
        else if (sumVal === 21) {messageDP.textContent=message[1]}
        else {
        messageDP.textContent = message[2]
        inGame = false
        playerWon = false
        balanceSystem()
    }
}

// ---- Restart game button ----

//resetting the game to its default stage
restartGameBtn.addEventListener("click", function() {
        messageDP.textContent = "Draw a card to start the game! 😀"
        sumDP.textContent = "Sum: 0"
        sumVal = 0
        dealerSum = 0
        //counting how many elements does the cards div have, then deleting them
        let playerChildren = cardsDP.childElementCount
        for(let i = 0; i < playerChildren; i++) {
            let del = document.getElementById("img")
            del.remove()
    }
        bet.textContent = "Bet: 0"
        totalBet = 0
        inGame = true
        stopPressed = false
        playerWon = false
})

// ---- Stop button ----
let stopPressed = false //Basically the switch between gamestates
stopBtn.addEventListener("click", function() {
    if (sumVal <= 21 && stopPressed === false && sumVal != 0) {
        messageDP.textContent = message[3]
        stopPressed = true
        const separate = document.createElement("div")
        separate.id = "img"
        separate.style.margin = "0 30px"
        separate.style.display = "inline-block"
        separate.style.height = "100px"
        separate.style.width = "5px"
        separate.style.color = "#fff"
        separate.style.backgroundColor = "#fff"
        document.getElementById("cards").appendChild(separate)
        dealer()
    }
    
})

// ---- Dealer system ----


let dealerSum = 0
let playerWon
function dealer() {
if(stopPressed) {
    do {
        let value = cardValue() //value of generated card
        //generating new elements for each card
        cardsDP.insertAdjacentHTML("beforeend", `<img src="cards/${newCard}" id="img" alt="Player's card with value ${value}">`)
        dealerSum += value
        sumDP.textContent = `Sum: ${sumVal}   |   ${dealerSum}`//displaying current sum
        gameLogic() // decides whether player has lost or still in game
        newCard = randomCard() // pulling new card from deck
        
    }
    while (dealerSum < sumVal && dealerSum<20)
}
if (dealerSum > 21) {
    messageDP.textContent = message[5]
    playerWon = true
}
else if (dealerSum > sumVal) {
    messageDP.textContent = message[6]
    playerwon = false
}
else if (sumVal > dealerSum) {
    messageDP.textContent = message[7]
    playerWon = true
}
else {
    messageDP.textContent = message[4]
    playerWon = false
}
balanceSystem()
}

// ---- Bet increase buttons ----

let totalBet = 0
bet10.addEventListener("click", function() {
    if (totalBet + 10 <= totalBalance) {
        totalBet += 10
        bet.textContent = "Bet: " + totalBet
    }
    else {
        messageDP.textContent = message[8]
        messageDP.style.color = "red"
        setTimeout( () => { 
            messageDP.textContent = message[0]
            messageDP.style.color = "#fff" 
        }, 2000)
}})

bet50.addEventListener("click", function() {
    if (totalBet + 50 <= totalBalance) {
        totalBet += 50
        bet.textContent = "Bet: " + totalBet
    }
    else {
        messageDP.textContent = message[8]
        messageDP.style.color = "red"
        setTimeout( () => { 
            messageDP.textContent = message[0]
            messageDP.style.color = "#fff" 
            }, 2000)
}})

bet100.addEventListener("click", function() {
    if (totalBet + 100 <= totalBalance) {
        totalBet += 100
        bet.textContent = "Bet: " + totalBet}
    else {
        messageDP.textContent = message[8]
        messageDP.style.color = "red"
        setTimeout( () => { 
            messageDP.textContent = message[0]
            messageDP.style.color = "#fff" 
            }, 2000)
}})

bet200.addEventListener("click", function() {
    if (totalBet + 200 <= totalBalance) {
        totalBet += 200
        bet.textContent = "Bet: " + totalBet
    }
    else {
        messageDP.textContent = message[8]
        messageDP.style.color = "red"
        setTimeout( () => { 
            messageDP.textContent = message[0]
            messageDP.style.color = "#fff" 
            }, 2000)
    }
})


//---- Balance system ----

let totalBalance = 1000
function balanceSystem() {
if (playerWon === true) {
    totalBalance += totalBet
    balance.textContent = "Balance: " + totalBalance
}
else {
    totalBalance -= totalBet
    balance.textContent = "Balance: " + totalBalance
}
}