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
	});
}

//If the user clicks outside the modal, close the modal
window.addEventListener("click", (event) => {
	if (event.target === loginModal) {
		loginModal.style.display = "none";
	}
});

/*
//Language switcher app.js
let langs = document.querySelector(".langs"),
	link = document.querySelectorAll("a"),
	//Navbar
	findBuddy = document.querySelector(".zoek-buddy"),
	aboutUs = document.querySelector(".over-ons"),
	language = document.querySelector(".dropbtn"),
	login = document.querySelector(".login-lang"),
	register = document.querySelector(".register-lang"),
	//Hambuger
	hamFindBuddy = document.querySelector(".burger-zoek-buddy"),
	HamAboutUs = document.querySelector(".burger-over-ons"),
	hamLanguage = document.querySelector(".burger-dropbtn"),
	hamLogin = document.querySelector(".burger-login-lang"),
	hamRegister = document.querySelector(".burger-register-lang"),
	//login modal
	loginModalWw = document.querySelector(".login-ww-lang"),
	loginModalBtn = document.querySelector(".login-btn-lang"),
	forgotPass = document.querySelector(".forgot-password-lang"),
	forgotPassLink = document.querySelector(".forgot-lang"),
	noAccount = document.querySelector(".no-account-lang"),
	noAccountLink = document.querySelector(".account-link-lang"),
	//Footer reis-quote
	quote = document.querySelector(".reis-quote"),
	//Footer title
	footerInfo = document.querySelector(".footer-titel-info"),
	//Footer info link
	firstFooterInfo = document.querySelector(".first-footerLink-info"),
	secondFooterInfo = document.querySelector(".second-footerLink-info"),
	thirdFooterInfo = document.querySelector(".third-footerLink-info"),
	//Footer corenbuddy link
	firstFooterBuddy = document.querySelector(".first-footerLink-buddy"),
	secondFooterBuddy = document.querySelector(".second-footerLink-buddy"),
	thirdFooterBuddy = document.querySelector(".third-footerLink-buddy"),
	//My Profile
	myProfile = document.querySelector(".my-profile")
//hamburger my profile
//Safe button
hamMyProfile = document.querySelector(".burger-my-profile"),
	//Home Page
	heroTitle = document.querySelector(".hero-title"),
	heroDescr = document.querySelector(".hero-title-description"),
	//First info card
	firstInfoTitle = document.querySelector(".first-info-title-lang"),
	firstInfoDescr = document.querySelector(".first-info-descr-lang"),
	//Second info card
	secondInfoTitle = document.querySelector(".second-info-title-lang"),
	secondInfoDescr = document.querySelector(".second-info-descr-lang"),
	//third info card
	thirdInfoTitle = document.querySelector(".third-info-title-lang"),
	thirdInfoDescr = document.querySelector(".third-info-descr-lang"),
	//CTA
	ctaTitle = document.querySelector(".cta-title"),
	ctaSubTitle = document.querySelector(".cta-sub-title"),
	//CTA login/register
	ctaLogin = document.querySelector(".cta-login-lang"),
	ctaRegister = document.querySelector(".cta-register-lang"),
	//CTA cards
	firstCtaCard = document.querySelector(".first-cta-card"),
	secondCtaCard = document.querySelector(".second-cta-card"),
	thirdCtaCard = document.querySelector(".third-cta-card"),
	fourthCtaCard = document.querySelector(".fourth-cta-card"),
	// about us page
	aboutUsTitle = document.querySelector(".about-us-title"),
	//CorenBuddy
	corenBuddyText = document.querySelector(".corenbuddy-text"),
	corenBuddyBtn = document.querySelector(".corenbuddy-btn"),
	//History CorenDon
	corendonHistory = document.querySelector(".history-head"),
	corendonHistoryText = document.querySelector(".corendon-history-text"),
	//Who are We
	whoAreWe = document.querySelector(".who-are-we-head"),
	whoAreWeText = document.querySelector(".who-are-we-text"),
	//Contact about us page
	contactTitle = document.querySelector(".aboutus-contact-head"),
	//Contact form
	fullNameForm = document.querySelector(".full-name-form"),
	phoneNrForm = document.querySelector(".phone-nr-form"),
	topicForm = document.querySelector(".topic-form"),
	questionForm = document.querySelector(".question-form"),
	//terms of use page
	termsOfUse = document.querySelector(".terms-of-use-title"),
	//Privacy
	privacy = document.querySelector(".privacy-title"),
	privacyText = document.querySelector(".privacy-text"),
	//What Data We Collect
	whatDataCollect = document.querySelector(".what-data-collect-title"),
	registerTitleList = document.querySelector(".register-titel-list"),
	firstRegisterData = document.querySelector(".first-register-data"),
	secondRegisterData = document.querySelector(".second-register-data"),
	contactTitleList = document.querySelector(".contact-titel-list"),
	firstContactData = document.querySelector(".first-contact-data"),
	secondContactData = document.querySelector(".second-contact-data"),
	profileTitleList = document.querySelector(".profile-titel-list"),
	firstProfileData = document.querySelector(".first-profile-data"),
	secondProfileData = document.querySelector(".second-profile-data"),
	thirdProfileData = document.querySelector(".third-profile-data"),
	fourthProfileData = document.querySelector(".fourth-profile-data"),
	fifthProfileData = document.querySelector(".fifth-profile-data"),
	//Why do we collect data
	whyDataCollect = document.querySelector(".why-data-collect-title"),
	contactCustomerTitle = document.querySelector(".contact-customer-title"),
	contactCustomerText = document.querySelector(".contact-customer-descr"),
	findMatchTitle = document.querySelector(".find-match-title"),
	findMatchText = document.querySelector(".find-match-descr"),
	contactMatchTitle = document.querySelector(".contact-match-title"),
	contactMatchText = document.querySelector(".contact-match-descr"),
	corendonTermsText = document.querySelector(".corendon-terms-descr"),
	deleteCustomerDataTitle = document.querySelector(".delete-customer-data-title"),
	deleteCustomerDataText = document.querySelector(".delete-customer-data-descr"),
	serviceTitle = document.querySelector(".service-title"),
	serviceText = document.querySelector(".service-descr"),
	//usage
	usageTitle = document.querySelector(".usage-title"),
	usageFirstText = document.querySelector(".usage-first-text"),
	usageSecondText = document.querySelector(".usage-second-text"),
	//How we determine the matches
	determineMatchTitle = document.querySelector(".determine-matches-title"),
	determineMatchText = document.querySelector(".determine-matches-text"),
	//Liability
	liabilityTitle = document.querySelector(".liability-title"),
	liabilityFirstText = document.querySelector(".liability-first-text"),
	liabilitySecondText = document.querySelector(".liability-second-text"),
	termsOfUseCorenDon = document.querySelector(".terms-of-use-corendon"),
	liabilityThirdText = document.querySelector(".liability-third-text"),
	liabilityFourthText = document.querySelector(".liability-fourth-text"),
	liabilityFifthText = document.querySelector(".liability-fifth-text"),
	//Matching page
	existBuddy = document.querySelector(".existing-buddy"),
	proposeMatch = document.querySelector(".proposed-match"),
	incomingMatch = document.querySelector(".incoming-match"),
	outgoingMatch = document.querySelector(".outgoing-match"),
	buddysProfile = document.querySelector(".buddy-profile"),
	bioTitle = document.querySelector(".bio-title"),
	interestTitle = document.querySelector(".interest-title"),
	interestChess = document.querySelector(".interest-chess"),
	interestFishing = document.querySelector(".interest-fishing"),
	interestSummer = document.querySelector(".interest-summer"),
	interestTanning = document.querySelector(".interest-tanning"),
	interestSwimming = document.querySelector(".interest-swimming"),
	interestHotCountry = document.querySelector(".interest-hot-country"),
	//Sign up page
	signUpRegisterTitle = document.querySelector(".register-title"),
	firstNameText = document.querySelector(".first-name-text"),
	lastNameText = document.querySelector(".last-name-text"),
	passwordText = document.querySelector(".password-text"),
	repeatPasswordText = document.querySelector(".repeat-password-text"),
	agreementText = document.querySelector(".agreement-text"),
	termsLinkText = document.querySelector(".terms-link-text"),
	signUpRegisterBtn = document.querySelector(".sign-up-register"),
	alreadyAccount = document.querySelector(".already-account"),
	signUpFormLogin = document.querySelector(".sign-up-form-login"),
	//profile page
	myProfileTitle = document.querySelector(".h1-mijn-profiel"),
	myFirstNameText = document.querySelector(".my-first-name"),
	myLastNameText = document.querySelector(".my-last-Name"),
	myBioText = document.querySelector(".my-bio"),
	myLocation = document.querySelector(".my-location"),
	myBirthDate = document.querySelector(".my-birth-date"),
	//First interest field
	myInterest= document.querySelector(".my-interest"),
	firstFieldOne = document.querySelector(".first-field-one"),
	firstFieldTwo = document.querySelector(".first-field-two"),
	firstFieldThree = document.querySelector(".first-field-three"),
	firstFieldFour = document.querySelector(".first-field-four"),
	//Second interest field
	secondFieldOne = document.querySelector(".second-field-one"),
	secondFieldTwo = document.querySelector(".second-field-two"),
	secondFieldThree = document.querySelector(".second-field-three"),
	secondFieldFour= document.querySelector(".second-field-four"),
	//Third interest field
	thirdFieldOne = document.querySelector(".third-field-one"),
	thirdFieldTwo = document.querySelector(".third-field-two"),
	thirdFieldThree = document.querySelector(".third-field-three"),
	thirdFieldFour = document.querySelector(".third-field-four"),
	//Fourth interest field
	fourthFieldOne = document.querySelector(".fourth-field-one"),
	fourthFieldTwo = document.querySelector(".fourth-field-two"),
	fourthFieldThree = document.querySelector(".fourth-field-three"),
	fourthFieldFour = document.querySelector(".fourth-field-four"),
	//Fifth interest field
	fifthFieldOne = document.querySelector(".fifth-field-one"),
	fifthFieldTwo = document.querySelector(".fifth-field-two"),
	fifthFieldThree = document.querySelector(".fifth-field-three"),
	fifthFieldFour = document.querySelector(".fifth-field-four"),
	//Sixth interest field
	sixthFieldOne = document.querySelector(".sixth-field-one"),
	sixthFieldTwo = document.querySelector(".sixth-field-two"),
	sixthFieldThree = document.querySelector(".sixth-field-three"),
	sixthFieldFour = document.querySelector(".sixth-field-four"),
	//The other words from the form on the profile page
	myDestination = document.querySelector(".my-destionation"),
	myTimeFrame = document.querySelector(".my-time-frame"),
	//Gender
	myGender = document.querySelector(".my-gender"),
	genderMan = document.querySelector(".gender-man"),
	genderWomen = document.querySelector(".gender-women"),
	genderOther = document.querySelector(".gender-other")
	safeBtn = document.querySelector(".safe-btn"),
	//Profile photo
	profilePhoto = document.querySelector(".profile-photo"),
	//My account from profile page
	myAccountBox = document.querySelector(".my-account-box"),
	passwordBox = document.querySelector(".password-box"),
	updateAccountBtn = document.querySelector(".update-account-btn");*/
