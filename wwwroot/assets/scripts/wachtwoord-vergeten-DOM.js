window.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    console.log("als je dit leest ben je homo");
    document.getElementById("pagina2").style.display = "none";
}


function hansklok(){
    document.getElementById("pagina1").style.display = "none";
    document.getElementById("pagina2").style.display = "flex";

    console.log("uitgevoerd");

}
document.getElementById("wwvg-knop").addEventListener("click", evt => hansklok());
