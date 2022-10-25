const loginModal = document.querySelector(".login-container");
const modalOpenBtn = document.querySelector(".login-btn");
const modalOpenBtnTwo = document.querySelector(".login-btn-homepage");
const modalCloseBtn = document.querySelector(".login-close");
const openModalLink = document.querySelector(".sign-up-login-link");

//When the login button is clicked, open the modal
modalOpenBtn.addEventListener("click", () => {
	loginModal.style.display = "block";
});

//When the login button on the homepage is clicked, open the modal
modalOpenBtnTwo.addEventListener("click", () => {
	loginModal.style.display = "block";
});

//when the login link in the sign up form is clicked, open the modal
if (openModalLink != null) {
	openModalLink.addEventListener("click", () => {
		loginModal.style.display = "block";
	});
}
//When the cross on the modal is clicked, close the modal
modalCloseBtn.addEventListener("click", () => {
	loginModal.style.display = "none";
});
//If the user clicks outside the modal, close the modal
window.addEventListener("click", (event) => {
	if (event.target === loginModal) {
		loginModal.style.display = "none";
	}
});
