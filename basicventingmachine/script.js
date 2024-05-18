document.addEventListener("DOMContentLoaded", function () {
    const frustrationInput = document.getElementById("frustrationInput");
    const submitBtn = document.getElementById("submitBtn");
    const messageContainer = document.getElementById("messageContainer");
    const message = document.getElementById("message");
    const timer = document.getElementById("timer");
    const motivationalMessage = document.getElementById("motivationalMessage");
    const container = document.querySelector(".container");
    const audio = document.getElementById("audio");
    const saveToArchiveCheckbox = document.getElementById("saveToArchive");
    const viewArchivesBtn = document.getElementById("viewArchivesBtn");

    let countdown = 3;

    const motivationalMessages = [
        "I can see that you're really upset/frustrated/angry.",
        "I'm really sorry to hear that you're going through this.",
        // add more here
    ];

    submitBtn.addEventListener("click", function () {
        const userFrustration = frustrationInput.value.trim();
        
        if (userFrustration === "") {
            alert("Please type your frustration first!");
        } else {
            container.style.display = "none";
            audio.play();
            const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
            motivationalMessage.innerText = motivationalMessages[randomIndex];
            motivationalMessage.style.display = "block";
            message.innerText = "Your frustration has been sent into the void!";
            messageContainer.style.display = "block";

            if (saveToArchiveCheckbox.checked) {
                saveRantToArchive(userFrustration); // save the typed message to localStorage
            }

            timer.style.display = "block";
            timer.innerText = `Submit another vent in ${countdown} ${countdown === 1 ? 'second' : 'seconds'}`;

            const countdownInterval = setInterval(function () {
                countdown--;

                timer.innerText = `Submit another vent in ${countdown} ${countdown === 1 ? 'second' : 'seconds'}`;

                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    timer.style.display = "none";
                    frustrationInput.value = "";
                    container.style.display = "block";
                    messageContainer.style.display = "none";
                    motivationalMessage.style.display = "none";
                    countdown = 3;
                }
            }, 1000);
        }
    });

    function saveRantToArchive(rantText) {
        const existingRants = JSON.parse(localStorage.getItem("rants")) || [];
        existingRants.push({ text: rantText, timestamp: new Date().toISOString() });
        localStorage.setItem("rants", JSON.stringify(existingRants));
    }

    viewArchivesBtn.addEventListener("click", function () {
        // get archived rants from localStorage
        const archivedRants = JSON.parse(localStorage.getItem("rants")) || [];

        if (archivedRants.length > 0) {
            // make dialog to display archived rants
            const archivesDialog = document.createElement("div");
            archivesDialog.id = "archivesDialog";
            archivesDialog.style.background = "white";
            archivesDialog.style.padding = "10px";
            archivesDialog.style.border = "1px solid #ccc";
            archivesDialog.style.overflow = "scroll";
            archivesDialog.style.height = "300px"; // Set the desired height

            // make list items for each archived rant
            const ul = document.createElement("ul");
            archivedRants.forEach(function (rant) {
                const listItem = document.createElement("li");
                listItem.textContent = rant.text;
                ul.appendChild(listItem);
            });

            // add the list to the dialog
            archivesDialog.appendChild(ul);

            // append the dialog to the popup.html body
            document.body.appendChild(archivesDialog);
        } else {
            alert("No archived rants found.");
        }
    });
});
