import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

const form = document.querySelector(".profiel");
const subBtn = document.querySelector(".saveBtn");
const userId = FYSCloud.Session.get("userId", 10);
/*Checks if profiel_id exist otherwise it will create*/
subBtn.addEventListener("click", async function (e) {
	if (await profielExist()) {
		console.log("test");
		updateData(createObject());
	} else {
		console.log("test");
		submitData(createObject());
	}
});

console.log(userId);
await dataLoad();

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
	const genderField = document.getElementById("geslacht-field-1");

	/* Pulling Data and parsing it into the fields*/

	try {
		const getData = await FYSCloud.API.queryDatabase(
			"SELECT first_name AS firstName,\n" +
				"       last_name AS lastName,\n" +
				"       birthdate as bday,\n" +
				" 		gender,\n" +
				"       biography as bio,\n" +
				"       start_date as startDate,\n" +
				"       end_date as endDate,\n" +
				"       destination,\n" +
				"       budget\n" +
				"FROM user\n" +
				"INNER JOIN profile p on p.profile_id = ?\n" +
				"WHERE user_id = ?;",
			[userId, userId]
		);

		loadData(getData);
	} catch {
		const getData = await FYSCloud.API.queryDatabase(
			"SELECT first_name as firstName, last_name as lastName\n" +
				"FROM user\n" +
				"WHERE user_id = ?",
			[userId]
		);
		console.log(getData);
		loadData(getData);
	}

	/*Load all data in the right fields on Profile page*/

	function loadData(data) {
		firstNameField.value = data[0].firstName;
		lastNameField.value = data[0].lastName;
		if (data[0].bio != null) {
			bioField.value = data[0].bio;
			destinationField.value = data[0].destination;

			const bday = data[0].bday;
			const tijdEnd = data[0].endDate;
			const tijdStart = data[0].startDate;

			const birthday = change(bday);
			const tijdEndDate = change(tijdEnd);
			const tijdStartDate = change(tijdStart);

			birthDateField.value = birthday;
			tijdsbestekStart.value = tijdEndDate;
			tijdsbestekEnd.value = tijdStartDate;
			genderField.value = data[0].gender;
		}
	}

	function change(date) {
		const changeDate = new Date(date);
		const getYear = changeDate.getFullYear();
		const getMonth = (changeDate.getMonth() + 1).toString().padStart(2, 0);
		// same logic as month only getDate weirdly does start at 1
		const getDay = changeDate.getDate().toString().padStart(2, 0);
		//correct format for date input
		return `${getYear}-${getMonth}-${getDay}`;
	}
}

/*Submit data to the databse*/

async function updateData(data) {
	console.log(data.startDate);
	data.bday = FYSCloud.Utils.toSqlDatetime(new Date(data.bday));
	data.startDate = FYSCloud.Utils.toSqlDatetime(new Date(data.startDate));
	data.endDate = FYSCloud.Utils.toSqlDatetime(new Date(data.endDate));

	const updateUserData = await FYSCloud.API.queryDatabase(
		"UPDATE user\n" +
			"SET    first_name = ?,\n" +
			"       last_name = ?\n" +
			"WHERE user_id = ?",
		[data.firstName, data.lastName, userId]
	);

	const updateProfileData = await FYSCloud.API.queryDatabase(
		"UPDATE profile\n" +
			"SET    birthdate = ?,\n" +
			"       gender =    ?,\n" +
			"       biography = ?,\n" +
			"       start_date = ?,\n" +
			"       end_date = ?,\n" +
			"       destination = ?,\n" +
			"       budget = ?\n" +
			"WHERE profile_id = ?;",
		[
			data.bday,
			data.gender,
			data.bio,
			data.startDate,
			data.endDate,
			data.destination,
			data.budget,
			userId,
		]
	);

	console.log(updateProfileData);
	console.log(updateUserData);
}

function createObject() {
	return {
		firstName: document.getElementById("voornaam").value,
		lastName: document.getElementById("achternaam").value,
		bday: document.getElementById("gdatum").value,
		gender: document.getElementById("geslacht-field-1").value,
		bio: document.getElementById("bio").value,
		destination: document.getElementById("bestemming").value,
		startDate: document.getElementById("startdate").value,
		endDate: document.getElementById("enddate").value,
	};
}

async function profielExist() {
	const data = await FYSCloud.API.queryDatabase(
		" SELECT `profile_id`" + " FROM `profile`" + " WHERE `profile_id` = ?;",
		[userId]
	);
	return data.length > 0;
}

async function submitData(data) {
	console.log(data.startDate);
	data.bday = FYSCloud.Utils.toSqlDatetime(new Date(data.bday));
	data.startDate = FYSCloud.Utils.toSqlDatetime(new Date(data.startDate));
	data.endDate = FYSCloud.Utils.toSqlDatetime(new Date(data.endDate));

	const insertProfileData = await FYSCloud.API.queryDatabase(
		"INSERT INTO profile (profile_id, birthdate, gender, biography, start_date, end_date, destination, budget) " +
			"VALUES (? ,? ,? ,? ,? ,? ,? ,?);",
		[
			userId,
			data.bday,
			data.gender,
			data.bio,
			data.startDate,
			data.endDate,
			data.destination,
			data.budget,
		]
	);
}
