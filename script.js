const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.getElementById('item-list');

function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value;
    // validate Input
    if(newItem === ''){
        alert('Please add an item');
        return;
    }

    // Creation of List item
    const li = document.createElement('li');
    const item = document.createTextNode(newItem);
    li.appendChild(item);
    const btn = createButton('remove-item btn-link text-red');
    li.appendChild(btn);
    itemList.appendChild(li);
    itemInput.value = '';

}

function createButton(classes){
    const btn = document.createElement('button');
    btn.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    btn.appendChild(icon);
    return btn;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Event Listners
itemForm.addEventListener('submit', addItem);
// itemInput.addEventListener('click', )
