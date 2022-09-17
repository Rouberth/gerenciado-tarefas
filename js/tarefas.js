let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');

$('#janelaEdicao').hide();

$(document).on('click', '#janelaEdicaoBtnFechar', function(){
    $('#janelaEdicao').hide();
})

function ocultaForm(){
    $('#janelaEdicao').hide(800);
}

function exibeForm(){
    $('#janelaEdicao').show(800);
}

var varlorInput = $('#inputNovaTarefa').val();

inputNovaTarefa.addEventListener('keypress', (e) =>{

    if(e.keyCode ==13){
        let tarefa ={
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e)=>{
    alternarJanelaEdicao();
});

btnAddTarefa.addEventListener('click', (e) =>{
    let tarefa ={
        nome: inputNovaTarefa.value,
        id: gerarId(),
    }

    if(tarefa["nome"] != ""){
        adicionarTarefa(tarefa);
    }else{
        alert("Campo Obrigatório !!!");
    }
});

btnAtualizarTarefa.addEventListener('click', (e) =>{
    e.preventDefault();
    let idTarefa =  idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa ={
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefa["nome"] != ""){
        alternarJanelaEdicao();

        if(tarefaAtual){
            let li = criarTagLI(tarefa);
            listaTarefas.replaceChild(li, tarefaAtual);
            ocultaForm();
        }else{
            alert('Elemento HTML não encontrado!')
        }
    }else{
        alert("Campo Obrigatório !!!");
        exibeForm();
    }
    
});

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa){

    let li = criarTagLI(tarefa)
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';

}

function criarTagLI(tarefa){
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
  

}

function alternarJanelaEdicao(){
    $('#janelaEdicao').show();
}

function editar(idTarefa){

    let li = document.getElementById(''+ idTarefa +'');
    if(li){
            $('#janelaEdicao').show();
            idTarefaEdicao.innerHTML = '#' + idTarefa;
            inputTarefaNomeEdicao.value = li.innerText;
            alternarJanelaEdicao();
    }else{
        alert('Elemento HTML não encontrado!')
    }

}

function excluir(idTarefa){
    let confirmacao = window.confirm('Tem certeza que deseja excluir?');
    if(confirmacao){
        let li = document.getElementById(''+ idTarefa +'');
        if(li){
            listaTarefas.removeChild(li);
        }else{
            alert('Elemento HTML não encontrado!')
        }

    }
    
}


