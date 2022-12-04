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
    const tijdsbestekStart = document.getElementById('startdate')
    const tijdsbestekEnd = document.getElementById('enddate')


    /* Pulling Data and parsing it into the fields*/

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

    /*Load all data in the right fields on Profile page*/
    
    function loadData(data) {
        firstNameField.value = data[0].firstName;
        lastNameField.value = data[0].lastName;
        bioField.value = data[0].bio;
        destinationField.value = data[0].destination;

        const bday = data[0].bday;
        const date = new Date(bday)


        birthDateField.value = date;
        tijdsbestekStart.value = data[0].startDate;
        tijdsbestekEnd.value = data[0].endDate
    }
}


/*Submit data to the databse*/

function submitData(data) {

    const InsertData = FYSCloud.API.queryDatabase(
        "INSERT first_name AS firstName,\n" +
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
}

