import api from './api';

class App {
    constructor(){
        this.repositories = [];

        this.formElement  = document.getElementById("repo-form");
        this.listElement  = document.getElementById("repo-list");
        this.inputElement = document.querySelector('input[name=repository]')


        this.registerHandlers();
    }

    registerHandlers(){
        this.formElement.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputElement.value;

        

        if(repoInput.length === 0){
            return;}
            
        
        const response = await api.get(`/repos/${repoInput}`);

        console.log(response);

        const {name, description, html_url, owner:{avatar_url}} = response.data;

        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url,
        });
        this.render();
        console.log(this.repositories);
    }

    render(){
        this.listElement.innerHTML = '';
        this.repositories.forEach(repo => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src',repo.avatar_url);

            let titleElemente = document.createElement('strong');
            titleElemente.appendChild(document.createTextNode(repo.nome));

            let descricaoElemente = document.createElement('p');
            descricaoElemente.appendChild(document.createTextNode(repo.description));

            let urlElement = document.createElement('a');
            urlElement.setAttribute('target', '_blank');
            urlElement.appendChild(document.createTextNode(repo.html));

            let liElement = document.createElement("li");
            liElement.appendChild(imgElement);
            liElement.appendChild(titleElemente);
            liElement.appendChild(descricaoElemente);
            liElement.appendChild(urlElement);

            this.listElement.appendChild(liElement);


        });
    }

}

new App();