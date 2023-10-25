const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = document.querySelector('.btn');
let isEditMode = false;

function onAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value;
    // validate Input
    if(newItem === ''){
        alert('Please add an item');
        return;
    }

    if(isEditMode){
        const sitem = document.querySelector('.edit-mode');
        console.log(sitem);
        removeItem(sitem);
        isEditMode = false;
    }
    // Add item to DOM
    addItemToDOM(newItem);
    itemInput.value = '';

    // Add item to Local Storage
    addItemToStorage(newItem);
    checkUI();
}
function addItemToDOM(itemname){
    // Creation of List item
    const li = document.createElement('li');
    const item = document.createTextNode(itemname);
    li.appendChild(item);
    const btn = createButton('remove-item btn-link text-red');
    li.appendChild(btn);
    itemList.appendChild(li);
    
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
function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function displayItemsFromStorage(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => {addItemToDOM(item);}); 
    checkUI();      
}
function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    else if(e.target.parentElement.classList.contains('items')){
        setItemToEdit(e.target);
    }   
}
function setItemToEdit(item){
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML =  '<i class="fa-solid fa-plus"></i> Update Item';
    itemInput.value = item.textContent;
    formBtn.style.backgroundColor = '#228B22'
}

function removeItem(item){
    item.remove();
    removeItemFromStorage(item.textContent); 
    checkUI();
}
function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    // let ind = itemsFromStorage.indexOf(item);
    // itemsFromStorage.splice(ind,1);
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);   
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    // clear items from local storage
    localStorage.removeItem('items');
    checkUI();
}

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    });
    
}

function checkUI(){
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'
}

function init(){
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click',clearItems);
    itemFilter.addEventListener('input',filterItems);
    document.addEventListener('DOMContentLoaded',displayItemsFromStorage);
    checkUI();
}

init();