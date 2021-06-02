/*mảng chứa ảnh của game*/
const deckCards = ["boom.png","boom.png","boss.png","boss.png", "green.png","green.png",
    "mario.png","mario.png", "mega.png","mega.png","mushroom.png","mushroom.png",
    "red.png","red.png","super.png","super.png"];
/*truy cập ul của lớp deck*/
const deck = document.querySelector(".deck");
/*tạo mảng lưu các thẻ đã mở*/
let opened = [];
/*tạo mảng để lưu các thẻ match*/
let matched = [];
/*truy cập vào phương thức*/
const modal = document.getElementById("modal");
/*truy cập vào nút reset*/
const reset = document.querySelector(".reset");
/*truy cập vào nút playagain*/
const playAgain = document.querySelector(".play-again-btn");
/*chọn bộ đếm số bước lật*/
const movesCount = document.querySelector(".moves-counter");
/*tạo biến cho bộ đếm moves bắt đầu =0*/
let moves = 0;
/*truy cập vào ul cho phần xếp hạng*/
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 3;
/*gắn thẻ cho bộ đếm thời gian*/
const timeCounter = document.querySelector(".timer");
/*khởi tạo bộ đếm*/
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false; /*dùng cho sự kiện click*/
/*hàm xáo trộn ảnh của mảng*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*khi bắt đầu game tạo các thẻ li và img rồi thêm vào thẻ ul thứ tự ảnh đã trộn*/
function startGame() {
    const shuffledDeck = shuffle(deckCards);

    for (let i = 0; i < shuffledDeck.length; i++) {
        const liTag = document.createElement('LI');
        liTag.classList.add('card');
        const addImage = document.createElement("IMG");
        liTag.appendChild(addImage);
        addImage.setAttribute("src", "image/" + shuffledDeck[i] + "?raw=true");
        deck.appendChild(liTag);
    }
}


/*xóa hết các thẻ li và img đã tạo*/
function removeCard() {
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}
/*cập nhật bộ đếm thời gian, hàm được gọi khi nhấp vào ảnh đầu tiên*/
function timer() {
    time = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs" ;
    }, 1000);
}

/*dừng bộ đếm thời gian khi người chơi hoàn thành*/
function stopTime() {
    clearInterval(time);
}
/*đặt lại hết các biến toàn cục và các nội dung đánh giá*/
function resetEverything() {

    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";

    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount = 3;
    moves = 0;
    movesCount.innerHTML = 0;
    matched = [];
    opened = [];
    /*xóa desk*/
    removeCard();
    /*tạo desk mới*/
    startGame();
}

