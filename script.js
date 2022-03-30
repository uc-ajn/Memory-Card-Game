const TOTAL_CARDS = 24;
const ALLOWED_TIME = 60;
const SERIES_TWO = document.getElementById("s2")
const SERIES_THREE = document.getElementById("s3")
const SERIES_FOUR = document.getElementById("s4")
let counter = ALLOWED_TIME;
let card_list = []
let series_type = "0"
let data = ""
let cards = []
let time_out

function init() {
    document.getElementById('time').innerHTML = `<span>${ALLOWED_TIME}</span> Seconds`;
    generateRandomSet(2)
    if (series_type == "0") {
        document.getElementById("newGameBtn").disabled = true;
        document.getElementById("newShowBtn").disabled = true;
    }
    setCards()
}

function timeCounter() {
    counter -= 1;
    document.getElementById('time').innerHTML = `<span id="remTime"> ${counter} </span> Seconds Remaining`;
    if (counter === 0) {
        timeOver()
    }
}

function timeOver() {
    alert("Time Out. You loose the game!")
    clearInterval(time_out);
    showAllCards()
}

function getCards() {
    cards = document.querySelectorAll(".memory-card");
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function setCards() {
    data = ""
    for (let i = 0; i < TOTAL_CARDS; i++) {
        data += `<div class="memory-card" data-framework="card${card_list[i]}">
    <img class="front-card" src="img/card${card_list[i]}.png" alt="front image">
    <img class="back-face" id="img${i}" src="img/game.png" alt="front image">
    </div>`
    }
    document.getElementById("cards").innerHTML = data;
}

function generateRandomSet(series_type) {
    var finalList = []
    card_list = []
    for (let i = 0; i < series_type; i++) {
        let subSet = []
        for (let i = 0; subSet.length < TOTAL_CARDS / series_type; i++) {
            var r = Math.floor(Math.random() * TOTAL_CARDS / series_type) + 1;
            if (subSet.indexOf(r) == -1) {
                subSet.push(r);
            }
        }
        finalList = finalList.concat(subSet)
    }
    card_list = card_list.concat(finalList)
}

function handleChange(src) {
    series_type = src.value
    generateRandomSet(series_type)
    setCards()
    getCards()
    selectSeries(src.value)
}

function newGame() {
    series_type = "0"
    clearInterval(time_out);
    var ele = document.getElementsByName("chooseSeries");
    for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false;
    }
    SERIES_TWO.disabled = false;
    SERIES_THREE.disabled = false;
    SERIES_FOUR.disabled = false;
    document.getElementById('time').innerHTML = `<span>${ALLOWED_TIME}</span> Seconds`;
    document.getElementById("newShowBtn").disabled = true;
    hideAllCards()
    cards.forEach(card => card.removeEventListener('click', flipCard))
}

function showAllCards() {
    var cards = document.getElementsByClassName("memory-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].className += " flip";
    }
    clearInterval(time_out);
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
        SERIES_TWO.disabled = true;
        SERIES_THREE.disabled = true;
        SERIES_FOUR.disabled = true;
        time_out = setInterval(timeCounter, 1000);
    }
}

let flip_card = 1;
let lock_board = false;
let cards_to_match = {}

function flipCard() {
    this.classList.add('flip');
    switch (series_type) {
        case "2":
            if (flip_card == 1) {
                flip_card = 2;
                cards_to_match = {[series_type]:[this]}
            } else if (flip_card == 2) {
                flip_card = 1;
                cards_to_match[series_type].push(this)
                checkForMatch()
            }
            break;
        case "3":
            if (flip_card == 1) {
                flip_card = 2;
                cards_to_match = {[series_type]:[this]}
            } else if (flip_card == 2) {
                flip_card = 3;
                cards_to_match[series_type].push(this)
                checkForMatch()
            } else if (flip_card == 3) {
                flip_card = 1;
                cards_to_match[series_type].push(this)
                checkForMatch()
            }
            break;
        case "4":
            if (flip_card == 1) {
                flip_card = 2;
                cards_to_match = {[series_type]:[this]}
            } else if (flip_card == 2) {
                flip_card = 3;
                cards_to_match[series_type].push(this)
                checkForMatch()
            } else if (flip_card == 3) {
                flip_card = 4;
                cards_to_match[series_type].push(this)
                checkForMatch()
            } else if (flip_card == 4) {
                flip_card = 1;
                cards_to_match[series_type].push(this)
                checkForMatch()
            }
            break;
            default: 
                console.log("Please Select series type");
    }
}

function checkForMatch() {
    if (series_type == 2 && cards_to_match[series_type].length>1) {
        if (cards_to_match[series_type][0].dataset.framework === cards_to_match[series_type][1].dataset.framework) {
            disableCard();
        } else {
            unFlipCard()
        }
    } else if (series_type == 3) {
        if (cards_to_match[series_type][0].dataset.framework === cards_to_match[series_type][1].dataset.framework) {
            if (cards_to_match[series_type][0].dataset.framework === cards_to_match[series_type][2].dataset.framework) {
                disableCard();
            } else {
                unFlipCard()
            }
        } else {
            unFlipCard()
        }
    } else if (series_type == 4) {
        if (cards_to_match[series_type][0].dataset.framework === cards_to_match[series_type][1].dataset.framework) {
            if (cards_to_match[series_type][0].dataset.framework === cards_to_match[series_type][2].dataset.framework) {
                if (cards_to_match[series_type][0].dataset.framework === cards_to_match[series_type][3].dataset.framework) {
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
    cards_to_match[series_type][0].removeEventListener('click', flipCard);
    cards_to_match[series_type][1].removeEventListener('click', flipCard)
    if (series_type == 3) {
        cards_to_match[series_type][2].removeEventListener('click', flipCard)
    } else if (series_type == 4) {
        cards_to_match[series_type][2].removeEventListener('click', flipCard)
        cards_to_match[series_type][3].removeEventListener('click', flipCard)
    }

}

function unFlipCard() {
    setTimeout(() => {
        cards_to_match[series_type][0].classList.remove('flip');
        cards_to_match[series_type][1].classList.remove('flip');
        if (series_type == 3) {
            cards_to_match[series_type][2].classList.remove('flip');
        } else if (series_type == 4) {
            cards_to_match[series_type][2].classList.remove('flip');
            cards_to_match[series_type][3].classList.remove('flip');
        }
    }, 500);
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onload = init();

