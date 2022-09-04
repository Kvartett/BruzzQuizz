
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
}
getApiQuizz()

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



