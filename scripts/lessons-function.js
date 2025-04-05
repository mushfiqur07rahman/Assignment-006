
// Loader
const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
}

const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
}




// Load Lesson Buttons
const loadLessonButtons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => {
            const levelNo = data.data.map(item => item.level_no);
            displayButtons(levelNo);
        });
}

const displayButtons = (levels) => {
    const lessonButtonContainer = document.getElementById("lesson-btn-container");
    for (let level of levels) {
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = `
        <button onclick= "showLoader(); loadWordsByLevel(${level}); clearGuidance(); activeAttribute(this); " class="btn btn-outline btn-primary text-sm font-semibold"><i class="fa-solid fa-book-open"></i> Lesson - ${level}</button>
        `
        lessonButtonContainer.appendChild(lessonDiv);
    }
}

loadLessonButtons();

const clearGuidance = () => {
    document.getElementById("guidance-message").innerHTML = ``;
}

const activeAttribute = (btn) => {
    const activeButtons = document.getElementsByClassName("btn-active");
    for (let btnActive of activeButtons) {
        btnActive.classList.remove("btn-active");
    }

    btn.classList.add("btn-active");
}


// Load Words based on the Lesson Buttons

const loadWordsByLevel = (level) => {
    
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then(res => res.json())
        .then(data => {
            const dataArray = data.data;

            if(dataArray.length == 0) {
                document.getElementById("guidance-message").innerHTML = `
<div class="w-full flex flex-col gap-4 items-center p-10">
    <img src="./assets/alert-error.png" alt="">
    <p class="bangla-main text-sm text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h3 class="bangla-main text-4xl font-medium text-[#292524]">নেক্সট Lesson এ যান</h3>
</div>
                `;
                hideLoader();
            }

            const wordContainer = document.getElementById("word-container");
            wordContainer.innerHTML = "";

            dataArray.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("bg-white", "rounded-xl", "min-w-[500px]", "p-9");
                card.innerHTML = `
                    <h1 class="font-bold text-3xl text-center">${item.word}</h1>
                    <p class="font-medium text-xl text-center py-6">Meaning / Pronunciation</p>
                    <h2 class="bangla-main text-3xl font-semibold text-center text-[#18181B] pb-9">
                        "${item.meaning}" / "${item.pronunciation}"
                    </h2>
                    <div class="flex justify-between">
                        <button onclick="getDescription(${item.id})" class="btn bg-[#1A91FF19] rounded-xl mx-4">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <button class="btn bg-[#1A91FF19] rounded-xl mx-4">
                            <i class="fa-solid fa-volume-up" onclick="pronounceWord('${item.word}')"></i>
                        </button>
                    </div>
                `;
                wordContainer.appendChild(card);
                hideLoader();
            });

        });
        
}



function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
  }








// Modal

function getDescription (id) {
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(data => openDescriptionModal(data.data));
}


function openDescriptionModal(details) {

    document.getElementById("main-word").innerText = details.word;
    document.getElementById("word-pronunciation").innerText = details.pronunciation;
    document.getElementById("meaning").innerText = details.meaning || 'No meaning available';
    document.getElementById("example").innerText = details.sentence || 'No example available';


    const synonymContainer = document.getElementById("synonymContainer");
    synonymContainer.innerHTML = '';
    if(details.synonyms.length == 0) {
        synonymContainer.innerHTML = "";
    }
    else{
        for(synonym of details.synonyms) {
            const synonymDiv = document.createElement("div");
            synonymDiv.classList.add('text-xl', 'py-[6px]', 'px-5', 'bg-[#EDF7FF]', 'border', 'border-[#D7E4EF]', 'w-fit', 'rounded-lg');
            synonymDiv.innerText = synonym;
            synonymContainer.appendChild(synonymDiv);
        }
    }
  
    const modal = document.getElementById("descriptionModal");
    modal.showModal();
  }
  