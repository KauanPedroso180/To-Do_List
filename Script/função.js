'use strict';

const Buscarnobanco = () => JSON.parse(localStorage.getItem ('dados')) ?? [];
const  setbancolocal = (bancolocal) => localStorage.setItem ('dados', JSON.stringify(bancolocal));

const novoitem = (texto, status,lista) => {
    const item = document.createElement('label');
    item.classList.add('todo-list');
    item.innerHTML = 
       `<li><input type="checkbox" class=input-checkbox ${status} data-lista=${lista}>
        <div class = textodetarefa>${texto}</div>
        <input type="button" value="X" class=clickx data-lista=${lista}></li>`;
    document.getElementById('TODOLIST').appendChild(item);
}

const Tirartexto = () => {
    const TODOLIST = document.getElementById('TODOLIST');
    while (TODOLIST.firstChild) {
        TODOLIST.removeChild(TODOLIST.lastChild);
    }
}
const atualizar = () => {
    Tirartexto();
    const bancolocal1 = Buscarnobanco();
    bancolocal1.forEach ( (item, lista) => novoitem (item.texto,item.status,lista));
}
const inserirAtividade = (evento) => {
    const enter = evento.key;
    const texto = evento.target.value;
    if (enter === 'Enter'){
        const bancolocal = Buscarnobanco();
        bancolocal.push({'texto': texto, 'status': ''});
        setbancolocal(bancolocal);
        atualizar();
        

    }    
}
function adicionarItemLista() {
     let texto1 = document.getElementById('tarefas').value;
     if (texto1 != ''){
        const bancolocal = Buscarnobanco();
        bancolocal.push({'texto': texto1, 'status': ''});
        setbancolocal(bancolocal);
        atualizar();
     }else {
        alert('Digite uma atividade válida!')
    }
 }

 const eliminartarefa = (lista) => {
    const bancolocal = Buscarnobanco();
    bancolocal.splice(lista, 1);
    setbancolocal(bancolocal);
    atualizar();
}
  
const atualizarlista = (lista) => {
    const bancolocal = Buscarnobanco ();
    bancolocal[lista].status = bancolocal[lista].status ===  '' ? 'checked' : '';
    setbancolocal(bancolocal);
    atualizar();
}
const clickItem = (evento) => {
    const parte = evento.target;
    if (parte.type === 'button') {
        const  lista = parte.dataset.lista;
        eliminartarefa (lista);
    }else if (parte.type === 'checkbox') {
        const lista = parte.dataset.lista;
        atualizarlista (lista);
    }
}
    
     
    
document.getElementById('tarefas').addEventListener('keypress', inserirAtividade);
document.getElementById('TODOLIST').addEventListener('click', clickItem);
     
atualizar();
