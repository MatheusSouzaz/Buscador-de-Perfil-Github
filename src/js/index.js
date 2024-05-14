import { getUser } from './services/users.js';
import { getRepositories } from './services/repositories.js';
import { getEvents } from './services/events.js';
import {user} from './objects/user.js';
import {screen} from './objects/screen.js';


document.getElementById('btn-search').addEventListener('click', () => {
    let userName = document.getElementById('input-search').value
   if(validateEmptyInput(userName)){return}
    getUserData(userName)
})

function validateEmptyInput(userName){
    if(userName.length === 0){
         alert("preencha o campo com o seu nome de usuário do GitHub")
return true     
        }
     
}
document.getElementById('input-search').addEventListener('keyup', (e) => {

    let userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    
    if (isEnterKeyPressed) {
       if(validateEmptyInput(userName)){return}
        getUserData(userName)
    }
})

async function getUserData(userName) {

    const userResponse = await getUser(userName)
    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
       return
    }
    user.setInfo(userResponse)
    const eventsResponse = await getEvents(userName)
    user.setEvents(eventsResponse)
const repositoriesResponse = await getRepositories(userName)
user.setRepositories(repositoriesResponse)    
screen.renderUser(user)
}







