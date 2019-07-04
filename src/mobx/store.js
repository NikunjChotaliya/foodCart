import { decorate, observable, action, computed } from "mobx";
import item_options from "../food/options.json";
import uniqid from "uniqid";

class TokenStore {
  itemIds = {};
  currentId = "";
  searchvalue = "";
  total = 0;

  setCurrentItem = item => {
    if (item) {
      let { item_id, ...restItem } = item;
      this.currentId = { item_id, ...restItem };
    } else this.currentId = "";
  };

  AddItem = (item, qty) => {
    let { item_id, count, ...restItem } = item;
    if (this.itemIds[item_id]) {
      this.itemIds[item_id] = {
        count:
          qty === undefined
            ? parseInt(this.itemIds[item_id]["count"]) + 1
            : qty,
        ...restItem
      };
    } else {
      this.itemIds[item_id] = { count: 1, ...restItem };
    }
  };

  removeItem = item_id => {
    delete this.itemIds[item_id];
  };

  AddAddonItem = (item, radioItem, checkBoxItems) => {
    let item_unique_id = uniqid();
    let { item_id, ...restItem } = item;
    // if (this.itemIds[item_id] && this.itemIds[item_id]["data"])
    this.itemIds[item_unique_id] = {
      count: 1,
      item_id,
      data: [],
      ...restItem
      // data: this.itemIds[item_id]["data"]
    };
    // else this.itemIds[item_id] = { count: 1, data: [], ...restItem };
    let item_options_obj = item_options[item_id];

    item_options_obj.forEach(option => {
      if (option.uitype.toLowerCase() === "checkbox") {
        option.choices.forEach(choice => {
          if (checkBoxItems.includes(choice.name)) {
            this.itemIds[item_unique_id]["data"].push({
              name: choice.name,
              ...choice.price
            });
          }
        });
      } else {
        option.choices.forEach(choice => {
          if (choice.name === radioItem) {
            this.itemIds[item_unique_id]["data"].push({
              name: choice.name,
              ...choice.price
            });
          }
        });
      }
    });
    this.currentId = "";
  };

  get getItem() {
    return this.itemId;
  }

  setSearchName = value => {
    this.searchvalue = value.trim();
  };
}

decorate(TokenStore, {
  itemIds: observable,
  searchvalue: observable,
  currentId: observable,
  total: observable,
  setSearchName: action,
  setCurrentItem: action,
  AddItem: action,
  AddAddonItem: action,
  removeItem: action,
  getItem: computed
});

export default new TokenStore();
