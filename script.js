
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

const cards=["2_of_clubs-min.jpg","2_of_diamonds-min.jpg","2_of_hearts-min.jpg","2_of_spades-min.jpg",
            "3_of_clubs-min.jpg","3_of_diamonds-min.jpg","3_of_hearts-min.jpg","3_of_spades-min.jpg",
            "4_of_clubs-min.jpg","4_of_diamonds-min.jpg","4_of_hearts-min.jpg","4_of_spades-min.jpg",
            "5_of_clubs-min.jpg","5_of_diamonds-min.jpg","5_of_hearts-min.jpg","5_of_spades-min.jpg",
            "6_of_clubs-min.jpg","6_of_diamonds-min.jpg","6_of_hearts-min.jpg","6_of_spades-min.jpg",
            "7_of_clubs-min.jpg","7_of_diamonds-min.jpg","7_of_hearts-min.jpg","7_of_spades-min.jpg",
            "8_of_clubs-min.jpg","8_of_diamonds-min.jpg","8_of_hearts-min.jpg","8_of_spades-min.jpg",
            "9_of_clubs-min.jpg","9_of_diamonds-min.jpg","9_of_hearts-min.jpg","9_of_spades-min.jpg",
            "10_of_clubs-min.jpg","10_of_diamonds-min.jpg","10_of_hearts-min.jpg","10_of_spades-min.jpg",
            "ace_of_clubs-min.jpg","ace_of_diamonds-min.jpg","ace_of_hearts-min.jpg","ace_of_spades-min.jpg",
            "jack_of_clubs2-min.jpg","jack_of_diamonds2-min.jpg","jack_of_hearts2-min.jpg","jack_of_spades2-min.jpg",
            "king_of_clubs2-min.jpg","king_of_diamonds2-min.jpg","king_of_hearts2-min.jpg","king_of_spades2-min.jpg",
            "queen_of_clubs2-min.jpg","queen_of_diamonds2-min.jpg","queen_of_hearts2-min.jpg","queen_of_spades2-min.jpg"]  
//random card generator
function randomCard(){
    return cards[Math.floor(Math.random()*cards.length)]
    
}
let newCard=randomCard() //variable for the generated card (i.e. "2_of_clubs-min.jpg")

