import React from "react";
import { inject, observer } from "mobx-react";
import { getCarts } from "./services/common.services";
import { toJS } from "mobx";

const FoodCartPage = ({ item, store }) => {
  let itemIds = store.itemIds;
  console.log(toJS(itemIds));

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