/*
link.forEach(el=>{
	el.addEventListener("click", ()=>{
		langs.querySelector(".active").classList.remove("active");
		el.classList.add("active");

		let attr = el.getAttribute("language")


		//Navbar
		findBuddy.textContent = data[attr].findB
		aboutUs.textContent = data[attr].about
		language.textContent = data[attr].country
		login.textContent = data[attr].loginLang
		register.textContent = data[attr].registerLang
		//Hambuger
		hamFindBuddy.textContent = data[attr].hamFindBuddyLang
		HamAboutUs.textContent = data[attr].HamAboutUsLang
		hamLanguage.textContent = data[attr].hamLanguageLang
		hamLogin.textContent = data[attr].hamLoginLang
		hamRegister.textContent = data[attr].hamRegisterLang
		//login modal
		loginModalWw.textContent = data[attr].loginModalWwLang
		loginModalBtn.textContent = data[attr].loginModalBtnLang
		forgotPass.textContent = data[attr].forgotPassLang
		forgotPassLink.textContent = data[attr].forgotPassLinkLang
		noAccount.textContent = data[attr].noAccountLang
		noAccountLink.textContent = data[attr].noAccountLinkLang
		//Footer reis-quote
		quote.textContent = data[attr].quoteLang
		//Footer title
		footerInfo.textContent = data[attr].footerInfoLang
		//Footer info link
		firstFooterInfo.textContent = data[attr].firstFooterInfoLang
		secondFooterInfo.textContent = data[attr].secondFooterInfoLang
		thirdFooterInfo.textContent = data[attr].thirdFooterInfoLang
		//Footer corenbuddy link
		firstFooterBuddy.textContent = data[attr].firstFooterBuddyLang
		secondFooterBuddy.textContent = data[attr].secondFooterBuddyLang
		thirdFooterBuddy.textContent = data[attr].thirdFooterBuddyLang
		//My profile
		myProfile.textContent = data[attr].myProfileBtn
		//Hamburger my profile
		hamMyProfile.textContent = data[attr].hammyProfileBtn
		//Home Page
		heroTitle.textContent = data[attr].heroTitleLang
		heroDescr.textContent = data[attr].heroDescrLang
		//First info card
		firstInfoTitle.textContent = data[attr].firstInfoTitleLang
		firstInfoDescr.textContent = data[attr].firstInfoDescrLang
		//Second info card
		secondInfoTitle.textContent = data[attr].secondInfoTitleLang
		secondInfoDescr.textContent = data[attr].secondInfoDescrLang
		//Third info card
		thirdInfoTitle.textContent = data[attr].thirdInfoTitleLang
		thirdInfoDescr.textContent = data[attr].thirdInfoDescrLang
		//CTA
		ctaTitle.textContent = data[attr].ctaTitleLang
		ctaSubTitle.textContent = data[attr].ctaSubTitleLang
		//CTA login/register
		ctaLogin.textContent = data[attr].ctaLoginLang
		ctaRegister.textContent = data[attr].ctaRegisterLang
		//CTA cards
		firstCtaCard.textContent = data[attr].firstCtaCardLang
		secondCtaCard.textContent = data[attr].secondCtaCardLang
		thirdCtaCard.textContent = data[attr].thirdCtaCardLang
		fourthCtaCard.textContent = data[attr].fourthCtaCardLang
		// about us page
		aboutUsTitle.textContent = data[attr].aboutUsTitleLang
		//CorenBuddy
		corenBuddyText.textContent = data[attr].corenBuddyLang
		corenBuddyBtn.textContent = data[attr].corenBuddyBtnLang
		//History CorenDon
		corendonHistory.textContent = data[attr].corendonHistoryTitle
		corendonHistoryText.textContent = data[attr].corendonHistoryDescr
		//Who are We
		whoAreWe.textContent = data[attr].whoAreWeTitle
		whoAreWeText.textContent = data[attr].whoAreWeDescr
		//Contact about us page
		contactTitle.textContent = data[attr].contactTitleLang
		//Contact form
		fullNameForm.textContent = data[attr].fullNameFormLang
		phoneNrForm.textContent = data[attr].phoneNrFormLang
		topicForm.textContent = data[attr].topicFormLang
		questionForm.textContent = data[attr].questionFormLang
		//terms of use page
		termsOfUse.textContent = data[attr].termsOfUseTitle
		//Privacy
		privacy.textContent = data[attr].privacyTitle
		privacyText.textContent = data[attr].privacyDescr
		//What Data We Collect
		whatDataCollect.textContent = data[attr].whatDataCollectTitle
		registerTitleList.textContent = data[attr].registerTitleListLang
		firstRegisterData.textContent = data[attr].firstRegisterDataLang
		secondRegisterData.textContent = data[attr].secondRegisterDataLang
		contactTitleList.textContent = data[attr].contactTitleListLang
		firstContactData.textContent = data[attr].firstContactDataLang
		secondContactData.textContent = data[attr].secondContactDataLang
		profileTitleList.textContent = data[attr].profileTitleListLang
		firstProfileData.textContent = data[attr].firstProfileDataLang
		secondProfileData.textContent = data[attr].secondProfileDataLang
		thirdProfileData.textContent = data[attr].thirdProfileDataLang
		fourthProfileData.textContent = data[attr].fourthProfileDataLang
		fifthProfileData.textContent = data[attr].fifthProfileDataLang
		//Why do we collect data
		whyDataCollect.textContent = data[attr].whyDataCollectLang
		contactCustomerTitle.textContent = data[attr].contactCustomerTitleLang
		contactCustomerText.textContent = data[attr].contactCustomerDescr
		findMatchTitle.textContent = data[attr].findMatchTitleLang
		findMatchText.textContent = data[attr].findMatchDescr
		contactMatchTitle.textContent = data[attr].contactMatchTitleLang
		contactMatchText.textContent = data[attr].contactMatchDescr
		corendonTermsText.textContent = data[attr].corendonTermsDescr
		deleteCustomerDataTitle.textContent = data[attr].deleteCustomerDataTitleLang
		deleteCustomerDataText.textContent = data[attr].deleteCustomerDataDescr
		serviceTitle.textContent = data[attr].serviceTitleLang
		serviceText.textContent = data[attr].serviceDescr
		//usage
		usageTitle.textContent = data[attr].usageTitleLang
		usageFirstText.textContent = data[attr].usageFirstDescr
		usageSecondText.textContent = data[attr].usageSecondDescr
		//How we determine the matches
		determineMatchTitle.textContent = data[attr].determineMatchLang
		determineMatchText.textContent = data[attr].determineMatchDescr
		//Liability
		liabilityTitle.textContent = data[attr].liabilityTitleLang
		liabilityFirstText.textContent = data[attr].liabilityFirstDescr
		liabilitySecondText.textContent = data[attr].liabilitySecondDescr
		termsOfUseCorenDon.textContent = data[attr].termsOfUseCorenDonLink
		liabilityThirdText.textContent = data[attr].liabilityThirdDescr
		liabilityFourthText.textContent = data[attr].liabilityFourthDescr
		liabilityFifthText.textContent = data[attr].liabilityFifthDescr
		//Matching page
		existBuddy.textContent = data[attr].existBuddyLang
		proposeMatch.textContent = data[attr].proposeMatchLang
		incomingMatch.textContent = data[attr].incomingMatchLang
		outgoingMatch.textContent = data[attr].outgoingMatchLang
		buddysProfile.textContent = data[attr].buddysProfileLang
		bioTitle.textContent = data[attr].bioTitleLang
		interestTitle.textContent = data[attr].interestTitleLang
		interestChess.textContent = data[attr].interestChessLang
		interestFishing.textContent = data[attr].interestFishingLang
		interestSummer.textContent = data[attr].interestSummerLang
		interestTanning.textContent = data[attr].interestTanningLang
		interestSwimming.textContent = data[attr].interestSwimmingLang
		interestHotCountry.textContent = data[attr].interestHotCountryLang
		//Sign up page
		signUpRegisterTitle.textContent = data[attr].signUpRegisterLang
		firstNameText.textContent = data[attr].fNameText
		lastNameText.textContent = data[attr].lNameText
		passwordText.textContent = data[attr].passText
		repeatPasswordText.textContent = data[attr].repeatPassText
		agreementText.textContent = data[attr].agreeText
		termsLinkText.textContent = data[attr].termsLink
		signUpRegisterBtn.textContent = data[attr].RegisterBtn
		alreadyAccount.textContent = data[attr].alreadyAccountLang
		signUpFormLogin.textContent = data[attr].signUpLoginBtn
		//profile page
		myProfileTitle.textContent = data[attr].myProfileTitleLang
		myFirstNameText.textContent = data[attr].myFirstNameTextLang
		myLastNameText.textContent = data[attr].myLastNameTextLang
		myBioText.textContent = data[attr].myBioTextLang
		myLocation.textContent = data[attr].myLocationLang
		myBirthDate.textContent = data[attr].myBirthDateLang
		//First interest field
		myInterest.textContent = data[attr].myInterestTitle
		firstFieldOne.textContent = data[attr].firstFieldOneLang
		firstFieldTwo.textContent = data[attr].firstFieldTwoLang
		firstFieldThree.textContent = data[attr].firstFieldThreeLang
		firstFieldFour.textContent = data[attr].firstFieldFourLang
		//Second interest field
		secondFieldOne.textContent = data[attr].secondFieldOneLang
		secondFieldTwo.textContent = data[attr].secondFieldTwoLang
		secondFieldThree.textContent = data[attr].secondFieldThreeLang
		secondFieldFour.textContent = data[attr].secondFieldFourLang
		//Third interest field
		thirdFieldOne.textContent = data[attr].thirdFieldOneLang
		thirdFieldTwo.textContent = data[attr].thirdFieldTwoLang
		thirdFieldThree.textContent = data[attr].thirdFieldThreeLang
		thirdFieldFour.textContent = data[attr].thirdFieldFourLang
		//Fourth interest field
		fourthFieldOne.textContent = data[attr].fourthFieldOneLang
		fourthFieldTwo.textContent = data[attr].fourthFieldTwoLang
		fourthFieldThree.textContent = data[attr].fourthFieldThreeLang
		fourthFieldFour.textContent = data[attr].fourthFieldFourLang
		//Fifth interest field
		fifthFieldOne.textContent = data[attr].fifthFieldOneLang
		fifthFieldTwo.textContent = data[attr].fifthFieldTwoLang
		fifthFieldThree.textContent = data[attr].fifthFieldThreeLang
		fifthFieldFour.textContent = data[attr].fifthFieldFourLang
		//Sixth interest field
		sixthFieldOne.textContent = data[attr].sixthFieldOneLang
		sixthFieldTwo.textContent = data[attr].sixthFieldTwoLang
		sixthFieldThree.textContent = data[attr].sixthFieldThreeLang
		sixthFieldFour.textContent = data[attr].sixthFieldFourLang
		//The other words from the form on the profile page
		myDestination.textContent = data[attr].myDestinationLang
		myTimeFrame.textContent = data[attr].myTimeFrameLang
		//Gender
		myGender.textContent = data[attr].myGenderLang
		genderMan.textContent = data[attr].genderManLang
		genderWomen.textContent = data[attr].genderWomenLang
		genderOther.textContent = data[attr].genderOtherLang
		safeBtn.textContent = data[attr].safeBtnLang
		//Profile photo
		profilePhoto.textContent = data[attr].profilePhotoLang
		//My account from profile page
		myAccountBox.textContent = data[attr].myAccountBoxLang
		passwordBox.textContent = data[attr].passwordBoxLang
		updateAccountBtn.textContent = data[attr].updateAccountBtnLang


	})
})

let data = {
	nederlands: {
		//Navbar
		findB: "Zoek mijn buddy",
		about: "Over ons",
		country: "Talen",
		loginLang: "Login",
		registerLang: "Registreren",
		//hamburger
		hamFindBuddyLang: "Zoek mijn buddy",
		HamAboutUsLang: "Over ons",
		hamLanguageLang: "Talen",
		hamLoginLang: "Login",
		hamRegisterLang: "Registreren",
		//login modal
		loginModalWwLang: "Wachtwoord",
		loginModalBtnLang: "Inloggen",
		forgotPassLang: "Wachtwoord",
		forgotPassLinkLang: "vergeten",
		noAccountLang: "Nog geen",
		noAccountLinkLang: "account",
		//Footer reis-quote
		quoteLang: "Met een Corenbuddy reis je niet meer alleen!",
		//Footer title
		footerInfoLang: "INFORMATIE",
		//Footer info link
		firstFooterInfoLang: "Over ons",
		secondFooterInfoLang: "Privacy",
		thirdFooterInfoLang: "Contact",
		//Footer corenbuddy link
		firstFooterBuddyLang: "Profiel",
		secondFooterBuddyLang: "Matches",
		thirdFooterBuddyLang: "Registreren",
		//My profile
		myProfileBtn: "Mijn profiel",
		//Hamburger my profile
		hammyProfileBtn: "Mijn profiel",
		//Home Page
		heroTitleLang: "Wel reizen, maar niet alleen?",
		heroDescrLang: "Zoek nu jouw Corenbuddy!",
		//First info card
		firstInfoTitleLang: "Veilig Gebruikmaken",
		firstInfoDescrLang: "Onze website slaat alleen de nodige gegevens op en verkoopt helemaal niks!",
		//Second info card
		secondInfoTitleLang: "Gebruiksvriendelijk",
		secondInfoDescrLang: "Onze gebruikers geven ons een beoordeling van 4.7 sterren!",
		//Third info card
		thirdInfoTitleLang: "Effectiviteit",
		thirdInfoDescrLang: "Onze website heeft al meer dan 1000 buddy's bij elkaar gebracht",
		//CTA
		ctaTitleLang: "Registreer nu om jouw buddy te vinden!",
		ctaSubTitleLang: "Het werkt echt! We willen je niet alleen naar deze site lokken maar jou helpen",
		//CTA login/register
		ctaLoginLang: "Login",
		ctaRegisterLang: "Registreren",
		//CTA cards
		firstCtaCardLang: "Vind een buddy!",
		secondCtaCardLang: "Contact",
		thirdCtaCardLang: "Over ons",
		fourthCtaCardLang: "Matches",
		//About us page
		aboutUsTitleLang: "Over ons",
		corenBuddyLang: "CorenBuddy is het meest geavanceerde platform om" +
			" jou Travel Buddy te vinden, gebasseerd op de" +
			" meest efficiente matching systeem. Vind nu een" +
			" bijpassende reisgenoot met dezelfde interesses " +
			"en dromen. Vlieg samen en geniet samen!",
		corenBuddyBtnLang: "Vind mijn buddy",
		//History CorenDon
		corendonHistoryTitle: "Geschiedenis van Corendon",
		corendonHistoryDescr: "De onderneming is in 2000 opgericht in Haarlem," +
			"toen Atilay Uslu en zijn zakenpartner Yildiray" +
			"Karaer besloten hun krachten te bundelen. Voor" +
			"die tijd had de jonge ondernemer Uslu al zijn" +
			"eerste stappen in de reisbranche gezet, maar het" +
			"echte succes komt met de oprichting van" +
			"Corendon." +
			"Het bedrijf begon als Turkije-specialist dat" +
			"eerst alleen vliegtickets en later ook volledig" +
			"verzorgde reizen naar Turkije verkocht. In 20" +
			"jaar tijd is Corendon uitgegroeid tot een" +
			"toonaangevende, zeer succesvolle touroperator en" +
			"dé nummer 1 reisorganisatie als het gaat om veel" +
			"Turkse en andere populaire bestemmingen binnen" +
			"en buiten Europa, zoals bijvoorbeeld Ibiza," +
			"Cyprus en Curaçao.",
		//Who are we
		whoAreWeTitle: "Wie zijn wij",
		whoAreWeDescr: "Team van getalenteerde studenten op de" +
			"Hogeschool van Amsterdam met een visie om de" +
			"beste platform te ontwikkelen voor het project" +
			"Fasten Your Seatbelts." +
			"Dit is het eerste project dat ons is voorgelegd" +
			"in ons eerste blok van de studie.",
		//Contact about us page
		contactTitleLang: "Contact",
		//Contact form
		fullNameFormLang: "Volledige naam",
		phoneNrFormLang: "Telefoonnummer",
		topicFormLang: "Onderwerp",
		questionFormLang: "Uw vraag",
		//Terms of use page
		termsOfUseTitle:"Algemene Voorwaarden",
		//Privacy
		privacyTitle:"Privacy",
		privacyDescr: "Bij Corenbuddy staat privacy hoog in het vaandel. Alle" +
			"gegevens van de gebruiker worden veilig opgeslagen. Onze" +
			"database beheerders hebben een screening gehad om zo" +
			"misbruik te kunnen voorkomen. Wij als Corenbuddy zullen" +
			"nooit meer persoonsgevens vragen dan Hieronder vermeld" +
			"staan.",
		//What Data We Collect
		whatDataCollectTitle:"Welke gegevens verzamelen wij",
		registerTitleListLang:"Bij registratie",
		firstRegisterDataLang:"Uw naam",
		secondRegisterDataLang:"Uw emailadres",
		contactTitleListLang:"Bij contact",
		firstContactDataLang:"Uw naam",
		secondContactDataLang:"Uw emailadres",
		profileTitleListLang:"Bij het aanmaken van een profiel",
		firstProfileDataLang:"Uw geslacht",
		secondProfileDataLang:"Uw geboortedatum",
		thirdProfileDataLang:"Uw hobbies en intresses",
		fourthProfileDataLang:"Uw reisbudget",
		fifthProfileDataLang:"Contactgegevens zoals telefoonnummer en social media",
		//Why do we collect data
		whyDataCollectLang: "Waarom verzamelen wij deze gegevens",
		contactCustomerTitleLang: "Om contact te kunnen leggen met u als klant",
		contactCustomerDescr: "Het is belangrijk als u contact met ons wil hebben dat" +
			"wij dan gegevens hebben om met u te communiceren denk" +
			"hierbij aan u email adres en of telefoonnummer",
		findMatchTitleLang: "Om een geschikte match te kunnen vinden",
		findMatchDescr: "Om een goede match voor uw te kunnen vinden is het" +
			"belangrijk dat wij weten waar u heen wil reizen en wat" +
			"uw hobbies en intresses zijn. Via onze filters kunnen" +
			"wij zou een lijst aanbieden van geschikte matches.Deze" +
			"filters zijn gebaseert op uw reislocatie, wanneer u wil" +
			"reizen en uw interesses. Deze gegevens zijn dus" +
			"essentieel voor een goed gebruik van onze website",
		contactMatchTitleLang: "Om contact te leggen met matches",
		contactMatchDescr:  "Nadat U een macht heeft gemaakt met een van de andere" +
			"gebruikers, heeft die gebruiker toegang tot u" +
			"contactgegevens zoals social media en telefoonnummer." +
			"Gebruikers waarmee u niet gematch bent, omdat u die" +
			"heeft geweigerd , de gebruiker u geweigerd heeft of de" +
			"gebruiker is nooit een match optie geweest, krijgen" +
			"nóóit toegang tot uw contact gegevens.",
		//CorenDon
		corendonTermsDescr: "Wij als corenbuddy zijn een dochtermaatschappij. Dit houd in" +
			"dat ook Corendon toegang heeft tot uw persoonsgegevens." +
			"Corendon zal u gegevens uitsluitend gebruiken om geschikte" +
			"reizen aan te kunnen bieden aan u en uw match. Verder zijn" +
			"er op de website meerdere verwijzingen naar de website van" +
			"Corendon, als u daar gebruik van maakt zal Corendon daar" +
			"gegevens over krijgen. Ook is het mogelijk dat Corendon" +
			"reclames over reisbestemmingen aan u biedt.",
		//Deleting customer data
		deleteCustomerDataTitleLang: "Verwijderen persoonsgegevens",
		deleteCustomerDataDescr: "Bij het verwijderen van uw account worden ook uw" +
			"persoonsgegevens uit onze database verwijderd. Wilt u later" +
			"tweer opnieuw gebruik maken van onze service moet u weer" +
			"opnieuw uw gegevens aan ons doorgeven.",
		//Service
		serviceTitleLang: "service",
		serviceDescr: 	"Wij bieden u een manier aan om een reispartner te kunnen" +
			"vinden. Hieraan hebben wij een aantal regels gesteld",
		//Usage
		usageTitleLang: "Gebruik",
		usageFirstDescr: "Corenbuddy wordt uitsluitend gebruikt voor het maken van" +
			"reismatches. Dit houdt in dat wij niet de service" +
			"aanbieden om een reis te verzorgenVoor reizen: zie" +
			"website",
		usageSecondDescr: "Contact tussen matches wordt gelegd door de personen" +
			"zelf. Corenbuddy zelf biedt geen mogelijk van contact" +
			"tussen matches via de webapplicatie. Wel leveren wij de" +
			"juiste gegevens om matches de mogelijkheid te geven om" +
			"contact te leggen.",
		//How we determine the matches
		determineMatchLang: "hoe bepalen wij matches",
		determineMatchDescr: "De lijst van machtes wordt bepaald op basis van" +
			"reisbestemming, de periode waarin u wilt reizen en uw" +
			"interesses. Wij laten u geen matches zien als de" +
			"reisbestemming en tijdsbestek niet overeenkomen. U kan zelf" +
			"aan de hand van onze filters aangeven welke interesses" +
			"prioriteit hebben. U kunt optioneel ook filteren op basis" +
			"van u budget, zodat u geen zorgen hoeft te maken over te" +
			"dure vakanties. U als gebruiker besluit zelf of u met andere" +
			"gebruiker wil matchen of niet.",
		//Liability
		liabilityTitleLang: "Aansprakelijkheid",
		liabilityFirstDescr: "Corenbuddy is niet verantwoordelijk voor situaties die" +
			"voortvloeien uit afspraken die zijn gemaakt tijdens" +
			"privè contact tussen de matches.",
		liabilitySecondDescr: "Corenbuddy is niet verantwoordelijk voor problemen die" +
			"onstaan tijdens de reis met je match, hiervoor verwijzen" +
			"wij u naar de",
		termsOfUseCorenDonLink: "algemene voorwaarde van corendon.",
		liabilityThirdDescr: "Bij herhaald misbruik van onze match service kan uw" +
			"account verwijderd worden.",
		liabilityFourthDescr: "Corenbuddy probeert in al zijn capaciteiten misbruikers" +
			"op te sporen en aan te pakken. Wij raden onze gebruikers" +
			"aan om nooit zomaar betalingen te maken zonder de juiste" +
			"kennis over uw match.",
		liabilityFifthDescr: "Na wederzijdse acceptatie van een match is corenbuddy" +
			"niet meer verantwoordelijk voor het bekent worden van uw" +
			"contactgegevens aan uw match.",
		//Matching page
		existBuddyLang: "Bestaande Buddy's",
		proposeMatchLang: "Voogestelde matches",
		incomingMatchLang: "Inkomende match verzoeken",
		outgoingMatchLang: "Uitgaande match verzoeken",
		buddysProfileLang: "Buddy Profiel",
		bioTitleLang: "Biografie",
		interestTitleLang: "Interesses",
		interestChessLang: "Schaken",
		interestFishingLang: "Vissen",
		interestSummerLang: "Zomer",
		interestTanningLang: "Zonnen",
		interestSwimmingLang: "Zwemmen",
		interestHotCountryLang: "Warmen landen",
		//Sign up page
		signUpRegisterLang: "Registreer",
		fNameText: "Voornaam",
		lNameText: "Achternaam",
		passText: "Wachtwoord",
		repeatPassText: "Herhaal Wachtwoord",
		agreeText: "Als u registreert gaat u akkoord met de",
		termsLink: "algemene voorwaarden",
		RegisterBtn: "Registreren",
		alreadyAccountLang: "Al een account:",
		signUpLoginBtn: "Log in",
		//profile page
		myProfileTitleLang: "Mijn Profiel",
		myFirstNameTextLang: "Voornaam",
		myLastNameTextLang: "Achternaam",
		myBioTextLang: "Bio",
		myLocationLang: "Locatie",
		myBirthDateLang: "Geboortedatum",
		//First interest field
		myInterestTitle: "Interesses",
		firstFieldOneLang: "Yoga",
		firstFieldTwoLang: "Voetbal",
		firstFieldThreeLang: "Fietsen",
		firstFieldFourLang: "Uitgaan",
		//Second interest field
		secondFieldOneLang: "Yoga",
		secondFieldTwoLang: "Voetbal",
		secondFieldThreeLang: "Fietsen",
		secondFieldFourLang: "Uitgaan",
		//Third interest field
		thirdFieldOneLang: "Yoga",
		thirdFieldTwoLang: "Voetbal",
		thirdFieldThreeLang: "Fietsen",
		thirdFieldFourLang: "Uitgaan",
		//Fourth interest field
		fourthFieldOneLang: "Yoga",
		fourthFieldTwoLang: "Voetbal",
		fourthFieldThreeLang: "Fietsen",
		fourthFieldFourLang: "Uitgaan",
		//Fifth interest field
		fifthFieldOneLang: "Yoga",
		fifthFieldTwoLang: "Voetbal",
		fifthFieldThreeLang: "Fietsen",
		fifthFieldFourLang: "Uitgaan",
		//Sixth interest field
		sixthFieldOneLang: "Yoga",
		sixthFieldTwoLang: "Voetbal",
		sixthFieldThreeLang: "Fietsen",
		sixthFieldFourLang: "Uitgaan",
		//The other words from the form on the profile page
		myDestinationLang: "Bestemming",
		myTimeFrameLang: "Tijdsbestek",
		//Gender
		myGenderLang: "Geslacht",
		genderManLang: "Man",
		genderWomenLang: "Vrouw",
		genderOtherLang: "Anders",
		safeBtnLang: "Opslaan",
		//Profile photo
		profilePhotoLang: "Profiel Foto",
		//My account from profile page
		myAccountBoxLang: "Mijn Account",
		passwordBoxLang: "Wachtwoord",
		updateAccountBtnLang: "Update Account",





	},
	engels: {
		//Navbar
		findB: "Find my buddy",
		about: "About us",
		country: "Language",
		loginLang: "Login",
		registerLang: "Sign-up",
		//hamburger
		hamFindBuddyLang: "Find my buddy",
		HamAboutUsLang: "About us",
		hamLanguageLang: "Language",
		hamLoginLang: "Login",
		hamRegisterLang: "Sign-up",
		//login modal
		loginModalWwLang: "Password",
		loginModalBtnLang: "Login",
		forgotPassLang: "Forgot",
		forgotPassLinkLang: "password",
		noAccountLang: "Create an",
		noAccountLinkLang: "account",
		//Footer reis-quote
		quoteLang: "With a Corenbuddy you no longer travel alone!",
		//Footer title
		footerInfoLang: "INFORMATION",
		//Footer info link
		firstFooterInfoLang: "About us",
		secondFooterInfoLang: "Privacy",
		thirdFooterInfoLang: "Contact",
		//Footer corenbuddy link
		firstFooterBuddyLang: "Profile",
		secondFooterBuddyLang: "Matches",
		thirdFooterBuddyLang: "Sign-up",
		aboutUsTitleLang: "About us",
		//My profile
		myProfileBtn: "My profile",
		//Hamburger my profile
		hammyProfileBtn: "My profile",
		//Home page
		heroTitleLang: "Do you want to travel, but not alone?",
		heroDescrLang: "Find your Corenbuddy now!",
		//First info card
		firstInfoTitleLang: "Safe use",
		firstInfoDescrLang: "Our website only stores the necessary data and doesn't  sell anything!",
		//Second info card
		secondInfoTitleLang: "User-friendly",
		secondInfoDescrLang: "Our users give us a rating of 4.7 stars!",
		//Third info card
		thirdInfoTitleLang: "Effectiveness",
		thirdInfoDescrLang: "Our website has already brought together more than 1000 buddies",
		//CTA
		ctaTitleLang: "Register now to find your buddy!",
		ctaSubTitleLang: "It really works! We don't just want to lure you to this site, but help you",
		//CTA login/register
		ctaLoginLang: "Login",
		ctaRegisterLang: "Sign-up",
		//CTA cards
		firstCtaCardLang: "Find a Buddy!",
		secondCtaCardLang: "Contact",
		thirdCtaCardLang: "About us",
		fourthCtaCardLang: "Matches",
		//About us page
		corenBuddyLang: "CorenBuddy is the most advanced platform to" +
			" find your Travel Buddy, based on the" +
			" most efficient matching system. Find a" +
			" matching travel companion with similar interests " +
			"and dreams. Fly together and enjoy together!",
		corenBuddyBtnLang: "Find my buddy",
		//History CorenDon
		corendonHistoryTitle: "History of Corendon",
		corendonHistoryDescr: "The company was founded in 2000 in Haarlem," +
			"then Atilay Uslu and his business partner Yildiray" +
			"Karaer decided to join forces. In front of" +
			"that time the young entrepreneur Uslu already had his" +
			"first steps in the travel industry, but it" +
			"real success comes with the creation of" +
			"Cordon." +
			"The company started as a Turkey specialist" +
			"first only flight tickets and later also complete" +
			"arranged trips to Turkey. At 20" +
			"over the years, Corendon has grown into one" +
			"leading, highly successful tour operator and" +
			"the number 1 travel organization when it comes to a lot" +
			"Turkish and other popular destinations within" +
			"and outside Europe, such as Ibiza," +
			"Cyprus and Curacao.",
		//Who are we
		whoAreWeTitle: "Who are we",
		whoAreWeDescr: "Team of talented students at the" +
			"Amsterdam University of Applied Sciences with a vision to" +
			"develop best platform for the project" +
			"Fasten Your Seatbelts." +
			"This is the first project submitted to us" +
			"in our first block of study.",
		//Contact about us page
		contactTitleLang: "Contact",
		//Contact form
		fullNameFormLang: "Full name",
		phoneNrFormLang: "phone number",
		topicFormLang: "Topic",
		questionFormLang: "Your question",
		//Terms of use page
		termsOfUseTitle:"Terms and Conditions",
		//Privacy
		privacyTitle:"Privacy",
		privacyDescr: "At Corenbuddy, privacy is of paramount importance. All" +
			"user data is stored securely. Our" +
			"database administrators have had a screening to" +
			"prevent abuse. We as Corenbuddy will" +
			"never ask for more personal data than stated Below" +
			"stand.",
		//What Data We Collect
		whatDataCollectTitle:"What data do we collect",
		registerTitleListLang:"On registration",
		firstRegisterDataLang:"Your name",
		secondRegisterDataLang:"Your email address",
		contactTitleListLang:"On contact",
		firstContactDataLang:"Your name",
		secondContactDataLang:"Your email address",
		profileTitleListLang:"When creating a profile",
		firstProfileDataLang:"Your Gender",
		secondProfileDataLang:"Your date of birth",
		thirdProfileDataLang:"Your hobbies and interests",
		fourthProfileDataLang:"Your travel budget",
		fifthProfileDataLang:"Contact details such as phone number and social media",
		//Why do we collect data
		whyDataCollectLang: "Why do we collect this data",
		contactCustomerTitleLang: "To be able to contact you as a customer",
		contactCustomerDescr: "It is important if you want to contact us that" +
			"then we have data to communicate with you think" +
			"hereby to your email address and or telephone number",
		findMatchTitleLang: "To find a suitable match",
		findMatchDescr: "In order to find a good match for you it is" +
			"It is important that we know where you want to travel and what" +
			"your hobbies and interests. Through our filters you can" +
			"we would provide a list of suitable matches. These" +
			"filters are based on your travel location, whenever you want" +
			"travel and your interests. So this data is" +
			"essential for the proper use of our website",
		contactMatchTitleLang: "To contact matches",
		contactMatchDescr: "After you make a power with one of the others" +
			"users, does that user have access to you" +
			"contact details such as social media and telephone number." +
			"Users you are not matched with because you" +
			"denied , the user denied you or the" +
			"user has never been a match option, get" +
			"never have access to your contact details.",
		//CorenDon
		corendonTermsDescr: "We as corenbuddy are a subsidiary. This means" +
			"that Corendon also has access to your personal data." +
			"Corendon will only use your data for suitable" +
			"to be able to offer travel to you and your match. Further" +
			"there are several references on the website to the website of" +
			"Corendon, if you use that, Corendon will be there" +
			"get data about. It is also possible that Corendon" +
			"offers travel destination commercials to you.",
		//Deleting customer data
		deleteCustomerDataTitleLang: "Delete personal data",
		deleteCustomerDataDescr: "Deleting your account will also delete your" +
			"personal data removed from our database. Would you like later" +
			"tweather to use our service again should you again" +
			"re-send your data to us.",
		//Service
		serviceTitleLang: "service",
		serviceDescr: "We offer you a way to become a travel partner" +
			"finding. We have set a number of rules for this",
		//Usage
		usageTitleLang: "Usage",
		usageFirstDescr: "Corenbuddy is used exclusively for creating" +
			"travel matches. This means that we do not provide the service" +
			"offering to arrange a tripFor travel: see" +
			"website",
		usageSecondDescr: "Contact between matches is made by the persons" +
			"self. Corenbuddy himself offers no possibility of contact" +
			"between matches via the web application. We do provide the" +
			"correct data to allow matches to" +
			"make contact.",
		//How we determine the matches
		determineMatchLang: "how do we determine matches",
		determineMatchDescr: "The list of powers is determined by" +
			"travel destination, the period in which you want to travel and your" +
			"interests. We won't show you matches if the" +
			"travel destination and time frame do not match. You can" +
			"indicate which interests using our filters" +
			"have priority. Optionally, you can also filter based on" +
			"of your budget so you don't have to worry about" +
			"expensive holidays. You as a user decide for yourself whether you want to" +
			"user wants to match or not.",
		//Liability
		liabilityTitleLang: "Liability",
		liabilityFirstDescr: "Corenbuddy is not responsible for situations that" +
			"resulting from agreements made during" +
			"private contact between the matches.",
		liabilitySecondDescr: "Corenbuddy is not responsible for problems that" +
			"arise during the journey with your match, refer to this" +
			"we take you to the",
		termsOfUseCorenDonLink: "terms of use of corendon.",
		liabilityThirdDescr: "Repeated misuse of our match service could result in your" +
			"account will be deleted.",
		liabilityFourthDescr: "Corenbuddy tries abusers in all his capacities" +
			"detect and address. We recommend our users" +
			"to never just make payments without the right one" +
			"knowledge about your match.",
		liabilityFifthDescr: "After mutual acceptance of a match, corenbuddy" +
			"no longer responsible for making your" +
			"contact details to your match.",
		//Matching page
		existBuddyLang: "Existing Buddies",
		proposeMatchLang: "Proposed Matches",
		incomingMatchLang: "Request incoming match",
		outgoingMatchLang: "Requesting outgoing match",
		buddysProfileLang: "Buddy Profile",
		bioTitleLang: "Biography",
		interestTitleLang: "Interests",
		interestChessLang: "Chess",
		interestFishingLang: "Fishing",
		interestSummerLang: "Summer",
		interestTanningLang: "Suns",
		interestSwimmingLang: "Swimming",
		interestHotCountryLang: "Warm countries",
		//Sign up page
		signUpRegisterLang: "Register",
		fNameText: "First Name",
		lNameText: "Last Name",
		passText: "Password",
		repeatPassText: "Repeat Password",
		agreeText: "By registering you agree to the",
		termsLink: "terms and conditions",
		RegisterBtn: "Register",
		alreadyAccountLang: "Already an account:",
		signUpLoginBtn: "Login",
		//profile page
		myProfileTitleLang: "My Profile",
		myFirstNameTextLang: "First Name",
		myLastNameTextLang: "Last Name",
		myBioTextLang: "Bio",
		myLocationLang: "Location",
		myBirthDateLang: "BirthDate",
//First interest field
		myInterestTitle: "Interests",
		firstFieldOneLang: "Yoga",
		firstFieldTwoLang: "Football",
		firstFieldThreeLang: "Cycling",
		firstFieldFourLang: "Go out",
//Second interest field
		secondFieldOneLang: "Yoga",
		secondFieldTwoLang: "Football",
		secondFieldThreeLang: "Cycling",
		secondFieldFourLang: "Exit",
//Third interests field
		thirdFieldOneLang: "Yoga",
		thirdFieldTwoLang: "Football",
		thirdFieldThreeLang: "Cycling",
		thirdFieldFourLang: "Exit",
//Fourth interests field
		fourthFieldOneLang: "Yoga",
		fourthFieldTwoLang: "Football",
		fourthFieldThreeLang: "Cycling",
		fourthFieldFourLang: "Go out",
//Fifth interests field
		fifthFieldOneLang: "Yoga",
		fifthFieldTwoLang: "Football",
		fifthFieldThreeLang: "Cycling",
		fifthFieldFourLang: "Go out",
//Sixth interest field
		sixthFieldOneLang: "Yoga",
		sixthFieldTwoLang: "Football",
		sixthFieldThreeLang: "Cycling",
		sixthFieldFourLang: "Go out",
//The other words from the form on the profile page
		myDestinationLang: "Destination",
		myTimeFrameLang: "Timeframe",
//Gender
		myGenderLang: "Gender",
		genderManLang: "Man",
		genderWomenLang: "Woman",
		genderOtherLang: "Other",
		safeBtnLang: "Save",
//Profile photo
		profilePhotoLang: "Profile Photo",
//My account from profile page
		myAccountBoxLang: "My Account",
		passwordBoxLang: "Password",
		updateAccountBtnLang: "Update Account",






	},
	spaans: {
		//Navbar
		findB: "Encontrar a mi amigo",
		about: "Sobre nosotros",
		country: "Idiomas",
		loginLang: "Acceso",
		registerLang: "Inscribirse",
		//hamburger
		hamFindBuddyLang: "Encontrar a mi amigo",
		HamAboutUsLang: "Sobre nosotros",
		hamLanguageLang: "Idiomas",
		hamLoginLang: "Acceso",
		hamRegisterLang: "Inscribirse",
		//login modal
		loginModalWwLang:"Clave",
		loginModalBtnLang: "Acceso",
		forgotPassLang: "Has olvidado tu",
		forgotPassLinkLang: "contraseña",
		noAccountLang: "Crear una",
		noAccountLinkLang: "cuenta",
		//Footer reis-quote
		quoteLang: "¡Con un Corenbuddy ya no viajas solo!",
		//Footer title
		footerInfoLang: "INFORMACIÓN",
		//Footer info link
		firstFooterInfoLang: "Sobre nosotros",
		secondFooterInfoLang: "Privacidad",
		thirdFooterInfoLang: "Contacto",
		//Footer corenbuddy link
		firstFooterBuddyLang: "Perfil",
		secondFooterBuddyLang: "Partidos",
		thirdFooterBuddyLang: "Inscribirse",
		//My profile
		myProfileBtn: "Mi perfil",
		//Hamburger my profile
		hammyProfileBtn: "Mi perfil",
		//Home Page
		heroTitleLang: "¿Quieres viajar, pero no solo?",
		heroDescrLang: "¡Encuentra tu Corenbuddy ahora!",
		//First info card
		firstInfoTitleLang: "Uso seguro",
		firstInfoDescrLang: "¡Nuestro sitio web solo almacena los datos necesarios y no vende nada!",
		//Second info card
		secondInfoTitleLang: "Fácil de usar",
		secondInfoDescrLang: "¡Nuestros usuarios nos dan una calificación de 4.7 estrellas!",
		//Third info card
		thirdInfoTitleLang: "Eficacia",
		thirdInfoDescrLang: "Nuestro sitio web ya ha reunido a más de 1000 amigos",
		//CTA
		ctaTitleLang: "¡Regístrese ahora para encontrar a su amigo!",
		ctaSubTitleLang: "¡Realmente funciona! No solo queremos atraerlo a este sitio, sino ayudarlo",
		//CTA login/register
		ctaLoginLang: "Acceso",
		ctaRegisterLang: "Inscribirse",
		//CTA cards
		firstCtaCardLang: "¡Encuentra un amigo!",
		secondCtaCardLang: "Contacto",
		thirdCtaCardLang: "Sobre nosotros",
		fourthCtaCardLang: "Partidos",
		//About us page
		aboutUsTitleLang: "Sobre nosotros",
		corenBuddyLang: "CorenBuddy es la plataforma más avanzada para" +
			" encuentra a tu Travel Buddy, basado en el" +
			"el sistema de emparejamiento más eficiente. Encuentra un" +
			"compañero de viaje coincidente con intereses similares" +
			"y sueños. ¡Volar juntos y disfrutar juntos!",
		corenBuddyBtnLang: "Encontrar a mi amigo",
		//History CorenDon
		corendonHistoryTitle: "Historia de Corendon",
		corendonHistoryDescr: "La empresa fue fundada en 2000 en Haarlem" +
			"entonces Atilay Uslu y su socio comercial Yildiray" +
			"Karaer decidió unir fuerzas. Frente a" +
			"esa vez el joven emprendedor Uslu ya tenia la suya" +
			"primeros pasos en la industria de viajes, pero" +
			"el verdadero éxito viene con la creación de" +
			"Corendon." +
			"La empresa comenzó como especialista en Turquía" +
			"primero solo boletos de vuelo y despues tambien completos" +
			"viajes organizados a Turquía. A los 20" +
			"a lo largo de los años, Corendon se ha convertido en uno" +
			"operador turístico líder y de gran éxito y" +
			"la organización de viajes número 1 cuando se trata de mucho" +
			"Turco y otros destinos populares dentro" +
			"y fuera de Europa, como Ibiza" +
			"Chipre y Curazao.",
		// Who are we
		whoAreWeTitle: "quienes somos",
		whoAreWeDescr: "Equipo de estudiantes talentosos en el" +
			"Universidad de Ciencias Aplicadas de Amsterdam con una visión de" +
			"desarrollar la mejor plataforma para el proyecto" +
			"Abróchense los cinturones de seguridad." +
			"Este es el primer proyecto que nos envían" +
			"en nuestro primer bloque de estudio.",
		//Contact about us page
		contactTitleLang: "Contacto",
		//Contact form
		fullNameFormLang: "Nombre completo",
		phoneNrFormLang: "número de teléfono",
		topicFormLang: "Tema",
		questionFormLang: "tu pregunta",
		//Terms of use
		termsOfUseTitle:"Términos y condiciones",
		//Privacy
		privacyTitle:"Privacidad",
		privacyDescr: "En Corenbuddy, la privacidad es de suma importancia. Todo" +
			"Los datos del usuario se almacenan de forma segura. Nuestro" +
			"los administradores de la base de datos han tenido una evaluación para" +
			"prevenir el abuso. Nosotros como Corenbuddy lo haremos" +
			"Nunca solicite más datos personales que los que se indican a continuación" +
			"pararse.",
		//What Data We Collect
		whatDataCollectTitle:"Qué datos recopilamos",
		registerTitleListLang:"Al registrarse",
		firstRegisterDataLang:"Tu nombre",
		secondRegisterDataLang:"Su dirección de correo electrónico",
		contactTitleListLang:"En contacto",
		firstContactDataLang:"Su nombre",
		secondContactDataLang:"Su dirección de correo electrónico",
		profileTitleListLang:"Al crear un perfil",
		firstProfileDataLang:"Tu género",
		secondProfileDataLang:"Tu fecha de nacimiento",
		thirdProfileDataLang:"Tus pasatiempos e intereses",
		fourProfileDataLang:"Su presupuesto de viaje",
		quintoProfileDataLang:"Detalles de contacto como número de teléfono y redes sociales",
		//Why do we collect data
		whyDataCollectLang: "¿Por qué recopilamos estos datos?",
		contactCustomerTitleLang: "Para poder contactarlo como cliente",
		contactCustomerDescr: "Es importante si desea contactarnos que" +
			"entonces tenemos datos para comunicarnos contigo piensas" +
			"por la presente a su dirección de correo electrónico o número de teléfono",
		findMatchTitleLang: "Para encontrar una coincidencia adecuada",
		findMatchDescr: "Para encontrar una buena pareja para ti es" +
			"Es importante que sepamos a donde quieres viajar y que" +
			"tus hobbies e intereses. A través de nuestros filtros puedes" +
			"Proporcionaríamos una lista de coincidencias adecuadas. Estas" +
			"los filtros se basan en la ubicación de tu viaje, cuando quieras" +
			"viajes y tus intereses. Entonces estos datos son" +
			"esencial para el correcto uso de nuestro sitio web",
		contactMatchTitleLang: "Para contactar coincidencias",
		contactMatchDescr: "Después de hacer un poder con uno de los otros" +
			"usuarios, ese usuario tiene acceso a ustedes" +
			"datos de contacto como redes sociales y número de teléfono." +
			"Usuarios con los que no estás emparejado porque tú" +
			"denegado, el usuario te negó o el" +
			"el usuario nunca ha sido una opción de coincidencia, obtén" +
			"nunca tendrás acceso a tus datos de contacto.",
		//CorenDon
		corendonTermsDescr: "Nosotros como corenbuddy somos una subsidiaria. Esto significa" +
			"que Corendon también tiene acceso a sus datos personales." +
			"Corendon solo usará tus datos para fines adecuados" +
			"para poder ofrecerle viajes a usted y a su pareja. Más lejos" +
			"hay varias referencias en el sitio web al sitio web de" +
			"Corendon, si usas eso, Corendon estará allí" +
			"Obtener datos sobre. También es posible que Corendon" +
			"le ofrece comerciales de destinos de viaje.",
		//Deleting customer data
		deleteCustomerDataTitleLang: "Eliminar datos personales",
		deleteCustomerDataDescr: "Eliminar su cuenta también eliminará su" +
			"datos personales eliminados de nuestra base de datos. ¿Te gustaría más tarde?" +
			"Tiempo para usar nuestro servicio de nuevo en caso de que vuelvas" +
			"Vuelve a enviarnos tus datos.",
		//Service
		serviceTitleLang: "servicio",
		serviceDescr: "Te ofrecemos una manera de convertirte en un compañero de viaje" +
			"hallazgo. Hemos establecido una serie de reglas para esto",
		//Usage
		usoTitleLang: "Uso",
		useFirstDescr: "Corenbuddy se usa exclusivamente para crear" +
			"coincidencias de viaje. Esto quiere decir que no brindamos el servicio" +
			"ofreciendo organizar un viajePara viajar: ver" +
			"sitio web",
		useSecondDescr: "El contacto entre partidos lo hacen las personas" +
			"yo mismo. Corenbuddy mismo no ofrece posibilidad de contacto" +
			"entre partidos a través de la aplicación web. Proporcionamos el" +
			"datos correctos para permitir coincidencias" +
			"hacer contacto.",
		//How we determine the matches
		determineMatchLang: "cómo determinamos las coincidencias",
		determineMatchDescr: "La lista de poderes está determinada por" +
			"destino de viaje, el período en el que desea viajar y su" +
			"intereses. No te mostraremos coincidencias si el" +
			"el destino del viaje y el marco de tiempo no coinciden. Puedes" +
			"indica que intereses usando nuestros filtros" +
			"tener prioridad. Opcionalmente, también puede filtrar según" +
			"de tu presupuesto para que no tengas que preocuparte" +
			"Vacaciones caras. Tú como usuario decides por ti mismo si quieres" +
			"el usuario quiere coincidir o no.",
		//Liability
		responsabilidadTitleLang: "Responsabilidad",
		responsabilidadFirstDescr: "Corenbuddy no es responsable de situaciones que" +
			"como resultado de acuerdos hechos durante" +
			"contacto privado entre los partidos.",
		responsabilidadSecondDescr: "Corenbuddy no es responsable de los problemas que" +
			"levántate durante el viaje con tu pareja, consulta esto" +
			"te llevamos a la",
		termsOfUseCorenDonLink: "términos de uso de corendon.",
		responsabilidadThirdDescr: "El mal uso repetido de nuestro servicio de coincidencias podría resultar en su" +
			"la cuenta será eliminada.",
		responsabilidadCuartoDescr: "Corenbuddy juzga a los abusadores en todas sus capacidades" +
			"detectar y direccionar. Recomendamos a nuestros usuarios" +
			"nunca hacer pagos sin el correcto" +
			"conocimiento sobre tu pareja.",
		responsabilidadFifthDescr: "Después de la aceptación mutua de un partido, corenbuddy" +
			"Ya no soy responsable de hacer tu" +
			"detalles de contacto de tu pareja.",
		//Matching page
		existBuddyLang: "Compañeros existentes",
		proponeMatchLang: "Coincidencias propuestas",
		incomingMatchLang: "Solicitar coincidencia entrante",
		outgoingMatchLang: "Solicitando coincidencia saliente",
		buddysProfileLang: "Perfil de amigo",
		bioTitleLang: "Biografía",
		interestTitleLang: "Intereses",
		interestChessLang: "Ajedrez",
		interestFishingLang: "Pesca",
		interestSummerLang: "Verano",
		interestTanningLang: "Tomando el sol",
		interestSwimmingLang: "Nadar",
		interestHotCountryLang: "Países cálidos",
		//Sign up page
		signUpRegisterLang: "Registrarse",
		fNameText: "Nombre",
		lNombreTexto: "Apellido",
		passText: "Contraseña",
		repeatPassText: "Repetir contraseña",
		acceptText: "Al registrarte aceptas",
		termsLink: "términos y condiciones",
		RegistrarseBtn: "Registrarse",
		yaAccountLang: "Ya una cuenta:",
		signUpLoginBtn: "Iniciar sesión",
		//Profile page



		myProfileTitleLang: "Mi perfil",
		myFirstNameTextLang: "Nombre",
		myLastNameTextLang: "Apellido",
		myBioTextLang: "Biografía",
		myLocationLang: "Ubicación",
		myBirthDateLang: "Fecha de nacimiento",
		//First interest field
		myInterestTitle: "Intereses",
		firstFieldOneLang: "Yoga",
		firstFieldTwoLang: "Fútbol",
		firstFieldThreeLang: "Ciclismo",
		firstFieldFourLang: "Salir",
		//Second interest field
		secondFieldOneLang: "Yoga",
		secondFieldTwoLang: "Fútbol",
		secondFieldThreeLang: "Ciclismo",
		secondFieldFourLang: "Salir",
		//Third interest field
		thirdFieldOneLang: "Yoga",
		thirdFieldTwoLang: "fútbol",
		thirdFieldThreeLang: "Ciclismo",
		thirdFieldFourLang: "Salir",
		//Fourth interest field
		fourthFieldOneLang: "Yoga",
		fourthFieldTwoLang: "Fútbol",
		fourthFieldThreeLang: "Ciclismo",
		fourthFieldFourLang: "Salir",
		//Fifth interest field
		fifthFieldOneLang: "Yoga",
		fifthFieldTwoLang: "Fútbol",
		fifthFieldThreeLang: "Ciclismo",
		fifthFieldFourLang: "Salir",
		//Sixth interest field
		sixthFieldOneLang: "Yoga",
		sixthFieldTwoLang: "Fútbol",
		sixthFieldThreeLang: "Ciclismo",
		sixthFieldFourLang: "Salir",
		//The other words from the form on the profile page
		myDestinationLang: "Destino",
		myTimeFrameLang: "Marco de tiempo",
		//Gender
		myGenderLang: "Género",
		genderManLang: "Hombre",
		genderWomenLang: "Mujer",
		genderOtherLang: "Otro",
		safeBtnLang: "Guardar",
		//Profile photo
		profilePhotoLang: "Foto de perfil",
		//My account from profile page
		myAccountBoxLang: "Mi cuenta",
		passwordBoxLang: "Contraseña",
		updateAccountBtnLang: "Actualizar cuenta",

	}
}*/

