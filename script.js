
function getApiQuizz(){
    let promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    // promisse.then(putApiQuizz) **correto
    promisse.then(putApiQuizz)
    promisse.catch()
}

let quizzapi;
function putApiQuizz(answer){
    quizzapi = answer.data
    let quizzul = document.querySelector('.quizzlist')
    for(let i = 0; i < 8; i++){

        quizzul.innerHTML+=` <li class="serverquizz">
        <div class="shadow">
            <div class="namequizz">
                ${quizzapi[i].title}
            </div>
        </div>   
            <img src=${quizzapi[i].image}>
        
        </li>`
    }
    showQuizz(answer);
}
getApiQuizz();

let quizzSelected;
function showQuizz(quizz) {

    quizzSelected = quizz.data[30] // Alterar "quizzapi[0]", colocado para implementar função.
    const showQuizzTitle = quizzSelected.title;
    const showQuizzImage = quizzSelected.image;

    const screen = document.querySelector(".screen2");
    screen.innerHTML = "";
    
    const showScreen = `
    <div class="choice1">
        <img src="${showQuizzImage}">
        <div>${showQuizzTitle}</div>
    </div>
    <div class="quizz">
        <div class="quizz-header">${quizzSelected.questions.title[1]}[</div>
        <div class="quizz-content">
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[1].image[1]}">
                <div>${quizzSelected.questions.answers[1].text[1]}</div>
            </div>
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[1].image[2]}">
                <div>${quizzSelected.questions.answers[1].text[2]}</div>
            </div>
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[1].image[3]}">
                <div>${quizzSelected.questions.answers[1].text[3]}</div>
            </div>
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[1].image[4]}">
                <div>${quizzSelected.questions.answers[1].text[4]}</div>
            </div>
        </div>
        <div class="quizz-header">${quizzSelected.questions.title[2]}</div>
        <div class="quizz-content">
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[2].image[1]}">
                <div>${quizzSelected.questions.answers[2].text[1]}</div>
            </div>
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[2].image[2]}">
                <div>${quizzSelected.questions.answers[2].text[2]}</div>
            </div>
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[2].image[3]}">
                <div>${quizzSelected.questions.answers[2].text[3]}</div>
            </div>
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[2].image[4]}">
                <div>${quizzSelected.questions.answers[2].text[4]}</div>
            </div>
        </div>
    </div>`;

    screen = showScreen;
}

function createQuizz(){           /*collects the values needed for the creation of the Quizz*/
    const title = `${document.getElementById('title').value}`;
    const image = `${document.getElementById('image').value}`;
    const numberQuestions = document.getElementById('questions').value;
    const levels = document.getElementById('levels').value;
    const screen3 = document.querySelector('.screen31');
    if (title.length < 20 || title.length > 65){  /*verifications*/
        falhou();
        window.location.reload();
    }
    if (checkUrl(image)){
        falhou();
        window.location.reload();
    }
    if (numberQuestions < 3){
        falhou();
        window.location.reload();
    }
    if (levels < 2){
        falhou();
        window.location.reload();
    }
    screen3.classList.add('hide');
    questionsQuizz(title,image,numberQuestions,levels); 
}

let falhou = () => alert('Por favor, preencha os dados corretamente');

function checkUrl(string) {
    try {
     let url = new URL(string)
     return false
   } catch(err) {
       return true
   }
 }

function questionsQuizz(title,image,numberQuestions,levels){
    console.log(title);
}



