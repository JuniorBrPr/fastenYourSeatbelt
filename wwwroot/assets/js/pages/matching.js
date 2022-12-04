import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

//Temporary
FYSCloud.Session.set("userId", 1);

const buddyList = document.querySelector(".matching-matches");
const matchingHeaderTitleText = document.querySelector(".matching-header-text");

const buddyProfile = document.querySelector(".popup-container");
const buddyProfileCloseBtn = document.querySelector(".login-close");

const existingBtn = document.querySelector(".existing-btn");
const suggestedBtn = document.querySelector(".suggested-btn");
const incomingBtn = document.querySelector(".incoming-btn");
const outgoingBtn = document.querySelector(".outgoing-btn");

const btnContainer = document.querySelector(".matching-sidebar");
let prevButton = document.querySelector(".existing-btn");

//Adds an active state to the sidebar buttons when clicked, used for the decoration of the button.
setActiveBtn(btnContainer);

//Populates the list when loading the matching page, "existing" buddy's by default
populateList(buddyList, "existing", await getExistingBuddies(FYSCloud.Session.get("userId")));

//Button to switch to the list of existing buddy's
existingBtn.addEventListener("click", async () => {
    matchingHeaderTitleText.innerHTML = "Corenbuddy’s";
    populateList(buddyList, "existing", await getExistingBuddies(FYSCloud.Session.get("userId")));
});

//Button to switch to the list of suggested buddies
suggestedBtn.addEventListener("click", async () => {
    matchingHeaderTitleText.innerHTML = "Voorgestelde Corenbuddy’s";
    populateList(buddyList, "suggested", await getRecommendedBuddies(FYSCloud.Session.get("userId")));
})

//Button to switch to the list of incoming buddy requests
incomingBtn.addEventListener("click", async () => {
    matchingHeaderTitleText.innerHTML = "Inkomendende buddy verzoeken";
    populateList(buddyList, "incoming", await getIncomingBuddyRequests(FYSCloud.Session.get("userId")));
})

//Button to switch to the list of outgoing buddy requests
outgoingBtn.addEventListener("click", async () => {
    matchingHeaderTitleText.innerHTML = "Uitgaande buddy verzoeken";
    populateList(buddyList, "outgoing", await getOutgoingBuddyRequests(FYSCloud.Session.get("userId")));
})

//Button to close the "watch profile" modal
buddyProfileCloseBtn.addEventListener("click", () => {
    buddyProfile.style.display = "none";
})

/**
 * For every 'buddy' in the data it makes a list item the buddy's information.
 * @param {Element} buddyList A unordered-list element which will be the parent of
 * the buddy list items.
 * @param {string} type The type of buddy's you want to populate the list with
 * ("existing" || "suggested" || "incoming" || "outgoing").
 * @param {Object[]} data An array with buddy object from which to get the data.
 */
