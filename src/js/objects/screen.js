const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info"><img src="${user.avatarUrl}" alt="Foto de perfil do usuário"/>
       <div class="data">
        <h1>${user.name ?? 'não possui nome cadastrado😢'}</h1>
         <p>${user.bio ?? 'não possui bio cadastrada😒'}</p>
         <p>😎 Seguidores ${user.followers}</p>
         <p>👥 Seguindo ${user.following}</p>
         </div>
         </div>`

        let repositoriesItens = ""
        user.repositories.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a><ul><li>🍴${repo.forks_count}</li><li>⭐${repo.stargazers_count}</li><li>👀${repo.watchers}</li><li>👨‍💻${repo.language ?? "none"}</li></ul></li>`
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
    <h2>Repositórios</h2>
    <ul>${repositoriesItens}</ul>
    </div>`
        }
        
        let eventsItens = ""
        user.events.forEach(e => {
            
            if(e.type === "PushEvent"|| e.type === "CreateEvent"){
                eventsItens += `<li><a>${e.repo.name}</a>`
                if (e.type === "PushEvent") {
                   eventsItens += `<p>${e.payload.commits[0].message}</p></li>`
                }else{
                    eventsItens += `<p>Sem mensagem!😅</p></li>`
                }
            }
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
    <h2>Eventos</h2>
    <ul>${eventsItens}</ul>
    </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}


export { screen }