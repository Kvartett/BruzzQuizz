
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
getApiQuizz()

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



