import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

export class FileSystem {
	#url;
	constructor(url) {
		this.#url = url;
	}
	/**
	 * upload een foto voor een gebruiker
	 * @param {HTMLInputElement} fileInput
	 */
	async uploadPhoto(fileInput, user, imageElement) {
		try {
			const dataUrl = await FYSCloud.Utils.getDataUrl(fileInput);
			console.log(dataUrl);
			if (!dataUrl.isImage) {
				this.refreshPhoto(false, imageElement);
				throw "File is not an image";
			}
			const upload = await FYSCloud.API.uploadFile(
				`profile${user}.dat`,
				dataUrl.url,
				true
			);
			this.refreshPhoto(dataUrl.url, imageElement);
			return "Foto is geupload";
		} catch (err) {
			throw err;
		}
	}
	async getPhoto(user) {
		const exists = await FYSCloud.API.fileExists(`profile${user}.dat`);
		if (exists) {
			return `${this.#url}/uploads/profile${user}.dat`;
		}
	}
	/**
	 *
	 * @param {URL}} url or dataurl of the given Photo
	 * @param {HTMLImageElement} imageElement element where the image is displayed in
	 */
	refreshPhoto(url, imageElement) {
		if (url) {
			imageElement.src = url;
		} else {
			imageElement.src = "assets/img/users/skeleton_profile_picture.svg";
		}
	}
}
