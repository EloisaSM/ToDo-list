let isCheckedAll = false;

function sendToDo(event, form){
    //cancelando o comportamento padrão do formulario
    event.preventDefault();

    //valor do input(txt)
    const formData = new FormData(form);
    const inputValue = formData.get('txt');
    

    //Não deixa preencher vazio
    if(inputValue == undefined || inputValue == ""){
        alert('Preencha o campo!');
        return;
    }

    addNewElements(inputValue);

    //limpa o input depois de digitar
    form.reset();
}

function addNewElements(inputValue){
    //elemento html onde ficara os novos itens
    const appendItens = document.querySelector('.appended-itens');
    const ulElement = document.querySelector('ul');

    // criando novos elementos html
    const liElement = document.createElement('li');
    const inputElement = document.createElement('input');
    const labelElement = document.createElement('label');
    const btnElement = document.createElement('button');

    //nome das class
    liElement.className = 'li-itens';
    btnElement.className = 'delete-btn';

    btnElement.classList.add('button');

    //colocando valor unico no id
    const elementId = Date.now();

    //adicionando atributo na tag criada
    inputElement.setAttribute('type', 'checkbox');
    labelElement.setAttribute('for', elementId);

    //adicionando evento de click 
    labelElement.addEventListener('click', checkList);
    btnElement.addEventListener('click', deleteItemofList);

    //alterando o conteudo do elemento
    labelElement.innerHTML = inputValue;

    //mostrando os elementos criados na div appended-itens 
    labelElement.insertAdjacentElement('afterbegin', inputElement);
    liElement.appendChild(labelElement);
    liElement.appendChild(btnElement);
    ulElement.appendChild(liElement);

    //colocando valor dos ids nos inputs
    inputElement.id = elementId;
}

function checkList(){
    //verifica se a variavel é true ou false
    const isChecked = this.classList.contains('checked');

    //se for true vai remover a class checked 
    if(isChecked){
        this.classList.remove('checked');
        document.querySelector('.clear-completed').style.display = 'none';

    //se for false vai adicionar a class checked e rasbicar a palavra
    }else{
        this.classList.add('checked');
        document.querySelector('.clear-completed').style.display = 'block';
    }
}

function checkAllItens(itens){
    //pega todos as labels em um array
    const allCheckBox = document.querySelectorAll('label');

    const clearAll = document.querySelector('.clear-completed');

    //verifica se o flag (variavel global declarada no topo) é true 
    if(isCheckedAll){
        //pega um item do array e remove a class checked
        allCheckBox.forEach(function(checkBox){
            checkBox.classList.remove('checked');
            //faz o check no input
            checkBox.firstElementChild.checked = false;
            
        });
        isCheckedAll = false;
        clearAll.style.display = 'none';
    //verifica se o flag (variavel global declarada no topo) é false
    }else{
        //pega um item do array e adiciona a class checked
        allCheckBox.forEach(function(checkBox){
            checkBox.classList.add('checked');
            //faz o check no input
            checkBox.firstElementChild.checked = true;
        });
        isCheckedAll = true;
        clearAll.style.display = 'block';
        
    }
}

function deleteItemofList(){
    //armazenando elemento pai do botão
    const parentLi = this.parentElement;

    //removendo o elemento pai da li
    parentLi.remove();
}

function deleteAll(clearAll){
    //pegando todas as li 
    const labelElements = document.querySelectorAll('label');

    //verifica se os inputs etão checkados e remove os itens apenas checkados
    labelElements.forEach(function(el){
        //flag para verificar se as labels estão com a class checked
        const isLabelChecked = el.classList.contains('checked');
        if(isLabelChecked ){
            //remove o elemento pai (li) da label
            el.parentElement.remove();
            clearAll.style.display = 'none';
        }
    });
}

function setLocalStorage(inputValue){

}
