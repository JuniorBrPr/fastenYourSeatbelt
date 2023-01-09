import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

/**
 * code for loading the nav, footer and mobileNav dynamic
 * @author Lucas
 */
await loadHeader();
async function loadHeader() {
	try {
		const nav = await FYSCloud.Utils.fetchAndParseHtml("./assets/dynamic/_header.html");
		const footer = await FYSCloud.Utils.fetchAndParseHtml("./assets/dynamic/_footer.html");
		const mobileNav = await FYSCloud.Utils.fetchAndParseHtml(
			"./assets/dynamic/_mobile-nav.html"
		);
		const loginModal = await FYSCloud.Utils.fetchAndParseHtml(
			"./assets/dynamic/_login-modal.html"
		);

		const session = FYSCloud.Session.get("userId");
		const header = nav[0];
		const footerInsert = footer[0];
		const mobileNavInsert = mobileNav[0];
		const loginModalInsert = loginModal[0];
		const links = header.querySelectorAll("a > span");
		const aLinks = header.querySelectorAll("a");

		const registerClass = header.querySelector(".register-btn");
		const loginClass = header.querySelector(".login-btn");
		const profileClass = header.querySelector(".profile-btn");
		const zoekBuddyClass = header.querySelector(".zoek-buddy");
		const logoutClass = header.querySelector(".dropdown");
		const zoekBuddyMobile = mobileNavInsert.querySelector(".zoek-buddy-link");
		const registerClassMobile = mobileNavInsert.querySelector(".register-link");
		const loginClassMobile = mobileNavInsert.querySelector(".sign-up-login-link");
		const profileClassMobile = mobileNavInsert.querySelector(".profile-link");
		const logoutClassMobile = mobileNavInsert.querySelector(".logout-link");
		const footerLinks = footerInsert.querySelectorAll("[data-footer-link]");

		if (session == null) {
			registerClass.classList.add("nav-shown");
			registerClassMobile.classList.add("nav-shown");
			loginClass.classList.add("nav-shown");
			loginClassMobile.classList.add("nav-shown");
			profileClass.classList.add("nav-hidden");
			profileClassMobile.classList.add("nav-hidden");
			registerClass.classList.remove("nav-hidden");
			registerClassMobile.classList.remove("nav-hidden");
			loginClass.classList.remove("nav-hidden");
			loginClassMobile.classList.remove("nav-hidden");
			zoekBuddyClass.classList.add("nav-hidden");
			zoekBuddyMobile.classList.add("nav-hidden");
			zoekBuddyClass.classList.remove("nav-shown");
			zoekBuddyMobile.classList.remove("nav-shown");
			logoutClass.classList.add("nav-hidden");
			logoutClass.classList.remove("nav-shown");
			logoutClassMobile.classList.add("nav-hidden");
			logoutClassMobile.classList.remove("nav-shown");
			footerLinks.forEach((link) => {
				if (link.dataset.footerLink === "loggedIn") {
					link.classList.add("nav-hidden");
				} else {
					link.classList.remove("nav-hidden");
				}
			});
		} else {
			registerClass.classList.add("nav-hidden");
			registerClassMobile.classList.add("nav-hidden");
			registerClass.classList.remove("nav-shown");
			registerClassMobile.classList.remove("nav-shown");
			loginClass.classList.add("nav-hidden");
			loginClassMobile.classList.add("nav-hidden");
			loginClass.classList.remove("nav-shown");
			loginClassMobile.classList.remove("nav-shown");
			profileClass.classList.add("nav-shown");
			profileClassMobile.classList.add("nav-shown");
			profileClass.classList.remove("nav-hidden");
			profileClassMobile.classList.remove("nav-hidden");
			zoekBuddyClass.classList.remove("nav-hidden");
			zoekBuddyMobile.classList.remove("nav-hidden");
			zoekBuddyClass.classList.add("nav-shown");
			zoekBuddyMobile.classList.add("nav-shown");
			logoutClass.classList.add("nav-shown");
			logoutClass.classList.remove("nav-hidden");
			logoutClassMobile.classList.add("nav-shown");
			logoutClassMobile.classList.remove("nav-hidden");
			footerLinks.forEach((link) => {
				if (link.dataset.footerLink === "loggedOut") {
					link.classList.add("nav-hidden");
				} else {
					link.classList.remove("nav-hidden");
				}
			});
		}

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
	} catch (error) {
		console.error(error);
	}
}

/**
 * Code for logout
 * @author Lucas
 */

const session = FYSCloud.Session.get("userId");
if (session != null) {
	const logoutBtn = document.querySelector(".logout-btn");
	const logoutBtnMobile = document.querySelector(".logout-link");

	logoutBtn.addEventListener("click", () => {
		FYSCloud.Session.remove("userId");
		window.location = "index.html";
	});
	logoutBtnMobile.addEventListener("click", () => {
		FYSCloud.Session.remove("userId");
		window.location = "index.html";
	});
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
		clearLoginValues();
	});
}

//If the user clicks outside the mobileNav, close the mobileNav
window.addEventListener("click", (event) => {
	if (event.target === loginmobileNav) {
		loginmobileNav.style.display = "none";
		clearLoginValues();
	}
});

/**
 * Clears the login input values and error status whenever the modal is closed.
 * @author Tim Knops
 */
