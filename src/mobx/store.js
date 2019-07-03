import { decorate, observable, action, computed, toJS } from "mobx";
import item_options from "../food/options.json";

class TokenStore {
  itemIds = {};
  currentId = "";
  searchvalue = "";

  setCurrentItem = item => {
    let { item_id, ...restItem } = item;
    this.currentId = { item_id, ...restItem };
  };

  AddItem = item => {
    let { item_id, ...restItem } = item;
    if (this.itemIds[item_id]) {
      this.itemIds[item_id] = {
        count: this.itemIds[item_id]["count"] + 1,
        ...restItem
      };
    } else {
      this.itemIds[item_id] = { count: 1, ...restItem };
    }
  };

  removeItem = item_id => {
    if (this.itemIds[item_id] && this.itemIds[item_id]["count"] > 1) {
      this.itemIds[item_id]["count"] = this.itemIds[item_id]["count"] - 1;
    } else delete this.itemIds[item_id];
  };

  AddAddonItem = (item, radioItem, checkBoxItems) => {
    let { item_id, ...restItem } = item;
    // if (this.itemIds[item_id]) {
    //   this.itemIds[item_id]["count"]++;
    // } else {
    if (this.itemIds[item_id] && this.itemIds[item_id]["data"])
      this.itemIds[item_id] = {
        count: this.itemIds[item_id]["count"] + 1,
        ...restItem,
        data: this.itemIds[item_id]["data"]
      };
    else this.itemIds[item_id] = { count: 1, data: [], ...restItem };
    let item_options_obj = item_options[item_id];
    // this.itemIds[item_id]["data"] = [];

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
    // }
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
  setSearchName: action,
  setCurrentItem: action,
  AddItem: action,
  AddAddonItem: action,
  removeItem: action,
  getItem: computed
});

export default new TokenStore();
