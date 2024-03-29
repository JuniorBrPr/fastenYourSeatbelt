import {getUniqueSalt, passwordHash} from "../classes/hash.js";
import { Validation } from "../classes/validation.js";
import { Database } from "../classes/database.js";

import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

/**
 * Logic behind the porgot password page
 * @author Jurian Blommers
 */

const validation = new Validation();
const database = new Database();


showEmailInput();
document.getElementById("wwvg-knop").addEventListener("click", event => handleForgotPasswordRequest(event));
document.getElementById("wwvg-knop3").addEventListener("click", event => handleNewPassword(event));
if (hasParameters()) {
    showNewPasswordInput();
}

/**
 * Show page where you have to give your email
 */
function showEmailInput(){
    document.getElementById("emailInputPage").style.display = "flex";
    document.getElementById("checkYourEmailMessagePage").style.display = "none";
    document.getElementById("newPasswordInputPage").style.display = "none";
}

/**
 * Show page that says check your email
 * @param event
 */
function showCheckYourEmail(event){
    event.preventDefault();
    document.getElementById("emailInputPage").style.display = "none";
    document.getElementById("checkYourEmailMessagePage").style.display = "flex";
    document.getElementById("newPasswordInputPage").style.display = "none";
}

/**
 * Show page where you have to put in your new password
 */
function showNewPasswordInput(){
    document.getElementById("emailInputPage").style.display = "none";
    document.getElementById("checkYourEmailMessagePage").style.display = "none";
    document.getElementById("newPasswordInputPage").style.display = "flex";
}

/**
 * check if email is valid, delete forgotPasswordHash in DB if present, generate forgotPasswordCode, hash forgotPasswordCode,
 * put forgotPasswordHash in DB,
 * send email with forgotPasswordCode, show check your email page.
 * @param event
 * @returns {Promise<number>}
 */
async function handleForgotPasswordRequest(event) {
    event.preventDefault();
    let email = document.getElementById("wwvg-email");
    console.log("checking if email is invalid");
    if(await validation.invalidEmail(email)){
        displayErrorMessageEmailInput("invalid email", "forgotPassword.page1.errorInvalidEmail");
        return 1;
    }
    console.log("checking if email is in database");
    if(!(await database.hasEmail(email))){
        showCheckYourEmail(event);
        return 1;
    }

    console.log("checking if database has forgot password hash");
    if(await database.emailHasForgotPasswordHash(email.value)){
        console.log("deleting forgot password hash");
        if(await database.deleteForgotPasswordHash(email.value)){
            displayErrorMessageEmailInput("reset code verwijderen mislukt",
                "forgotPassword.page1.errorResetCodeDeleteFailed");
            return 1;
        }
    }

    const HIGHEST_POSSIBLE_FORGOT_PASSWORD_CODE = 10000000;
    console.log("generating forgotpassword code");
    let forgotPasswordCode = await generateForgotPasswordCode(HIGHEST_POSSIBLE_FORGOT_PASSWORD_CODE);
    let timestamp = new Date();
    let salt = await database.getSalt(email.value);
    let forgotPasswordHash = await passwordHash(forgotPasswordCode, salt);
    console.log("forgotpasswordCode: '" + forgotPasswordCode + "'");
    console.log("salt: '" + salt + "'");
    console.log("forgotpasswordhash: '" + forgotPasswordHash + "'");

    console.log("saving passwordhash");
    if (await database.saveForgotPasswordHash(email, forgotPasswordHash, timestamp))
    {
        displayErrorMessageEmailInput("reset code in database zetten mislukt",
            "forgotPassword.page1.errorResetCodeInsertFailed");
        return 1;
    }
    let initialLanguage = FYSCloud.Session.get("language", "nl");

    console.log("sending mail");
    switch (initialLanguage){
        case "en":
            if (await sendMailEnglish(email, forgotPasswordCode, salt)){
                displayErrorMessageEmailInput("email versturen mislukt",
                    "forgotPassword.page1.errorSendEmailFailed");
                return 1;
            }
            break;
        case "es":
            if (await sendMailEspanol(email, forgotPasswordCode, salt)){
                displayErrorMessageEmailInput("email versturen mislukt",
                    "forgotPassword.page1.errorSendEmailFailed");
                return 1;
            }
            break;
        default:
            if (await sendMailDutch(email, forgotPasswordCode, salt)){
                displayErrorMessageEmailInput("email versturen mislukt",
                    "forgotPassword.page1.errorSendEmailFailed");
                return 1;
            }
            break;
    }

    console.log("showing check your mail page");
    showCheckYourEmail(event);
    return 0;
}

