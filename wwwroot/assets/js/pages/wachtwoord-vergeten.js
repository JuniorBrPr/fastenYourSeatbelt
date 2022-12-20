import {getUniqueSalt, passwordHash} from "../classes/hash.js";
import { Validation } from "../classes/validation.js";
import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";




/**
 * logica achter de wachtwoord vergeten pagina
 *
 * @author Jurian Blommers
 */


const validation = new Validation();

showpage1();
document.getElementById("wwvg-knop").addEventListener("click", evt => verwerkEmail(evt));
document.getElementById("wwvg-knop3").addEventListener("click", evt => verwerkNieuwWachtwoord(evt));
console.log(checkForKey(window.location.href));
if (checkForKey(window.location.href) == 0) {
    showpage3();
}


/**
 * hide page 2 and 3, show page 1
 * @param evt
 */
function showpage1(){
    document.getElementById("pagina1").style.display = "flex";
    document.getElementById("pagina2").style.display = "none";
    document.getElementById("pagina3").style.display = "none";
}

/**
 * hide page 1 and 3, show page 2
 * @param evt
 */
function showpage2(evt){
    evt.preventDefault();
    document.getElementById("pagina1").style.display = "none";
    document.getElementById("pagina2").style.display = "flex";
    document.getElementById("pagina3").style.display = "none";
}

/**
 * hide page 1 and 2, show page 3
 * @param evt
 */
function showpage3(evt){
    document.getElementById("pagina1").style.display = "none";
    document.getElementById("pagina2").style.display = "none";
    document.getElementById("pagina3").style.display = "flex";
}

/**
 * check if email is valid, delete password reset code in DB if present, generate key, put key in DB,
 * send email with key, show page 2.
 * @param evt
 * @returns {Promise<number>}
 */
async function verwerkEmail(evt) {
    evt.preventDefault();
    let email = document.getElementById("wwvg-email");
    if(await validation.invalidEmail(email)){
        displayErrorMessagePage1("invalid email", "forgotPassword.page1.errorInvalidEmail");
        return 1;
    }
    if(!(await validation.emailInDatabase(email))){
        showpage2(evt);
        return 1;
    }
    if(await validation.emailHasResetCodeInBd(email)){
        if(await deleteResetCodeInBd(email.value)){
            displayErrorMessagePage1("reset code verwijderen mislukt",
                "forgotPassword.page1.errorResetCodeDeleteFailed");
            return 1;
        };
    }
    let key;
    key = await generateKey(10000000);
    let timestamp = new Date();
    let salt = await getSaltFromDatabase(email.value);
    let hashedResetCode = await hashResetCode(key, salt);
    console.log("hashedResetCode: " + hashedResetCode);
    if (await zetKeyInDb(email, hashedResetCode, timestamp))
    {
        displayErrorMessagePage1("reset code in database zetten mislukt",
            "forgotPassword.page1.errorResetCodeInsertFailed");
        return 1;
    }
    let initialLanguage = FYSCloud.Session.get("language", "nl");
    console.log(initialLanguage);
    switch (initialLanguage){
        case "en":
            if (await sendMailEnglish(email, key, salt)){
                displayErrorMessagePage1("email versturen mislukt",
                    "forgotPassword.page1.errorSendEmailFailed");
                return 1;
            }
            break;
        case "es":
            if (await sendMailEspanol(email, key, salt)){
                displayErrorMessagePage1("email versturen mislukt",
                    "forgotPassword.page1.errorSendEmailFailed");
                return 1;
            }
            break;
        default:
            if (await sendMailDutch(email, key, salt)){
                displayErrorMessagePage1("email versturen mislukt",
                    "forgotPassword.page1.errorSendEmailFailed");
                return 1;
            }
            break;
    }
    showpage2(evt);
    return 0;
}

/**
 * check if password fields are the same and not 0
 * @param evt
 * @returns {number}
 */
