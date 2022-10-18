const hamburger = document.querySelector(".hamburger");
const navContainer = document.querySelector(".nav-container");
const navMenuMobile = document.querySelector(".nav-menu-mobile");
const navLinks = navMenuMobile.querySelectorAll(".nav-link");
/* when hamburger is clicked change icon to a cross and make the nav menu visible
 */
hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("fa-bars");
	hamburger.classList.toggle("fa-xmark");
	/* if the cross icon is visible the nav menu should be visible. otherwise the menu should
    be invisible for user and computer so the links are not focusable.
    */
	if (hamburger.classList.contains("fa-xmark")) {
		navContainer.style.display = "block";
		navContainer.style.setProperty("--mobile-menu-right", "0");
	} else {
		resetNavBar(navContainer, navLinks);
	}
});
//remove mobile nav when resizing above 750px
window.addEventListener("resize", () => {
	if (window.screen.availWidth > 750) {
		resetNavBar(navContainer, navLinks);
		hamburger.classList.add("fa-bars");
		hamburger.classList.remove("fa-xmark");
	}
});
/**
 * Removes the mobile version of the nav-bar from the screen.
 * @param {Element} navContainer An element which contains the navigation menu
 */
function resetNavBar(navContainer) {
	navContainer.style.display = "none";
	navContainer.style.setProperty("--mobile-menu-right", "-50");
}
