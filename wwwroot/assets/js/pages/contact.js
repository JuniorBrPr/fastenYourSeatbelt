import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

const form = document.querySelector(".contact-form");
const nameInputField = document.querySelector(".contact-name");
const phoneInputField = document.querySelector(".contact-phone");
const emailInputField = document.querySelector(".contact-email");
const subjectInputField = document.querySelector(".contact-subject");
const messageInputField = document.querySelector(".contact-text");

/**
 * Code for the contact form on the about-us page. Allows the user to input their information and their message, 
 * then the input will be taken and be used to send us (The Discordmoderators) an email.
 * 
 * @author Tim Knops
 */

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Stops the form from submitting.
    
    const formInputData = createObject(nameInputField, phoneInputField, emailInputField, subjectInputField, messageInputField);
    await sendEmail(formInputData);

    e.target.submit(); // Submits the form.
});

/**
 * Creates an object of the contact form values.
 * @param {HTMLInputElement} name - name input field
 * @param {HTMLInputElement} phone - phone input field
 * @param {HTMLInputElement} email - email input field
 * @param {HTMLInputElement} subject - subject input field
 * @param {HTMLTextAreaElement} message - message textarea
 * @returns {object} object of the contact form input values.
 */
function createObject(name, phone, email, subject, message) {
    return {
        name: name.value,
        phone: phone.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    };
}

/**
 * Use the object created in createObject() to send an email to the assigned address.
 * @see createObject()
 * @param {object} input - object of all the contact form values.
 */
async function sendEmail(input) {
    const emailRecipients = [
        {address: "lucas.meester@hva.nl"}, 
        {address: "tim.knops@hva.nl"},
        {address: "junior.brito.perez@hva.nl"},
        {address: "johnny.magielse@hva.nl"},
        {address: "nizar.amine@hva.nl"},
        {address: "samed.dalkilic@hva.nl"},
        {address: "jurian.blommers@hva.nl"},
        {address: "julian.kruithof@hva.nl"}
    ];

    await FYSCloud.API.sendEmail({
        from: {
            name: input.name,
            address: input.email
        },
        to: emailRecipients,
        subject: input.subject,
        priority: "high",
        html: `<p>${input.message}</p>
                <br>
                <h2>User Information</h2>
                <h4>Name: ${input.name}</h4>
                <h4>Email: ${input.email}</h4>
                <h4>Phone: ${input.phone}</h4>`
    });
}

const language = document.querySelector("#localizationLanguageSwitch");

if (language == "nl") {
    console.log("NL");
} else if (language == 'en') {
    console.log("EN");
} else if (language == 'es') {
    console.log("ES");
} else {
    console.log("Error occured");
}
