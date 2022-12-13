import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";
/**
 * class to handle FYSCloud connection to file system, mostly used for the photos
 * @author julian
 */
export class FileSystem {
	#url;
	/**
	 * constructor
	 * @param {URL} url - url to the cloud environment in use
	 */
	constructor(url) {
		this.#url = url;
	}

	/**
	 * upload a photo corresponding to the user uploading it
	 * @param {HTMLInputElement} fileInput - input with the type of file
	 * @param {int} user - id of the current user logged in
	 * @param {HTMLImageElement} imageElement - element which will contain the uploaded photo
	 * @returns
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

	/**
	 * get the url of a profile picture
	 * @param {int} user - id of the current user logged in
	 * @returns a url
	 */
	async getPhoto(user) {
		const exists = await FYSCloud.API.fileExists(`profile${user}.dat`);
		if (exists) {
			return `${this.#url}/uploads/profile${user}.dat`;
		}
	}
	/**
	 * update an image element with the given photo connected to the link
	 * @param {URL} url or dataurl of the given Photo
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
