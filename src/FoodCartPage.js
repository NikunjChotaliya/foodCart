import React from "react";
import { inject, observer } from "mobx-react";
// import { getCarts } from "./services/common.services";
// import { toJS } from "mobx";
import store from "./mobx/store";
import "./FoodCartPage.scss";
import DeleteIcon from "../src/assests/images/delete.svg";

const FoodCartPage = () => {
  let total = 0,
    total_precision;
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
      // total += item_price;
    }
    item_total_price[id] = item_price;
    qtySet = { ...qtySet, [id]: itemIds[id].count };
  });

  Object.keys(item_total_price).forEach(
    key => (total += item_total_price[key])
  );
  total_precision = Number(total).toFixed(2);

  return (
    <React.Fragment>
      <div className="cart_list_main">
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
                      {/* <TextField
                      id="standard-number"
                      inputProps={{ min: "0", max: "20", step: "1" }}
                      value={itemIds[id]["count"]}
                      onChange={e => {
                        if (parseInt(e.target.value) === 0) {
                          store.removeItem(id);
                          return;
                        }

                        store.AddItem(
                          { ...itemIds[id], item_id: id },
                          e.target.value
                        );
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                    /> */}
                      <div className="qty_manage">
                        <span
                          className="add_more"
                          onClick={e => {
                            if (itemIds[id]["count"] === 1) {
                              store.removeItem(id);
                              return;
                            }

                            store.AddItem(
                              { ...itemIds[id], item_id: id },
                              itemIds[id]["count"] - 1
                            );
                          }}
                        >
                          <em />
                        </span>
                        <span className="qty_amount">
                          {itemIds[id]["count"]}
                        </span>
                        <span
                          className="remove_more"
                          onClick={e => {
                            store.AddItem(
                              { ...itemIds[id], item_id: id },
                              itemIds[id]["count"] + 1
                            );
                          }}
                        >
                          <em />
                        </span>
                      </div>
                    </div>

                    <div className="Cart_Item_Total">
                      <span className="Cart_lable">Item Total</span>$
                      {item_total_price[id]}
                    </div>

                    <div className="cart_item_delete">
                      <img
                        src={DeleteIcon}
                        alt=""
                        onClick={() => store.removeItem(id)}
                      />
                      {/* <DeleteForeverIcon
                      className={classes.icon}
                      onClick={() => store.removeItem(id)}
                    /> */}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        {/* Food Cart code goes here */}
      </div>

      {Object.keys(store.itemIds).length > 0 && (
        <div className="checkout_content">
          <div className="cart_item_name_block">
            <span className="cart_item_name">Item Subtotal</span>
            <span className="cart_item_price_main">${total_precision}</span>
          </div>

          <div className="cart_item_name_block">
            <span className="cart_item_name">Delivery Fee</span>
            <span className="cart_item_price_main">$00.00</span>
          </div>

          <div className="cart_item_name_block">
            <span className="cart_item_name">Sales Tax</span>
            <span className="cart_item_price_main">$00.00</span>
          </div>

          <div className="cart_item_name_block">
            <span className="cart_item_name">Total</span>
            <span className="cart_item_price_main">${total_precision}</span>
          </div>

          <div className="cart_item_name_block">
            <button disabled>Proceed to Checkout ${total_precision}</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default inject("store")(observer(FoodCartPage));
