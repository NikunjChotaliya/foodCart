import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
// import { getCarts } from "./services/common.services";
// import { toJS } from "mobx";
import store from "./mobx/store";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import "./FoodCartPage.scss";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100
  }
}));

const FoodCartPage = () => {
  let total = 0;
  const classes = useStyles();
  let itemIds = store.itemIds;
  let ids = Object.keys(itemIds);
  let qtySet = {},
    item_total_price = {};

  ids.forEach(id => {
    let item = itemIds[id];
    let item_price = item.price.base_unit * item.count;
    if (item.data) {
      item.data.forEach(addon => {
        item_price += addon.base_unit * item.count;
      });
      total += item_price;
    }
    item_total_price[id] = item_price;
    qtySet = { ...qtySet, [id]: itemIds[id].count };
  });
  // console.log({ qtySet });
  // let [qty, setQty] = useState(qtySet);
  // console.log({ qty });

  // const onQtyChange = (val, item_id, item) => {
  //   store.AddItem({ ...item, item_id }, val);
  //   // setQty({ ...qty, [item_id]: val });
  // };

  return (
    <div>
      {Object.keys(itemIds).map((id, index) => {
        return (
          <React.Fragment key={id}>
            <div className="cart_item_list">
              <div className="cart_image">
                <img src={itemIds[id].picture_url} alt="" />
              </div>
              <div className="cart_item_details">
                <div className="cart_item_name_block">
                  <span className="cart_item_name">{itemIds[id].name}</span>
                  <span className="cart_item_price_main">
                    $ {itemIds[id].price.base_unit}
                  </span>
                </div>
                <div className="cart_item_addons_block">
                  {itemIds[id].data &&
                    itemIds[id].data.length > 0 &&
                    itemIds[id].data.map((addon, i) => {
                      return (
                        <React.Fragment key={i}>
                          <div className="cart_item_addons_row">
                            <span className="cart_item_addons_name">
                              {addon.name}
                            </span>
                            <span className="cart_item_addons_price">
                              +$ {addon.base_unit}
                            </span>
                          </div>
                        </React.Fragment>
                      );
                    })}
                </div>

                <div className="cart_item_action_row">
                  <div className="cart_item_qty">
                    <span className="Cart_lable">Qty</span>
                    <TextField
                      id="standard-number"
                      // label="Number"
                      value={itemIds[id]["count"]}
                      onChange={e => {
                        // const onQtyChange = (val, item_id, item) => {
                        //   store.AddItem({ ...item, item_id }, val);
                        //   // setQty({ ...qty, [item_id]: val });
                        // };

                        store.AddItem(
                          { ...itemIds[id], item_id: id },
                          e.target.value
                        );
                        // onQtyChange(e.target.value, id, itemIds[id])
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                    />
                  </div>

                  <div className="Cart_Item_Total">
                    <span className="Cart_lable">Item Total</span>$
                    {item_total_price[id]}
                  </div>

                  <div className="cart_item_delete">
                    <DeleteForeverIcon
                      className={classes.icon}
                      onClick={() => store.removeItem(id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {/* Food Cart code goes here */}
    </div>
  );
};

export default inject("store")(observer(FoodCartPage));
