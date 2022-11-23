const eyeIcons = document.querySelectorAll("[data-eye]");

//Change the eye icon, placeholder and type, to make a password visible or hidden in the input
eyeIcons.forEach((icon) => {
	const input = icon.previousElementSibling;
	icon.addEventListener("click", () => {
		icon.classList.toggle("fa-eye");
		icon.classList.toggle("fa-eye-slash");

		//when fa-eye-slash is visible the placeholder and input need to be visible
		if (icon.classList.contains("fa-eye-slash")) {
			input.placeholder = "superveilig123#";
			input.type = "text";
		} else {
			input.placeholder = "***********";
			input.type = "password";
		}
	});
});

// hash password
import { passwordHash } from "../hash/hash.js";
const hashText = await passwordHash("password", "salt");
console.log(hashText);
const anotherHashText = await passwordHash("password", "pepper");
console.log(anotherHashText);
const test3 = await passwordHash("password", "salt");
console.log(test3);
