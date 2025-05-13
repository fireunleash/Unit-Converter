/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const acc = document.getElementsByClassName("accordion")
let historyList = document.getElementById("history-list-el")
let historyArr = []
let history = localStorage.getItem("history")

// Function to update Clear History button visibility
function updateClearButtonVisibility() {
    clearBtn.style.display = historyArr.length ? "block" : "none";
    if (historyArr.length === 0) {
        historyList.innerHTML = '<li>Click on the measurements below to convert your measurements</li>';
    }
}

// Clear History Button
const clearBtn = document.getElementById("clear-btn")
clearBtn.style.display = "none"; // Set initial state to hidden

// Show History
if (history != null) {
    historyArr = JSON.parse(history)
    if (historyArr.length > 0) {
        historyList.innerHTML = "";
        for (let i = 0; i < historyArr.length; i++){
            historyList.innerHTML += `<li>${historyArr[i]}</li>`
        }
        clearBtn.style.display = "block"; // Show button if there's history
    }
} else {
    historyList.innerHTML = '<li>Click on the measurements below to convert your measurements</li>';
    historyArr = []; // Ensure array is initialized empty
}

updateClearButtonVisibility();

// Measuremment elements
const meter = document.getElementById("meter-input")
const feet = document.getElementById("feet-input")
const liter = document.getElementById("liter-input")
const gallon = document.getElementById("gallon-input")
const kilogram = document.getElementById("kilogram-input")
const pound = document.getElementById("pound-input")
const kmph = document.getElementById("kmph-input")
const mph = document.getElementById("mph-input")
const celsius = document.getElementById("celsius-input")
const fahrenheit = document.getElementById("fahrenheit-input")  

//Conversion buttons
const lengthBtn = document.getElementById("length-btn")
const volumeBtn = document.getElementById("volume-btn")
const massBtn = document.getElementById("mass-btn")
const speedBtn = document.getElementById("speed-btn")
const temperatureBtn = document.getElementById("temperature-btn")


//Accordion feature
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        // Close all other panels first
        for (let j = 0; j < acc.length; j++) {
            if (j !== i) {
                acc[j].classList.remove("active");
                if (acc[j].nextElementSibling.style.maxHeight) {
                    acc[j].nextElementSibling.style.maxHeight = null;
                }
            }
        }
        
        // Toggle current panel
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

// Conversion functions
function convertLength(){
    if (meter.value !== "") {
        feet.value = (meter.value * 3.281).toFixed(2);
        return `Converted ${meter.value} meters to ${feet.value} feet`;
    } else if (feet.value !== "") {
        meter.value = (feet.value / 3.281).toFixed(2);
        return `Converted ${feet.value} feet to ${meter.value} meters`;
    }
    return null;
}

function convertVolume(){
    if (liter.value !== "") {
        gallon.value = (liter.value * 0.264).toFixed(2);
        return `Converted ${liter.value} liters to ${gallon.value} gallons`;
    } else if (gallon.value !== "") {
        liter.value = (gallon.value / 0.264).toFixed(2);
        return `Converted ${gallon.value} gallons to ${liter.value} liters`;
    }
    return null;
}

function convertMass(){
    if (kilogram.value !== "") {
        pound.value = (kilogram.value * 2.204).toFixed(2);
        return `Converted ${kilogram.value} kilograms to ${pound.value} pounds`;
    } else if (pound.value !== "") {
        kilogram.value = (pound.value / 2.204).toFixed(2);
        return `Converted ${pound.value} pounds to ${kilogram.value} kilograms`;
    }
    return null;
}

function convertSpeed(){
    if (kmph.value !== "") {
        mph.value = (kmph.value * 0.621371).toFixed(2);
        return `Converted ${kmph.value} km/h to ${mph.value} mph`;
    } else if (mph.value !== "") {
        kmph.value = (mph.value / 0.621371).toFixed(2);
        return `Converted ${mph.value} mph to ${kmph.value} km/h`;
    }
    return null;
}

function convertTemperature(){
    if (celsius.value !== "") {
        fahrenheit.value = ((celsius.value * 9/5) + 32).toFixed(2);
        return `Converted ${celsius.value}°C to ${fahrenheit.value}°F`;
    } else if (fahrenheit.value !== "") {
        celsius.value = ((fahrenheit.value - 32) * 5/9).toFixed(2);
        return `Converted ${fahrenheit.value}°F to ${celsius.value}°C`;
    }
    return null;
}

function updateHistory(message) {
    if (message) {
        if (historyArr.length === 0) {
            historyList.innerHTML = ""; // Clear default message
        }
        historyArr.push(message);
        historyList.innerHTML += `<li>${message}</li>`;
        localStorage.setItem("history", JSON.stringify(historyArr));
        updateClearButtonVisibility();
    }
}

// Event listeners for conversion buttons
lengthBtn.addEventListener("click", function() {
    const message = convertLength();
    updateHistory(message);
    meter.value = "";
    feet.value = "";
});

volumeBtn.addEventListener("click", function() {
    const message = convertVolume();
    updateHistory(message);
    liter.value = "";
    gallon.value = "";
});

massBtn.addEventListener("click", function() {
    const message = convertMass();
    updateHistory(message);
    kilogram.value = "";
    pound.value = "";
});

speedBtn.addEventListener("click", function() {
    const message = convertSpeed();
    updateHistory(message);
    kmph.value = "";
    mph.value = "";
});

temperatureBtn.addEventListener("click", function() {
    const message = convertTemperature();
    updateHistory(message);
    celsius.value = "";
    fahrenheit.value = "";
});

// Clear History
clearBtn.addEventListener("click", function(){
    localStorage.clear();
    historyList.innerHTML = "";
    historyArr = [];
    updateClearButtonVisibility();
});
