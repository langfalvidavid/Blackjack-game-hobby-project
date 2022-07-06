
const cardsDP = document.getElementById("cards") //div that cards are generated into
const sumDP = document.getElementById("sum") //Sum of cards
const messageDP = document.getElementById("message") //Message that is visible
const balance = document.getElementById("balance") //Player's balance

const newCardBtn = document.getElementById("new-card-btn") //Button that randomly generates a new card
const restartGameBtn = document.getElementById("restart-game-btn") //Button that restarts game
const stopBtn = document.getElementById("stop-btn") //Button that stops player action / starts dealer action

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
    if(inGame===true){
    let value = cardValue() //value of generated card
    //generating new elements for each card
    const img = document.createElement("img") 
    img.id="img"
    img.src ="cards/"+newCard //file path
    img.style.maxWidth="3rem"
    img.style.margin="0 5px "
    img.style.borderRadius="10px"
    img.style.animation.slice(0,1)
    document.getElementById("cards").appendChild(img) //pushing newly generated card into its place
    sumVal+=value
    sumDP.textContent=`Sum: ${sumVal}`//displaying current sum
    gameLogic() // decides whether player has lost or still in game
    newCard=randomCard() // pulling new card from deck
}
})

// ---- Game logic ----

let inGame = true //if false, game is over
let message = 
["Do you want to draw a new card? 😉",
"Congrats! You've got blackjack! 🥳",
"Sorry, you're out of the game! 😭"]
let win = false
function gameLogic(){
        if(sumVal<=21){messageDP.textContent=message[0]}
        else if(sumVal===21){messageDP.textContent=message[1]}
        else{
        messageDP.textContent=message[2]
        inGame=false
    }
}

// ---- Restart game button ----

//resetting game to its default stage
restartGameBtn.addEventListener("click",function(){
        messageDP.textContent="Draw a card to start the game! 😀"
        sumDP.textContent="Sum: 0"
        sumVal=0
        const deleteCards = document.getElementById("cards")
        //counting how many elements does the cards div have, then deleting them
        let childrenX = deleteCards.childElementCount
        for(let i=0;i<childrenX;i++){
            let del = document.getElementById("img")
            del.remove()
        inGame=true
    }
})

// ---- Stop button ----

let stopPressed=false //Basically the switch between gamestates
stopBtn.addEventListener("click",function(){
    if(sumVal<=21 && stopPressed===false){
        const finalBal = sumVal
        stopPressed=true
    }
    
})

// ---- Dealer system ----

function dealer(){
if(stopPressed){

}
}


//---- Balance system ----
function balanceSystem(){

}