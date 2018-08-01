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

      return newItem;
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
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
      li.id = `item-${item.ID}`;
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

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
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

      //Clear input
      UICtrl.clearInput();
    }

    e.preventDefault();

  }


  //(Public methods) return init
  return {
    init: function () {
      //fetch item from data structure on page load
      const items = ItemCtrl.getItems();

      //Check if any item
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //populate list with items
        UICtrl.populateItemList(items);

      }



      //Load event listeners
      loadEventListeners();
    }
  }

  // console.log(ItemCtrl.logData());
})(ItemCtrl, UICtrl);


App.init();