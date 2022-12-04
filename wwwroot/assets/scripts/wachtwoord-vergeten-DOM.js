window.addEventListener("DOMContentLoaded", initialize);




//imports
import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";


/**
 * logica achter de wachtwoord vergeten pagina
 *
 * @author Jurian Blommers
 */


function initialize() {
    document.getElementById("pagina2").style.display = "none";
    document.getElementById("pagina3").style.display = "none";
    document.getElementById("wwvg-knop").addEventListener("click", evt => showpage2(evt));
    //document.getElementById("wwvg-knop2").addEventListener("click", evt => showpage3(evt));
    document.getElementById("wwvg-knop3").addEventListener("click", evt => validateForm(evt));
    if(checkForKey(window.location.href) == 1){
        showpage3();
    }
    //console.log(checkForKey(window.location.href) == 1);
    //console.log(generateKey(10));
}

function showpage1(evt){
    evt.preventDefault();
    document.getElementById("pagina1").style.display = "flex";
    document.getElementById("pagina2").style.display = "none";
    document.getElementById("pagina3").style.display = "none";
    console.log("uitgevoerd");
}

function showpage2(evt){
    evt.preventDefault();
    document.getElementById("pagina1").style.display = "none";
    document.getElementById("pagina2").style.display = "flex";
    document.getElementById("pagina3").style.display = "none";
    console.log("uitgevoerd");
}

function showpage3(evt){
    document.getElementById("pagina1").style.display = "none";
    document.getElementById("pagina2").style.display = "none";
    document.getElementById("pagina3").style.display = "flex";
    console.log("uitgevoerd");
}

function validateForm(evt) {
    evt.preventDefault();
    let nieuwWw = document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord"].value;
    let nieuwWwControle = document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord-herhalen"].value;


    if (nieuwWw != nieuwWwControle) {
        alert("Wachtwoord komt niet overeen");
        return 0;
    }
    if (nieuwWw == "") {
        alert("wachtoord kan niet leeg zijn");
        return 0;
    }
    console.log(nieuwWw);
    console.log(nieuwWwControle);
    return 1;
}

function sendMail(){
    console.log("test() word gerunt");
    FYSCloud.API.sendEmail({
        from: {
            name: "Jurian",
            address: "group@hva.nl"
        },
        to: [
            {
                name: "test",
                address: ""
            }
        ],
        subject: "Just a test!",
        html: "<h1>Hallo!</h1><p>Dit is een email verstuurt vanuit de hva cloud :).</p><p>Groetjes Jurian</p>"
    }).then(function(data) {
        console.error(data);
    }).catch(function(reason) {
        console.log(reason);
    });
}

function checkForKey(url){
    let vars = parseURLParams(url);
    if(vars.key == null)
    {
        console.log("geen key");
        return 0;
    }
    else
    {
        console.log("wel een key");
        return 1;
    }
}

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

function generateKey(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
