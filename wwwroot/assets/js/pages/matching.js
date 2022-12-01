import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";

//Mock data for prototyping purposes
const data = [
    {
        type: "existing",
        profilePicture: "assets/img/users/noah.png",
        name: "Noah Trevor McCay",
        destination: "Sint Maarten",
        timeFrame: 14,
        commonInterests: 8
    },
    {
        type: "existing",
        profilePicture: "assets/img/users/liam.png",
        name: "Liam Cosworth",
        destination: "Rio de Janeiro, Brazilië",
        timeFrame: 10,
        commonInterests: 6
    },
    {
        type: "existing",
        profilePicture: "assets/img/users/delaila.png",
        name: "Delaila Besselink",
        destination: "Ambergris Caye, Belize",
        timeFrame: 9,
        commonInterests: 5
    },
    {
        type: "suggested",
        profilePicture: "assets/img/users/henk.png",
        name: "Henk van vliet",
        destination: "Barcelona",
        timeFrame: 14,
        commonInterests: 8
    },
    {
        type: "suggested",
        profilePicture: "assets/img/users/sarah.png",
        name: "Sarah Kesselaar ",
        destination: "Hamburg",
        timeFrame: 6,
        commonInterests: 7
    },
    {
        type: "suggested",
        profilePicture: "assets/img/users/peter.png",
        name: "Peter Mathias Willink ",
        destination: "Mallorca",
        timeFrame: 5,
        commonInterests: 6
    },
    {
        type: "suggested",
        profilePicture: "assets/img/users/jan.png",
        name: "Jan Hendrik Matroos",
        destination: "Zakynthos",
        timeFrame: 21,
        commonInterests: 4
    },
    {
        type: "suggested",
        profilePicture: "assets/img/users/koosje.png",
        name: "Koosje De Witte",
        destination: "Santo Domingo",
        timeFrame: 28,
        commonInterests: 2
    },
    {
        type: "incoming",
        profilePicture: "assets/img/users/mulder.png",
        name: "Cusco, Peru",
        destination: "Sint Maarten",
        timeFrame: 28,
        commonInterests: 4
    },
    {
        type: "incoming",
        profilePicture: "assets/img/users/john.png",
        name: "John Smith",
        destination: "Bora Bora",
        timeFrame: 10,
        commonInterests: 3
    },
    {
        type: "incoming",
        profilePicture: "assets/img/users/fred.png",
        name: "Fred Patek",
        destination: "Kathmandu, Nepal",
        timeFrame: 16,
        commonInterests: 3
    },
    {
        type: "outgoing",
        profilePicture: "assets/img/users/remco.png",
        name: "Remco Verhoeven",
        destination: "Marrakech, Marokko",
        timeFrame: 5,
        commonInterests: 7
    },
    {
        type: "outgoing",
        profilePicture: "assets/img/users/alexandra.png",
        name: "Alexandra Schumacher",
        destination: "Roatan, Bay Islands ",
        timeFrame: 5,
        commonInterests: 7
    },
];

FYSCloud.Session.set("userId", 1);

const userId = FYSCloud.Session.get("userId");

const recommended = await getRecommendedBuddies(userId);
console.log(recommended);

const existing = await getExistingBuddies(userId);
console.log(existing);

const outgoing = await getOutgoingBuddyRequests(userId);
console.log(outgoing);

const incoming = await getIncomingBuddyRequests(userId);
console.log(incoming);

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
populateList(buddyList, "existing", data);

//Button to switch to the list of existing buddy's
existingBtn.addEventListener("click", () => {
    matchingHeaderTitleText.innerHTML = "Corenbuddy’s";
    populateList(buddyList, "existing", data);
});

//Button to switch to the list of suggested buddy'
suggestedBtn.addEventListener("click", () => {
    matchingHeaderTitleText.innerHTML = "Voorgestelde Corenbuddy’s";
    populateList(buddyList, "suggested", data);
})

