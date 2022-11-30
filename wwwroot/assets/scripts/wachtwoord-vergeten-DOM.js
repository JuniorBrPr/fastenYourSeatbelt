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
    document.getElementById("wwvg-knop2").addEventListener("click", evt => showpage3(evt));
    document.getElementById("wwvg-knop3").addEventListener("click", evt => validateForm(evt));

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
    evt.preventDefault();
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
        if (nieuwWw == "") {
            alert("wachtoord kan niet leeg zijn");
        }
    }
    console.log(nieuwWw);
    console.log(nieuwWwControle);
}
