import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

const form = document.querySelector(".contact-form");
const nameInputField = document.querySelector(".contact-name");
const phoneInputField = document.querySelector(".contact-phone");
const emailInputField = document.querySelector(".contact-email");
const subjectInputField = document.querySelector(".contact-subject");
const messageInputField = document.querySelector(".contact-text");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formInputData = createObject(nameInputField, phoneInputField, emailInputField, subjectInputField, messageInputField);
    console.log(sendEmail(formInputData));
    sendEmail(formInputData);
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
    const object = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    };

    return object;
}

/**
 * Use the object created in createObject() to send an email to the assigned address.
 * @see createObject()
 * @param {object} input - object of all the contact form values.
 */
async function sendEmail(input) {
    await FYSCloud.API.sendEmail({
        from: {
            name: input.name,
            adress: input.email
        },
        to: [
            {
            name: "The Discordmoderators",
            address: "#"
            }
        ],
        subject: input.subject,
        html: `${input.message}<br><br><h4>Phone: ${input.phone}<h4>`
    });
}
