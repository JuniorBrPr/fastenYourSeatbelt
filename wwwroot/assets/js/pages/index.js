import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

const cta = document.querySelector(".cta");
const userSession = FYSCloud.Session.get("userId");
if (userSession !== undefined) {
	cta.classList.add("nav-hidden");
} else {
	cta.classList.remove("nav-hidden");
}
