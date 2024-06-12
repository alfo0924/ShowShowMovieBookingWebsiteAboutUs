var colors = ['#f60000', 'blue', 'green', '#ffffff', '#090909', '#efefa8'];
var currentIndex = 0;
var rgbText = document.getElementById('rgbText');
var navbar = document.querySelector('.navbar');
var navbarContent = document.querySelector('.offcanvas-body');
var footer = document.getElementById('footer');
var navbarTitle = document.querySelector('.offcanvas-title');

rgbText.addEventListener('click', function () {
    // 移除旧的文字颜色类
    document.querySelectorAll('.text-white').forEach(function (item) {
        item.classList.remove('text-white');
    });

    // 改变 navbar 主题的背景色
    navbar.style.backgroundColor = colors[currentIndex];
    // 改变 navbar 内容的背景色
    navbarContent.style.backgroundColor = colors[currentIndex];
    // 改变 footer 背景色
    footer.style.backgroundColor = colors[currentIndex];

    // 根据颜色选择设置不同的字体颜色
    if (colors[currentIndex] === '#ffffff') {
        document.body.style.color = 'black'; // 如果颜色是白色，则设置 body 文字颜色为黑色
        document.querySelectorAll('.navbar-nav .nav-link, .footer p, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.add('text-black'); // 添加黑色文字的 class
        });
    }
    else if (colors[currentIndex] === '#efefa8') {
        document.body.style.color = '#efefa8'; //
        document.querySelectorAll('.navbar-nav .nav-link, .footer p, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.add('text-black'); // 添加黑色文字的 class
        });
    }
    else {
        document.body.style.color = 'white'; // 设置 body 文字颜色为白色
        document.querySelectorAll('.navbar-nav .nav-link, .footer p, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.add('text-white'); // 添加白色文字的 class
        });
    }

    // 更新颜色索引
    currentIndex = (currentIndex + 1) % colors.length;
});

function dm() {
    var element = document.body;
    var navbar = document.querySelector('.navbar');
    var footer = document.getElementById('footer');

    element.classList.toggle("dark-mode");
    navbar.classList.toggle("navbar-light");

    if (element.classList.contains("dark-mode")) {
        document.body.style.color = 'white'; // 设置 body 文字颜色为白色
        document.querySelectorAll('.navbar-nav .nav-link, .footer p, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.add('text-white'); // 添加白色文字的 class
        });
    } else {
        document.body.style.color = 'black'; // 设置 body 文字颜色为黑色
        document.querySelectorAll('.navbar-nav .nav-link, .footer p, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.remove('text-white'); // 移除白色文字的 class
        });
    }
}

function vintage() {
    var element = document.body;
    var navbar = document.querySelector('.navbar');
    var footer = document.getElementById('footer');

    element.classList.toggle("vintage-mode");
    navbar.classList.toggle("navbar-light");
    if (element.classList.contains("vintage-mode")) {
        document.body.style.color = 'black'; // 设置 body 文字颜色为白色
        document.querySelectorAll('.navbar-nav .nav-link, .footer p, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.add('text-black'); // 添加白色文字的 class
        });
    } else {
        document.body.style.color = 'black'; // 设置 body 文字颜色为黑色
        document.querySelectorAll('.navbar-nav .nav-link, .footer p, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.remove('text-white'); // 移除白色文字的 class
        });
    }
}

function imagebackground() {
    var element = document.body;
    element.classList.toggle("imgbg");
    if (element.classList.contains("imgbg")) {
        document.body.style.color = 'white'; // 设置 body 文字颜色为白色

        document.querySelectorAll('.navbar-nav .nav-link, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.add('text-white'); // 添加白色文字的 class

            document.querySelectorAll('.footer p').forEach(function (item) {
                item.classList.add('text-black'); // 添加白色文字的 class
            });
        });
    } else {
        document.body.style.color = 'black'; // 设置 body 文字颜色为黑色
        document.body.style.background = ''; // 移除背景图像
        document.querySelectorAll('.navbar-nav .nav-link, .footer p, .offcanvas-title, #rgbText').forEach(function (item) {
            item.classList.remove('text-white'); // 移除白色文字的 class
        });
    }
}



