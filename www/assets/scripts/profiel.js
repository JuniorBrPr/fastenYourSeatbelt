import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

window.addEventListener("DOMContentLoaded", function () {
	dataLoad();
});

const userId = FYSCloud.Session.get("userId", 1);

console.log(userId);

async function dataLoad() {
	/*Setting Field vars*/

	const firstNameField = document.getElementById("voornaam");
	const lastNameField = document.getElementById("achternaam");
	const bioField = document.getElementById("bio");
	const birthDateField = document.getElementById("gdatum");
	const interField = document.getElementsByClassName("inter-field");
	const destinationField = document.getElementById("bestemming");
	const tijdsbestekStart = document.getElementById("startdate");
	const tijdsbestekEnd = document.getElementById("enddate");

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
			"WHERE user_id = ?",
		[userId, userId]
	);

	console.log(getData);

	loadData(getData);

	/*Load all data in the right fields on Profile page*/

	function loadData(data) {
		firstNameField.value = data[0].firstName;
		lastNameField.value = data[0].lastName;
		bioField.value = data[0].bio;
		destinationField.value = data[0].destination;

		const bday = data[0].bday;

		//get date
		const date = new Date(bday);
		//get year of a date
		const bdayYear = date.getFullYear();
		/**
		 * get month gives the month starting from 0 going to 11
		 * so to make january the fist month add 1,
		 * also you want to make sure it is always formatted MM so 2 should become 02,
		 * padStart autofills left over space so the length should be 2 and if it is empty fill it with a zero
		 * padStart is a function on a string, and getMonth gives an int, so you need to parse it to a string
		 *
		 * remove this comment later
		 */
		const bdayMonth = (date.getMonth() + 1).toString().padStart(2, 0);
		// same logic as month only getDate weirdly does start at 1
		const bdayDay = date.getDate().toString().padStart(2, 0);
		//correct format for date input
		const dateFormat = `${bdayYear}-${bdayMonth}-${bdayDay}`;
		birthDateField.value = dateFormat;
		/** TODO
		 * I personally would create a function that converts the date in the correct format,
		 * using the code above
		 */
		// tijdsbestekStart.value = data[0].startDate;
		// tijdsbestekEnd.value = data[0].endDate;
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
			"WHERE user_id = ?",
		[userId, userId]
	);
}
