import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

const form = document.querySelector(".contact-form");
const nameInputField = document.querySelector(".contact-name");
const phoneInputField = document.querySelector(".contact-phone");
const emailInputField = document.querySelector(".contact-email");
const subjectInputField = document.querySelector(".contact-subject");
const messageInputField = document.querySelector(".contact-text");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(e);
    
    const object = createObject(nameInputField, phoneInputField, emailInputField, subjectInputField, messageInputField)
    console.log(object);



});


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