//Button to switch to the list of incoming buddy requests
incomingBtn.addEventListener("click", () => {
    matchingHeaderTitleText.innerHTML = "Inkomendende buddy verzoeken";
    populateList(buddyList, "incoming", data);
})

//Button to switch to the list of outgoing buddy requests
outgoingBtn.addEventListener("click", () => {
    matchingHeaderTitleText.innerHTML = "Uitgaande buddy verzoeken";
    populateList(buddyList, "outgoing", data);
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

    data.forEach(buddy => {
        if (buddy.type === type) {
            const buddyListItem = document.createElement("li");
            buddyListItem.className = "buddy-list-item";

            const buddyAttributeContainer = document.createElement("div");
            buddyAttributeContainer.className = "buddy-attributes-container w-100"
            buddyListItem.appendChild(buddyAttributeContainer);

            //Add a profile picture to the buddy
            const buddyImg = document.createElement("img");
            buddyImg.className = "buddy-img";
            buddyImg.src = buddy.profilePicture;
            buddyAttributeContainer.appendChild(buddyImg);

            //Add the name of the buddy
            addAttribute("Naam", buddy.name, buddyAttributeContainer);

            //Add the preferred destination of the buddy
            addAttribute("Bestemming", buddy.destination, buddyAttributeContainer);

            //Add the time expenditure of the buddy
            addAttribute("Tijdsbestek", buddy.timeFrame + " dagen", buddyAttributeContainer);

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
            if (buddy.type === "existing") {
                const bookTripBtn = addButton("Boek een reis!", "buddy-book-btn", btnContainer);

                //The "book a trip" button redirects to the corendon website.
                bookTripBtn.addEventListener("click", () => {
                    location.href = "www.corendon.nl";
                });

                const buddyDeleteBtn = addButton("Buddy verwijderen", "btn-red buddy-delete-btn", btnContainer);
            }

            // If buddy type = "suggested" add a "send buddy request" button to the buddy list item.
            if (buddy.type === "suggested") {
                const sendRequestBtn = addButton("Verzoek sturen", "buddy-send-request-btn", btnContainer);
            }

            /* If buddy type = "incoming" add an "accept buddy request" button  and a
             * refuse buddy request button to the buddy list item.
             */
            if (buddy.type === "incoming") {
                const acceptRequestBtn = addButton("Verzoek accepteren", "buddy-accept-request-btn", btnContainer);

                const refuseRequestBtn = addButton("Verzoek weigeren", "btn-red buddy-refuse-request-btn", btnContainer);
            }

            //If buddy type = "outgoing" add a "withdraw buddy request" button to the buddy list item.
            if (buddy.type === "outgoing") {
                const withdrawRequestBtn = addButton("Verzoek intrekken", "btn-red buddy-refuse-request-btn", btnContainer)
            }

            //Finally, add the buddy list item to the buddy unordered-list.
            buddyList.appendChild(buddyListItem);
        }
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
        "AND b.receiver_user_id = ?\n" +
        "GROUP BY name\n" +
        "ORDER BY commonInterests DESC",
        [userId, userId, userId])
        .catch((reason) => console.log(reason));
}


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

async function getIncomingBuddyRequests() {
    return await FYSCloud.API.queryDatabase(
        "SELECT user_id                                                                                   AS userid,\n" +
        "       CONCAT(first_name, \" \", last_name)                                                        AS name,\n" +
        "       destination                                                                               AS destination,\n" +
        "       DATEDIFF(end_date, start_date)                                                            AS timeframe,\n" +
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
        "       b.is_accepted                                                                             AS accepted\n" +
        "FROM user\n" +
        "         JOIN profile AS p\n" +
        "             ON user.user_id = p.profile_id\n" +
        "         JOIN buddy AS b\n" +
        "             ON user.user_id = b.sender_user_id AND NOT b.is_accepted = TRUE\n" +
        "WHERE user_id != ?\n" +
        "  AND b.receiver_user_id = ?\n" +
        "GROUP BY name\n" +
        "ORDER BY commonInterests DESC",
        [userId, userId, userId])
        .catch((reason) => console.log(reason));
}

