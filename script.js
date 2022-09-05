function returnMenu() {
    location.reload();
}

function changeScreen31(){
    document.querySelector('.firstscreen').classList.add('hide')

    document.querySelector('.screen31').classList.remove('hide')
}
function getApiQuizz(){
    let promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    // promisse.then(putApiQuizz) **correto
    promisse.then(putApiQuizz)
    promisse.catch();
}

let quizzapi;
function putApiQuizz(answer){
    quizzapi = answer.data
    let quizzul = document.querySelector('.quizzlist')
    for(let i = 0; i < 8; i++){

        quizzul.innerHTML+=` <li onclick="changeToTest(${i})" class="serverquizz">
        <div class="shadow">
            <div class="namequizz">
                ${quizzapi[i].title}
            </div>
        </div>   
            <img src=${quizzapi[i].image}>
        
        </li>`
    }
}
getApiQuizz();

function changeToTest(response){
    document.querySelector('.screen2').classList.remove('hide')
    document.querySelector('.firstscreen').classList.add('hide')
    showQuizz(response);
}

function random() { 
	return Math.random() - 0.5; 
}

function showQuizz(quizz) {
    let screen = document.querySelector(".screen2");

    console.log(quizz);

    screen.innerHTML = `<div class="choice1">
        <img src="${quizzapi[quizz].image}">
        <div>${quizzapi[quizz].title}</div>
    </div>`;

    // let questions = screen.querySelector(".quizz");

    for (i = 0; i < quizzapi[quizz].questions.length; i++) {
        screen.innerHTML += `<div class="quizz">
        <div class="quizz-header">${quizzapi[quizz].questions[i].title}</div>
        <div class="quizz-content question${i}"></div>
        </div>`

        quizzapi[quizz].questions[i].answers.sort(random);
        for (j = 0; j < quizzapi[quizz].questions[i].answers.length; j++) {
            let answers = screen.querySelector(`.question${i}`);
            answers.innerHTML += `<div class="picture">
                <img src="${quizzapi[quizz].questions[i].answers[j].image}">
                <div>${quizzapi[quizz].questions[i].answers[j].text}</div>
            </div>`
        }
    }
}

