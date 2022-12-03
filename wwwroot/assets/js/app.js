import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";
FYSCloud.API.configure({
	url: "https://api.fys.cloud",
	apiKey: "fys_is101_2.ZkYZIDcFQuh8EKxc",
	database: "fys_is101_2_dev",
	environment: "mockup",
});

/**
 * code for loading the nav, footer and mobileNav dynamic
 * @author Lucas
 */
await loadHeader();
async function loadHeader() {
	try {
		const nav = await FYSCloud.Utils.fetchAndParseHtml("./assets/dynamic/_header.html");
		const footer = await FYSCloud.Utils.fetchAndParseHtml("./assets/dynamic/_footer.html");
		const mobileNav = await FYSCloud.Utils.fetchAndParseHtml("./assets/dynamic/_mobile-nav.html");
		const loginModal =  await FYSCloud.Utils.fetchAndParseHtml("./assets/dynamic/_login-modal.html");

		const session = FYSCloud.Session.get("userId");
		const header = nav[0];
		const footerInsert = footer[0];
		const mobileNavInsert = mobileNav[0];
		const loginModalInsert = loginModal[0];
		const links = header.querySelectorAll("a > span");
		const aLinks = header.querySelectorAll("a");


		// const registerClass = document.getElementById("register-btn");
		// const loginClass = document.getElementsByClassName("login-btn");
		// const profileClass = document.getElementsByClassName("profile-btn");

		// if(session == null) {
		// 	registerClass.classList.add("nav-shown");
		// 	loginClass.classList.add("nav-shown");
		// 	profileClass.classList.add("nav-hidden");
		// 	registerClass.classList.remove("nav-hidden");
		// 	loginClass.classList.remove("nav-hidden");
		// } else {
		// 	registerClass.classList.remove("nav-shown");
		// 	loginClass.classList.remove("nav-shown");
		// 	profileClass.classList.remove("nav-hidden");
		// 	registerClass.classList.add("nav-hidden");
		// 	loginClass.classList.add("nav-hidden");
		// }

		if (window.location.pathname == "/wwwroot/index.html") {
			aLinks[0].style.pointerEvents = "none";
			aLinks[1].style.pointerEvents = "none";
		} else if (window.location.pathname == "/wwwroot/matching.html") {
			links[0].classList.add("active");
			aLinks[2].style.pointerEvents = "none";
		} else if (window.location.pathname == "/wwwroot/about-us.html") {
			links[1].classList.add("active");
			aLinks[3].style.pointerEvents = "none";
		}
		document.body.insertBefore(header, document.body.firstChild);
		header.insertAdjacentElement("afterend", mobileNavInsert);
		document.body.insertBefore(footerInsert, document.body.lastChild);
		header.insertAdjacentElement("afterend", loginModalInsert);
		FYSCloud.Localization.translate();
	} catch (error) {
		console.error(error);
	}
}

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
 * code for the login mobileNav
 * @author Junior
 */
const loginmobileNav = document.querySelector(".login-container");
const mobileNavOpenBtns = document.querySelectorAll(".login-btn");
const mobileNavCloseBtn = document.querySelector(".login-close");
const openmobileNavLinks = document.querySelectorAll(".sign-up-login-link");

//For every login button on a page add an event listener to open the mobileNav.
for (let i = 0; i < mobileNavOpenBtns.length; i++) {
	openmobileNav(mobileNavOpenBtns[i]);
}

//Add an event listener to the login link on the register page.
if (openmobileNavLinks.length > 0) {
	for (let i = 0; i < openmobileNavLinks.length; i++) {
		openmobileNav(openmobileNavLinks[i]);
	}
}

//When the cross on the mobileNav is clicked, close the mobileNav.
closemobileNav(mobileNavCloseBtn);

/**
 * Adds a click listener to an element which opens the login mobileNav.
 * @param {Element} Element A button or link to add the event-listener to.
 */
function openmobileNav(Element) {
	Element.addEventListener("click", () => {
		loginmobileNav.style.display = "block";
	});
}

/**
 * Adds a click listener to an element which closes the login mobileNav.
 * @param {Element} Element A button or link to add the event-listener to.
 */
function closemobileNav(Element) {
	Element.addEventListener("click", () => {
		loginmobileNav.style.display = "none";
	});
}

//If the user clicks outside the mobileNav, close the mobileNav
window.addEventListener("click", (event) => {
	if (event.target === loginmobileNav) {
		loginmobileNav.style.display = "none";
	}
});
