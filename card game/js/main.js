//Simple Card Game

let deckId = ""
let deckCount = 0

class Players{
  constructor(cardValue, cardSuit, score){
    this.cardValue = cardValue
    this.cardSuit = cardSuit
    this.score = score
  }
}

let player1 = new Players(cardValue="", cardSuit="", score = 0)
let player2 = new Players(cardValue="", cardSuit="", score = 0)

console.log(player1.score)

updateScore(player1.score, player2.score)

const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

fetch(url)
.then(res => res.json())
.then(data => {
  console.log(data.deck_id)
  deckId = data.deck_id
  deckCount = data.remaining
  document.querySelector("#cardsRemainingCount").innerText = deckCount
})

// Event listener on button which calls upon 'deckofcard' api to draw 2 cards from the deck
document.querySelector('#drawButton').addEventListener('click', getCardFetch)

// Event listener on button click to retrieve a new deck
document.querySelector('#newDeckButton').addEventListener('click', getNewDeck)

function updateScore(score1, score2){
  document.querySelector("#player1Score").innerText = `Player 1 - Score: ${score1}` 
  document.querySelector("#player2Score").innerText = `Player 2 - Score: ${score2}`
}

function getCardFetch(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          if (data.error != "Not enough cards remaining to draw 2 additional"){
            console.log(data)
            document.querySelector("#p1cardimg").src = data.cards[0].image
            document.querySelector("#p2cardimg").src = data.cards[1].image
            document.querySelector("#cardsRemainingCount").innerText = data.remaining
            player1.cardValue = data.cards[0].value
            player2.cardValue = data.cards[1].value
            player1.cardSuit = data.cards[0].suit
            player2.cardSuit = data.cards[1].suit
            compareCards()
            updateScore(player1.score, player2.score)
            if (data.remaining == 0){
              if (player1.score > player2.score){
                alert("Player 1 won, drawing a new deck")
              }
              else if (player2.score > player1.score){
                alert("Player 2 won, drawing a new deck")
              }
              else{
                alert("It was a draw, drawing a new deck")
              }
              getNewDeck()
            }
          }
          else if (data.error == "Not enough cards remaining to draw 2 additional"){            
            getNewDeck()
          }

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function getNewDeck(){
  const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data.deck_id)
    deckId = data.deck_id
    deckCount = data.remaining
    document.querySelector("#cardsRemainingCount").innerText = deckCount
    document.querySelector("#p1cardimg").src = ""
    document.querySelector("#p2cardimg").src = ""
    resetScore()
    updateScore(player1.score, player2.score)
  })
  alert("Fetched a new deck!")
}

arrayCardValue = ["1", "2", "3" ,"4", "5","6", "7", "8" ,"9", "10","JACK", "QUEEN", "KING" ,"ACE"]
arraySuit = ["DIAMONDS", "CLUBS", "HEARTS", "SPADES"]

function compareCards(){
  if (player1.cardValue == player2.cardValue){
    let player1SuitArrayIndex = arraySuit.indexOf(player1.cardSuit)
    let player2SuitArrayIndex = arraySuit.indexOf(player2.cardSuit)
    if (player1SuitArrayIndex > player2SuitArrayIndex){
      player1.score +=1
    }
    else{
      player2.score +=1
    }
  }
  else {
    let player1ValueArrayIndex = arrayCardValue.indexOf(player1.cardValue)
    let player2ValueArrayIndex = arrayCardValue.indexOf(player2.cardValue)
    if (player1ValueArrayIndex > player2ValueArrayIndex){
      player1.score +=1
    }
    else{
      player2.score +=1
    }
  }
}

function resetScore(){
  player1.score = 0
  player2.score = 0
}

function player1Won(){
  console.log("RAN?")
  return (player1.score > player2.score)
}
