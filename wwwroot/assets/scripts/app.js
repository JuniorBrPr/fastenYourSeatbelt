/**
 * Code for the hamburger menu
 * @author Julian
 */
const hamburger = document.querySelector(".hamburger");
const navContainer = document.querySelector(".nav-container");
// when hamburger is clicked change icon to a cross and make the nav menu visible

hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("fa-bars");
	hamburger.classList.toggle("fa-xmark");
	/* if the cross icon is visible the nav menu should be visible. otherwise the menu should
    be invisible for user and computer so the links are not focusable.
    */
	if (hamburger.classList.contains("fa-xmark")) {
		navContainer.style.display = "block";
		navContainer.style.setProperty("animation-name", "showMenu");
	} else {
		resetNavBar(navContainer);
	}
});
//remove mobile nav when resizing above 750px
window.addEventListener("resize", () => {
	if (window.screen.availWidth > 750) {
		resetNavBar(navContainer);
		hamburger.classList.add("fa-bars");
		hamburger.classList.remove("fa-xmark");
	}
});
/**
 * Removes the mobile version of the nav-bar from the screen.
 * @param {Element} navContainer An element which contains the navigation menu
 */
function resetNavBar(navContainer) {
	navContainer.style.setProperty("animation-name", "hideMenu");
	navContainer.addEventListener("animationend", (e) => {
		//only remove if event is the hideMenu animation
		if (e.animationName == "hideMenu") {
			navContainer.style.display = "none";
		}
	});
}

/**
 * code for the login modal
 * @author Junior
 */
const loginModal = document.querySelector(".login-container");
const modalOpenBtns = document.querySelectorAll(".login-btn");
const modalCloseBtn = document.querySelector(".login-close");
const openModalLinks = document.querySelectorAll(".sign-up-login-link");

//For every login button on a page add an event listener to open the modal.
for (let i = 0; i < modalOpenBtns.length; i++) {
	openModal(modalOpenBtns[i]);
}

//Add an event listener to the login link on the register page.
if (openModalLinks.length > 0) {
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
	});
}

/**
 * Adds a click listener to an element which closes the login modal.
 * @param {Element} Element A button or link to add the event-listener to.
 */
function closeModal(Element) {
	Element.addEventListener("click", () => {
		loginModal.style.display = "none";
		clearLoginValues();
	});
}

//If the user clicks outside the modal, close the modal
window.addEventListener("click", (event) => {
	if (event.target === loginModal) {
		loginModal.style.display = "none";
		clearLoginValues();
	}
});

/**
 * Clears the login input values and error status whenever the modal is closed.
 * 
 * @author Tim Knops
 */
function clearLoginValues() {
	const loginInputField = document.querySelectorAll(".login-input");
	const warningMessage = document.querySelector(".warning-message");

	loginInputField.forEach((input) => {
		if (warningMessage != null) {
			warningMessage.remove();
		}
		
		input.style.borderColor = "";
		input.value = "";
	});
}