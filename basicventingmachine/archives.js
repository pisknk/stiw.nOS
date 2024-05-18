document.addEventListener("DOMContentLoaded", function () {
    const archivesList = document.getElementById("archivesList");

    function displayArchives() {
        const archivedRants = JSON.parse(localStorage.getItem("rants")) || [];

        archivedRants.forEach(function (rant, index) {
            const listItem = document.createElement("li");
            listItem.textContent = rant.text;

            // create delete button and add it to the list item's HTML
            listItem.insertAdjacentHTML(
                "beforeend",
                `<button class="delete-btn" data-index="${index}">Delete</button>`
            );

            // add event listener to the delete button
            const deleteButton = listItem.querySelector(".delete-btn");
            deleteButton.addEventListener("click", function () {
                // index from the button's data attribute
                const indexToDelete = parseInt(this.getAttribute("data-index"));

                // remove rant from the archivedRants array
                archivedRants.splice(indexToDelete, 1);

                // update localStorage
                localStorage.setItem("rants", JSON.stringify(archivedRants));

                // remove the list item from the DOM
                listItem.remove();
            });

            // append the list item to the archivesList
            archivesList.appendChild(listItem);
        });
    }

    displayArchives();
});
