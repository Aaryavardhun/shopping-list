const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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
    checkUI();

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

function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
    }  
    checkUI();
}

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
}

function checkUI(){
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

checkUI();
// Event Listners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click',clearItems);