function populateList(buddyList, type, data) {
    //Clear the list before populating again.
    buddyList.innerHTML = "";

    //If the chosen list is empty or the user is not logged in, display a message letting the user know.
    if (data.length === 0) {
        const buddyListItem = document.createElement("li");
        buddyListItem.className = "buddy-list-item";

        const emptyListMsg = document.createElement("h2");
        emptyListMsg.className = "empty-buddy-list";

        emptyListMsg.innerHTML = FYSCloud.Session.get("userId") === undefined || null || 0 ?
            "Oh oh, je bent niet ingelogd!" : "Deze lijst is nog leeg ;(";

        buddyListItem.appendChild(emptyListMsg);
        buddyList.appendChild(buddyListItem);
        return;
    }

    data.forEach(buddy => {
        const buddyListItem = document.createElement("li");
        buddyListItem.className = "buddy-list-item";

        const buddyAttributeContainer = document.createElement("div");
        buddyAttributeContainer.className = "buddy-attributes-container w-100"
        buddyListItem.appendChild(buddyAttributeContainer);

        //Add a profile picture to the buddy
        const buddyImg = document.createElement("img");
        buddyImg.className = "buddy-img";
        //Temporary till profile picture system is created
        buddyImg.src = "assets/img/users/henk.png";
        buddyAttributeContainer.appendChild(buddyImg);

        //Add the name of the buddy
        addAttribute("Naam", buddy.name, buddyAttributeContainer);

        //Add the preferred destination of the buddy
        addAttribute("Bestemming", buddy.destination, buddyAttributeContainer);

        //Add the time expenditure of the buddy
        addAttribute("Tijdsbestek", buddy.timeframe + " dagen", buddyAttributeContainer);

        //Add the amount of common interests with the buddy
        addAttribute("Gemeenschappelijke interesses", buddy.commonInterests, buddyAttributeContainer)

        //Add the container which will hold the buttons for the buddy list item
        const btnContainer = document.createElement("div");
        btnContainer.className = "buddy-btn-container w-100";
        buddyListItem.appendChild(btnContainer);

        const buddyProfileBtn = addButton("Profiel bekijken", "buddy-profile-btn", btnContainer);

        // Onclick make the buddy profile modal visible
        buddyProfileBtn.addEventListener("click", () => {
            buddyProfile.style.display = "block";
        });

        /*
         * If buddy type = "existing", add a "book a trip" button to the buddy
         * and also add a "delete buddy" button to the buddy list item.
         */
        if (type === "existing") {
            const bookTripBtn = addButton("Boek een reis!", "buddy-book-btn", btnContainer);

            //The "book a trip" button redirects to the corendon website.
            bookTripBtn.addEventListener("click", () => {
                location.href = "www.corendon.nl";
            });

            const buddyDelete = addButton("Buddy verwijderen", "btn-red buddy-delete-btn", btnContainer);

            buddyDelete.addEventListener("click", async () => {
                if(confirm("Buddy verwijderen?")){
                    await deleteBuddyRequest(FYSCloud.Session.get("userId"), buddy.userid)
                        .then(() => buddyList.removeChild(buddyListItem));
                }
            });
        }

        // If buddy type = "suggested" add a "send buddy request" button to the buddy list item.
        if (type === "suggested") {
            const sendRequestBtn = addButton("Verzoek sturen", "buddy-send-request-btn", btnContainer);

            sendRequestBtn.addEventListener("click", async () => {
                await sendBuddyRequest(FYSCloud.Session.get("userId"), buddy.userid)
                    .then(() => buddyList.removeChild(buddyListItem))
            });
        }

        /* If buddy type = "incoming" add an "accept buddy request" button  and a
         * refuse buddy request button to the buddy list item.
         */
        if (type === "incoming") {
            const acceptRequestBtn = addButton("Verzoek accepteren", "buddy-accept-request-btn",
                btnContainer);

            acceptRequestBtn.addEventListener("click", async () => {
                await acceptBuddyRequest(FYSCloud.Session.get("userId"), buddy.userid)
                    .then(() => buddyList.removeChild(buddyListItem))
            });

            const denyRequestBtn = addButton("Verzoek weigeren", "btn-red buddy-refuse-request-btn",
                btnContainer);

            denyRequestBtn.addEventListener("click", async () => {
                if(confirm("Verzoek weigeren?")){
                    await deleteBuddyRequest(FYSCloud.Session.get("userId"), buddy.userid)
                        .then(() => buddyList.removeChild(buddyListItem));
                }
            });
        }

        //If buddy type = "outgoing" add a "withdraw buddy request" button to the buddy list item.
        if (type === "outgoing") {
            const withdrawRequestBtn = addButton("Verzoek intrekken", "btn-red buddy-refuse-request-btn",
                btnContainer)

            withdrawRequestBtn.addEventListener("click", async () => {
                if(confirm("Verzoek intrekken?")){
                    await deleteBuddyRequest(FYSCloud.Session.get("userId"), buddy.userid)
                        .then(() => buddyList.removeChild(buddyListItem));
                }
            });
        }

        //Finally, add the buddy list item to the buddy unordered-list.
        buddyList.appendChild(buddyListItem);
    })
}

/**
 * Adds a given attribute with a label to a given container
 * @param {string} name The name of the attribute, used for the label.
 * @param {string} value The value of the attribute.
 * @param {Element} container The container to add the attribute to.
 */
function addAttribute(name, value, container) {
    const cont = document.createElement("div");
    cont.className = "buddy-attr-container";

    const lbl = document.createElement("h3");
    lbl.className = "buddy-attr-label w-100";
    lbl.innerHTML = name + ":";
    cont.appendChild(lbl);

    const content = document.createElement("span");
    content.className = "buddy-attr w-100";
    content.innerHTML = value;
    cont.appendChild(content);

    container.appendChild(cont);
}

/**
 * Adds a button a given container
 * @param {string} text The text to be added to the button.
 * @param {string} className A string containing the classnames to be added to the button,
 * every will automatically contain the "btn" class.
 * @param {Element} container The container to add the button to.
 */
function addButton(text, className, container) {
    const btn = document.createElement("button");
    btn.className = "btn " + className;

    const btnText = document.createElement("span");
    btnText.className = "btn-text";
    btnText.innerHTML = text;
    btn.appendChild(btnText);

    container.appendChild(btn);

    return btn;
}

