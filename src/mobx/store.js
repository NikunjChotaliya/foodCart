import { decorate, observable, action, computed } from "mobx";

class TokenStore {
  itemIds = {};
  searchvalue = "";

  AddItem = value => {
    if (this.itemIds[value]) this.itemIds[value]++;
    else this.itemIds[value] = 1;
  };

  removeItem = value => {
    if (this.itemIds[value] && this.itemIds[value] === 1) {
      delete this.itemIds[value];
    } else if (this.itemIds[value] > 1) this.itemIds[value] -= 1;
  };

  setSearchName = value => {
    this.searchvalue = value.trim();
  };

  get getItem() {
    return this.itemId;
  }
}

decorate(TokenStore, {
  itemIds: observable,
  searchvalue: observable,
  setSearchName: action,
  AddItem: action,
  removeItem: action,
  getItem: computed
});

export default new TokenStore();
