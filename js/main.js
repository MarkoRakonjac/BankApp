window.addEventListener('beforeunload',function () {
  localStorage.db = JSON.stringify(db);
})

  if (localStorage.db) {
    var db = JSON.parse(localStorage.db)
  }else{
    var db = [];
  }

let accBtn = document.querySelector('#acc-btn'),
 addBtn = document.querySelector('#add-btn'),
 editBtn = document.querySelector('#edit-btn'),
 tBody = document.querySelector('#main-tbody'),
 editTbody = document.querySelector('#edit-tbody'),
 mainRow = document.querySelector('.main-row'),
 formRow = document.querySelector('.form-row'),
 editRow = document.querySelector('.edit-row'),
 editFormRow = document.querySelector('.edit-form-row'),
 idForm = document.querySelector('#id-form'),
 nameForm = document.querySelector('#name-form'),
 depositForm = document.querySelector('#deposit-form'),
 cCardForm = document.querySelector('#credit-card-form'),
 addFormBtn = document.querySelector('#add-form-btn'),
 editId = document.querySelector('#edit-id'),
 editName = document.querySelector('#edit-name'),
 editDeposit = document.querySelector('#edit-deposit'),
 editCcard = document.querySelector('#edit-credit-card');
 save = document.querySelector('#save');
 index = null;

// FIRST STEP CREATE table
createTable();
// Add listeners
addBtn.addEventListener('click',showForm);
accBtn.addEventListener('click',showMain);
addFormBtn.addEventListener('click',addAccToDb);
editBtn.addEventListener('click',createEditTable);
save.addEventListener('click',saveAccToDb);









function createTable() {
  let text = '';
  formRow.style.display = "none";
  mainRow.style.display = "block";
  editRow.style.display = "none";
  db.forEach(function (el) {
    text += '<tr>';
    text += '<td>'+el.id+'</td>';
    text += '<td>'+el.name+'</td>';
    text += '<td>'+el.deposit+'</td>';
    text += '<td>'+el.cCard+'</td>';
    text += '</tr>';
  })
  tBody.innerHTML = text;
};

function createEditTable() {
  let text = '';
  formRow.style.display = "none";
  mainRow.style.display = "none";
  editRow.style.display = "block";
  db.forEach(function (el,index) {
    text += '<tr>';
    text += '<td>'+el.id+'</td>';
    text += '<td>'+el.name+'</td>';
    text += '<td>'+el.deposit+'</td>';
    text += '<td>'+el.cCard+'</td>';
    text += '<td><button class="btn btn-sm btn-warning edit '+index+'">Edit</button></td>';
    text += '<td><button id="'+index+'" class="btn btn-sm btn-danger delete">Delete</button></td>';
    text += '</tr>';
  })
  editTbody.innerHTML = text;
  let allDeleteBtns = document.querySelectorAll('.delete');
  allEditBtns  = document.querySelectorAll('.edit');
  for (var i = 0; i < allDeleteBtns.length; i++) {
    allDeleteBtns[i].addEventListener('click',deleteFromDb);
    allEditBtns[i].addEventListener('click',editAccountFromDb);
  }
};


function showForm() {
  formRow.style.display = "block";
  mainRow.style.display = "none";
  editRow.style.display = "none";
  editFormRow.style.display = "none";
}
function showMain() {
  formRow.style.display = "none";
  mainRow.style.display = "block";
  editRow.style.display = "none";
  editFormRow.style.display = "none";
}


function addAccToDb() {
  db.push({
    id : idForm.value,
    name : nameForm.value,
    deposit : depositForm.value,
    cCard : cCardForm.value,
  })
  idForm.value = "";
  nameForm.value = "";
  depositForm.value = "";
  cCardForm.value = "";
  createTable();
}

function deleteFromDb() {
  let index = this.id;
  db.splice(index,1)
  createTable();
};

function editAccountFromDb() {
  editFormRow.style.display = "block";
  formRow.style.display = "none";
  mainRow.style.display = "none";
  editRow.style.display = "none";

  index = this.className.split(" ").pop();
  let id = db[index].id;
  let name = db[index].name;
  let deposit = db[index].deposit;
  let cCard = db[index].cCard;

  editId.value = id;
  editName.value = name;
  editDeposit.value = deposit;
  editCcard.value = cCard;
};

function saveAccToDb() {
  db[index].id = editId.value;
  db[index].name = editName.value;
  db[index].deposit = editDeposit.value;
  db[index].cCard = editCcard.value;
  editFormRow.style.display = "none";
  createTable();
}
