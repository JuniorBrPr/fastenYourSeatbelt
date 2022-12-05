import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

const form = document.querySelector(".profiel")
const subBtn = document.querySelector('.saveBtn');
window.addEventListener('DOMContentLoaded', async () => await dataLoad());
// subBtn.addEventListener('Submit', function(e) {submitData()});

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
    const formField = document.getElementsByClassName('profiel')


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
        "INNER JOIN profile p on p.profile_id = ?\n" +
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
        const tijdEnd = data[0].endDate;
        const tijdStart = data[0].startDate;

        const birthday = change(bday)
        const tijdEndDate = change(tijdEnd)
        const tijdStartDate = change(tijdStart)

        birthDateField.value = birthday;
        tijdsbestekStart.value = tijdEndDate;
        tijdsbestekEnd.value = tijdStartDate;

    }


    function change(date) {

        const changeDate = new Date(date)
        const getYear = changeDate.getFullYear();
        const getMonth = (changeDate.getMonth() + 1).toString().padStart(2, 0);
        // same logic as month only getDate weirdly does start at 1
        const getDay = changeDate.getDate().toString().padStart(2, 0);
        //correct format for date input
        return `${getYear}-${getMonth}-${getDay}`;
    }
}

/*Submit data to the databse*/


async function submitData(data) {

    data.bday = FYSCloud.Utils.toSqlDatetime(new Date(data.bday))
    data.startDate = FYSCloud.Utils.toSqlDatetime(new Date(data.startDate))
    data.endDate = FYSCloud.Utils.toSqlDatetime(new Date(data.endDate))


    const updateUserData = await FYSCloud.API.queryDatabase(
        "UPDATE user\n" +
        "SET    first_name = ?,\n" +
        "       last_name = ?\n" +
        "WHERE user_id = ?", [data.firstName, data.lastName, userId]);

    const updateProfileData = await FYSCloud.API.queryDatabase(
        "UPDATE profile\n" +
        "SET    birthdate = ?,\n" +
        "       biography = ?,\n" +
        "       start_date = ?,\n" +
        "       end_date = ?,\n" +
        "       destination = ?,\n" +
        "       budget = ?\n" +
        "WHERE profile_id = ?;", [data.bday, data.bio,  data.startDate, data.endDate, data.destination, data.budget,
            userId]);

    console.log(updateProfileData)
    console.log(updateUserData)
}

function createObject() {
    return {
        firstName: document.querySelector('#voornaam').value,
        lastName: document.getElementById('achternaam').value,
        bio: document.getElementById('bio').value,
        birthDate: document.getElementById('gdatum').value,
        destination: document.getElementById('bestemming').value,
        tijdsbestekStart: document.getElementById('startdate').value,
        tijdsbestekEnd: document.getElementById('enddate').value
    }
}

console.log(createObject())