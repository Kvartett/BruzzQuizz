
function changeToTest(){
    alert('adicionar a mudança para o jogo do quizz selecionado')
    document.querySelector('.screen2').classList.remove('hide')
    document.querySelector('.firstscreen').classList.add('hide')
}
function changeScreen31(){
    document.querySelector('.firstscreen') .classList.add('hide')

    document.querySelector('.screen31').classList.remove('hide')
}
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

        quizzul.innerHTML+=` <li onclick="changeToTest()" class="serverquizz">
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
/* function showQuizz(quizz) {
    quizzSelected = quizz.data[49] // Alterar "quizzapi[0]", colocado para implementar função.
    console.log(quizzSelected)
    const showQuizzTitle = quizzSelected.title;
    const showQuizzImage = quizzSelected.image;

    let screen = document.querySelector(".screen2");
    
    screen.innerHTML = ` <div class="choice1">
        <img src="${showQuizzImage}">
        <div>${showQuizzTitle}</div>
    </div>
    <div class="quizz">
        <div class="quizz-header">${quizzSelected.questions[0]}[</div>
        <div class="quizz-content">
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[2].image[2]}">
                <div>${quizzSelected.questions.answers[1].text[1]}</div>
            </div>
            <div class="picture">
                <img src=$"${quizzSelected.questions.answers[1].image[2]}">
                <div>${quizzSelected.questions.answers[1].text[2]}</div>
            </div>+
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
} */

function random() { 
	return Math.random() - 0.5; 
}

function showQuizz(quizz) {
    let screen = document.querySelector(".screen2");

    console.log(quizz.data[3]);

    screen.innerHTML = `<div class="choice1">
        <img src="${quizz.data[3].image}">
        <div>${quizz.data[3].title}</div>
    </div>`;

    // let questions = screen.querySelector(".quizz");

    for (i = 0; i < quizz.data[3].questions.length; i++) {
        screen.innerHTML += `<div class="quizz">
        <div class="quizz-header">${quizz.data[3].questions[i].title}</div>
        <div class="quizz-content question${i}"></div>
        </div>`

        quizz.data[3].questions[i].answers.sort(random);
        for (j = 0; j < quizz.data[3].questions[i].answers.length; j++) {
            let answers = screen.querySelector(`.question${i}`);
            answers.innerHTML += `<div class="picture">
                <img src="${quizz.data[3].questions[i].answers[j].image}">
                <div>${quizz.data[3].questions[i].answers[j].text}</div>
            </div>`
        }
    }
}

function createQuizz(){           /*collects the values needed for the creation of the Quizz*/
    //const content = button.parentNode;
    const title = `${document.getElementById('title').value}`;
    const image = `${document.getElementById('image').value}`;
    const numberQuestions = document.getElementById('questions').value;
    const levels = document.getElementById('levels').value;
    const screen31 = document.querySelector('.screen31');
    if (title.length < 20 || title.length > 65){  /*verifications*/
        failed();
        window.location.reload();
    }
    if (checkUrl(image)){
        failed();
        window.location.reload();
    }
    if (numberQuestions < 3){
        failed();
        window.location.reload();
    }
    if (levels < 2){
        failed();
        window.location.reload();
    }
    screen31.classList.add('hide');
    screen32(numberQuestions);      /*inserts the templates in the HTML*/
    questionsQuizz(title,image,numberQuestions,levels); 
}

let failed = () => alert('Por favor, preencha os dados corretamente');

function checkUrl(string) {
    try {
     let url = new URL(string)
     return false
   } catch(err) {
       return true
   }
 }

function screen32(numberQuestions){   
    let i=1;
    const showScreen = document.querySelector('.screen32');
    showScreen.classList.remove('hide');
    showScreen.innerHTML += templateQuestions(i);
    for (i=2; i<=numberQuestions; i++){
        showScreen.innerHTML += templateQuestion(i);
    }
}

let templateQuestions = (i) => `<div class="questions">
<h2>Pergunta <span>${i}</span></h2>
    <input type="text" placeholder="Texto da pergunta">
    <input type="text" placeholder="Cor de fundo da pergunta">
<h2>Resposta Correta</h2>
    <input type="text" placeholder="Resposta correta">
    <input type="text" placeholder="URL da imagem">
<h2>Respostas Incorretas</h2>
<div class="incorrect">
    <input type="text" placeholder="Resposta incorreta 1">
    <input type="text" placeholder="URL da imagem 1">
</div>
<div class="incorrect">
    <input type="text" placeholder="Resposta incorreta 2">
    <input type="text" placeholder="URL da imagem 2">
</div>
<div class="incorrect">
    <input type="text" placeholder="Resposta incorreta 3">
    <input type="text" placeholder="URL da imagem 3">
</div>
</div>`;

let templateQuestion = (i) => `<div class="question">
<h2>Pergunta <span>${i}</span></h2>
<ion-icon name="create-outline" onclick="openQuestions(this)"></ion-icon>
</div>`;

function openQuestions(icon){   /*Changes the questions box when the icon is clicked*/
    const oldDiv = document.querySelector('.questions');
    const oldNumber = oldDiv.querySelector('span').innerHTML;
    questionsToQuestion(oldDiv,oldNumber);
    const div = icon.parentNode;
    const number = icon.parentNode.querySelector('span').innerHTML;
    questionToQuestions(div,number);
}

function questionToQuestions(div,number) {
    div.classList.remove('question');
    div.innerHTML = '';
    div.innerHTML = templateQuestions(number);
}

function questionsToQuestion(div,number){
    div.classList.remove('questions');
    div.innerHTML = '';
    div.innerHTML = templateQuestion(number);
}

function questionsQuizz(title,image,numberQuestions,levels){
    console.log(title);
}