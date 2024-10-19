// Authentication logic
const hashedKey = '5f4dcc3b5aa765d61d8327deb882cf99'; // hashed version of 'password'

function authenticate() {
    const enteredKey = document.getElementById('auth-key').value;
    const hashedEnteredKey = md5(enteredKey);

    if (hashedEnteredKey === hashedKey) {
        window.location.href = "main.html";
    } else {
        document.getElementById('auth-error').innerText = "Invalid authentication key.";
    }
}

// Fetch Bitcoin price
async function fetchBTCPrice() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const data = await response.json();
    const btcPriceInUsd = data.bpi.USD.rate_float;
    document.getElementById('btc-usd').innerText = `≈ $${(btcPriceInUsd * 10).toFixed(2)} USD`;
}

window.onload = function () {
    if (document.getElementById('btc-usd')) {
        fetchBTCPrice();
    }
}

// Transaction history logic
function viewHistory() {
    document.getElementById('history-page').classList.remove('hidden');
    document.getElementById('send-page').classList.add('hidden');
}

// Send BTC logic
function sendBTC() {
    document.getElementById('history-page').classList.add('hidden');
    document.getElementById('send-page').classList.remove('hidden');
}

function confirmTransaction() {
    const address = document.getElementById('btc-address').value;
    const amount = document.getElementById('btc-amount').value;

    // Add validation here

    setTimeout(() => {
        alert('Transaction successful');
    }, 30000);
}

function support() {
    window.location.href = "https://t.me/support";
}

// MD5 hashing function (example - use any MD5 hashing lib)
function md5(string) {
    // Basic md5 hashing, you can replace this with a library
    return string.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0).toString(16);
    }, '');
}
