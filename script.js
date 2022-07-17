
const cardsDP = document.getElementById("cards") //div that cards are generated into
const sumDP = document.getElementById("sum") //Sum of cards
const messageDP = document.getElementById("message") //Message that is visible
const balance = document.getElementById("balance") //Player's balance
const bet = document.getElementById("bet") //Bet amount
const errorMsg = document.getElementById("error-msg") //Error message
const dealerSumDP = document.getElementById("dealerSum") // dealer's sum display

const newCardBtn = document.getElementById("new-card-btn") //Button that randomly generates a new card
const restartGameBtn = document.getElementById("restart-game-btn") //Button that restarts game
const stopBtn = document.getElementById("stop-btn") //Button that stops player action / starts dealer action

const bet10 = document.getElementById("bet-10")
const bet50 = document.getElementById("bet-50")
const bet100 = document.getElementById("bet-100")
const bet200 = document.getElementById("bet-200")

const cards = [
{image:"2_of_clubs.png", value: 2},
{image:"3_of_clubs.png", value: 3},
{image:"4_of_clubs.png", value: 4},
{image:"5_of_clubs.png", value: 5},
{image:"6_of_clubs.png", value: 6},
{image:"7_of_clubs.png", value: 7},
{image:"8_of_clubs.png", value: 8},
{image:"9_of_clubs.png", value: 9},
{image:"2_of_diamonds.png", value: 2},
{image:"3_of_diamonds.png", value: 3},
{image:"4_of_diamonds.png", value: 4},
{image:"5_of_diamonds.png", value: 5},
{image:"6_of_diamonds.png", value: 6},
{image:"7_of_diamonds.png", value: 7},
{image:"8_of_diamonds.png", value: 8},
{image:"9_of_diamonds.png", value: 9},
{image:"2_of_hearts.png", value: 2},
{image:"3_of_hearts.png", value: 3},
{image:"4_of_hearts.png", value: 4},
{image:"5_of_hearts.png", value: 5},
{image:"6_of_hearts.png", value: 6},
{image:"7_of_hearts.png", value: 7},
{image:"8_of_hearts.png", value: 8},
{image:"9_of_hearts.png", value: 9},
{image:"2_of_spades.png", value: 2},
{image:"3_of_spades.png", value: 3},
{image:"4_of_spades.png", value: 4},
{image:"5_of_spades.png", value: 5},
{image:"6_of_spades.png", value: 6},
{image:"7_of_spades.png", value: 7},
{image:"8_of_spades.png", value: 8},
{image:"9_of_spades.png", value: 9},
{image:"10_of_spades.png", value: 10},
{image:"10_of_hearts.png", value: 10},
{image:"10_of_diamonds.png", value: 10},
{image:"10_of_clubs.png", value: 10},
{image:"ace_of_clubs.png", value: 11},
{image:"ace_of_diamonds.png", value: 11},
{image:"ace_of_hearts.png", value: 11},
{image:"ace_of_spades.png", value: 11},
{image:"jack_of_clubs2.png", value: 10},
{image:"jack_of_diamonds2.png", value: 10},
{image:"jack_of_hearts2.png", value: 10},
{image:"jack_of_spades2.png", value: 10},
{image:"king_of_clubs2.png", value: 10},
{image:"king_of_diamonds2.png", value: 10},
{image:"king_of_hearts2.png", value: 10},
{image:"king_of_spades2.png", value: 10},
{image:"queen_of_clubs2.png", value: 10},
{image:"queen_of_diamonds2.png", value: 10},
{image:"queen_of_hearts2.png", value: 10},
{image:"queen_of_spades2.png", value: 10},
]

// ---- Preloading images ----

let preloaded = 0;
 
function preLoader(e) {
    for (let i = 0; i < cards.length; i++) {
        let tempImage = new Image();
         
        tempImage.addEventListener("load", progress, true);
        tempImage.src = cards[i];
    }
}

//delay
 
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
 

//random card generator

