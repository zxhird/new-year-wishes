function generateLink() {
    const nameInput = document.getElementById('nameInput');
    const shareSection = document.getElementById('shareSection');
    const shareLink = document.getElementById('shareLink');

    if (nameInput.value.trim() === "") {
        alert("Please enter your name!");
        return;
    }

    const baseUrl = window.location.href.split("?")[0];
    const personalizedLink = `${baseUrl}?name=${encodeURIComponent(nameInput.value)}`;

    shareLink.value = personalizedLink;
    shareSection.classList.remove('hidden');
}

function copyLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    shareLink.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(shareLink.value).then(() => {
        alert("Link copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy the link. Please copy it manually.");
    });
}

// To personalize the page if name is in the query params
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const messageElement = document.querySelector('.message');
    const defaultMessage = "Wishing you a year full of happiness, success, and good health!";

    if (name) {
        messageElement.textContent = `🎉 Happy New Year from ${decodeURIComponent(name)}! 🎉`;
    } else {
        messageElement.textContent = defaultMessage;
    }

    // Add option to personalize the greeting
    const nameInputHTML = `
        <div class="personalize-section">
            <p>Want to make it from you?</p>
            <input type="text" id="nameInput" placeholder="Enter your name...">
            <button onclick="generateLink()">Generate Link</button>
        </div>
    `;
    messageElement.insertAdjacentHTML('afterend', nameInputHTML);
};
