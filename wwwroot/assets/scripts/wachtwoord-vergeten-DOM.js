window.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    console.log("als je dit leest ben je homo");
}


function hansklok(){
    document.getElementById("pagina1").style.display = "none";

    console.log("uitgevoerd");

}
document.getElementById("wwvg-knop").addEventListener("click", evt => hansklok());
