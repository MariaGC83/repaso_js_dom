
const myArray = [];

function pintar() {
    const myArray1 = myArray.map((elem, index) => {
        return {
            id: index,
            text: elem,//textContent es una propiedad del obj elem. Todo es el elem = obj, pero no hace falta poner textContent porque tenemos const nuevoTexto = input.value;
            end: moment(new Date(Date.now())).locale('es'),
            visible: true,
          }
    }) 
    const ul = document.getElementById('list');
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    myArray1.forEach(elem => {
        const li = document.createElement('li');
        const text = document.createTextNode(elem.text);//así accedemos a la propiedad del obj elem
        const date = document.createTextNode(elem.end);
        li.appendChild(date);
        li.appendChild(text);
        li.appendChild(addEditBtnElement());
        li.appendChild(addDeleteBtnElement());  
        li.appendChild(addDoneBtnElement());
        li.classList.add("task");
        ul.appendChild(li);
    });

}

function addToDo() {
    const input = document.getElementById('input');
    const nuevoTexto = input.value;
    myArray.push(nuevoTexto);
    pintar();


}

function addDeleteBtnElement() {
    const deleteNode = document.createElement('button');
    deleteNode.appendChild(document.createTextNode('Borrar'));
    deleteNode.addEventListener('click', deleteElement, { once: true })
    return deleteNode;
}

function addEditBtnElement() {
    const editNode = document.createElement('button');
    editNode.appendChild(document.createTextNode('Editar'))
    editNode.addEventListener('click', editElement, { once: true });
    return editNode;
}

function addDoneBtnElement() {
    const doneBtnNode = document.createElement('button');
    doneBtnNode.appendChild(document.createTextNode('Done'));
    doneBtnNode.addEventListener('click', doneElement, { once: true });
    return doneBtnNode;
}

function addSaveBtnElement() {
    const saveBtnNode = document.createElement('button');
    saveBtnNode.appendChild(document.createTextNode('Guardar'));
    saveBtnNode.addEventListener('click', saveElement, { once: true });
    return saveBtnNode;
}

function deleteElement(e) {
    list.removeChild(e.currentTarget.parentElement);
}

function doneElement(e) {
    e.currentTarget.parentElement.classList.add('task--done');
    e.currentTarget.parentElement.removeChild(e.currentTarget)
}

function editElement(e) {
    const li = e.target.parentElement;
    const liText = li.childNodes[0];
    const btnEdit = li.childNodes[1];
    const btnSave = addSaveBtnElement();
    const input = document.createElement('input');
    input.setAttribute("id", "inputEdit");
    input.value = liText.textContent;
    li.removeChild(liText);
    li.removeChild(btnEdit);
    li.prepend(btnSave);
    li.prepend(input);
}

function saveElement(e) {
    const li = e.target.parentElement;
    const input = li.childNodes[0];
    const inputValue = input.value;
    const btnSave = li.childNodes[1];
    const btnEdit = addEditBtnElement();
    const text = document.createTextNode(inputValue);
    li.insertBefore(text, input);
    li.removeChild(input);
    li.insertBefore(btnEdit, btnSave);
    li.removeChild(btnSave);
}
