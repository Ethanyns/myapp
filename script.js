// Hashed version of "password" using MD5
const hashedKey = '5f4dcc3b5aa765d61d8327deb882cf99'; // MD5 hash of "password"

// Authentication Logic
document.getElementById("authForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const enteredKey = document.getElementById('auth-key').value.trim(); // Trim whitespace
    const hashedEnteredKey = CryptoJS.MD5(enteredKey).toString(); // Hash the entered key

    if (hashedEnteredKey === hashedKey) {
        window.location.href = "main.html"; // Redirect to the main page on success
    } else {
        document.getElementById('auth-error').innerText = "Invalid authentication key.";
    }
});

// Fetch Bitcoin price for the main page
async function fetchBitcoinPrice() {
    try {
        const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
        const data = await response.json();
        const btcValue = data.bpi.USD.rate_float; // Get the price in USD
        document.getElementById("btcPrice").innerText = `$${btcValue.toFixed(2)}`;
    } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
        document.getElementById("btcPrice").innerText = "Error fetching price.";
    }
}

// Call the function to fetch Bitcoin price on page load
window.onload = function() {
    fetchBitcoinPrice();
};

// Sending Bitcoin Logic
document.getElementById("sendForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const address = document.getElementById("address").value;
    const amount = document.getElementById("amount").value;
    const amountUsd = document.getElementById("amount-usd");
    
    // Validate inputs
    if (!address || !amount) {
        alert("Please fill in all fields.");
        return;
    }
    
    // Assuming the amount is valid, show the loading popup
    alert("Processing transaction...");
    
    setTimeout(() => {
        const usdValue = (amount * 50000).toFixed(2); // Assuming a static price for demo; replace with fetched price
        alert(`Transaction successful!\nSent: ${amount} BTC\nEquivalent: $${usdValue}`);
        
        // Optionally, add the transaction to history (not shown here)
    }, 30000); // Simulating a 30-second processing time
});