var initialLanguage = "en";

var translations = {
	navbar: {
		findBuddy: {
			nl: "zoek mijn buddy",
			en: "Find my buddy"
		},
		aboutUs: {
			nl: "over ons",
			en: "about us"
		},
		login: {
			nl: "login",
			en: "Logino"
		}
		,
		register: {
			nl: "Registreer",
			en: "Sign up"
		}
	},

	modal: {
		login: {
			nl: "Login",
			en: "inlog"
		},
		password: {
			nl: "wachtwoord",
			en: "password"
		},
		loginBtn: {
			nl: "inloggen",
			en: "sign in"
		}
		,
		forgotPass: {
			nl: "wachtwoord",
			en: "forgot"
		},
		forgotPassLink: {
			nl: "vergeten",
			en: "password"
		},
		noAccount: {
			nl: "nog geen",
			en: "create an"
		},
		accountLink: {
			nl: "account",
			en: "account"
		},
	},

	index: {
		heroTitle: {
			nl: "Wel reizen, maar niet alleen?",
			en: "vacation but not alone"
		},
		heroDescr: {
			nl: "Zoek nu jouw Corenbuddy!",
			en: "Find your Corenbuddy now!"
		},
	},

};

FYSCloud.Localization.setTranslations(translations);
FYSCloud.Localization.switchLanguage(initialLanguage);

document.querySelector("#localizationLanguageSwitch").value = initialLanguage;

document.querySelector("#localizationLanguageSwitch").addEventListener("change", function () {
	FYSCloud.Localization.switchLanguage(this.value);
	FYSCloud.Localization.translate();
});