export function clearLoginValues() {
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

//Language switcher
const initialLanguage = FYSCloud.Session.get("language", "nl");

const translations = {
	//Translate navbar and hamburger
	navbar: {
		findBuddy: {
			nl: "Zoek mijn buddy",
			en: "Find my buddy",
			es: "Buscar a mi amigo",
		},
		aboutUs: {
			nl: "Over ons",
			en: "About us",
			es: "Sobre nosotros",
		},
		login: {
			nl: "Login",
			en: "Login",
			es: "Iniciar sesión",
		},
		register: {
			nl: "Registreren",
			en: "Sign up",
			es: "Registrar",
		},
		myProfile: {
			nl: "Mijn profiel",
			en: "My profile",
			es: "Mi perfil",
		},
		logout: {
			nl: "Uitloggen",
			en: "Logout",
			es: "Cerrar sesión",
		},
		myAccount: {
			nl: "Mijn account",
			en: "My account",
			es: "Mi perfil",
		},
	},
	//Translate login modal
	modal: {
		password: {
			nl: "Wachtwoord:",
			en: "Password:",
			es: "Contraseña:",
		},
		login: {
			nl: "Inloggen",
			en: "Login",
			es: "iniciar sesión",
		},
		forgotPassword: {
			nl: "Wachtwoord",
			en: "Forgot your",
			es: "Olvidaste tu",
		},
		forgotPassLink: {
			nl: "vergeten",
			en: "password",
			es: "contraseña",
		},
		noAccount: {
			nl: "Nog geen",
			en: "Create an",
			es: "Crea una",
		},
		noAccountLink: {
			nl: "Account",
			en: "Account",
			es: "Cuenta",
		},
	},
	//Translate footer
	footer: {
		quote: {
			nl: "Met een Corenbuddy reis je niet meer alleen!",
			en: "With a Corenbuddy you no longer have to travel alone!",
			es: "¡Con un Corenbuddy ya no viajaras solo!",
		},
		infoTitle: {
			nl: "INFORMATIE",
			en: "INFORMATION",
			es: "INFORMACIÓN",
		},
		aboutUs: {
			nl: "Over ons",
			en: "About us",
			es: "Sobre nosotros",
		},
		privacy: {
			nl: "Privacy",
			en: "Privacy",
			es: "Privacidad",
		},
		contact: {
			nl: "Contact",
			en: "Contact",
			es: "Contacto",
		},
		profile: {
			nl: "Profiel",
			en: "Profile",
			es: "Perfil",
		},
		matches: {
			nl: "Matches",
			en: "Matches",
			es: "Connexiones",
		},
		register: {
			nl: "Registreren",
			en: "Register",
			es: "Registro",
		},
	},
	//Translate index
	index: {
		heroTitle: {
			nl: "Wel reizen, maar niet alleen?",
			en: "Want to travel, but not alone?",
			es: "¿Quieres viajar, pero no solo?",
		},
		heroDescr: {
			nl: "Zoek nu jouw Corenbuddy!",
			en: "Find your Corenbuddy now!",
			es: "¡Encuentra tu Corenbuddy ahora!",
		},
		firstCardTitle: {
			nl: "Veilig gebruikmaken",
			en: "Safe use",
			es: "Uso seguro",
		},
		firstCardDescr: {
			nl: "Onze website slaat alleen de nodige gevens op en verkoopt helemaal niks!",
			en: "Our website only stores the necessary data and does not sell anything!",
			es: "¡Nuestro sitio web solo almacena los datos necesarios y no vende nada!",
		},
		secondCardTitle: {
			nl: "Gebruiksvriendelijk",
			en: "User friendly",
			es: "Fácil de usar",
		},
		secondCardDescr: {
			nl: "Onze gebruikers geven ons een beoordeling van 4.7 sterren!",
			en: "Our users give us a rating of 4.7 stars!",
			es: "¡Nuestros usuarios nos dan una calificación de 4.7 estrellas!",
		},
		thirdCardTitle: {
			nl: "Effectiviteit",
			en: "Effectiveness",
			es: "Eficacia",
		},
		thirdCardDescr: {
			nl: "Onze website heeft al meer dan 1000 buddy's bij elkaar gebracht",
			en: "Our website has already brought together more than 1000 buddies",
			es: "Nuestro sitio web ya ha reunido a más de 1000 buddy's",
		},
		ctaTitle: {
			nl: "Registreer nu om jouw buddy te vinden!",
			en: "Register now to find your buddy!",
			es: "¡Regístrese ahora para encontrar a su buddy!",
		},
		ctaSubTitle: {
			nl: "Het werkt echt! We willen je niet alleen naar deze site lokken maar jou helpen",
			en: "It really works! We don't just want to lure you to this site, but help you",
			es: "¡Realmente funciona! No solo queremos atraerlo a esta site, pero tambien ayudarle",
		},
		ctaLogin: {
			nl: "Login",
			en: "Login",
			es: "Iniciar sesión",
		},
		ctaRegister: {
			nl: "Registreren",
			en: "Register",
			es: "Registrar",
		},
		firstCtaCard: {
			nl: "Vind een buddy!",
			en: "Find a buddy!",
			es: "¡Encuentra un buddy!",
		},
		secondCtaCard: {
			nl: "Contact",
			en: "Contact",
			es: "Contacto",
		},
		thirdCtaCard: {
			nl: "Over ons",
			en: "About us",
			es: "Sobre nosotros",
		},
		fourthCtaCard: {
			nl: "Matches",
			en: "Matches",
			es: "Connexiones",
		},
	},
	//Translate about us
	about: {
		aboutUsTitle: {
			nl: "Over ons:",
			en: "About us:",
			es: "Sobre nosotros",
		},
		corenbuddy: {
			nl:
				"CorenBuddy is het meest geavanceerde platform om jouw Travel Buddy te vinden, gebasseerd op het meest efficiente matching systeem. Vind nu een bijpassende " +
				"reisgenoot met dezelfde interesses en dromen. Vlieg samen, geniet samen!",
			en:
				"CorenBuddy is the most advanced platform to find your Travel Buddy, based on the most efficient matching system. Find a matching " +
				"travel companion with the same interests and dreams. Fly together, enjoy together!",
			es:
				"CorenBuddy es la plataforma más avanzada para encontrar a tu Travel Buddy, basada en el sistema de emparejamiento más eficiente. Ahora encuentra una connexion " +
				"compañero de viaje con las mismas aficiones y sueños. ¡Volar juntos, disfrutar juntos!",
		},
		findBuddy: {
			nl: "Vind mijn buddy",
			en: "Find my buddy",
			es: "Encontrar a mi buddy",
		},
		historyTitle: {
			nl: "Geschiedenis van Corendon",
			en: "History of Corendon",
			es: "Historia de Corendon",
		},
		historyDescr: {
			nl:
				"De onderneming Corendon is in 2000 opgericht in Haarlem, toen Atilay Uslu en zijn zakenpartner Yildiray Karaer besloten hun krachten te bundelen.  Voor die tijd had de jonge ondernemer Uslu al zijn eerste stappen in de reisbranche gezet, maar het echte succes kwam met de oprichting van Corendon." +
				"tHet bedrijf begon als Turkije-specialist dat eerst alleen vliegtickets en later ook volledig verzorgde reizen naar Turkije verkocht." +
				"In 20 jaar tijd is Corendon uitgegroeid tot een toonaangevende, zeer succesvolle touroperator en dé nummer 1 reisorganisatie als het gaat om veel Turkse en andere populaire bestemmingen binnen en buiten Europa, zoals bijvoorbeeld Ibiza, Cyprus en Curaçao.",
			en:
				"The company Corendon was founded in 2000 in Haarlem a city in The Netherlands, when Atilay Uslu and his business partner Yildiray Karaer decided to join forces. Before then, the young entrepreneur Uslu had already taken his first steps in the travel industry, but the real success came with the establishment of Corendon." +
				"The company started as a Turkey specialist that first only sold airline tickets and later also fully arranged trips to Turkey." +
				"In 20 years, Corendon has grown into a leading, very successful tour operator and the number 1 travel organization when it comes to many Turkish and other popular destinations within and outside Europe, such as Ibiza, Cyprus and Curaçao.",
			es:
				"La empresa Corendon se fundó en el año 2000 en Haarlem situado en Holanda, cuando Atilay Uslu y su socio comercial Yildiray Karaer decidieron unir fuerzas. Antes de eso, el joven emprendedor Uslu ya había dado sus primeros pasos en la industria de viajes, pero el verdadero éxito llegó con el establecimiento de Corendon." +
				"La compañía comenzó como un especialista en Turquía que primero solo vendía boletos de avión y luego también organizaba viajes completos a Turquía." +
				"En 20 años, Corendon se ha convertido en un operador turístico líder y de gran éxito y en la organización de viajes número 1 en lo que respecta a muchos destinos populares de Turquía y otros dentro y fuera de Europa, como Ibiza, Chipre y Curaçao.",
		},
		whoAreWeTitle: {
			nl: "Wie zijn wij",
			en: "Who are we",
			es: "Quienes somos",
		},
		whoAreWeDescr: {
			nl:
				"Wij zijn een team van getalenteerde studenten op de Hogeschool van Amsterdam met een visie om het beste platform te ontwikkelen voor het project Fasten Your Seatbelts." +
				"Dit is het eerste project dat ons is voorgelegd in ons eerste blok van de studie.",
			en:
				"We are a team of talented students at the Hogeschool van Amsterdam with a vision to develop the best platform for the Fasten Your Seatbelts project." +
				"This is the first project presented to us in our first block of the study.",
			es:
				"Somos un equipo de estudiantes talentosos en la Hogeschool van Amsterdam con la visión de desarrollar la mejor plataforma para el proyecto Fasten Your Seatbelts." +
				"Este es el primer proyecto que se nos presenta en nuestro primer bloque de estudio.",
		},
		contact: {
			nl: "Contact",
			en: "Contact",
			es: "Contacto",
		},
		fullName: {
			nl: "Volledige naam",
			en: "Full name",
			es: "Nombre completo",
		},
		phoneNr: {
			nl: "Telefoonnummer",
			en: "Phone number",
			es: "Número de teléfono",
		},
		topic: {
			nl: "Onderwerp",
			en: "Topic",
			es: "Tema",
		},
		question: {
			nl: "Uw vraag",
			en: "Your question",
			es: "Tu pregunta",
		},
		send: {
			nl: "Verstuur",
			en: "Send",
			es: "Enviar",
		},
		placeholder: {
			fullName: {
				nl: "Bijv. Jan Knops",
				en: "F.E. John Moose",
				es: "P.E. Juan Tier",
			},
		},
	},
	//Translate matching
	match: {
		existingBuddy: {
			nl: "Bestaande Buddy's",
			en: "Existing Buddies",
			es: "Amigos existentes",
		},
		suggestedMatch: {
			nl: "Voorgestelde matches",
			en: "Suggested Matches",
			es: "Connexiones sugeridas",
		},
		incomingRequest: {
			nl: "Inkomende match verzoeken",
			en: "Incoming match requests",
			es: "Solicitudes de connexion entrantes",
		},
		outgoingRequest: {
			nl: "Uitgaande match verzoeken",
			en: "Outgoing match requests",
			es: "Solicitudes de connexion salientes",
		},
		buddyProfile: {
			nl: "Buddy Profiel",
			en: "Buddy profile",
			es: "Perfil de buddy",
		},
		emptyList: {
			nl: "Deze lijst is nog leeg. ;(",
			en: "This list is empty. ;(",
			es: "Esta lista está vacía. ;(",
		},
		notSignedIn: {
			nl: "Oh oh, je bent niet ingelogd!",
			en: "Oh oh, you're not signed in!",
			es: "¡Oh oh, no has iniciado sesión!",
		},
		noInterests: {
			nl: "Oh oh, je hebt nog geen interesses doorgegeven! Ga naar je profiel om je interesses in te vullen." +
				" Door je interesses in te vullen, kunnen we de beste match voor jou vinden.",
			en: "Oh oh, you haven't passed on any interests yet! Go to your profile to enter your interests." +
				" By filling in your interests, we can find the best match for you.",
			es: "Oh oh, ¡todavía no has transmitido ningún interés! Ve a tu perfil para ingresar tus intereses. " +
				"Al completar sus intereses, podemos encontrar la mejor connexion con tu futuro buddy.",
		},
		naam: {
			nl: "Naam",
			en: "Name",
			es: "Nombre",
		},
		bestemming: {
			nl: "Bestemming",
			en: "Destination",
			es: "Destino",
		},
		tijdsbestek: {
			nl: "Tijdsbestek",
			en: "Duration",
			es: "Duración",
		},
		gemeenschappelijkeInteresses: {
			nl: "Gemeenschappelijke interesses",
			en: "Common interest",
			es: "Interés en común",
		},
		profielBekijken: {
			nl: "Profiel bekijken",
			en: "Show profile",
			es: "Ver perfil",
		},
		reisBoeken: {
			nl: "Boek een reis!",
			en: "Plan a trip!",
			es: "Planear un viaje!",
		},
		verwijderBuddy: {
			nl: "Buddy verwijderen",
			en: "Remove buddy",
			es: "Eliminar buddy",
		},
		stuurVerzoek: {
			nl: "Verzoek sturen",
			en: "Send request",
			es: "Enviar solicitud",
		},
		accepteerVerzoek: {
			nl: "Verzoek accepteren",
			en: "Accept request",
			es: "Aceptar solicitud",
		},
		weigerVerzoek: {
			nl: "Verzoek weigeren",
			en: "Reject request",
			es: "Negar solicitud",
		},
		verzoekIntrekken: {
			nl: "Verzoek intrekken",
			en: "Revoke request",
			es: "Retirar solicitud",
		},
		bio: {
			nl: "Biografie",
			en: "Biography",
			es: "Biografía",
		},
		birthDate: {
			nl: "Geboortedatum",
			en: "Date of birth",
			es: "Fecha de nacimiento",
		},
		gender: {
			nl: "Geslacht",
			en: "Gender",
			es: "Género",
		},
		genderMan: {
			nl: "Man",
			en: "Man",
			es: "Hombre",
		},
		genderWomen: {
			nl: "Vrouw",
			en: "Woman",
			es: "Mujer",
		},
		genderOther: {
			nl: "Anders",
			en: "Other",
			es: "Otro",
		},
		budget: {
			nl: "Budget",
			en: "Budget",
			es: "Presupuesto",
		},
		number: {
			nl: "Telefoonnummer",
			en: "Phone number",
			es: "Numero de teléfono",
		},
		email: {
			nl: "E-mail",
			en: "E-mail",
			es: "Correo electrónico",
		},
		info: {
			nl: "Informatie",
			en: "Information",
			es: "Información",
		},
		zoek: {
			nl: "Zoek",
			en: "Search",
			es: "Buscar",
		},
		interestList: {
			nl: "Interesses",
			en: "Interests",
			es: "Intereses",
		},
		firstInterest: {
			nl: "Schaken",
			en: "Chess",
			es: "Ajedrez",
		},
		secondInterest: {
			nl: "Vissen",
			en: "Fishing",
			es: "Pescar",
		},
		thirdInterest: {
			nl: "Zomer",
			en: "Summer",
			es: "Verano",
		},
		fourthInterest: {
			nl: "Zonnen",
			en: "Tanning",
			es: "Broncearse",
		},
		fifthInterest: {
			nl: "Zwemmen",
			en: "Swimming",
			es: "Natación",
		},
		sixthInterest: {
			nl: "Warme landen",
			en: "Warm countries",
			es: "Países cálidos",
		},
		filter: {
			nl: "Filter",
			en: "Filter",
			es: "Filtrar",
		},
	},
	//Translate matching
	profile: {
		myProfile: {
			nl: "Mijn profiel",
			en: "My profile:",
			es: "Mi perfil:",
		},
		firstName: {
			nl: "Voornaam",
			en: "First name",
			es: "Primer nombre",
		},
		lastName: {
			nl: "Achternaam",
			en: "Last name",
			es: "Apellido",
		},
		location: {
			nl: "Locatie",
			en: "Location",
			es: "Ubicación",
		},
		birthDate: {
			nl: "Geboortedatum",
			en: "Date of birth",
			es: "Fecha de nacimiento",
		},
		interest: {
			nl: "Interesses",
			en: "Interests",
			es: "Intereses",
		},
		destination: {
			nl: "Bestemming",
			en: "Destination",
			es: "Destino",
		},
		startDate: {
			nl: "Begin vakantie",
			en: "Start trip",
			es: "Empiezo de vacaciones",
		},
		endDate: {
			nl: "Einde vakantie",
			en: "End trip",
			es: "Conclusion de vacaciones",
		},
		gender: {
			nl: "Geslacht",
			en: "Gender",
			es: "Género",
		},
		genderMan: {
			nl: "Man",
			en: "Man",
			es: "Hombre",
		},
		genderWomen: {
			nl: "Vrouw",
			en: "Woman",
			es: "Mujer",
		},
		genderOther: {
			nl: "Anders",
			en: "Other",
			es: "De lo contrario",
		},
		save: {
			nl: "Opslaan",
			en: "Save",
			es: "Ahorrar",
		},
		photo: {
			nl: "Profiel Foto",
			en: "Profile picture",
			es: "Foto de perfil",
		},
		password: {
			nl: "Wachtwoord",
			en: "password",
			es: "Contraseña",
		},
		uploadPhoto: {
			nl: "Upload foto",
			en: "Upload photo",
			es: "Subir foto",
		},
		uploadFile: {
			nl: "Kies een foto",
			en: "Choose a photo",
			es: "Elige una foto",
		},
		previewText: {
			nl: "Geen bestand gekozen",
			en: "No file is chosen",
			es: "Ningún archivo seleccionado",
		},
		myAccount: {
			nl: "Mijn account",
			en: "My account",
			es: "Mi perfil",
		},
		updateAccount: {
			nl: "Update account",
			en: "Update account",
			es: "Actualizar perfil",
		},
		deleteAccount: {
			nl: "Verwijder account",
			en: "Delete account",
			es: "Borrar cuenta",
		},
		preferences: {
			nl: "Voorkeuren",
			en: "Preferences",
			es: "Preferencias",
		},
		budget: {
			nl: "Budget",
			en: "Budget",
			es: "Presupuesto",
		},
		number: {
			nl: "Telefoonnummer",
			en: "Phone number",
			es: "Numero de teléfono",
		},
		emailRepeat: {
			nl: "Herhaal email",
			en: "Repeat email",
			es: "Repita su correo electrónico",
		},
		passwordRepeat: {
			nl: "Herhaal wachtwoord",
			en: "Repeat password",
			es: "Repita contraseña",
		},
		updateEmail: {
			nl: "Update Email",
			en: "Update Email",
			es: "Update Correo Electrónico",
		},
		updatePassword: {
			nl: "Update Password",
			en: "Update Password",
			es: "Update Contraseña",
		},
	},
	//Translate sign up
	signUp: {
		register: {
			nl: "Registreer",
			en: "Register",
			es: "Registro",
		},
		firstName: {
			nl: "Voornaam",
			en: "First name",
			es: "Primer nombre",
		},
		lastName: {
			nl: "Achternaam",
			en: "Last name",
			es: "Apellido",
		},
		password: {
			nl: "Wachtwoord",
			en: "Password",
			es: "Contraseña",
		},
		repeatPassword: {
			nl: "Herhaal wachtwoord",
			en: "Repeat password",
			es: "Repita la contraseña",
		},
		warningEmpty: {
			nl: "Veld moet ingevuld zijn!",
			en: "Please fill out this field!",
			es: "Por favor, rellena este campo",
		},
		warningInvalidName: {
			nl: "Er zijn vreemde karakters gebruikt in uw naam!",
			en: "Weird characters are used!",
			es: "¡Se han utilizado caracteres extraños!",
		},
		warningInvalidEmail: {
			nl: "Dit is een ongeldig e-mailadres!",
			en: "Please enter a valid email.",
			es: "Por favor, ingrese un correo electrónico válido.",
		},
		warningExistingEmail: {
			nl: "U heeft al een account op dit e-mailadres",
			en: "Email in use. Enter a different email or log in.",
			es: "Correo electrónico ya esta en uso. Ingresa un correo electrónico diferente o inicia sesión.",
		},
		warningPassword: {
			nl: "Wachtwoorden zijn niet hetzelfde!",
			en: "The passwords do not match.",
			es: "Las contraseñas que ingresaste no coinciden.",
		},
		agreement: {
			nl: "Als u registreert gaat u akkoord met de",
			en: "By registering you agree to the",
			es: "Al registrarte aceptas los",
		},
		agreeTerms: {
			nl: "algemene voorwaarden",
			en: "Terms and Conditions",
			es: "Términos y condiciones",
		},
		registerBtn: {
			nl: "Registreren",
			en: "Register",
			es: "Registrar",
		},
		alreadyAccount: {
			nl: "Al een account",
			en: "Already an account",
			es: "Ya tengo una cuenta",
		},
		loginLink: {
			nl: "Log in",
			en: "Sign in",
			es: "Iniciar sesión",
		},
		submitError: {
			nl: "Niet alle gegevens zijn correct ingevoerd!",
			en: "Not all data has been entered correctly!",
			es: "¡No se han ingresado correctamente todos los datos!",
		},
		submitSuccess: {
			//spaces are necessary
			firstSpan: {
				nl: "Gefeliciteerd ",
				en: "Congratulations ",
				es: "¡Felicidades ",
			},
			//spaces are necessary
			secondSpan: {
				nl: " uw account is aangemaakt!",
				en: " your account has been created!",
				es: " su cuenta ha sido creada!",
			},
		},
	},
	//Translate terms of use
	terms: {
		termsOfUse: {
			nl: "Algemene voorwaarden",
			en: "Terms and Conditions",
			es: "Términos y condiciones",
		},
		privacyTitle: {
			nl: "Privacy",
			en: "Privacy",
			es: "Privacidad",
		},
		privacyDescr: {
			nl:
				"Bij Corenbuddy staat privacy op nummer één. Alle gegevens van de gebruiker" +
				"worden veilig opgeslagen. Onze database beheerders hebben een screening" +
				"gehad om misbruik te kunnen voorkomen. Wij als Corenbuddy zullen nooit meer" +
				"persoonsgevens vragen dan hieronder vermeld staan.",
			en:
				"At Corenbuddy, privacy is number one. All user data" +
				"are stored securely. Our database administrators have a screening" +
				"to prevent abuse. We as Corenbuddy will never request more" +
				"personal information as listed below.",
			es:
				"En Corenbuddy, la privacidad es número uno. Todos los datos del usuario" +
				"se almacenan de forma segura. Nuestros administradores de base de datos tienen una evaluación" +
				"para prevenir el abuso. Nosotros como Corenbuddy nunca" +
				"solicitaremos más información personal como de la indicada a continuación.",
		},
		whatData: {
			nl: "Welke gegevens verzamelen wij?",
			en: "What data do we collect?",
			es: "¿Qué datos colectamos?",
		},
		onRegister: {
			nl: "Bij registratie",
			en: "On registration",
			es: "En el registro",
		},
		yourName: {
			nl: "Uw naam",
			en: "Your name",
			es: "Su nombre",
		},
		yourEmail: {
			nl: "Uw emailadres",
			en: "Your email address",
			es: "Su dirección de correo electrónico",
		},
		onContact: {
			nl: "Bij contact",
			en: "On contact",
			es: "En contacto",
		},
		onCreateProfile: {
			nl: "Bij het aanmaken van een profiel:",
			en: "When creating a profile:",
			es: "Al crear un perfil:",
		},
		yourGender: {
			nl: "Uw geslacht",
			en: "Your gender",
			es: "Tu género",
		},
		yourBirthDate: {
			nl: "Uw geboortedatum",
			en: "Your date of birth",
			es: "Tu fecha de nacimiento",
		},
		yourHobby: {
			nl: "Uw hobby's en interesses",
			en: "Your hobbies and interests",
			es: "Tus aficiones e intereses.",
		},
		yourBudget: {
			nl: "Uw reisbudget",
			en: "Your travel budget",
			es: "Tu presupuesto de viaje",
		},
		yourPhone: {
			nl: "Contactgegevens zoals telefoonnummer en e-mailadres",
			en: "Contact details such as telephone number and email address",
			es: "Datos de contacto como número de teléfono y correo electrónico",
		},
		whyData: {
			nl: "Waarom verzamelen wij deze gegevens?",
			en: "Why do we collect this data?",
			es: "¿Por qué colectamos estos datos?",
		},
		customerContact: {
			nl: "Om contact te kunnen leggen met u als gebruiker:",
			en: "To be able to contact you as a user:",
			es: "Para poder contactar contigo como usuario:",
		},
		customerContactDescr: {
			nl:
				"Het is belangrijk als u contact wilt zoeken met ons dat wij een aantal" +
				"gegevens van u hebben, hierdoor verloopt de communicatie soepeler en" +
				"kunt u sneller geholpen worden. Denk hierbij aan uw e-mailadres en/of" +
				"telefoonnummer.",
			en:
				"It is important if we want to communicate with each-other that we have some" +
				"data from you, this makes communication smoother and" +
				"you can be helped faster. Think of your email address and/or" +
				"phone number.",
			es:
				"Es importante si desea contactarnos que contamos con un número de telefono" +
				" o correo electrónico, esto hace que la comunicación sea más fluida y " +
				"puedes recibir ayuda más rápido.",
		},
		findMatch: {
			nl: "Om een geschikte match te kunnen vinden:",
			en: "To find a suitable match:",
			es: "Para encontrar una connexion adecuada:",
		},
		findMatchDescr: {
			nl:
				"Om een goede match voor u te kunnen vinden is het belangrijk dat wij" +
				"weten waar u heen wilt reizen, wat uw hobbies en intresses zijn. Via" +
				"onze filters kunnen wij gebruikers een lijst aanbieden van geschikte" +
				"matches. Deze filters zijn gebaseerd op uw reislocatie, wanneer u wilt" +
				"reizen en uw interesses. Deze gegevens zijn dus essentieel voor een" +
				"goed gebruik van onze website.",
			en:
				"In order to find a good match for you, it is important that we" +
				"know where you want to travel, what your hobbies and interests are." +
				"Our filters allow us to offer users a list of suitable" +
				"matches. These filters are based on your travel location, travel date" +
				"and your interests. This data is therefore essential for a" +
				"good use of our website.",
			es:
				"Para encontrar una buena pareja para ti, es importante que nosotros" +
				"sepa a donde quiere viajar, cuales son sus hobbies e intereses. Vía" +
				"nuestros filtros nos permiten ofrecer a los usuarios una lista de adecuados" +
				"coincidencias. Estos filtros se basan en la ubicación de tu viaje, cuando quieras" +
				"viajes y tus intereses. Por lo tanto, estos datos son esenciales para un" +
				"buen uso de nuestro sitio web.",
		},
		contactMatches: {
			nl: "Om contact te leggen met matches:",
			en: "To make contact with matches:",
			es: "Para ponerse en contacto con tus connexiones:",
		},
		contactMatchesDescr: {
			nl:
				"Nadat u een macht heeft gemaakt met een van de andere gebruikers, heeft" +
				"die gebruiker toegang tot uw contactgegevens zoals social media en" +
				"telefoonnummer. Gebruikers waarmee u geen match mee heeft, omdat u de" +
				"gebruiker heeft geweigerd, de gebruiker heeft u geweigerd of de" +
				"gebruiker is nooit een match optie geweest, krijgen nóóit toegang tot" +
				"uw contact gegevens.",
			en:
				"After creating a power with one of the other users, " +
				"that user accesses your contact information such as social media and" +
				"phone number. Users you don't have a match with because you have the" +
				"user declined, the user denied you, or the" +
				"user has never been a match option, never get access to" +
				"your contact details.",
			es:
				"Después de crear un poder con uno de los otros usuarios, " +
				"ese usuario accede a su información de contacto como redes sociales y" +
				"número de teléfono. Usuarios con los que no tiene una coincidencia porque tiene el" +
				"el usuario rechazó, el usuario te negó, o el" +
				"El usuario nunca ha sido una opción de coincidencia, nunca tiene acceso a" +
				"tus detalles de contacto.",
		},
		corendonDescr: {
			nl:
				"Wij als corenbuddy zijn een dochtermaatschappij. Dit houdt in dat ook" +
				"Corendon toegang heeft tot uw persoonsgegevens. Corendon zal uw gegevens" +
				"uitsluitend gebruiken om geschikte reizen aan te kunnen bieden aan u en uw" +
				"match. Verder zijn er op de website meerdere verwijzingen naar de website" +
				"van Corendon, als u daar gebruik van maakt zal Corendon daar gegevens over" +
				"krijgen. Ook is het mogelijk dat Corendon reclames over reisbestemmingen" +
				"aan u aanbied.",
			en:
				"We as corenbuddy are a subsidiary. This means that also" +
				"Corendon has access to your personal data. Corendon will use your data" +
				"only use it to be able to offer suitable travel to you and your" +
				"match. Furthermore, there are several references to the website on the website" +
				"from Corendon, if you use it, Corendon will provide information about it" +
				"It is also possible that Corendon advertises about travel destinations" +
				"offer to you.",
			es:
				"Nosotros, como corenbuddy, somos una subsidiaria. Eso significa que también " +
				"Corendon tiene acceso a sus datos personales. Corendon utilizará sus datos " +
				"solo para poder ofrecerle un viaje adecuado a usted y a su " +
				"connexion. Además, hay varias referencias al sitio web en el sitio web  " +
				"de Corendon, si lo usa, Corendon le dispondrá información al respecto " +
				"también es posible que Corendon haga publicidad sobre destinos de viaje " +
				"ofrecerte.",
		},
		deleteData: {
			nl: "Verwijderen persoonsgegevens:",
			en: "Delete personal data:",
			es: "Borrar datos personales:",
		},
		deleteDataDescr: {
			nl:
				"Bij het verwijderen van uw account worden ook uw persoonsgegevens uit onze" +
				"database verwijderd. Wilt u later weer opnieuw gebruik maken van onze" +
				"service moet u weer opnieuw uw gegevens aan ons doorgeven.",
			en:
				"When you delete your account, your personal data will also be removed from our" +
				"database deleted. If in the future you were to like to use our " +
				"services again, you would have to provide us with your details again.",
			es:
				"Cuando borre su cuenta, sus datos personales también se borraran de nuestra" +
				"base de datos. Si en el futuro desea volver a usar nuestros servicios, tendría que facilitarnos " +
				"sus datos de nuevamente.",
		},
		service: {
			nl: "Service",
			en: "Service",
			es: "Servicio",
		},
		serviceDescr: {
			nl:
				"Wij bieden u een manier aan om een reispartner te kunnen vinden. Hieraan" +
				"hebben wij een aantal regels gesteld",
			en:
				"We offer you a way to find a travel partner. To this" +
				"We have set some rules",
			es:
				"Le ofrecemos una forma de encontrar un compañero de viaje. A esto" +
				"Hemos establecido algunas reglas.",
		},
		usage: {
			nl: "Gebruik:",
			en: "Usage:",
			es: "Uso:",
		},
		firstUsageDescr: {
			nl:
				"Corenbuddy wordt uitsluitend gebruikt voor het maken van reismatches." +
				"Dit houdt in dat wij geen service(s) aanbieden om een reis te verzorgen" +
				"om te reizen met uw match.",
			en:
				"Corenbuddy is used exclusively for making travel matches." +
				"This means that we do not offer any service(s) to arrange a trip" +
				"to travel with your match.",
			es:
				"Corenbuddy se usa exclusivamente para hacer combinaciones de viaje. " +
				"Esto significa que no ofrecemos ningún servicio para organizar un viaje " +
				"para viajar con tu connexion.",
		},
		secondUsageDescr: {
			nl:
				"Contact tussen matches wordt gelegd door de personen zelf. Corenbuddy" +
				"zelf biedt geen mogelijk van contact tussen matches via de" +
				"webapplicatie. Wel leveren wij de juiste gegevens om matches de" +
				"mogelijkheid te geven om contact te leggen.",
			en:
				"Contact between matches is made by the persons themselves. Corenbuddy" +
				"itself offers no possibility of contact between matches via the" +
				"web application. We do provide the correct data to match " +
				"to give you the opportunity to make contact with your match.",
			es:
				"El contacto entre connexiones lo hacen las propias personas. Corenbuddy " +
				"en sí no ofrece posibilidad de contacto entre connexiones a través de la" +
				"aplicación web. Proporcionamos los datos correctos para que coincidan con cada uno" +
				"para darle la oportunidad de hacer contacto.",
		},
		determineMatches: {
			nl: "Hoe bepalen wij matches?",
			en: "How do we determine matches?",
			es: "¿Cómo determinamos las coincidencias?",
		},
		determineMatchesDescr: {
			nl:
				"De lijst van matches wordt bepaald op basis van uw interesses. Wij laten u geen matches" +
				"zien die geen overeenkomende interesses hebben met u. U kunt optioneel ook filteren op vakantie " +
				"bestemming of tijdsbestek. U als gebruiker besluit zelf of u" +
				"met andere gebruikers wilt matchen of niet.",
			en:
				"The list of matches is determined based on your interests. We will not show you any matches" +
				"that do not have similar interests to you. Optionally, you can also filter by holiday " +
				"destination or time frame. You as a user decide whether you" +
				"match with other users or not.",
			es:
				"La lista de coincidencias se determina en función de sus intereses. No le mostraremos ninguna " +
				"connexion que no tengan intereses similares a los tuyos. Opcionalmente, también puedes filtrar por " +
				"destino de viaje o período de tiempo. Tú como usuario decides si haces " +
				"connexiones con otros usuarios o no.",
		},
		liability: {
			nl: "Aansprakelijkheid:",
			en: "Liability:",
			es: "Responsabilidad:",
		},
		firstLiability: {
			nl:
				"Corenbuddy is niet verantwoordelijk voor situaties die voortvloeien uit" +
				"afspraken die zijn gemaakt tijdens privè contact tussen de matches.",
			en:
				"Corenbuddy is not responsible for situations arising from" +
				"arrangements made during private contact between the matches.",
			es:
				"Corenbuddy no se hace responsable de situaciones derivadas de " +
				"arreglos hechos durante el contacto privado entre las connexiones.",
		},
		secondLiability: {
			nl:
				"Corenbuddy is niet verantwoordelijk voor problemen die ontstaan tijdens" +
				"de reis met je match, hiervoor verwijzen wij u naar de reismaatschappij",
			en:
				"Corenbuddy is not responsible for problems that arise during " +
				"the journey with your match, for this we refer you to the travel agency.",
			es:
				"Corenbuddy no se hace responsable de los problemas que surjan durante" +
				"el viaje con su pareja, para ello le remitimos a la",
		},
		termsOfUseCorendon: {
			nl: "Algemene voorwaarde van Corendon.",
			en: "General terms and conditions of Corendon",
			es: "Términos y condiciones generales de Corendon",
		},
		firstTermsOfUseCorendon: {
			nl: "Bij herhaald misbruik van onze match service kan uw account verwijderd worden.",
			en: "Repeated misuse of our match service may result in your account being deleted.",
			es:
				"El uso indebido repetido de nuestro servicio de coincidencias puede resultar" +
				"en la eliminación de su cuenta.",
		},
		secondTermsOfUseCorendon: {
			nl:
				"Corenbuddy probeert in al zijn capaciteiten misbruikers op te sporen en" +
				"aan te pakken. Wij raden onze gebruikers aan om nooit zomaar betalingen" +
				"te maken zonder de juiste kennis over uw match.",
			en:
				"Corenbuddy tries in all his capacities to track down abusers and" +
				"we advise our users never to make payments without" +
				"proper knowledge about your match.",
			es:
				"Corenbuddy intenta en todas sus capacidades rastrear a los abusadores y " +
				"aconsejamos a nuestros usuarios que nunca realicen pagos sin " +
				"sin el conocimiento adecuado acerca de su connexion.",
		},
		thirdTermsOfUseCorendon: {
			nl:
				"Na wederzijdse acceptatie van een match is corenbuddy niet meer" +
				"verantwoordelijk voor het bekent worden van uw contactgegevens aan uw" +
				"match.",
			en:
				"After mutual acceptance of a match, corenbuddy is no longer" +
				"responsible for making your contact details known to your" +
				"match.",
			es:
				"Después de la aceptación mutua de un partido, corenbuddy ya no está " +
				"responsable de dar a conocer sus datos de contacto a su connexion.",
		},
	},
	forgotPassword: {
		page1: {
			title: {
				nl: "Wachtwoord vergeten",
				en: "Forgot password",
				es: "Olvidaste tu contraseña",
			},
			text: {
				nl: "Vul de E-mail van uw CorenBuddy account in.",
				en: "Please enter the E-mail of your CorenBuddy account.",
				es: "Ingrese el correo electrónico de su cuenta de CorenBuddy.",
			},
			button: {
				nl: "Verder",
				en: "Continue",
				es: "Seguir",
			},
			email: {
				nl: "E-mail",
				en: "E-mail",
				es: "Correo electrónico",
			},
			errorInvalidEmail: {
				nl: "Ongeldige e-mail",
				en: "Invalid Email",
				es: "Correo electrónico inválido",
			},
			errorResetCodeDeleteFailed: {
				nl: "Reset code verwijderen mislukt",
				en: "Reset code removal failed",
				es: "La eliminación del código de reinicio falló",
			},
			errorResetCodeInsertFailed: {
				nl: "Reset code in database zetten mislukt",
				en: "Failed to put reset code in database",
				es: "No se pudo poner el código de reinicio en la base de datos",
			},
			errorSendEmailFailed: {
				nl: "Email versturen mislukt",
				en: "Failed to send email",
				es: "No se pudo enviar el correo electrónico",
			},
		},
		page2: {
			title: {
				nl: "Wachtwoord vergeten",
				en: "Forgot password",
				es: "Olvidaste tu contraseña",
			},
			text: {
				nl:
					"Goed zo! We hebben u een E-mail gestuurd met een link om een" +
					" nieuw wachtwoord aan te maken. De instructies volgen daar verder.",
				en:
					"Well done! We have sent you an email with a link to create a new " +
					"password. The instructions follow there.",
				es:
					"¡Bien hecho! Le hemos enviado un correo electrónico con " +
					"un enlace para crear una nueva contraseña. Las instrucciones siguen allí.",
			},
			button: {
				nl: "Klaar",
				en: "Finish",
				es: "Finalizar",
			},
		},
		page3: {
			title: {
				nl: "Nieuw wachtwoord aanmaken",
				en: "Create new password",
				es: "Crear una contraseña nueva",
			},
			instruction: {
				nl: "Vul uw nieuwe wachtwoord in",
				en: "Please enter your new password",
				es: "Introduzca su contraseña nueva",
			},
			input1: {
				nl: "Nieuw wachtwoord",
				en: "New password",
				es: "Contraseña nueva ",
			},
			input2: {
				nl: "Nieuw wachtwoord herhalen",
				en: "Repeat new password",
				es: "Repita la contraseña nueva ",
			},
			button: {
				nl: "Opslaan",
				en: "Save",
				es: "Ahorrar",
			},
			errorNoResetCode: {
				nl:
					"Wachtwoord aanpassen mislukt, wachtwoord is al aangepast," +
					"nieuw-wachtwoord-aanvraag mislukt of overschreven.",
				en:
					"Password change failed, password has already been changed, " +
					"new password request failed or overwritten",
				es:
					"El cambio de contraseña falló, la contraseña ya se cambió, " +
					"la solicitud de nueva contraseña falló o se sobrescribió",
			},
			errorNoEmail: {
				nl: "Email ophalen mislukt",
				en: "Failed to retrieve email",
				es: "No se pudo recuperar el correo electrónico",
			},
			errorPasswordUpdateFailed: {
				nl: "Wachtwoord updaten mislukt",
				en: "Password update failed",
				es: "Error al actualizar la contraseña",
			},
			errorResetCodeDeleteFailed: {
				nl: "Reset code verwijderen mislukt",
				en: "Deletion of reset code failed",
				es: "No se pudo eliminar el código de reinicio",
			},
			updatePasswordSuccess: {
				nl: "Wachtwoord aanpassen gelukt",
				en: "Successfully changed password",
				es: "Contraseña cambiada con éxito",
			},
		},
	},
};

FYSCloud.Localization.setTranslations(translations);
FYSCloud.Localization.switchLanguage(initialLanguage);

document.querySelector("#localizationLanguageSwitch").value = initialLanguage;

document.querySelector("#localizationLanguageSwitch").addEventListener("change", function () {
	FYSCloud.Localization.switchLanguage(this.value);
	FYSCloud.Session.set("language", this.value);
	placeholderChange();
});

/**
 * This piece of code will translate the placeholders on the contact form.
 * @author Lucas Meester
 */

// Checking if user is on about-us page.
function placeholderChange() {
	let userLanguage = document.querySelector("#localizationLanguageSwitch").value;

	if (window.location.pathname == "/wwwroot/about-us.html") {
		const userName = document.querySelector(".contact-name");
		const userEmail = document.querySelector(".contact-email");
		const userPhone = document.querySelector(".contact-phone");
		const userSubject = document.querySelector(".contact-subject");
		const userQuestion = document.querySelector(".contact-text");

		if (userLanguage === "nl") {
			userName.setAttribute("placeholder", "Bijv. Johan de Vries");
			userEmail.setAttribute("placeholder", "Bijv. johande@vries.nl");
			userPhone.setAttribute("placeholder", "Bijv. 06123456789");
			userSubject.setAttribute("placeholder", "Bijv. Buddy verloren");
			userQuestion.setAttribute(
				"placeholder",
				"Bijv. Ik ben mijn buddy verloren, hoe nu verder?"
			);
		} else if (userLanguage === "en") {
			userName.setAttribute("placeholder", "E.G. John Jaden");
			userEmail.setAttribute("placeholder", "E.G. John@jaden.com");
			userPhone.setAttribute("placeholder", "E.G. 06123456789");
			userSubject.setAttribute("placeholder", "E.G. Lost my buddy");
			userQuestion.setAttribute(
				"placeholder",
				"E.G. I've lost my buddy, what do I do now?"
			);
		} else if (userLanguage === "es") {
			userName.setAttribute("placeholder", "PE. James Johnsen");
			userEmail.setAttribute("placeholder", "PE. James@Johnsen.es");
			userPhone.setAttribute("placeholder", "PE. 06123456789");
			userSubject.setAttribute("placeholder", "PE. Amigo perdido");
			userQuestion.setAttribute("placeholder", "PE. Perdí a mi amigo, ¿ahora qué?");
		}
	}
}
placeholderChange();