//booking system

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("bookingForm");
    const bookingInfo = document.getElementById("bookingInfo");
    const seatsContainer = document.querySelector(".seats");
    const paymentButton = document.getElementById("paymentButton"); // Payment button
    const paymentOptions = document.getElementById("paymentOptions"); // Payment options div
    const cancelButton = document.getElementById("cancelButton"); // Cancel button
    const qrCode = document.getElementById("qrCode"); // QR code div

    // Function to clear selected seats
    function clearSelectedSeats() {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        selectedSeats.forEach(seat => seat.classList.remove("selected"));
    }

    // 电影时间数据
    const movieTimes = {
        movie1: ["上午 10:00", "下午 2:00", "下午 4:00"],
        movie2: ["上午 9:00", "下午 1:00", "下午 3:00"],
        movie3: ["上午 11:00", "下午 3:00", "下午 5:00"]
    };

    // 更新电影时间选项
    function updateMovieTimes() {
        const movieSelect = document.getElementById("movie");
        const timeSelect = document.getElementById("time");
        const selectedMovie = movieSelect.value;
        timeSelect.innerHTML = ""; // 清空之前的选项

        // 添加新的时间选项
        movieTimes[selectedMovie].forEach(time => {
            const option = document.createElement("option");
            option.textContent = time;
            option.value = time.toLowerCase().replace(/\s/g, ""); // 转换为小写并删除空格
            timeSelect.appendChild(option);
        });
    }

    // 初始化时间选项
    updateMovieTimes();

    // 当选择电影改变时，更新时间选项
    const movieSelect = document.getElementById("movie");
    movieSelect.addEventListener("change", updateMovieTimes);

    // Function to generate seats
    function generateSeats() {
        const rows = 10;
        const seatsPerRow = 22; // Add 2 aisles
        const aisleIndex1 = Math.floor(seatsPerRow / 5); // Middle seat index for 1st aisle
        const aisleIndex2 = Math.floor(seatsPerRow / 5) * 4; // Middle seat index for 2nd aisle

        const seatLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Labels for seats

        for (let i = 0; i < rows; i++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            const rowLabel = document.createElement("div"); // Create a div for row label
            rowLabel.classList.add("seat", "aisle");
            rowLabel.textContent = seatLabels[i]; // Set row label using seatLabels array
            rowDiv.appendChild(rowLabel); // Append row label to rowDiv
            for (let j = 0; j < seatsPerRow; j++) {
                const seat = document.createElement("div");
                seat.classList.add("seat");
                seat.dataset.row = seatLabels[i]; // Set row label as dataset
                seat.dataset.seat = j + 1;
                const seatLabel = seatLabels[i] + (j + 1); // Combine row label and seat number

                // Add aisle class
                if (j === aisleIndex1 || j === aisleIndex2) {
                    seat.classList.add("aisle");
                }

                seat.textContent = seatLabel; // Set seat label as text content
                rowDiv.appendChild(seat);
            }
            seatsContainer.appendChild(rowDiv);
        }

        // Add aisle spacer
        const aisleSpacer1 = document.createElement("div");
        aisleSpacer1.classList.add("seat", "aisle");
        seatsContainer.appendChild(aisleSpacer1);

        const aisleSpacer2 = document.createElement("div");
        aisleSpacer2.classList.add("seat", "aisle");
        seatsContainer.appendChild(aisleSpacer2);
    }

    generateSeats();

    // Function to handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const movie = formData.get("movie");
        const time = formData.get("time");
        const combo = formData.get("combo");
        const selectedSeats = document.querySelectorAll(".seat.selected");
        const selectedSeatLabels = Array.from(selectedSeats).map(seat => seat.textContent); // Extract only seat labels

        let comboPrice = 0;
        if (combo === "small") {
            comboPrice = 50; // 1号小套餐 (饮料*1, 爆米花*1)
        } else if (combo === "large") {
            comboPrice = 100; // 1号大套餐 (饮料*2, 爆米花*2)
        } else if (combo === "drinks") {
            comboPrice = 20; // 饮料*1
        } else if (combo === "popcorn") {
            comboPrice = 30; // 爆米花*1
        } else if (combo === "hotdog") {
            comboPrice = 35; // 热狗*1
        } else if (combo === "churros") {
            comboPrice = 40; // 吉拿棒*1
        } else if (combo === "small2") {
            comboPrice = 55; // 2號小套餐 (飲料*1 ,熱狗*1)
        } else if (combo === "small3") {
            comboPrice = 60; // 3號小套餐 (飲料*1 ,吉拿棒*1)
        } else if (combo === "large2") {
            comboPrice = 110; // 2號大套餐 (飲料*2 ,熱狗*2)
        } else if (combo === "large3") {
            comboPrice = 120; // 3號大套餐 (飲料*2 ,吉拿棒*2)
        }

        const seatPrice = selectedSeats.length * 220; // Price per seat
        const totalPrice = seatPrice + comboPrice;

        let comboText = "";
        if (combo === "small") {
            comboText = "1號小套餐 (飲料*1, 爆米花*1)";
        } else if (combo === "large") {
            comboText = "1號大套餐 (飲料*2, 爆米花*2)";
        } else if (combo === "drinks") {
            comboText = "飲料*1";
        } else if (combo === "popcorn") {
            comboText = "爆米花*1";
        } else if (combo === "hotdog") {
            comboText = "熱狗*1";
        } else if (combo === "churros") {
            comboText = "吉拿棒*1";
        } else if (combo === "small2") {
            comboText = "2號小套餐 (飲料*1 ,熱狗*1)";
        } else if (combo === "small3") {
            comboText = "3號小套餐 (飲料*1 ,吉拿棒*1)";
        } else if (combo === "large2") {
            comboText = "2號大套餐 (飲料*2 ,熱狗*2)";
        } else if (combo === "large3") {
            comboText = "3號大套餐 (飲料*2 ,吉拿棒*2)";
        } else {
            comboText = "沒有套餐";
        }

        const movieNames = {
            movie1: "絕地戰警：生死與共",
            movie2: "芙莉歐莎：瘋狂麥斯傳奇篇章",
            movie3: "怒火狂猴"
        };

        const bookingDetails = `
                <h2>訂票資訊  </h2>
                <p>電影 : ${movieNames[movie]}</p>
                <p>時間 : ${time}</p>
                <p>加購套餐 : ${comboText}</p>
                <p>選擇座位 : ${selectedSeatLabels.join(", ")}</p>
                <p>總金額 : $${totalPrice}</p>
            `;
        bookingInfo.innerHTML = bookingDetails; // Display selected seat labels only

        if (selectedSeats.length === 0) {
            alert("請選擇座位場次時間！");
        }
    });

    // Function to handle seat selection
    seatsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("seat")) {
            if (!event.target.classList.contains("randomly-selected")) {
                event.target.classList.toggle("selected");
            }
        }
    });

    // Function to randomly select some seats
    function randomSeatSelection() {
        const seats = document.querySelectorAll(".seat");

        // Randomly select seats
        for (let i = 0; i < seats.length; i++) {
            if (Math.random() < 0.5 && !seats[i].classList.contains("aisle")) {
                seats[i].classList.add("randomly-selected");
            }
        }
    }

    // Call randomSeatSelection function when the page loads
    randomSeatSelection();

    // Clear Selection button functionality
    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", function() {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        selectedSeats.forEach(seat => seat.classList.remove("selected"));
        bookingInfo.innerHTML = ""; // Clear booking info
    });

    // Payment button functionality
    paymentButton.addEventListener("click", function() {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        if (selectedSeats.length === 0) {
            alert("請選擇座位場次時間！");
        } else {
            const bookingForm = document.getElementById("bookingForm");
            const qrCode = document.getElementById("qrCode");
            const countdownTimer = document.getElementById("countdownTimer"); // 新增的倒數計時器元素

            // Hide booking form
            bookingForm.style.display = "none";
            // Display QR Code
            qrCode.style.display = "block";

            // 設置倒數計時器初始值
            let secondsLeft = 60;

            // 更新倒數計時器顯示
            countdownTimer.textContent = secondsLeft;

            // 啟動倒數計時器
            const timer = setInterval(function() {
                secondsLeft--;
                countdownTimer.textContent = secondsLeft;

                // 檢查是否計時結束
                if (secondsLeft === 0) {
                    clearInterval(timer); // 清除計時器
                    // 隱藏付款頁面，顯示訂票頁面
                    qrCode.style.display = "none";
                    bookingForm.style.display = "block";

                    // 清除選定的座位
                    clearSelectedSeats();
                }
            }, 1000); // 每秒更新一次計時器
        }
    });

    // Cancel button functionality
    cancelButton.addEventListener("click", function() {
        const bookingForm = document.getElementById("bookingForm");
        const qrCode = document.getElementById("qrCode");

        // Hide QR Code
        qrCode.style.display = "none";
        // Display booking form
        bookingForm.style.display = "block";

        // Clear selected seats
        clearSelectedSeats();
    });
});


