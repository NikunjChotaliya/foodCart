import { decorate, observable, action, computed, toJS } from "mobx";
import item_options from "../food/options.json";

class TokenStore {
  itemIds = {};
  currentId = "";
  searchvalue = "";

  setCurrentItem = item_id => {
    this.currentId = item_id;
  };

  AddItem = item_id => {
    if (this.itemIds[item_id]) {
      this.itemIds[item_id] = { count: this.itemIds[item_id]["count"] + 1 };
    } else {
      this.itemIds[item_id] = { count: 1 };
    }
  };

  AddAddonItem = (item_id, radioItem, checkBoxItems) => {
    if (this.itemIds[item_id]) {
      this.itemIds[item_id]++;
    } else {
      this.itemIds[item_id] = { count: 1 };
      let item_options_obj = item_options[item_id];
      this.itemIds[item_id]["data"] = [];

      item_options_obj.forEach(option => {
        if (option.uitype.toLowerCase() === "checkbox") {
          // this.itemIds[item_id]["data"] = [];
          option.choices.forEach(choice => {
            if (checkBoxItems.includes(choice.name)) {
              this.itemIds[item_id]["data"].push({
                name: choice.name,
                ...choice.price
              });
            }
          });
        } else {
          option.choices.forEach(choice => {
            if (choice.name === radioItem) {
              this.itemIds[item_id]["data"].push({
                name: choice.name,
                ...choice.price
              });
            }
          });
        }
      });
    }
    this.currentId = "";
  };

  removeItem = item_id => {
    if (this.itemIds[item_id] && this.itemIds[item_id] === 1) {
      delete this.itemIds[item_id];
    } else if (this.itemIds[item_id] > 1) this.itemIds[item_id] -= 1;
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
  setSearchName: action,
  setCurrentItem: action,
  AddItem: action,
  AddAddonItem: action,
  removeItem: action,
  getItem: computed
});

export default new TokenStore();
