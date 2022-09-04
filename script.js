
/*function getApiQuizz(){
    let promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
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
}
getApiQuizz()*/

function createQuizz(){           /*collects the values needed for the creation of the Quizz*/
    const title = `${document.getElementById('title').value}`;
    const image = `${document.getElementById('image').value}`;
    const numberQuestions = document.getElementById('questions').value;
    const levels = document.getElementById('levels').value;
    const screen31 = document.querySelector('.screen31');
    if (title.length < 20 || title.length > 65){  /*verifications*/
        failed();
    }
    if (checkUrl(image)){
        failed();
    }
    if (numberQuestions < 3){
        failed();
    }
    if (levels < 2){
        failed();
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
    showScreen.innerHTML += templateButton();
}



let templateQuestions = (i) => `<div class="questions" data-identifier="question-form">
<h2>Pergunta <span>${i}</span></h2>
    <input id ="questionText${i}" type="text" placeholder="Texto da pergunta">
    <input id="questionColor${i}" type="color" value="#ffffff">
    <label for="questionColor${i}">Cor de fundo da pergunta</label>
<h2>Resposta Correta</h2>
    <input id="rightAnswer${i}" type="text" placeholder="Resposta correta">
    <input id="rightImage${i}" type="text" placeholder="URL da imagem">
<h2>Respostas Incorretas</h2>
<div class="incorrect">
    <input id="wrongAnswer1${i}" type="text" placeholder="Resposta incorreta 1">
    <input id="wrongImage1${i}" type="text" placeholder="URL da imagem 1">
</div>
<div class="incorrect">
    <input id="wrongAnswer2${i}" type="text" placeholder="Resposta incorreta 2">
    <input id="wrongImage2${i}" type="text" placeholder="URL da imagem 2">
</div>
<div class="incorrect">
    <input id="wrongAnswer3${i}" type="text" placeholder="Resposta incorreta 3">
    <input id="wrongImage3${i}" type="text" placeholder="URL da imagem 3">
</div>
</div>`;

let templateQuestion = (i) => `<div class="question">
<h2>Pergunta <span>${i}</span></h2>
<ion-icon name="create-outline" onclick="openQuestions(this)" data-identifier="expand"></ion-icon>
</div>`;

let templateButton = () => `<div class="buttonLevels" onclick="lastInsertion()">
Prosseguir para criar níveis
</div>`

function openQuestions(icon){   /*Changes the questions box when the icon is clicked*/
    const oldDiv = document.querySelector('.questions');
    const oldNumber = oldDiv.querySelector('span').innerHTML;
    insertInNewQuizz(oldNumber);
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

let newQuizz = {
	title: "",
	image: "",
	questions: [],
	levels: []
}

function questionsQuizz(title,image,numberQuestions,levels){
    newQuizz.title = title;
    newQuizz.image = image;
    newQuizz.questions.length = numberQuestions;
    createObjQuestions(numberQuestions);
    newQuizz.levels.length = levels;
    createObjLevels(levels);
}

function createObjQuestions(numberQuestions) {
        for (let i=0;i<numberQuestions;i++){
            newQuizz.questions[i] = {
            title: "",
            color: "",
            answers: [
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: true
                },
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
                },
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
                },
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
                }
            ]
        }
    }
}

function createObjLevels (levels) {
    for (let i=0;i<levels;i++){
        newQuizz.levels[i] = {
			title: "",
			image: "",
			text: "",
			minValue: 0
		}
    }
}


function insertInNewQuizz (i){
    let j = i-1;
    let title = `${document.getElementById(`questionText${i}`).value}`;
    if (title.length < 20){
        failed();
    } else {
        newQuizz.questions[j].title = title;
    }
    let color = `${document.getElementById(`questionColor${i}`).value}`;
    newQuizz.questions[j].color = color;
    let rightAnswer = `${document.getElementById(`rightAnswer${i}`).value}`;
    if (rightAnswer === ""){
        failed();
    } else {
        newQuizz.questions[j].answers[0].text = rightAnswer;
    }
    let rightImage = `${document.getElementById(`rightImage${i}`).value}`;
    if (checkUrl(rightImage)){
        failed();
    } else {
        newQuizz.questions[j].answers[0].image = rightImage;
    }
    for (let k=1;k<=3;k++){
        let wrongAnswer = `${document.getElementById(`wrongAnswer${k}${i}`).value}`;       
        newQuizz.questions[j].answers[k].text = wrongAnswer;
        let wrongImage = `${document.getElementById(`wrongImage${k}${i}`).value}`;
        newQuizz.questions[j].answers[k].image = wrongImage;
    }
    console.log(newQuizz)
    verifyAnswers(j);
}

function lastInsertion () {
    const lastNumber = document.querySelector('.questions span').innerHTML;
    insertInNewQuizz(lastNumber); 
    levelsQuizz();  
}

function verifyAnswers(j){
    for (let i=0;i<2;i++){
        if (newQuizz.questions[j].answers[i].text === ""){
            failed();
        }
        if (checkUrl(newQuizz.questions[j].answers[i].image)){
            failed();
        }
    }
}
