const buddyList = document.querySelector(".matching-matches");
const matchingHeaderTitleText = document.querySelector(".matching-header-text");

const existingBtn = document.querySelector(".existing-btn");
const suggestedBtn = document.querySelector(".suggested-btn");
const incomingBtn = document.querySelector(".incoming-btn");
const outgoingBtn = document.querySelector(".outgoing-btn");

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

populateList(buddyList, "existing", data);

existingBtn.addEventListener("click", () => {
    matchingHeaderTitleText.innerHTML = "Corenbuddy’s";
    populateList(buddyList, "existing", data);
});

suggestedBtn.addEventListener("click", () => {
    matchingHeaderTitleText.innerHTML = "Voorgestelde Corenbuddy’s";
    populateList(buddyList, "suggested", data);
})

incomingBtn.addEventListener("click", () => {
    matchingHeaderTitleText.innerHTML = "Inkomendende buddy verzoeken";
    populateList(buddyList, "incoming", data);
})

outgoingBtn.addEventListener("click", () => {
    matchingHeaderTitleText.innerHTML = "Uitgaande buddy verzoeken";
    populateList(buddyList, "outgoing", data);
})



function populateList(buddyList, type, data) {
    buddyList.innerHTML = "";

    data.forEach(buddy => {
        if (buddy.type === type) {
            const buddyListItem = document.createElement("li");
            buddyListItem.className = "buddy-list-item";

            const buddyImg = document.createElement("img");
            buddyImg.className = "buddy-img";
            buddyImg.src = buddy.profilePicture;
            buddyListItem.appendChild(buddyImg);

            const buddyName = document.createElement("span");
            buddyName.className = "buddy-name buddy-property";
            buddyName.innerHTML = buddy.name;
            buddyListItem.appendChild(buddyName);

            const destination = document.createElement("span");
            destination.className = "buddy-destination buddy-property";
            destination.innerHTML = buddy.destination;
            buddyListItem.appendChild(destination);

            const timeFrame = document.createElement("span");
            timeFrame.className = "buddy-time-frame buddy-property";
            if (buddy.timeFrame % 7 === 0) {
                timeFrame.innerHTML = buddy.timeFrame / 7 + " weken";
            } else {
                timeFrame.innerHTML = buddy.timeFrame + " dagen";
            }
            buddyListItem.appendChild(timeFrame);

            const interests = document.createElement("span");
            interests.className = "buddy-common-interests buddy-property";
            interests.innerHTML = buddy.commonInterests;
            buddyListItem.appendChild(interests);

            const btnContainer = document.createElement("div");
            btnContainer.className = "buddy-btn-container";
            buddyListItem.appendChild(btnContainer);

            const buddyProfileBtn = document.createElement("button");
            buddyProfileBtn.className = "btn buddy-profile-btn";
            const buddyProfileBtnText = document.createElement("span");
            buddyProfileBtnText.className = "btn-text";
            buddyProfileBtnText.innerHTML = "Profiel bekijken";
            buddyProfileBtn.appendChild(buddyProfileBtnText);
            btnContainer.appendChild(buddyProfileBtn);

            if (buddy.type === "existing"){
                const bookTripBtn = document.createElement("button");
                bookTripBtn.className = "btn buddy-book-btn";
                const bookTripBtnText = document.createElement("span");
                bookTripBtnText.className = "btn-text";
                bookTripBtnText.innerHTML = "Boek een reis!";
                bookTripBtn.appendChild(bookTripBtnText);
                btnContainer.appendChild(bookTripBtn);

                const buddyDeleteBtn = document.createElement("button");
                buddyDeleteBtn.className = "btn btn-red buddy-delete-btn";
                const buddyDeleteBtnText = document.createElement("span");
                buddyDeleteBtnText.className = "btn-text";
                buddyDeleteBtnText.innerHTML = "Buddy verwijderen";
                buddyDeleteBtn.appendChild(buddyDeleteBtnText);
                btnContainer.appendChild(buddyDeleteBtn);
            }

            if (buddy.type === "suggested"){
                const sendRequestBtn = document.createElement("button");
                sendRequestBtn.className = "btn buddy-send-request-btn";
                const sendRequestBtnText = document.createElement("span");
                sendRequestBtnText.className = "btn-text";
                sendRequestBtnText.innerHTML = "Verzoek sturen";
                sendRequestBtn.appendChild(sendRequestBtnText);
                btnContainer.appendChild(sendRequestBtn);
            }

            if (buddy.type === "incoming"){
                const acceptRequestBtn = document.createElement("button");
                acceptRequestBtn.className = "btn buddy-accept-request-btn";
                const acceptRequestBtnText = document.createElement("span");
                acceptRequestBtnText.className = "btn-text";
                acceptRequestBtnText.innerHTML = "Verzoek accepteren";
                acceptRequestBtn.appendChild(acceptRequestBtnText);
                btnContainer.appendChild(acceptRequestBtn);

                const refuseRequestBtn = document.createElement("button");
                refuseRequestBtn.className = "btn btn-red buddy-refuse-request-btn";
                const refuseRequestBtnText = document.createElement("span");
                refuseRequestBtnText.className = "btn-text";
                refuseRequestBtnText.innerHTML = "Verzoek weigeren";
                refuseRequestBtn.appendChild(refuseRequestBtnText);
                btnContainer.appendChild(refuseRequestBtn);
            }

            if (buddy.type === "outgoing"){
                const withdrawRequestBtn = document.createElement("button");
                withdrawRequestBtn.className = "btn btn-red buddy-refuse-request-btn";
                const withdrawRequestBtnText = document.createElement("span");
                withdrawRequestBtnText.className = "btn-text";
                withdrawRequestBtnText.innerHTML = "Verzoek intrekken";
                withdrawRequestBtn.appendChild(withdrawRequestBtnText);
                btnContainer.appendChild(withdrawRequestBtn);
            }

            buddyList.appendChild(buddyListItem);
        }
    })
}