/**
 * check if password fields are the same and not 0
 * @param event
 * @returns {number}
 */
function validateNewPassword(event) {
    event.preventDefault();
    let passwordInput = document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord"];
    let repeatPasswordInput = document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord-herhalen"];

    if (validation.passwordMatch(passwordInput, repeatPasswordInput)) {
        displayErrorMessageNewPasswordInput("Wachtwoord komt niet overeen", "forgotPassword.page3.errorNewPasswordRepeatNotSame");
        return 1;
    }
    if (validation.emptyInput(passwordInput)) {
        displayErrorMessageNewPasswordInput("Wachtwoord kan niet leeg zijn", "forgotPassword.page3.errorEmptyPasswordInput");
        return 1;
    }
    return 0;
}

/**
 * send email with forgot password code in dutch
 * @param mail
 * @param forgotPasswordCode
 * @returns {Promise<void>} return 0 if succes, 1 if fail
 */
async function sendMailDutch(mail, forgotPasswordCode, salt){
    let url = FYSCloud.Utils.createUrl(window.location.href, {forgotPasswordCode: forgotPasswordCode, email: mail.value});
    try {
        await FYSCloud.API.sendEmail({
            from: {
                name: "corendon",
                address: "group@hva.nl"
            },
            to: [
                {
                    name: "",
                    address: mail.value
                }
            ],
            subject: "Nieuw wachtwoord aanmaken",
            html: "<h1>Hallo!</h1><p>Hier de link om een nieuw wachtwoord aan te maken.</p><p>url: " + url + "</p>" +
                "<p>Groetjes leden van het discordmoderators team!</p>"

        });
        return 0;
    } catch (reason) {
        console.error(reason);
        return 1;
    }
}

/**
 * send email with forgot password code in espanol
 * @param mail
 * @param forgotPasswordCode
 * @returns {Promise<void>} return 0 if succes, 1 if fail
 */
async function sendMailEspanol(mail, forgotPasswordCode, salt){
    let url = FYSCloud.Utils.createUrl(window.location.href, {
        forgotPasswordCode: forgotPasswordCode, email: mail.value
    });
    try {
        await FYSCloud.API.sendEmail({
            from: {
                name: "corendon",
                address: "group@hva.nl"
            },
            to: [
                {
                    name: "",
                    address: mail.value
                }
            ],
            subject: "Crear nueva contraseña",
            html: "<h1>¡Hola!</h1><p>Este es el enlace para crear una nueva contraseña.</p><p>url: " + url + "</p>" +
                "<p>¡Saludos miembros del equipo de moderadores de Discord!</p>"

        });
        return 0;
    } catch (reason) {
        console.error(reason);
        return 1;
    }
}

/**
 * send email with forgot password code in english
 * @param mail
 * @param forgotPasswordCode
 * @returns {Promise<void>} return 0 if succes, 1 if fail
 */
async function sendMailEnglish(mail, forgotPasswordCode, salt){
    let url = FYSCloud.Utils.createUrl(window.location.href, {
        forgotPasswordCode: forgotPasswordCode, email: mail.value
    });
    try {
        await FYSCloud.API.sendEmail({
            from: {
                name: "corendon",
                address: "group@hva.nl"
            },
            to: [
                {
                    name: "",
                    address: mail.value
                }
            ],
            subject: "Create new password",
            html: "<h1>Hello!</h1><p>Here's the link to create a new password.</p><p>url: " + url + "</p>" +
                "<p>Greetings members of the discord moderators team!</p>"

        });
        return 0;
    } catch (reason) {
        console.error(reason);
        return 1;
    }
}

/**
 * check for forgot password code in url
 * @param url
 * @returns {number}
 */
function hasParameters(){
    return Object.keys(FYSCloud.URL.queryString()).length;
}

/**
 * generate forgot password code
 * @param length
 * @returns {Promise<number>}
 */
async function generateForgotPasswordCode(length) {
    let forgotPasswordCode = Math.floor(Math.random() * length);
    while (await database.hasForgotPasswordHash(await hashForgotPasswordCode(forgotPasswordCode))){
        forgotPasswordCode = Math.floor(Math.random() * length);
    }
    return forgotPasswordCode;
}