/**
 * Sets an active state to a button in a given container, containing other buttons.
 * @param {Element} container The container containing the buttons.
 */
function setActiveBtn(container) {
    container.addEventListener('click', (e) => {
        const isButton = e.target.parentElement.nodeName === 'BUTTON' || e.target.nodeName === 'BUTTON';

        if (!isButton) {
            return;
        }

        if (prevButton !== null) {
            prevButton.classList.remove('active');
        }

        if (e.target.parentElement.nodeName === 'BUTTON') {
            e.target.parentElement.classList.add('active');
            prevButton = e.target.parentElement;
        } else {
            e.target.classList.add('active');
            prevButton = e.target;
        }
    });
}

/**
 * Retrieves an array of suggested buddies from the database.
 * Buddies that have sent the user a buddy request or vice-versa, are excluded from the list
 * and so are existing buddies.
 * @param {number} userId The ID of the currently active user.
 */
async function getRecommendedBuddies(userId) {
    return await FYSCloud.API.queryDatabase(
        "SELECT user_id                            AS userid,\n" +
        "       CONCAT(first_name, \" \", last_name) AS name,\n" +
        "       destination                        AS destination,\n" +
        "       DATEDIFF(end_date, start_date)     AS timeframe,\n" +
        "       (SELECT count(DISTINCT interest_id)\n" +
        "        FROM user_interest\n" +
        "        WHERE interest_id\n" +
        "            IN (SELECT interest_id\n" +
        "                FROM user_interest\n" +
        "                WHERE profile_id = ?)\n" +
        "          AND interest_id\n" +
        "            IN (SELECT interest_id\n" +
        "                FROM user_interest\n" +
        "                WHERE profile_id = user_id))\n" +
        "                                          AS commonInterests\n" +
        "FROM user\n" +
        "         JOIN profile AS p\n" +
        "             ON user.user_id = p.profile_id\n" +
        "         JOIN user_interest AS u\n" +
        "             ON user.user_id = u.profile_id\n" +
        "         JOIN buddy AS b\n" +
        "             ON (b.receiver_user_id != user.user_id\n" +
        "                    OR b.sender_user_id != user.user_id)\n" +
        "WHERE interest_id IN (SELECT interest_id\n" +
        "                      FROM user_interest\n" +
        "                      WHERE profile_id = ?)\n" +
        "  AND user_id NOT IN (SELECT receiver_user_id FROM buddy)\n" +
        "  AND user_id NOT IN (SELECT sender_user_id FROM buddy)\n" +
        "  AND user_id != ?\n" +
        "GROUP BY NAME\n" +
        "ORDER BY commonInterests DESC",
        [userId, userId, userId]
    ).catch((reason) => console.log(reason));
}

/**
 * Retrieves an array of existing buddies from the database.
 * @param {number} userId The ID of the currently active user.
 */
async function getExistingBuddies(userId) {
    return await FYSCloud.API.queryDatabase(
        "SELECT user_id                              AS userid,\n" +
        "CONCAT(first_name, \" \", last_name) AS name,\n" +
        "destination                          AS destination,\n" +
        "DATEDIFF(end_date, start_date)       AS timeframe,\n" +
        "(SELECT count(DISTINCT interest_id)\n" +
        "FROM user_interest\n" +
        "WHERE interest_id IN (SELECT interest_id FROM user_interest WHERE profile_id = ?)\n" +
        "AND interest_id IN (SELECT interest_id FROM user_interest WHERE profile_id = user_id)) AS commonInterests,\n" +
        "b.is_accepted                        AS ACCEPTED\n" +
        "FROM user\n" +
        "JOIN profile p ON user.user_id = p.profile_id\n" +
        "JOIN buddy b ON user.user_id = b.sender_user_id AND b.is_accepted = TRUE OR\n" +
        "user_id = b.receiver_user_id AND b.is_accepted = TRUE\n" +
        "WHERE user_id != ?\n" +
        "AND (b.receiver_user_id = ? or b.sender_user_id = ?)\n" +
        "GROUP BY name\n" +
        "ORDER BY commonInterests DESC",
        [userId, userId, userId, userId])
        .catch((reason) => console.log(reason));
}

/**
 * Retrieves an array of buddies to whom the user has sent a buddy request, from the database.
 * @param {number} userId The ID of the currently active user.
 */
