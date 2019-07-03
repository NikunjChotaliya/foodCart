import React from "react";
import { inject, observer } from "mobx-react";
import { getCarts } from "./services/common.services";
import { toJS } from "mobx";
import store from "./mobx/store";

const FoodCartPage = () => {
  let itemIds = store.itemIds;
  console.log(toJS(itemIds));
  let ids = Object.keys(itemIds);
  ids.forEach(id => {
    // console.log(itemIds[id]);
  });

  return (
    <div>
      {Object.keys(itemIds).map(id => {
        // console.log(id + " --> " + itemIds[id]) // Count
        return <span key={id}>{getCarts[id].name}</span>;
      })}
      {/* Food Cart code goes here */}
    </div>
  );
};

export default inject("store")(observer(FoodCartPage));