function validateForm(evt) {
    evt.preventDefault();
    let nieuwWw = document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord"].value;
    let nieuwWwControle = document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord-herhalen"].value;


    if (nieuwWw != nieuwWwControle) {
        displayErrorMessagePage3("Wachtwoord komt niet overeen");
        return 1;
    }
    if (nieuwWw == "") {
        displayErrorMessagePage3("Wachtwoord kan niet leeg zijn");
        return 1;
    }
    return 0;
}

/**
 * put reset code in database
 * @param email
 * @param key
 * @param date
 * @returns {Promise<number>} return 0 if succes, 1 if fail
 */
async function zetKeyInDb(email, key, date) {
    try{
        await FYSCloud.API.queryDatabase(
            "INSERT INTO `forgot_password` (`email`, `code`, `date`) VALUES (?, ?, ?);",
            [email.value, key, date.toISOString().slice(0, 10).replace('T', ' ')]
        );
        return 0;
    } catch (reason)
    {
        console.error(reason);
        return 1;
    }
}

/**
 * send email with reset code
 * @param mail
 * @param key
 * @returns {Promise<void>} return 0 if succes, 1 if fail
 */
async function sendMailDutch(mail, key, salt){
    let url = FYSCloud.Utils.createUrl(window.location.href, {
        key: key, salt: salt
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
            subject: "Nieuw wachtwoord aanmaken",
            html: "<h1>Hallo!</h1><p>Hier de link om een nieuw wachtwoord aan te maken.</p><p>url: " + url + "</p>" +
                "<p>Groetjes leden van het discordmoderators team!</p>"

        });
        return 0;
    } catch (reason) {
        console.error(reason);
        return 1;
    };
}

/**
 * send email with reset code
 * @param mail
 * @param key
 * @returns {Promise<void>} return 0 if succes, 1 if fail
 */