async function getOutgoingBuddyRequests(userId) {
    return await FYSCloud.API.queryDatabase(
        "SELECT user_id                               AS userid,\n" +
        "       CONCAT(first_name, \" \", last_name)    AS name,\n" +
        "       destination                           AS destination,\n" +
        "       DATEDIFF(end_date, start_date)        AS timeframe,\n" +
        "       (SELECT COUNT(DISTINCT interest_id)\n" +
        "        FROM user_interest\n" +
        "        WHERE interest_id\n" +
        "            IN (SELECT interest_id\n" +
        "                FROM user_interest\n" +
        "                WHERE profile_id = ?)\n" +
        "          AND interest_id\n" +
        "            IN (SELECT interest_id\n" +
        "                FROM user_interest\n" +
        "                WHERE profile_id = user_id)) AS commonInterests,\n" +
        "       b.is_accepted                         AS accepted\n" +
        "FROM user\n" +
        "         JOIN profile p\n" +
        "              ON user.user_id = p.profile_id\n" +
        "         JOIN buddy b\n" +
        "              ON user.user_id = b.receiver_user_id\n" +
        "                  AND NOT b.is_accepted = TRUE\n" +
        "WHERE user_id != ?\n" +
        "  AND b.sender_user_id = ?\n" +
        "GROUP BY name\n" +
        "ORDER BY commonInterests DESC",
        [userId, userId, userId])
        .catch((reason) => console.log(reason));
}

/**
 * Retrieves an array of buddies from whom the user has received a buddy request, from the database.
 * @param {number} userId The ID of the currently active user.
 */
async function getIncomingBuddyRequests(userId) {
    return await FYSCloud.API.queryDatabase(
        "SELECT user_id                                     AS userid,\n" +
        "       CONCAT(first_name, \" \", last_name)        AS name,\n" +
        "       destination                                 AS destination,\n" +
        "       DATEDIFF(end_date, start_date)              AS timeframe,\n" +
        "       (SELECT COUNT(DISTINCT interest_id)\n" +
        "        FROM user_interest\n" +
        "        WHERE interest_id\n" +
        "                  IN (SELECT interest_id\n" +
        "                      FROM user_interest\n" +
        "                      WHERE profile_id = ?)\n" +
        "          AND interest_id\n" +
        "                  IN (SELECT interest_id\n" +
        "                      FROM user_interest\n" +
        "                      WHERE profile_id = user_id)) AS commonInterests,\n" +
        "       b.is_accepted                               AS accepted\n" +
        "FROM user\n" +
        "         JOIN profile AS p\n" +
        "             ON user.user_id = p.profile_id\n" +
        "         JOIN buddy AS b\n" +
        "             ON user.user_id = b.sender_user_id AND NOT b.is_accepted = TRUE\n" +
        "WHERE user_id != ?\n" +
        "  AND (b.receiver_user_id = ?)\n" +
        "GROUP BY name\n" +
        "ORDER BY commonInterests DESC",
        [userId, userId, userId])
        .catch((reason) => console.log(reason));
}

/**
 * Sends a request to a buddy.
 * @param {userId} userId The ID of the currently active user.
 * @param {userId} receiverUserId The ID of the user to whom to send the request.
 */
async function sendBuddyRequest(userId, receiverUserId){
    return await FYSCloud.API.queryDatabase(
        "INSERT INTO buddy(sender_user_id,\n" +
        "        receiver_user_id,\n" +
        "        is_accepted)\n" +
        "VALUES (?,?, FALSE)",
        [userId, receiverUserId])
        .catch((reason) => console.log(reason));
}

/**
 * Accepts a buddy request.
 * @param {userId} userId The ID of the currently active user.
 * @param {userId} senderUserId The ID of the user who sent the request.
 */
async function acceptBuddyRequest(userId, senderUserId){
    return await FYSCloud.API.queryDatabase(
        "UPDATE buddy\n" +
        "SET is_accepted = TRUE\n" +
        "WHERE (sender_user_id = ? and receiver_user_id = ?)",
        [senderUserId, userId])
        .catch((reason) => console.log(reason));
}

/**
 * Deletes a buddy request or deletes an existing buddy.
 * @param {userId} userId The ID of the currently active user.
 * @param {userId} buddyUserId The ID of the buddy.
 */
async function deleteBuddyRequest(userId, buddyUserId){
    return await FYSCloud.API.queryDatabase(
        "DELETE\n" +
        "FROM buddy\n" +
        "WHERE (sender_user_id = ? and receiver_user_id = ?)\n" +
        "   OR (receiver_user_id = ? and sender_user_id = ?)",
        [userId, buddyUserId, userId, buddyUserId])
        .catch((reason) => console.log(reason));
}