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
import { passwordDigest, passwordDigestToHex } from "../hash/hash.js";

const buffer = await passwordDigest("test", "test");
console.log(passwordDigestToHex(buffer));
//another example to show that salt makes it unique
const buffer2 = await passwordDigest("test", "test2");
console.log(passwordDigestToHex(buffer2));
