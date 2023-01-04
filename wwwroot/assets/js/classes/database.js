import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

/**
 * Class for handling our database
 * @author Jurian
 */

export class Database {
    constructor() {}

    /**
     * put reset code in database
     * @param email
     * @param key
     * @param date
     * @returns {Promise<number>} return 0 if succes, 1 if fail
     */
    async saveForgotPasswordHash(email, key, date) {
        try{
            await FYSCloud.API.queryDatabase(
                "INSERT INTO `forgot_password` (`email`, `code`, `date`) VALUES (?, ?, ?);",
                [email.value, key, date.toISOString().slice(0, 10).replace('T', ' ')]
            );
            return 0;
        } catch (reason)
        {
            console.error(reason);
            return 1;
        }
    }

    /**
     * check if reset code is present in database
     * @param key
     * @returns {Promise<boolean>} returns true if reset code is in database
     */
    async hasForgotPasswordHash(forgotPasswordHash){
        const data = await FYSCloud.API.queryDatabase(
            "SELECT `code` FROM `forgot_password` WHERE `code` = ?;",
            [forgotPasswordHash]
        );
        return (data.length != 0);
    }

    /**
     * delete reset code cell from DB
     * @param emailInput
     * @returns {Promise<number>} return 0 if succes, 1 if fail
     */
    async deleteForgotPasswordHash(emailInput) {
        try {
            await FYSCloud.API.queryDatabase(
                "DELETE FROM `forgot_password` WHERE `email` = ?;",
                [emailInput]
            );
        } catch (error) {
            console.error(error);

            return 1;
        }
        return 0;
    }

    /**
     * gets email drom db forgot_password table based on reset code
     * @param key
     * @returns {Promise<number|*>} return email if success if fail return 0
     */
    async getEmail(forgotPasswordHash) {
        try {
            const data = await FYSCloud.API.queryDatabase(
                "SELECT `email` FROM `forgot_password` WHERE `code` = ?;",
                [forgotPasswordHash]
            );
            return data;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async getSalt(email){
        try {
            const data = await FYSCloud.API.queryDatabase(
                "SELECT `salt` FROM `user` WHERE `email` = ?;",
                [email]
            );
            return data[0].salt;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    /**
     * check if email already has an account
     * @param {HTMLInputElement} emailInput email input to check
     * @returns true if email is in database false if not
     */
    async hasEmail(emailInput) {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT `email` FROM `user` WHERE `email` = ?;",
            [emailInput.value]
        );
        return data.length > 0;
    }
}