//content function

// 獲取需要操作的元素


var carousel = document.querySelector('#carouselExampleAutoplaying');

var web1Image = document.querySelector('#web1Image');
var web2Image = document.querySelector('#web2Image');
var web3Image = document.querySelector('#web3Image');


var web1Content = document.querySelector('#web1Content');
var web2Content = document.querySelector('#web2Content');
var web3Content = document.querySelector('#web3Content');

var backButton1 = document.querySelector('#backButton1');
var backButton2 = document.querySelector('#backButton2');
var backButton3 = document.querySelector('#backButton3');

// 監聽圖片點擊事件
web1Image.addEventListener('click', function() {
    // 隱藏自動輪播圖
    carousel.style.display = 'none';
    // 顯示web1的內容
    web1Content.style.display = 'block';
});
web2Image.addEventListener('click', function() {
    // 隱藏自動輪播圖
    carousel.style.display = 'none';
    // 顯示web2的內容
    web2Content.style.display = 'block';
});
web3Image.addEventListener('click', function() {
    // 隱藏自動輪播圖
    carousel.style.display = 'none';
    // 顯示web3的內容
    web3Content.style.display = 'block';
});

// 監聽返回按鈕點擊事件
backButton1.addEventListener('click', function() {
    // 隱藏web1的內容
    web1Content.style.display = 'none';
    // 顯示自動輪播圖
    carousel.style.display = 'block';
});
// 監聽返回按鈕點擊事件
backButton2.addEventListener('click', function() {
    // 隱藏web1的內容
    web2Content.style.display = 'none';
    // 顯示自動輪播圖
    carousel.style.display = 'block';
});
// 監聽返回按鈕點擊事件
backButton3.addEventListener('click', function() {
    // 隱藏web1的內容
    web3Content.style.display = 'none';
    // 顯示自動輪播圖
    carousel.style.display = 'block';
});



// // 監聽返回按鈕點擊事件
// backButton.addEventListener('click', function() {
//     // 隱藏web2的內容
//     web2Content.style.display = 'none';
//     // 顯示自動輪播圖
//     carousel.style.display = 'block';
// });
// // 監聽返回按鈕點擊事件
// backButton.addEventListener('click', function() {
//     // 隱藏web3的內容
//     web3Content.style.display = 'none';
//     // 顯示自動輪播圖
//     carousel.style.display = 'block';
// });