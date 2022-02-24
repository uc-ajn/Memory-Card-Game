//Random Number  
let cardList = []
let seriesType = "0"
let data = ""
let cards = []
let time = 60;
let timeOut
let imageArr = [
    "./img/card1.png",
    "./img/card2.png",
    "./img/card3.png",
    "./img/card4.png",
    "./img/card5.png",
    "./img/card6.png",
    "./img/card7.png",
    "./img/card24.png",
    "./img/card9.png",
    "./img/card10.png",
    "./img/card11.png",
    "./img/card24.png",
    "./img/card13.png",
]

function init() {
    document.getElementById('time').innerHTML = `<span>${time}</span> Seconds`;
    generateRandomSet(2)
    if (seriesType == "0") {
        document.getElementById("newGameBtn").disabled = true;
        document.getElementById("newShowBtn").disabled = true;
    }
    if (cardList.length > 23) {
        setCards()
    }
}

function timeCounter() {
    time -= 1;
    document.getElementById('time').innerHTML = `<span id="remTime"> ${time} </span> Seconds Remaining`;
    if (time === 0) {
        timeOver()
    } 
}

function timeOver() {
    alert("Time Out. You loose the game!")
    clearInterval(timeOut);
    showAllCards()
}

function getCards() {
    cards = document.querySelectorAll(".memory-card");
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function setCards() {
    data = ""
    for (let i = 0; i < 24; i++) {
        data += `<div class="memory-card" data-framework="card${cardList[i]}">
    <img class="front-card" src="img/card${cardList[i]}.png" alt="front image">
    <img class="back-face" id="img${i}" src="img/game.png" alt="front image">
    </div>`
    }
    document.getElementById("cards").innerHTML = data;
}

function generateRandomSet(seriesType) {
    var finalList = []
    cardList = []
    for (let i = 0; i < seriesType; i++) {
        let subSet = []
        for (let i = 0; subSet.length < 24 / seriesType; i++) {
            var r = Math.floor(Math.random() * 24 / seriesType) + 1;
            if (subSet.indexOf(r) == -1) {
                subSet.push(r);
            }
        }
        finalList = finalList.concat(subSet)
    }
    cardList = cardList.concat(finalList)
    console.log(cardList)
}

function handleChange(src) {
    seriesType = src.value
    generateRandomSet(seriesType)
    setCards()
    getCards()
    selectSeries(src.value)
}

function newGame() {
    time = 60
    seriesType = "0"
    clearInterval(timeOut);
    var ele = document.getElementsByName("chooseSeries");
    for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false;
    }
    document.getElementById("s2").disabled = false;
    document.getElementById("s3").disabled = false;
    document.getElementById("s4").disabled = false;
    document.getElementById('time').innerHTML = `<span>${time}</span> Seconds`;
    document.getElementById("newShowBtn").disabled = true;
    hideAllCards()
    cards.forEach(card => card.removeEventListener('click', flipCard))
}

function showAllCards() {
    var cards = document.getElementsByClassName("memory-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].className += " flip";
    }
    clearInterval(timeOut);
}

function hideAllCards() {
    var cards = document.getElementsByClassName("memory-card");
    for (i = 0; i < cards.length; i++) {
        if (cards[i].className.indexOf('flip') != -1)
            cards[i].className = 'memory-card';
    }
}

function selectSeries(type) {
    if (type != 0) {
        document.getElementById("newGameBtn").disabled = false;
        document.getElementById("newShowBtn").disabled = false;
        document.getElementById("s2").disabled = true;
        document.getElementById("s3").disabled = true;
        document.getElementById("s4").disabled = true;
        timeOut = setInterval(timeCounter, 1000);
    }
}

let hasflippedCard = 1;
let lockBoard = false;
let firstCard, secondCard, thirdCard, fourthCard;

function flipCard() {
    this.classList.add('flip');
    if (seriesType == 2) {
        if (hasflippedCard == 1) {
            hasflippedCard = 2;
            firstCard = this;
        } else if (hasflippedCard == 2) {
            hasflippedCard = 1;
            secondCard = this;
            checkForMatch()
        }
    } else if (seriesType == 3) {
        if (hasflippedCard == 1) {
            hasflippedCard = 2;
            firstCard = this;
        } else if (hasflippedCard == 2) {
            hasflippedCard = 3;
            secondCard = this;
            checkForMatch()
        } else if (hasflippedCard == 3) {
            hasflippedCard = 1;
            thirdCard = this;
            checkForMatch()
        }
    } else if (seriesType == 4) {
        if (hasflippedCard == 1) {
            hasflippedCard = 2;
            firstCard = this;
        } else if (hasflippedCard == 2) {
            hasflippedCard = 3;
            secondCard = this;
            checkForMatch()
        } else if (hasflippedCard == 3) {
            hasflippedCard = 4;
            thirdCard = this;
            checkForMatch()
        } else if (hasflippedCard == 4) {
            hasflippedCard = 1;
            fourthCard = this;
            checkForMatch()
        }
    }
}

function checkForMatch() {
    if (seriesType == 2) {
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            disableCard();
        } else {
            unFlipCard()
        }
    } else if (seriesType == 3) {
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            if (firstCard.dataset.framework === thirdCard.dataset.framework) {
                disableCard();
            } else {
                unFlipCard()
            }
        } else {
            unFlipCard()
        }
    } else if (seriesType == 4) {
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            if (firstCard.dataset.framework === thirdCard.dataset.framework) {
                if (firstCard.dataset.framework === fourthCard.dataset.framework) {
                    disableCard();
                } else {
                    unFlipCard()
                }
            } else {
                unFlipCard()
            }
        } else {
            unFlipCard()
        }
    }
}

function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard)
    if (seriesType == 3) {
        thirdCard.removeEventListener('click', flipCard)
    } else if (seriesType == 4) {
        thirdCard.removeEventListener('click', flipCard)
        fourthCard.removeEventListener('click', flipCard)
    }

}

function unFlipCard() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        if (seriesType == 3) {
            thirdCard.classList.remove('flip');
        } else if (seriesType == 4) {
            thirdCard.classList.remove('flip');
            fourthCard.classList.remove('flip');
        }
    }, 500);
}

function setImage() {
    for (let index = 0; index < cardList.length; index++) {
        document.getElementById("img`${index}`").src = imageArr[cardList[index]]
    }
}

window.onload = init();

