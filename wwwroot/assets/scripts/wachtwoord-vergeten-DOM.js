window.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    document.getElementById("pagina2").style.display = "none";
    document.getElementById("pagina3").style.display = "none";
    document.getElementById("wwvg-knop").addEventListener("click", evt => showpage2(evt));
    console.log("hoi");
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
    let x = document.forms["nieuw-wachtwoord-form"]["nieuw-wachtwoord"];
    console.log(x);
}