function randomCard() {
    return cards[Math.floor(Math.random()*cards.length)]
    
}
let newCard = randomCard() //variable for the generated card (i.e. "2_of_clubs-min.jpg")

//function that gives the random card value
// function cardValue() {
//     if(newCard[0] === "2" || newCard[0] === "3" || newCard[0] === "4" || newCard[0] === "5" || newCard[0] === "6" 
//         || newCard[0] === "7" || newCard[0] === "8" || newCard[0] === "9"  )
//         {
//             return Number(newCard[0])
//         }
//         else{
//             let string = ""
//             let i = 0;
//             while(newCard[i] != '_'){
//                 string += newCard[i]
//                 i++
//             }
//             switch(string){
//                 case "10":return 10
//                 case "ace":return 11
//                 case "jack":return 10
//                 case "queen":return 10
//                 case "king":return 10
//             }
//         }
// }

// ---- New card button ----

let sumVal = 0 //sum of cards
let sumValWithAce = 0
let aceCounter = 0
let hasAce = false //if player pulls ace, we have to display 2 sums
 newCardBtn.addEventListener("click", function() {
    
    if (totalBet != 0) {
    if (inGame && !stopPressed) {
    let value = newCard.value //value of generated card
    //generating new elements for each card
    if(value===11){
        hasAce=true
        aceCounter++
    }
        
    cardsDP.insertAdjacentHTML("beforeend", `<img src="cards/${newCard.image}" id="img" alt="Player's card with value ${value}">`)
    if (hasAce) {
        sumVal += value
        sumValWithAce = sumVal - (aceCounter * 10)
        sumDP.textContent = `Sum: ${sumVal}  /  ${sumValWithAce}`//displaying current sum
    }
    else{
        sumVal += value
        sumDP.textContent = `Sum: ${sumVal}`//displaying current sum
    }
    console.log(value)
    console.log("aces: " + aceCounter)
    gameLogic() // decides whether player has lost or still in game
    newCard = randomCard() // pulling new card from deck
    bet10.style.display="none"
    bet50.style.display="none"
    bet100.style.display="none"
    bet200.style.display="none"
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
function gameLogic() {
        if (sumVal <= 21) {messageDP.textContent=message[0]}
        else if (sumVal === 21) {messageDP.textContent=message[1]}
        else if (!hasAce && sumVal > 21){
        messageDP.textContent = message[2]
        inGame = false
        playerWon = false
        balanceSystem()
        restartDisplayReverse()
    }
    else if (hasAce && sumValWithAce > 21){
        messageDP.textContent = message[2]
        inGame = false
        playerWon = false
        balanceSystem()
        restartDisplayReverse()
    }
    else if (!dealerAce && dealerSum > 21) {
        messageDP.textContent = message[5]
        inGame = false
        playerWon = false
        balanceSystem()
        restartDisplayReverse()
    }
    else if (dealerAce && dealerSumWithAce > 21) {
        messageDP.textContent = message[5]
        inGame = false
        playerWon = false
        balanceSystem()
        restartDisplayReverse()
    }
}

// ---- Restart game button ----
function restartDisplay(){
        bet10.style.display="block"
        bet50.style.display="block"
        bet100.style.display="block"
        bet200.style.display="block"
        newCardBtn.style.display="block"
        stopBtn.style.display="block"
        restartGameBtn.style.display="none"
}
function restartDisplayReverse(){
    bet10.style.display="none"
    bet50.style.display="none"
    bet100.style.display="none"
    bet200.style.display="none"
    newCardBtn.style.display="none"
    stopBtn.style.display="none"
    restartGameBtn.style.display="block"
}
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
        restartDisplay()
        hasAce = false
        dealerAce = false
        aceCounter = 0
        dealerAceCounter = 0
})

// ---- Stop button ----

let stopPressed = false //Basically the switch between gamestates
stopBtn.addEventListener("click", function() {
    if ((sumVal <= 21 || (hasAce && sumValWithAce<=21) ) && stopPressed === false && sumVal != 0) {
        messageDP.textContent = message[3]
        stopPressed = true
        const separate = document.createElement("div")
        separate.id = "img"
        separate.style.margin = "0 1em"
        separate.style.display = "inline-block"
        separate.style.height = "80%"
        separate.style.width = "5px"
        separate.style.color = "#fff"
        separate.style.backgroundColor = "#fff"
        separate.style.animation = "cardAnimation 1s"
        document.getElementById("cards").appendChild(separate)
        delay(1000).then(() => dealer())
    }
    
})

// ---- Dealer system ----

let dealerAceCounter = 0
let dealerSum = 0
let dealerAce = false
let dealerSumWithAce = 0
let playerWon
function dealer() {
if(stopPressed) {
    do { 
        let value = newCard.value //value of generated card
        if (value===11) {
            dealerAce = true
            dealerAceCounter++
        }
        //generating new elements for each card
       cardsDP.insertAdjacentHTML("beforeend",
             `<img src="cards/${newCard.image}" id="img" alt="Player's card with value ${value}">`)
        dealerSum += value
        dealerSumWithAce = dealerSum - (dealerAceCounter * 10)
            if(!hasAce && !dealerAce) {
                sumDP.textContent = `Sum: ${sumVal}      |      ${dealerSum}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
            else if (dealerAce && dealerSum <= 21){
                sumDP.textContent = `Sum: ${sumVal}      |      ${dealerSum}   /   ${dealerSumWithAce}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
            else if (dealerAce && dealerSum > 21){
                sumDP.textContent = `Sum: ${sumVal}      |      ${dealerSumWithAce}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
            else if((!dealerAce && hasAce) && (sumVal <= 21)) {
                sumDP.textContent = `Sum: ${sumVal}   /   ${sumValWithAce}      |      ${dealerSum}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
            else if ((!dealerAce && hasAce) && (sumVal > 21)){
                sumDP.textContent = `Sum: ${sumValWithAce}      |      ${dealerSum}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
            else if (dealerAce && ((sumVal < 21) && (dealerSum < 21))) {
                sumDP.textContent = `Sum: ${sumVal}   /   ${sumValWithAce}      |      ${dealerSum}   /   ${dealerSumWithAce}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
            else if (dealerAce && ((sumVal > 21) && (dealerSum < 21))){
                sumDP.textContent = `Sum: ${sumValWithAce}      |      ${dealerSum}   /   ${dealerSumWithAce}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
            else if (dealerAce && ((sumVal < 21) && (dealerSum > 21))){
                sumDP.textContent = `Sum: ${sumValWithAce}      |      ${dealerSumWithAce}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
            else if (dealerAce && ((sumVal > 21) && (dealerSum > 21))){
                sumDP.textContent = `Sum: ${sumValWithAce}      |      ${dealerSumWithAce}`//displaying current sum
                gameLogic() // decides whether player has lost or still in game
                newCard = randomCard() // pulling new card from deck
            }
        }
    while ((((dealerSum < sumVal) || (sumValWithAce > dealerSum)) && dealerSum<21) || (dealerAce && (dealerSumWithAce < sumVal) || (dealerSumWithAce < sumValWithAce)) )

if ((dealerSum > 21 && !dealerAce) || (dealerAce && dealerSumWithAce > 21)) {
    messageDP.textContent = message[5]
    playerWon = true
}
else if ((dealerSum > sumVal) || (hasAce && (dealerSum > sumValWithAce)) || dealerAce && ((dealerSumWithAce > sumVal) || (dealerSum > sumVal)) ) {
    messageDP.textContent = message[6]
    playerwon = false
}
else if ((sumVal > dealerSum) || (hasAce && (sumValWithAce > dealerSum)) || dealerAce && ((sumVal > dealerSumWithAce) || (sumVal > dealerSum) )) {
    messageDP.textContent = message[7]
    playerWon = true
}
else {
    messageDP.textContent = message[4]
    playerWon = false
}
balanceSystem()
newCardBtn.style.display="none"
stopBtn.style.display="none"
restartGameBtn.style.display="block"
}}

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