function createQuizz(){           /*collects the values needed for the creation of the Quizz*/
    const title = `${document.getElementById('title').value}`;
    const image = `${document.getElementById('image').value}`;
    const numberQuestions = document.getElementById('questions').value;
    const levels = document.getElementById('levels').value;
    const screen31 = document.querySelector('.screen31');
    if (title.length < 20 || title.length > 65){  /*verifications*/
        failed();
        return;
    }
    if (checkUrl(image)){
        failed();
        return;
    }
    if (numberQuestions < 3){
        failed();
        return;
    }
    if (levels < 2){
        failed();
        return;
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

 const colorVer = /^#[0-9A-F]{6}$/i;

function screen32(numberQuestions){   
    let i=1;
    const showScreen = document.querySelector('.screen32');
    showScreen.classList.remove('hide');
    showScreen.innerHTML += templateQuestions(i);
    for (i=2; i<=numberQuestions; i++){
        showScreen.innerHTML += templateQuestion(i);
    }
    showScreen.innerHTML += templateButtonQuestions();
}



let templateQuestions = (i) => `<div class="questions" data-identifier="question-form">
<h2>Pergunta <span>${i}</span></h2>
    <input id ="questionText${i}" type="text" placeholder="Texto da pergunta">
    <input id="questionColor${i}" type="text" placeholder="Cor de fundo da pergunta">
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

let templateButtonQuestions = () => `<div class="buttonLevels" onclick="lastQuestion()">
Prosseguir para criar níveis
</div>`

function openQuestions(icon){   /*Changes the questions box when the icon is clicked*/
    const oldDiv = document.querySelector('.questions');
    const oldNumber = oldDiv.querySelector('span').innerHTML;
    insertQuestion(oldNumber);
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
    console.log(title);

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


function insertQuestion (i){
    let j = i-1;
    let title = `${document.getElementById(`questionText${i}`).value}`;
    if (title.length < 20){
        failed();
        console.log('titulo')
        return;
    } else {
        newQuizz.questions[j].title = title;
    }
    let color = `${document.getElementById(`questionColor${i}`).value}`;
    if(colorVer.test(color)){
        newQuizz.questions[j].color = color;
    } else {
        failed();
        return;
    }
    let rightAnswer = `${document.getElementById(`rightAnswer${i}`).value}`;
    if (rightAnswer === ""){
        failed();
        console.log('answers')
        return;
    } else {
        newQuizz.questions[j].answers[0].text = rightAnswer;
    }
    let rightImage = `${document.getElementById(`rightImage${i}`).value}`;
    if (checkUrl(rightImage)){
        failed();
        console.log('image')
        return;
    } else {
        newQuizz.questions[j].answers[0].image = rightImage;
    }
    let wrongAnswer1 = `${document.getElementById(`wrongAnswer1${i}`).value}`;
    if (wrongAnswer1 === ""){
        failed();
        return;
    } else {
        newQuizz.questions[j].answers[1].text = wrongAnswer1;
    }
    let wrongImage1 = `${document.getElementById(`wrongImage1${i}`).value}`;
    if (checkUrl(wrongImage1)){
        failed();
        return;
    } else {
        newQuizz.questions[j].answers[1].image = wrongImage1;
    }
    let wrongAnswer2 = `${document.getElementById(`wrongAnswer2${i}`).value}`; 
    let wrongImage2 = `${document.getElementById(`wrongImage2${i}`).value}`;
    if ((wrongAnswer2&&wrongImage2)  !== ""){
        addAnswer(2,j,wrongAnswer2,wrongImage2);
    } 
    let wrongAnswer3 = `${document.getElementById(`wrongAnswer3${i}`).value}`; 
    let wrongImage3 = `${document.getElementById(`wrongImage3${i}`).value}`;
    if ((wrongAnswer3&&wrongImage3)  !== ""){
        addAnswer(3,j,wrongAnswer3,wrongImage3);
    } 
    console.log(newQuizz);
    verifyAnswers(j);
}

function addAnswer(i,j,answer,image){
    newQuizz.questions[j].answers[i] = {
        text: `${answer}`,
        image: `${image}`,
        isCorrectAnswer: false
    }
}

function lastQuestion () {
    const lastNumber = document.querySelector('.questions span').innerHTML;
    insertQuestion(lastNumber); 
    screen33();  
}

function verifyAnswers(j){
    for (let i=0;i<2;i++){
        if (newQuizz.questions[j].answers[i].text === ""){
            failed();
            console.log('answerstext')
        }
        if (checkUrl(newQuizz.questions[j].answers[i].image)){
            failed();
            console.log('answersimage')
        }
    }
}

function screen33(){  
    const hideScreen = document.querySelector('.screen32').classList.add('hide'); 
    let i=1;
    const showScreen = document.querySelector('.screen33');
    showScreen.classList.remove('hide');
    showScreen.innerHTML += templateLevels(i);
    for (i=2; i<=newQuizz.levels.length; i++){
        showScreen.innerHTML += templateLevel(i);
    }
    showScreen.innerHTML += templateButtonLevels();
}

let templateLevels = (i) => `<div class="levels" data-identifier="level">
    <h2>Nível <span>${i}</span></h2>
    <input id="title${i}" type="text" placeholder="Título do nível">
    <input id="number${i}" type="number" placeholder="% de acerto mínima">
    <input id="image${i}" type="text" placeholder="URL da imagem do nível">
    <textarea name="description" id="description${i}" placeholder="Descrição do nível"></textarea>
</div>`;

let templateLevel = (i) => `<div class="level">
<h2>Nível <span>${i}</span></h2>
<ion-icon name="create-outline" onclick="openLevel(this)" data-identifier="expand"></ion-icon>
</div>`;

let templateButtonLevels = () => `<div class="buttonLevels" onclick="finalizeQuizz()">
Finalizar Quizz
</div>`

function openLevel(level) {
    const oldDiv = document.querySelector('.levels');
    const oldNumber = oldDiv.querySelector('span').innerHTML;
    insertLevel(oldNumber);
    levelsToLevel(oldDiv,oldNumber);
    const div = icon.parentNode;
    const number = icon.parentNode.querySelector('span').innerHTML;
    levelToLevels(div,number);
}

function levelsToLevel(div,number) {
    div.classList.remove('levels');
    div.innerHTML = '';
    div.innerHTML = templateLevel(number);
}

function levelToLevels (div,number){
    div.classList.remove('level');
    div.innerHTML = '';
    div.innerHTML = templateLevels(number);
}

function openLevel (icon){
    const oldDiv = document.querySelector('.levels');
    const oldNumber = oldDiv.querySelector('span').innerHTML;
    insertLevel(oldNumber);
    levelsToLevel(oldDiv,oldNumber);
    const div = icon.parentNode;
    const number = icon.parentNode.querySelector('span').innerHTML;
    levelToLevels(div,number);
}

function insertLevel (i){
    let j = i-1;
    const titleLevel = `${document.getElementById(`title${i}`).value}`;
    if (titleLevel.length<10){
        failed();
        return;
    } else {
        newQuizz.levels[j].title = titleLevel;
    }
    const success = document.getElementById(`number${i}`).value;
    if (success < 0 || success > 100){
        failed()
        return;
    } else {
        newQuizz.levels[j].minValue = success;
    }
    const image = document.getElementById(`image${i}`).value;
    if (checkUrl(image)){
        failed();
        return;
    } else {
        newQuizz.levels[j].image = image;
    }
    const description = document.getElementById(`description${i}`).value;
    if (description.length < 30){
        failed();
        return;
    } else {
        newQuizz.levels[j].text = description;
    }
}

function finalizeQuizz(){
    if(verifyLevels()){
        failed();
        return;
    }
    const lastNumber = document.querySelector('.levels span').innerHTML;
    insertLevel(lastNumber); 
    postQuizz(); 
}

function verifyLevels(){
    let x=0;
    for (let i=0;i<newQuizz.levels.length;i++){
        let minValue = newQuizz.levels[i].minValue
        if (minValue===0){
            x++;
        }
    }
    if (x>0){
        return false 
    } else {
        return true
    }
}

function postQuizz(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', newQuizz);
    promisse.then(postedQuizz)
    promisse.catch(errQuizz);
}

let postedQuizz = (report) => screen34(report.data);


let errQuizz = (error) => console.log(error);

function screen34(Quizz){      /* função pra finalizar o sucesso do quizz*/
    document.querySelector('.screen33').classList.add('hide');
    document.querySelector('.screen34').classList.remove('hide');
    console.log(Quizz);
    //a fazer:
    //layut da caixinha do quizz
    //botao para jogar o quizz
    //botao da home
}