/*tăng bộ đếm mỗi khi so sánh 2 thẻ*/
function movesCounter() {
    movesCount.innerHTML ++;
    moves ++;
}
/*hàm đánh giá người chơi thang điểm 3 sao*/
function starRating() {
    if (moves === 14) {
        star[2].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
    if (moves === 18) {
        star[1].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
}

/*so sánh 2 thẻ xem có giống nhau k*/
function compareTwo() {
    /*khi có 2 thẻ trong mảng*/
    if (opened.length === 2) {
        /*vô hiệu các click trên các thẻ khác*/
        document.body.style.pointerEvents = "none";
    }
   /* check 2 thẻ giống nhau*/
    if (opened.length === 2 && opened[0].src === opened[1].src) {
        /*nếu 2 ảnh giống nhau gọi hàm match */
        match();
    } else if (opened.length === 2 && opened[0].src != opened[1].src) {
        /*nếu 2 ảnh k giống nhau gọi hàm noMatch*/
        noMatch();
    }
}
/*nếu 2 thẻ giống nhau giữ 2 thẻ mở*/
function match() {
/*truy cập vào 2 thẻ trong mảng opened và gắn class = "match"*/
    setTimeout(function() {
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        /*đưa 2 thẻ trùng vào mảng matched*/
        matched.push(...opened);
        /*cho phép tiếp tục nhấp chuột*/
        document.body.style.pointerEvents = "auto";
        /*kiểm tra đủ 8 cặp thẻ được mở chưa*/
        winGame();
        /*đặt lại mảng*/
        opened = [];
    }, 600);
    /*tăng bộ đếm moves*/
    movesCounter();
    starRating();
}
/*nếu 2 thẻ không giống nhau loại bỏ khỏi mảng opened lật lại thẻ*/
function noMatch() {
/*sau 1 thời gian 2 thẻ sẽ bị xóa class="flip" trong thẻ li*/
    setTimeout(function() {
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        /*cho phép nhấp chuột vào thẻ*/
        document.body.style.pointerEvents = "auto";
        opened = [];
    }, 700);
    /*tăng bộ đếm*/
    movesCounter();
    starRating();
}
/*xếp hạng*/
function AddStats() {
    const stats = document.querySelector(".modal-content");
    for (let i = 1; i <= 3; i++) {
        /*tạo 3 đoạn văn bản*/
        const statsElement = document.createElement("p");
        /*thêm class cho thẻ p*/
        statsElement.classList.add("stats");
        stats.appendChild(statsElement);
    }
    /*chọn tất cả các thẻ p và cập nhật cho nội dung phương thức*/
      let p = stats.querySelectorAll("p.stats"); /*đặt 1 thẻ p chứa các nội dung thống kê*/
       p[0].innerHTML = "Time to complete: " + minutes + " Minutes and " + seconds + " Seconds";
    p[1].innerHTML = "Moves Taken: " + moves;
    p[2].innerHTML = "Your Star Rating is: " + starCount + " out of 3";
}
/*phương thức hiển thị khi chiến thắng game*/
function displayModal() {
    /*truy cập thẻ span (x) của phương thức*/
    const modalClose = document.getElementsByClassName("close")[0];
        /*khi thắng game phương thức được hiển thị*/
        modal.style.display= "block";
        /*khi click vào dấu (x) phương thức kết thúc*/
        modalClose.onclick = function() {
        modal.style.display = "none";
    };
        /*người chơi click ra vùng ngoài cũng có thể đóng*/
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
/*kiểm tra xem độ dài mảng matched = 16, khi đó dừng đếm thời gian, cập nhật bảng thống kê và hiển thị*/
function winGame() {
    if (matched.length === 16) {
        stopTime();
        AddStats();
        displayModal();
    }
}

/*trình lắng nghe sự kiện*/
/*nếu click vào thẻ gọi flipCard*/
deck.addEventListener("click", function(evt) {
    if (evt.target.nodeName === "LI") {
        /*check đang click đúng phần tử*/
        console.log(evt.target.nodeName + " Was clicked");
        /*bắt đầu chạy đếm thời gian ở click đầu tiên*/
        if (timeStart === false) {
            timeStart = true;
            timer();
        }
        flipCard();
    }
    /*hàm lật thẻ hiển thị hình ảnh*/
    function flipCard() {
        evt.target.classList.add("flip");
        /*khi thẻ li được click gắn thêm class="flip"*/
        addToOpened();
    }
    /*thêm các thẻ đã lật vào mảng opened*/
    function addToOpened() {
        /*nếu mảng có 0 hoặc 1 phần tử đẩy thêm vào mảng 1 phần tử*/
        if (opened.length === 0 || opened.length === 1) {
            opened.push(evt.target.firstElementChild);
        }
        compareTwo();
    }
});
/*khi click vào nút reset gọi hàm reset tất cả */
reset.addEventListener('click', resetEverything);
/*khi click vào nút playagain gọi hàm reset tất cả */
playAgain.addEventListener('click',function() {
    modal.style.display = "none";
    resetEverything();
});
/*hàm chơi nhạc*/
let m = document.getElementById("music");
function playmusic() {
    m.play();
}