async function sendMailEspanol(mail, key, salt){
    let url = FYSCloud.Utils.createUrl(window.location.href, {
        key: key, salt: salt
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
    };
}

/**
 * send email with reset code
 * @param mail
 * @param key
 * @returns {Promise<void>} return 0 if succes, 1 if fail
 */
async function sendMailEnglish(mail, key, salt){
    let url = FYSCloud.Utils.createUrl(window.location.href, {
        key: key, salt: salt
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
    };
}

/**
 * check for reset code in url
 * @param url
 * @returns {number}
 */
function checkForKey(url){
    let vars = parseURLParams(url);
    if(vars.key == null)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

/**
 * extract variables from url
 * @param url
 * @returns {{}}
 */
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

/**
 * generate reset code
 * @param length
 * @returns {Promise<number>}
 */
async function generateKey(length) {
    let key = Math.floor(Math.random() * length);
    while (await keyInDb(key)){
        key = Math.floor(Math.random() * length);
    }
    return key;
}

/**
 * check if reset code is present in database
 * @param key
 * @returns {Promise<boolean>} returns true if reset code is in database
 */
async function keyInDb(key){
    const data = await FYSCloud.API.queryDatabase(
        "SELECT `code` FROM `forgot_password` WHERE `code` = ?;",
        [key]
    );
    return (data.length != 0);
}

/**
 * gets email from db using reset code, check if both inputs ar same aand not 0, gets salt and hashes password,
 * updates hash in DB
 * @param evt
 * @returns {Promise<number>} return 0 if inputs are not correct
 */
async function verwerkNieuwWachtwoord(evt) {
    evt.preventDefault();
    let key = parseURLParams(window.location.href).key;
    let salt = parseURLParams(window.location.href).salt;

    let emailarray = await getEmailFromKey(await hashResetCode(key, salt));
    let hashedResetCode = await passwordHash(key, salt);
    if(!await keyInDb(hashedResetCode)){
        displayErrorMessagePage3("Wachtwoord aanpassen mislukt, wachtwoord is al aangepast," +
            " nieuw-wachtwoord-aanvraag mislukt of overschreven.", "forgotPassword.page3.errorNoResetCode");
        return 1;
    }
    if (emailarray.length == 0) {
        displayErrorMessagePage3("Email ophalen mislukt", "forgotPassword.page3.errorNoEmail")
        return 1;
    }
    let email = emailarray[0].email;

    if(validateForm(evt)){
        return 1;
    }

    salt = await getUniqueSalt();
    const hashedPassword = await passwordHash(document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord"].value, salt);
    try {
        await FYSCloud.API.queryDatabase(
            "UPDATE `user` SET `password`=?, `salt`=? WHERE email=?;",
            [hashedPassword, salt, email]
        )
    } catch(error) {
        displayErrorMessagePage3("Wachtwoord updaten mislukt",
            "forgotPassword.page3.errorPasswordUpdateFailed");
        return 1;
    }
    if(await deleteResetCodeInBd(email)){
        displayErrorMessagePage3("Reset code verwijderen mislukt",
            "forgotPassword.page3.errorResetCodeDeleteFailed");
        return 1;
    }
    displayNonErrorMessagePage3("Wachtwoord aanpassen gelukt",
        "forgotPassword.page3.updatePasswordSuccess");

}

/**
 * delete reset code cell from DB
 * @param emailInput
 * @returns {Promise<number>} return 0 if succes, 1 if fail
 */
async function deleteResetCodeInBd(emailInput) {
    try {
        await FYSCloud.API.queryDatabase(
            "DELETE FROM `forgot_password` WHERE `email` = ?;",
            [emailInput]
        );
    } catch (error) {
        console.error(error);

        return 1;
    }
    return 0;
}

/**
 * gets email drom db forgot_password table based on reset code
 * @param key
 * @returns {Promise<number|*>} return email if success if fail return 0
 */
async function getEmailFromKey(key) {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT `email` FROM `forgot_password` WHERE `code` = ?;",
            [key]
        );
        return data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

/**
 * displays message under email input tag in wachtwoord vergeten4.html
 * @param message
 */
function displayErrorMessagePage1(message, translateTag){
    document.getElementById("errorMessageContainerPage1").innerText = message;
    document.getElementById("wwvg-email").style.borderColor = "red";
    document.getElementById("errorMessageContainerPage1").setAttribute("data-translate",
        translateTag);
    FYSCloud.Localization.translate();
}

function displayErrorMessagePage3(message, translateTag){
    document.getElementById("errorMessageContainerPage3").style.display = "block";
    document.getElementById("errorMessageContainerPage3").innerText = message;
    document.getElementById("nieuw-wachtwoord").style.borderColor = "red";
    document.getElementById("nieuw-wachtwoord-herhalen").style.borderColor = "red";
    document.getElementById("errorMessageContainerPage3").style.color = "red";
    document.getElementById("errorMessageContainerPage3").setAttribute("data-translate",
        translateTag);
    FYSCloud.Localization.translate();
}

function displayNonErrorMessagePage3(message, translateTag){
    document.getElementById("errorMessageContainerPage3").style.display = "block";
    document.getElementById("errorMessageContainerPage3").innerText = message;
    document.getElementById("nieuw-wachtwoord").style.borderColor = "var(--color-border-grey)";
    document.getElementById("nieuw-wachtwoord-herhalen").style.borderColor = "var(--color-border-grey)";
    document.getElementById("errorMessageContainerPage3").style.color = "black";
    document.getElementById("errorMessageContainerPage3").setAttribute("data-translate",
        translateTag);
    FYSCloud.Localization.translate();
}

/**
 *
 * @param key
 * @param email
 * @returns {Promise<undefined|*>}
 */
async function hashResetCode(key, salt){
    return await passwordHash(key, salt);
}

async function getSaltFromDatabase(email){
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT `salt` FROM `user` WHERE `email` = ?;",
            [email]
        );
        return data[0].salt;
    } catch (error) {
        console.error(error);
        return 0;
    }
}