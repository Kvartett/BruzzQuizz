
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
    const title = document.getElementById('title').value;
    const image = document.getElementById('image').value;
    const numberQuestions = document.getElementById('questions').value;
    const levels = document.getElementById('levels').value;
    const screen3 = document.querySelector('.screen31');
    screen3.classList.add('hide');
    questionsQuizz(title,image,numberQuestions,levels); 
}