//function that gives the random card value
function cardValue(){
    if(newCard[0]==="2" || newCard[0]==="3" || newCard[0]==="4" || newCard[0]==="5" || newCard[0]==="6" 
        || newCard[0]==="7" || newCard[0]==="8" || newCard[0]==="9"  )
        {
            return Number(newCard[0])
        }
        else{
            let string=""
            let i=0;
            while(newCard[i]!='_'){
                string+=newCard[i]
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

let sumVal=0 //sum of cards
 newCardBtn.addEventListener("click",function() {
    if(totalBet!=0){
    if(inGame===true && stopPressed===false){
    let value = cardValue() //value of generated card
    //generating new elements for each card
    const img = document.createElement("img") 
    img.id="img"
    img.src ="cards/"+newCard //file path
    img.style.maxWidth="3rem"
    img.style.margin="0 5px "
    img.style.borderRadius="10px"
    document.getElementById("cards").appendChild(img) //pushing newly generated card into its place
    sumVal+=value
    sumDP.textContent=`Sum: ${sumVal}`//displaying current sum
    gameLogic() // decides whether player has lost or still in game
    newCard=randomCard() // pulling new card from deck
}}
else{
    messageDP.textContent="Place your bets first!"
    messageDP.style.color="red"
    setTimeout(() => { 
        messageDP.textContent=message[0]
        messageDP.style.color="#fff" 
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

// "The dealer has won! You've lost" + balInput + "! ☹️",
// "Congrats! You've won " + balInput*2 + "!"
]

// ---- Game logic ----

let win = false
function gameLogic(){
        if(sumVal<=21){messageDP.textContent=message[0]}
        else if(sumVal===21){messageDP.textContent=message[1]}
        else{
        messageDP.textContent=message[2]
        inGame=false
        playerWon=false
        balanceSystem()
    }
}

// ---- Restart game button ----

//resetting the game to its default stage
restartGameBtn.addEventListener("click",function(){
        messageDP.textContent="Draw a card to start the game! 😀"
        sumDP.textContent="Sum: 0"
        sumVal=0
        dealerSum=0
        const deleteCards = document.getElementById("cards")
        //counting how many elements does the cards div have, then deleting them
        let playerChildren = deleteCards.childElementCount
        for(let i=0;i<playerChildren;i++){
            let del = document.getElementById("img")
            del.remove()
    }
    bet.textContent="Bet: 0"
    totalBet=0
        inGame=true
        stopPressed=false
})

// ---- Stop button ----
let stopPressed=false //Basically the switch between gamestates
stopBtn.addEventListener("click",function(){
    if(sumVal<=21 && stopPressed===false && sumVal!=0){
        messageDP.textContent=message[3]
        stopPressed=true
        const separate = document.createElement("div")
        separate.id = "img"
        separate.style.margin="0 30px"
        separate.style.display="inline-block"
        separate.style.height="130px"
        separate.style.width="5px"
        separate.style.color="#fff"
        separate.style.backgroundColor="#fff"
        document.getElementById("cards").appendChild(separate)
        dealer()
    }
    
})

// ---- Dealer system ----

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

let dealerSum=0
let playerWon=false
function dealer(){
if(stopPressed){
    do{
        let value = cardValue() //value of generated card
        //generating new elements for each card
        const img = document.createElement("img") 
        img.id="img"
        img.src ="cards/"+newCard //file path
        img.style.maxWidth="3rem"
        img.style.margin="0 5px "
        img.style.borderRadius="10px"
        document.getElementById("cards").appendChild(img) //pushing newly generated card into its place
        dealerSum+=value
        sumDP.textContent=`Sum: ${sumVal}   |   ${dealerSum}`//displaying current sum
        gameLogic() // decides whether player has lost or still in game
        newCard=randomCard() // pulling new card from deck
    }
    while(dealerSum < sumVal && dealerSum<20)

    if(dealerSum>21){
        messageDP.textContent=message[5]
        playerWon=true
    }
    else if(dealerSum>sumVal){
        messageDP.textContent=message[6]
        playerwon=false
    }
    else if(sumVal>dealerSum){
        messageDP.textContent=message[7]
        playerWon=true
    }
    else{
        messageDP.textContent=message[4]
        playerWon=false
    }
    balanceSystem()
}
}

// ---- Bet increase buttons ----

let totalBet=0
bet10.addEventListener("click",function(){
    if(totalBet+10<=totalBalance){
        totalBet+=10
        bet.textContent="Bet: "+totalBet
    }
    else{
        messageDP.textContent=message[8]
        messageDP.style.color="red"
        setTimeout(() => { 
            messageDP.textContent=message[0]
            messageDP.style.color="#fff" 
            }, 2000)
}})

bet50.addEventListener("click",function(){
    if(totalBet+50<=totalBalance){
        totalBet+=50
        bet.textContent="Bet: "+totalBet
    }
    else{
        messageDP.textContent=message[8]
        messageDP.style.color="red"
        setTimeout(() => { 
            messageDP.textContent=message[0]
            messageDP.style.color="#fff" 
            }, 2000)
}})

bet100.addEventListener("click",function(){
    if(totalBet+100<=totalBalance){
        totalBet+=100
        bet.textContent="Bet: "+totalBet}
    else{
        messageDP.textContent=message[8]
        messageDP.style.color="red"
        setTimeout(() => { 
            messageDP.textContent=message[0]
            messageDP.style.color="#fff" 
            }, 2000)
}})

bet200.addEventListener("click",function(){
    if(totalBet+200<=totalBalance){
        totalBet+=200
        bet.textContent="Bet: "+totalBet
    }
    else{
        messageDP.textContent=message[8]
        messageDP.style.color="red"
        setTimeout(() => { 
            messageDP.textContent=message[0]
            messageDP.style.color="#fff" 
            }, 2000)
    }
})


//---- Balance system ----

let totalBalance = 1000
function balanceSystem(){
if(playerWon===true){
    totalBalance+=totalBet
    balance.textContent="Balance: " + totalBalance
}
else{
    totalBalance-=totalBet
    balance.textContent="Balance: " + totalBalance
}
}