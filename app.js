const ItemCtrl = (function (){
  // Item Constructor
  const Item = function(id, name, weight, value) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.value = value;
  }

  // Data Structure
  const data = {
    items: [
      // {id: 0, name: 'Rice', weight: 20, value: 200},
      // {id: 1, name: 'Beans', weight: 25, value: 300},
      // {id: 2, name: 'Stone', weight: 30, value: 400},
      // {id: 3, name: 'Melon', weight: 35, value: 500}
    ],
    CurrentItem: null,
    Capacity: 0,
    Weight: 0,
    Value: 0
  }

  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, weight, value) {
      let ID;
      // Create ID
      if(data.items.length > 0) {
        ID = data.items[data.items.length-1].id + 1;
      } else {
        ID = 0;
      }
      //Weight and Values to number
      weight = parseInt(weight);
      value = parseInt(value);

      //Create new item
      newItem = new Item(ID, name, weight, value);
      //Add to items array
      data.items.push(newItem);

      return newItem; 
    },
    addItemById: function(id) {
      let found = null;
      data.items.forEach(function(item){
        if(item.id===id) {
          found = item;
        }
      });
      return found
    },
    setCurrentItem: function(item) {
      data.CurrentItem = item;
    },
    logData: function() {
      return data;
    }
  }
})();


// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    valueInput: '#value',
    weightInput: '#weight',
    ADDbtn: '.ADD-btn',
    capacity: '#max-capacity'
  }

  return {
    populateItemList: function(items) {
      let html = '';
  
      items.forEach(item => {
        html += `<li id=item-${item.id} class="collection-item"><strong>Name: ${item.name}, </strong><em> Weight: ${item.weight},</em><em> Value: ${item.value}</em>
        <a href="#" class="secondary-content">
          <i class="add-item fa fa-plus"></i>
        </a>
        </li>`
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        weight: document.querySelector(UISelectors.valueInput).value,
        value: document.querySelector(UISelectors.weightInput).value
      }
    },
    getSelectors: function() {
      return UISelectors;
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },
    clearInput: function() {
        document.querySelector(UISelectors.itemNameInput).value = '',
        document.querySelector(UISelectors.valueInput).value = '',
        document.querySelector(UISelectors.weightInput).value = ''
    },
    addListItem: function(item) {
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className= 'collection-item';
      //Add ID
      li.id = `item-${item.id}`

      //Add HTML
      li.innerHTML = `<strong>Name: ${item.name}, </strong><em> Weight: ${item.weight},</em><em> Value: ${item.value}</em>
      <a href="#" class="secondary-content">
        <i class="add-item fa fa-plus"></i>
      </a>`;
      //Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    
    },
    showStatus: function(message, className) {
      //Create div
      const div = document.createElement('div');
      //Add classes
      div.className = `alert ${className}`;
      //Add text
    }
  }
})();


// App Controller
const App = (function (ItemCtrl, UICtrl){
  //Load Event LIsteners
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAdd);

    //Add icon click
    document.querySelector(UISelectors.itemList).addEventListener('click',addIcon)
  }

  //item Add
  const itemAdd = function(e) {
    const input = UICtrl.getItemInput();
    // Check for name, weight and value inputs
    if(input.name !=='' && input.weight!=='' && input.value!==''){
      // Add item to data structure
      const newItem = ItemCtrl.addItem(input.name, input.weight, input.value);
      //Add item to UI
      UICtrl.addListItem(newItem); 
      //Show status
      
      UICtrl.showStatus('capacity exceeded','error');
      // Clear inputs
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Add icon event
  const addIcon = function(e) {
    if(e.target.classList.contains('add-item')) {
      //Get the list item ID
      listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      //Get item
      const itemToAdd = ItemCtrl.addItemById(id);
      
      //Set current item
      ItemCtrl.setCurrentItem(itemToAdd);

    }

    e.preventDefault();
  }
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      //Check if any items

      if(items.length===0) {
        UICtrl.hideList();
      } else {
         //Populate list with Items
         UICtrl.populateItemList(items);
      }
     


      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);
App.init();