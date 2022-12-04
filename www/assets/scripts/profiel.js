import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";


window.addEventListener('DOMContentLoaded', function() {dataLoad()});

const userId = FYSCloud.Session.get("userId", 1);

console.log(userId);

async function dataLoad() {

    /*Setting Field vars*/

    const firstNameField = document.getElementById('voornaam')
    const lastNameField = document.getElementById('achternaam')
    const bioField = document.getElementById('bio')
    const birthDateField = document.getElementById('gdatum')
    const interField = document.getElementsByClassName('inter-field')
    const destinationField = document.getElementById('bestemming')


    /* Pulling Data and parsing it into the fields*/


        // await FYSCloud.API.queryDatabase(
        //     "SELECT * FROM user WHERE user_id = ?",
        //     [userId],
        // ).then(function(data) {
        //     console.log(data);
        // }).catch(function(reason) {
        //     console.log(reason)



    const getData = await FYSCloud.API.queryDatabase(
        "SELECT first_name AS firstName,\n" +
        "       last_name AS lastName,\n" +
        "       birthdate as bday,\n" +
        "       biography as bio,\n" +
        "       start_date as startDate,\n" +
        "       end_date as endDate,\n" +
        "       destination,\n" +
        "       budget\n" +
        "FROM user\n" +
        "LEFT JOIN profile p on p.profile_id = ?\n" +
        "WHERE user_id = ?", [userId, userId]);

    console.log(getData);

    loadData(getData);

    //Functie loadData
    function loadData(data) {
        firstNameField.innerHTML = data.firstName;
    }

    const firstName = await FYSCloud.API.queryDatabase(
        "SELECT first_name FROM user WHERE user_id=?",
        userId)

    //firstNameField.value = JSON.stringify(firstName,null,0)


    const lastName = await FYSCloud.API.queryDatabase(
        "SELECT last_name FROM user WHERE user_id=?",
        userId)

    lastNameField.value = JSON.stringify(lastName, null, 0)

    const bio = await FYSCloud.API.queryDatabase(
        "SELECT biography FROM profile WHERE profile_id=?",
        userId)

    bioField.value = JSON.stringify(bio, null, 0)


    const birthDay = await FYSCloud.API.queryDatabase(
        "SELECT birthdate FROM profile WHERE profile_id=?",
        userId)

    birthDateField.value = JSON.stringify(birthDay, null, 0)

    const destination = await FYSCloud.API.queryDatabase(
        "SELECT destination FROM profile WHERE profile_id=?",
        userId)

    destinationField.value = JSON.stringify(destination, null, 0)

}


