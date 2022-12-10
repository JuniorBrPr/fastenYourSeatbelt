import { FileSystem } from "./classes/fileSystem.js";
import { environmentUrl } from "./config.js";
import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

//get the current user
const userId = FYSCloud.Session.get("userId");
//create a filesystem
const fileSystem = new FileSystem(environmentUrl);

const fileInput = document.querySelector("#profile-upload");
const uploadBtn = document.querySelector("#upload-photo");
const image = document.querySelector("#profile-picture");
const preview = document.querySelector(".preview");
const previewText = document.querySelector(".preview-text");

//set photo from start
fileSystem.refreshPhoto(await fileSystem.getPhoto(userId), image);

//upload a photo when upload button is clicked
uploadBtn.addEventListener("click", async () => {
	try {
		const upload = await fileSystem.uploadPhoto(fileInput, userId, image);
		const p = document.createElement("p");
		p.textContent = upload;
		uploadBtn.parentElement.appendChild(p);
	} catch (error) {
		const p = document.createElement("p");
		p.classList.add("warning");
		p.textContent = error;
		uploadBtn.parentElement.appendChild(p);
	}
});

//refresh the preview display to display info about picture when a file is selected
fileInput.addEventListener("change", async () => {
	const dataUrl = await FYSCloud.Utils.getDataUrl(fileInput);
	if (dataUrl.isImage) {
		previewText.removeAttribute("data-translate");
		previewText.textContent = fileInput.files[0].name;
		fileSystem.refreshPhoto(dataUrl.url, preview);
	}
});