/**
 * gets email from db using forgotpassword code, check if both inputs ar same and not 0, gets salt and hashes password,
 * updates hash in DB
 * @param event
 * @returns {Promise<number>} return 0 if inputs are not correct
 */
async function handleNewPassword(event) {
    event.preventDefault();
    let forgotPasswordCode = FYSCloud.URL.queryString("forgotPasswordCode");
    console.log("FYSCloud.URL.queryString(\"forgotPasswordCode\") geeft:" + FYSCloud.URL.queryString("forgotPasswordCode"));

    let email = FYSCloud.URL.queryString("email");
    console.log("FYSCloud.URL.queryString(\"email\") geeft :" + email);

    let salt = await database.getSalt(email);
    console.log("await database.getSalt geeft: " + salt);

    let forgotPasswordHash = await hashForgotPasswordCode(forgotPasswordCode, salt);
    console.log("forgotpasswordhash: '" + forgotPasswordHash + "'");
    if(!await database.hasForgotPasswordHash(forgotPasswordHash)){
        displayErrorMessageNewPasswordInput("Wachtwoord aanpassen mislukt, wachtwoord is al aangepast," +
            " nieuw-wachtwoord-aanvraag mislukt of overschreven.", "forgotPassword.page3.errorNoResetCode");
        return 1;
    }
    if (email.length == 0) {
        displayErrorMessageNewPasswordInput("Email ophalen mislukt", "forgotPassword.page3.errorNoEmail")
        return 1;
    }

    if(validateNewPassword(event)){
        return 1;
    }

    salt = await getUniqueSalt();
    const newPasswordHash = await hashForgotPasswordCode(document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord"].value, salt);
    try {
        await FYSCloud.API.queryDatabase(
            "UPDATE `user` SET `password`=?, `salt`=? WHERE email=?;",
            [newPasswordHash, salt, email]
        )
    } catch(error) {
        displayErrorMessageNewPasswordInput("Wachtwoord updaten mislukt",
            "forgotPassword.page3.errorPasswordUpdateFailed");
        return 1;
    }
    if(await database.deleteForgotPasswordHash(email)){
        displayErrorMessageNewPasswordInput("Reset code verwijderen mislukt",
            "forgotPassword.page3.errorResetCodeDeleteFailed");
        return 1;
    }
    displayMessageNewPasswordInput("Wachtwoord aanpassen gelukt",
        "forgotPassword.page3.updatePasswordSuccess");

}

/**
 * for some reason this function must exist because calling passwordhash directly causes an error
 * @param forgotPasswordCode
 * @param salt
 * @returns {Promise<undefined|string>}
 */
async function hashForgotPasswordCode(forgotPasswordCode, salt){
    return await passwordHash(forgotPasswordCode, salt);
}

/**
 * displays message under email input tag in wachtwoord vergeten4.html
 * @param message
 */
function displayErrorMessageEmailInput(message, translateTag){
    document.getElementById("errorMessageContainerPage1").innerText = message;
    document.getElementById("wwvg-email").style.borderColor = "red";
    document.getElementById("errorMessageContainerPage1").setAttribute("data-translate",
        translateTag);
    FYSCloud.Localization.translate();
}

function displayErrorMessageNewPasswordInput(message, translateTag){
    document.getElementById("errorMessageContainerPage3").style.display = "block";
    document.getElementById("errorMessageContainerPage3").innerText = message;
    document.getElementById("nieuw-wachtwoord").style.borderColor = "red";
    document.getElementById("nieuw-wachtwoord-herhalen").style.borderColor = "red";
    document.getElementById("errorMessageContainerPage3").style.color = "red";
    document.getElementById("errorMessageContainerPage3").setAttribute("data-translate",
        translateTag);
    FYSCloud.Localization.translate();
}

function displayMessageNewPasswordInput(message, translateTag){
    document.getElementById("errorMessageContainerPage3").style.display = "block";
    document.getElementById("errorMessageContainerPage3").innerText = message;
    document.getElementById("nieuw-wachtwoord").style.borderColor = "var(--color-border-grey)";
    document.getElementById("nieuw-wachtwoord-herhalen").style.borderColor = "var(--color-border-grey)";
    document.getElementById("errorMessageContainerPage3").style.color = "black";
    document.getElementById("errorMessageContainerPage3").setAttribute("data-translate",
        translateTag);
    FYSCloud.Localization.translate();
}