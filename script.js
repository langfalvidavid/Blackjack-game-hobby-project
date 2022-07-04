
const cardsDP = document.getElementById("cards")
const sumDP = document.getElementById("sum")
const messageDP = document.getElementById("message")
const newCardBtn = document.getElementById("new-card-btn")
const restartGameBtn = document.getElementById("restart-game-btn")
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

function randomCard(){
    return cards[Math.floor(Math.random()*cards.length)]
    
}
let newCard=randomCard()


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



let sumVal=0
let count=0
 newCardBtn.addEventListener("click",function() {
    if(inGame===true){
    count++
    let value = cardValue()
    const img = document.createElement("img");
    img.id="img"
    img.src ="cards/"+newCard
    img.style.maxWidth="3rem"
    img.style.margin="0 5px "
    document.getElementById("cards").appendChild(img)
    sumVal+=value
    sumDP.textContent=`Sum: ${sumVal}`
    gameLogic()
    newCard=randomCard()
}
})

let inGame = true
let message = 
["Do you want to draw a new card? 😉",
"Congrats! You've got blackjack! 🥳",
"Sorry, you're out of the game! 😭"]

function gameLogic(){
    messageDP.style.display="block"
    if(sumVal<=21){messageDP.textContent=message[0]}
    else if(sumVal===21){messageDP.textContent=message[1]}
    else{
        messageDP.textContent=message[2]
        inGame=false
    }
}

restartGameBtn.addEventListener("click",function(){
    if(inGame===false){
        messageDP.textContent="Draw a card to start the game! 😀"
        sumDP.textContent="Sum: 0"
        sumVal=0
        let deleteCards = document.getElementById("cards")
        let childrenX = deleteCards.childElementCount
        for(let i=0;i<childrenX;i++){
            let del = document.getElementById("img")
            del.remove()
        }


        inGame=true
    }
})