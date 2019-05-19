const ItemCtrl = (function(){
  // Item Constructor
  const Item = function(capacity, id, name, weight, value) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.value = value;
    this.capacity = capacity;
  }

  // Data Structure
  const data = {
    items: [
      {capacity: 0, id: 0, name: 'Rice', weight: 20, value: 200},
      {capacity: 0, id: 1, name: 'Beans', weight: 25, value: 300},
      {capacity: 0, id: 2, name: 'Stone', weight: 30, value: 400},
      {capacity: 0, id: 3, name: 'Melon', weight: 35, value: 500}
    ],
    CurrentItem: null,
    Capacity: 0,
    totalWeight: 0,
    totalValue: 0
  }

  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(capacity, name, weight, value) {
      let ID;
      //create ID
      if(data.items.length>0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      //Weight and Values to number
      capacity = parseInt(capacity);
      weight = parseInt(weight);
      value = parseInt(value);
      //Create new item
      newItem = new Item(capacity, ID,name,weight,value);

      //Add new items to array
      data.items.push(newItem);

      return newItem;
    },
    getTotalWeight: function() {
      let total = 0;

      //Loop through and get total weight
      data.items.forEach(function(item) {
        total += item.weight;
      })

      //Set total weight to total
      data.totalWeight = total;

      //Return total weight
      return data.totalWeight;
    },
    getTotalValue: function(){
      let total = 0;

      //Loop through and get total weight
      data.items.forEach(function(item) {
        total += item.value;
      })

      //Set total weight to total
      data.totalValue = total;

      //Return total weight
      return data.totalValue;
    },
    getMaxCap: function() {
      let total = 0;

      //Loop through and get total weight
      data.items.forEach(function(item) {
        total += item.capacity;
      })
      data.Capacity = total;
      return data.Capacity;
    },
    addItemById: function(id) {
      let found = null;
      data.items.forEach(function(item){
        if(item.id === id) {
          found = item;
        }
      });
      return found
    },
    setCurrentItem: function(item) {
      data.CurrentItem = item;
    },
    getCurrentItem: function() {
      return data.CurrentItem;
    },
    logData: function() {
      return data;
    }
  }
})()


//UI controller
const UICtrl = function() {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    capacity:'#max-capacity',
    name:'#item-name',
    weight: '#weight',
    value: '#value',
    totCap: '.capacity',
    totWeight: '.weight',
    totalValue:'.value',
    itemAddList:'#item-addlist'
  }

  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(function(item) {
        html += `<li id=item-${item.id} class="collection-item"><strong>Capacity: ${item.capacity}, </strong><strong>Name: ${item.name}, </strong><em> Weight: ${item.weight},</em><em> Value: ${item.value}</em>
        <a href="#" class="secondary-content">
          <i class="add-item fa fa-plus"></i>
        </a>
        </li>`;
      })
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: function() {
      return UISelectors;
    },
    getItemInput: function() {
      return {
        capacity: document.querySelector(UISelectors.capacity).value,
        name: document.querySelector(UISelectors.name).value,
        weight: document.querySelector(UISelectors.weight).value,
        value: document.querySelector(UISelectors.value).value
      }
    },
    addListItem: function(item) {
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item';
      //Add ID
      li.id = `item-${item.id}`
      //Add HTML
      li.innerHTML = `<strong>Capacity: ${item.capacity}, </strong><strong>Name: ${item.name}, </strong><em> Weight: ${item.weight},</em><em> Value: ${item.value}</em>
       <a href="#" class="secondary-content">
        <i class="add-item fa fa-plus"></i>
       </a>`;
       //Insert item
       document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    // showError(message, className) {
    //   //create div
    //   const div = document.createElement('div');
    //   //Add classes
    //   div.className = `alert ${className}`;
    //   //add text
    //   div.appendChild(document.createTextNode(message));
    //   //Get parent
    //   const container = document.querySelector('.nav-wrapper');
    //   //get form
    //   const card = document.querySelector('.container');
    //   //insert alert
    //   container.insertBefore(div, card);
    //   //Timeout
    //   setTimeout(function(){
    //     document.querySelector('.alert').remove();
    //   }, 3000)
    // },

    showTotalWeight: function(totalWt) {
      document.querySelector(UISelectors.totWeight).textContent = totalWt;
    },
    showTotalValue: function(totalValue) {
      document.querySelector(UISelectors.totalValue).textContent = totalValue;
    },
    showCapacity: function(capacity) {
      document.querySelector(UISelectors.totCap).textContent = capacity;
    },
    addItemToList: function() {

      document.querySelector(UISelectors.itemAddList).innerHTML = ItemCtrl.getCurrentItem();
      },
    clearInput: function() {
        document.querySelector(UISelectors.capacity).value = '',
        document.querySelector(UISelectors.name).value = '',
        document.querySelector(UISelectors.weight).value = '',
        document.querySelector(UISelectors.value).value = ''
    }
  }
}();



//App controller
const App = (function (ItemCtrl, UICtrl){
  //Load event listeners
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();

    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAdd);
    document.querySelector(UISelectors.itemList).addEventListener('click', addIcon);
  }

  //Item add
  const itemAdd = function(e) {
      const input = UICtrl.getItemInput();
      //check for the capacity, item name, weight and value
      if(input.capacity!=='' && input.name !== '' && input.weight !== '' && input.value !== '')  {
        const newItem = ItemCtrl.addItem(input.capacity, input.name, input.weight, input.value);
        //Add item to UI
        UICtrl.addListItem(newItem);
        
        //Get total weight
        const totalWt = ItemCtrl.getTotalWeight();
        //show total weight in UI
        UICtrl.showTotalWeight(totalWt);
        // Get total Value
        const totalValue = ItemCtrl.getTotalValue();
        //show total value in UI
        UICtrl.showTotalValue(totalValue);
        // Get max capacity
        const totalCap = ItemCtrl.getMaxCap();
        //show max capacity in UI
        UICtrl.showCapacity(totalCap);


        UICtrl.clearInput();
      } else {
        //Show error
        UICtrl.showError()
      }

    e.preventDefault();
  }

  const addIcon = function(e) {
    if(e.target.classList.contains('add-item')) {
      listId = e.target.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToAdd = ItemCtrl.addItemById(id);
      ItemCtrl.setCurrentItem(itemToAdd);
      UICtrl.addItemToList();
        
    }

    e.preventDefault();
  }
  return {
    init: function() {

      //Item to data  structure
      const items = ItemCtrl.getItems();
      //Item to UI
      UICtrl.populateItemList(items);
       //Get total weight
       const totalWt = ItemCtrl.getTotalWeight();
       //show total weight in UI
       UICtrl.showTotalWeight(totalWt);
       // Get total Value
       const totalValue = ItemCtrl.getTotalValue();
       //show total value in UI
       UICtrl.showTotalValue(totalValue);
       // Get max capacity
       const totalCap = ItemCtrl.getMaxCap();
       //show max capacity in UI
       UICtrl.showCapacity(totalCap);
      loadEventListeners();
    }
  }


})(ItemCtrl, UICtrl);
App.init();
