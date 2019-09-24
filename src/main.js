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
        
        this.setLoading();
            
        try{
            const response = await api.get(`/repos/${repoInput}`);

            const {name, description, html_url, owner:{avatar_url}} = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });
            this.inputElement.value = '';

            this.render();
        }catch(err){
            alert("Repositorio informado não existe");
        }
        this.setLoading(false);

    }

    setLoading(loading = true){
        if (loading === true) {
            let loadinElement = document.createElement('span');
            loadinElement.appendChild(document.createTextNode('Carregando'));
            loadinElement.setAttribute('id', 'loading');

            this.formElement.appendChild(loadinElement);
        }else{
            document.getElementById('loading').remove();
        }
    }

    render(){
        this.listElement.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src',repo.avatar_url);

            let titleElemente = document.createElement('strong');
            titleElemente.appendChild(document.createTextNode(repo.name));

            let descricaoElemente = document.createElement('p');
            descricaoElemente.appendChild(document.createTextNode(repo.description));

            let urlElement = document.createElement('a');
            urlElement.setAttribute('target', '_blank');
            urlElement.setAttribute('href', repo.html_url);
            urlElement.appendChild(document.createTextNode('Acesar'));

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