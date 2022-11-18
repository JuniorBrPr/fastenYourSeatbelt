const loginModal = document.querySelector(".login-container");
const modalOpenBtns = document.querySelectorAll(".login-btn");
const modalCloseBtn = document.querySelector(".login-close");
const openModalLinks = document.querySelectorAll(".sign-up-login-link");

//For every login button on a page add an event listener to open the modal.
for (let i = 0; i < modalOpenBtns.length; i++) {
    openModal(modalOpenBtns[i]);
}

//Add an event listener to the login link on the register page.
if (openModalLinks.length > 0){
    for (let i = 0; i < openModalLinks.length; i++) {
        openModal(openModalLinks[i]);
    }
}

//When the cross on the modal is clicked, close the modal.
closeModal(modalCloseBtn);

/**
 * Adds a click listener to an element which opens the login modal.
 * @param {Element} Element A button or link to add the event-listener to.
 */
function openModal(Element) {
    Element.addEventListener("click", () => {
        loginModal.style.display = "block";
    })
}

/**
 * Adds a click listener to an element which closes the login modal.
 * @param {Element} Element A button or link to add the event-listener to.
 */
function closeModal(Element) {
    Element.addEventListener("click", () => {
        loginModal.style.display = "none";
    });
}

//If the user clicks outside the modal, close the modal
window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});
