/*
Todo: 
add days dates details
store to RESTful api use fetch 
*/


//storage controller
const StorageCtrl = (function () {

  //Public methods
  return {
    storeItem: function (item) {
      let items;
      //check if any item in local storage
      if (localStorage.getItem('items') === null) {
        items = [];
        items.push(item);
        //set local storage (object convert to string)
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        //from string convert to object
        items = JSON.parse(localStorage.getItem('items'));
        //push new item
        items.push(item);
        //set local storage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },

    getItemsFromStorage: function () {
      let items;
      //check if any item in local storage
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        //from string convert to object
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },

    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    clearItemFromStorage: function() {
      localStorage.removeItem('items');
    },

    updateItemStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    }
  }
})();



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
    items: StorageCtrl.getItemsFromStorage(),
    //items: [
    // { id: 0, name: 'Steak Dinnner', calories: 1200 },
    // { id: 1, name: 'Cookies', calories: 400 },
    // { id: 2, name: 'Eggs', calories: 200 }
    //],
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

    deleteItemByID: function (id) {
      //Get ids by mapping, else array index different with item-id
      const ids = data.items.map(function (item) {
        return item.id;
      });
      console.log('ids: ' + ids);
      // get index of array by item-id
      const index = ids.indexOf(id);
      data.items.splice(index, 1)
    },

    clearAllItem: function () {
      data.items = [];
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
    clearBtn: '.clear-btn',
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

    deleteListItemByID: function (id) {
      const item = document.querySelector(`#item-${id}`);
      item.remove();
    },

    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      //convert node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function (item) {
        item.remove();
      });
    },

    getItemInput: function () {
      //return meal & calories value
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },


  }
})();


//----------------------------------------------------------------------

//App controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
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
    //back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    //delete button event
    document.querySelector(UISelectors.delBtn).addEventListener('click', itemDeleteSubmit);
    //clear button event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemClick);
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

      //Store in local storage
      StorageCtrl.storeItem(newItem)
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
    //update local storage
    StorageCtrl.updateItemStorage(updatedItem);
    UICtrl.clearEditState();
    e.preventDefault();
  }

  const itemDeleteSubmit = function (e) {
    //get current item
    const currentItem = ItemCtrl.getCurrentItem();
    //delete from data structure
    ItemCtrl.deleteItemByID(currentItem.id);
    //delete from UI list
    UICtrl.deleteListItemByID(currentItem.id);
    //delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    //Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  }

  //Clear all item event
  const clearAllItemClick = function () {
    // Delete all item from data structure
    ItemCtrl.clearAllItem();
    //Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    //Remove from UI
    UICtrl.removeItems();
    //Clear all from local storage
    StorageCtrl.clearItemFromStorage();
    UICtrl.hideList();
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
})(ItemCtrl, StorageCtrl, UICtrl);


App.init();