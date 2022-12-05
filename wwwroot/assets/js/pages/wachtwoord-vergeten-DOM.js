import {getUniqueSalt, passwordHash} from "../classes/hash.js";
import { Validation } from "../classes/validation.js";
import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";




/**
 * logica achter de wachtwoord vergeten pagina
 *
 * @author Jurian Blommers
 */


const validation = new Validation();

document.getElementById("pagina2").style.display = "none";
document.getElementById("pagina3").style.display = "none";
document.getElementById("wwvg-knop").addEventListener("click", evt => verwerkEmail(evt));
//document.getElementById("wwvg-knop2").addEventListener("click", evt => showpage3(evt));
document.getElementById("wwvg-knop3").addEventListener("click", evt => verwerkNieuwWachtwoord(evt));
if (checkForKey(window.location.href) == 1) {
    showpage3();
}

/**
 * hide page 2 and 3, show page 1
 * @param evt
 */
function showpage1(evt){
    evt.preventDefault();
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
        alert("invalid email");
        return 1;
    }
    if(!(await validation.emailInDatabase(email))){
        alert("email niet in database");
        return 1;
    }
    if(await validation.emailHasResetCodeInBd(email)){
        if(await deleteResetCodeInBd(email.value)){
            alert("reset code verwijderen mislukt");
            return 1;
        };
    }
    let key;
    key = await generateKey(10000000);
    let timestamp = new Date();

    if (await zetKeyInDb(email, key, timestamp))
    {
        alert("reset code in database zetten mislukt");
        return 1;
    }
    if (await sendMail(email, key)){
        alert("email versturen mislukt")
        return 1;
    }
    showpage2(evt);
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
        alert("Wachtwoord komt niet overeen");
        return 1;
    }
    if (nieuwWw == "") {
        alert("wachtoord kan niet leeg zijn");
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
async function sendMail(mail, key){
    let url = FYSCloud.Utils.createUrl(window.location.href, {
        key: key
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
            subject: "Just a test!",
            html: "<h1>Hallo!</h1><p>Hier de code om een nieuw wachtwoord aan te maken, voor testredenen kan je dit " +
                "achter de url van de wachtwoord vergeten pagina plakken</p><p>achter url: &key=" + key + "</p><p>url: " + url + "</p>" +
                "<p>Groetjes leden van het discordmoderators team!</p>"

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
        return 0;
    }
    else
    {
        return 1;
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
async function verwerkNieuwWachtwoord(evt){
    evt.preventDefault();
    let key = parseURLParams(window.location.href).key;
    let emailarray = await getEmailFromKey(key);
    if(!await keyInDb(key)){
        alert("wachtwoord aanpassen mislukt, wachtwoord is al aangepast, nieuw-wachtwoord-aanvraag mislukt of overschreven.");
        return 1;
    }
    if (emailarray.length == 0) {
        alert("email ophalen mislukt")
        return 1;
    }
    let email = emailarray[0].email;

    if(validateForm(evt)){
        return 1;
    }

    const salt = await getUniqueSalt();
    const hashedPassword = await passwordHash(document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord"].value, salt);
    try {
        await FYSCloud.API.queryDatabase(
            "UPDATE `user` SET `password`=?, `salt`=? WHERE email=?;",
            [hashedPassword, salt, email]
        )
    } catch(error) {
        alert("wachtwoord updaten mislukt");
        return 1;
    }
    if(await deleteResetCodeInBd(email)){
        alert("reset code verwijderen mislukt");
        return 1;
    }
    alert("wachtwoord aanpassen gelukt");

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
async function getEmailFromKey(key)
{
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