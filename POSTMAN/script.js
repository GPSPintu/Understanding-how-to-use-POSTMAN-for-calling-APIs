// https://crudcrud.com/api/61e98bdeb25847d9bb30d8fe6d23f585/expense

function savetoLocalstorage(event) {
    event.preventDefault();
      
    let userDetails = {
      My_Expense_Amount: document.getElementById('amount').value,
      Description: document.getElementById('des').value,
      category: document.getElementById('cat').value 
    }
  
    axios.post("https://crudcrud.com/api/61e98bdeb25847d9bb30d8fe6d23f585/expense", userDetails)
      .then((res) => {
        showNewUseronScreen(userDetails)
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  function showNewUseronScreen(userDetails) {
    const d = document.getElementById('ul');
    const li = `<li id="${userDetails.My_Expense_Amount}">${userDetails.My_Expense_Amount}, ${userDetails.Description}, ${userDetails.category}
      <button onclick="editUser('${userDetails.My_Expense_Amount}','${userDetails.Description}','${userDetails.category}')">Edit</button> 
      <button onclick="deleteUserfromApi('${userDetails._id}')">Delete</button>
    </li>`;
    d.innerHTML = d.innerHTML + li;
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/61e98bdeb25847d9bb30d8fe6d23f585/expense")
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          showNewUseronScreen(res.data[i]);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  })
  
  function deleteUserfromApi(id) {
    axios.delete(`https://crudcrud.com/api/61e98bdeb25847d9bb30d8fe6d23f585/expense/${id}`)
      .then((response) => {
        deleteUser(id);
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  function deleteUser(id) {
    const parentNode = document.getElementById('ul');
    const deletechild = document.getElementById(id);
    if (deletechild) {
      parentNode.removeChild(deletechild);
    }
  }
  
  function editUser(amount, description, category) {
    document.getElementById('amount').value = amount;
    document.getElementById('des').value = description;
    document.getElementById('cat').value = category;
  } 
  