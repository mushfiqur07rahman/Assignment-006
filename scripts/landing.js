
const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", landingVerification);



function landingVerification() {
    const nameInput = document.getElementById("name-input");
    const passInput = document.getElementById("pass-input");

    if (nameInput.value == '') {
        Swal.fire("Enter Your Name Please!");
    }
    if (passInput.value !== "123456") {
        Swal.fire({
            title: "Invalid Passkey",
            text: "Have you forgotten the passkey?",
            icon: "question"
          });
    }
    if (nameInput.value !== '' && passInput.value == "123456") {
        Swal.fire({
            title: "Congratulations!",
            text: "You've successfully logged in!",
            icon: "success",
            confirmButtonText: 'OK',
            draggable: true // Makes the popup draggable
        });
        showAndHideSections();
    }
}

const headerSection = document.getElementById("header-section");
const bannerSection = document.getElementById("banner-section");
const learnSection = document.getElementById("learn-section");
const faqSection = document.getElementById("faq-section");
const footerSection = document.getElementById("footer-section");

function showAndHideSections() {

    headerSection.classList.remove("hidden");

    bannerSection.classList.add("hidden");

    learnSection.classList.remove("hidden");
    learnSection.classList.add("flex");

    faqSection.classList.remove("hidden");
    faqSection.classList.add("flex");

    footerSection.classList.remove("hidden");
}


// Logout Button


const logoutButton = document.getElementById("log-out");
logoutButton.addEventListener("click", logout);


function logout() {

    headerSection.classList.add("hidden");

    bannerSection.classList.remove("hidden");

    learnSection.classList.add("hidden");
    learnSection.classList.remove("flex");

    faqSection.classList.add("hidden");
    faqSection.classList.remove("flex");

}