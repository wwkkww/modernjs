//storage controller


//-------------------------------------------------------------------

//item controller
const ItemCtrl = (function () {
  //item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data Structure / State
  const data = {
    items: [
      // { id: 0, name: 'Steak Dinnner', calories: 1200 },
      // { id: 1, name: 'Cookies', calories: 400 },
      // { id: 2, name: 'Eggs', calories: 200 }
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public methods
  return {
    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {
      //create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      //Parse calories to number
      calories = parseInt(calories);
      //create new item
      newItem = new Item(ID, name, calories);
      //Add to items array
      data.items.push(newItem);
      //console.log(data.items);
      return newItem;
    },

    //loop through data items & add calories
    getTotalCalories: function () {
      let total = 0;
      data.items.forEach((item) => total += item.calories);
      //set total calorie in data structure
      data.totalCalories = total;
      return data.totalCalories;
    },

    getItemByID: function (id) {
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      })
      return found;
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    updateItem: function (name, calories) {
      //Parse calories to number
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      })
      return found;
    },

    logData: function () {
      return data;
    }
  }
})();

//-------------------------------------------------------------------

//UI controller
const UICtrl = (function () {
  //Private variable
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li', //all the li
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    delBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  //Public methods
  return {

    populateItemList: function (items) {
      output = ``;
      items.forEach(function (item) {
        output += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong>
        <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
        </a>
        </li>
        `;
      });
      //Insert list item
      document.querySelector(UISelectors.itemList).innerHTML = output;
    },

    getSelectors: function () {
      return UISelectors;
    },

    addListItem: function (item) {
      //Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //Creste li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}: </strong>
        <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
        </a>
        `;
      //insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();

    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.delBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.delBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },

    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      //convert node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute('id');
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>${item.name}: </strong>
          <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
          </a>
          `;
        }
      })
    },

    getItemInput: function () {
      //return meal & calories value
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    }
  }
})();


//----------------------------------------------------------------------

//App controller
const App = (function (ItemCtrl, UICtrl) {
  //Load event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();
    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    //edit icon click
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    //submit update event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    //disable submit on enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
  }

  //Add item submit
  const itemAddSubmit = function (e) {
    //Get form input from UI Controller
    const input = UICtrl.getItemInput();
    //check for name and calories input
    if (input.name !== '' && input.calories !== '' && !isNaN(input.calories)) {
      //add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //Add item to UI list
      UICtrl.addListItem(newItem);
      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Clear input
      UICtrl.clearInput();
    }
    e.preventDefault();
  }

  //Update item submit
  const itemEditClick = function (e) {
    //event delegation
    if (e.target.classList.contains('edit-item')) {
      //Get list item-id and add selected item to current item  
      const listID = e.target.parentNode.parentNode.id;
      //Break into Array
      const listIdArray = listID.split('-');
      //Get actual id
      const id = parseInt(listIdArray[1]);
      const itemToEdit = ItemCtrl.getItemByID(id);
      //Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      //add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }

  const itemUpdateSubmit = function (e) {
    //get item input
    const input = UICtrl.getItemInput();
    //update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    //Update UI
    UICtrl.updateListItem(updatedItem);
    //Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  }


  //(Public methods) return init
  return {
    init: function () {
      //Clear edit state / set initial state
      UICtrl.clearEditState();

      //fetch item from data structure on page load
      const items = ItemCtrl.getItems();

      //Check if any item
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //populate list with items
        UICtrl.populateItemList(items);
      }

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Load event listeners
      loadEventListeners();
    }
  }
  // console.log(ItemCtrl.logData());
})(ItemCtrl, UICtrl);


App.init();