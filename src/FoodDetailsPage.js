import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "./mobx/store";
import { inject, observer } from "mobx-react";
import item_options from "./food/options.json";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox
} from "@material-ui/core";

function FoodDetailsPage() {
  const [open, setOpen] = useState(true);
  const [radioboxVal, setRadioVal] = useState("");
  const [checkboxVal, setCheckboxVal] = useState([]);
  let radio_obj = [],
    checkbox_obj = [];
  let item_detail =
    item_options[store.currentId ? store.currentId.item_id : ""];
  item_detail &&
    item_detail.forEach(detail => {
      if (
        detail.uitype.toLowerCase() === "radio" ||
        detail.uitype.toLowerCase() === "radio_qty"
      ) {
        radio_obj.push(detail);
      } else {
        checkbox_obj.push(detail);
      }
    });

  function handleClose() {
    setOpen(false);
    store.setCurrentItem("");
  }

  function handleChange(event, newValue) {
    setRadioVal(newValue);
  }

  function handleCheckboxChange(newValue) {
    if (checkboxVal.includes(newValue)) {
      let checkboxValArr = [...checkboxVal];
      let index = checkboxValArr.indexOf(newValue);
      checkboxValArr.splice(index, 1);
      setCheckboxVal(checkboxValArr);
    } else {
      let val = [...checkboxVal, newValue];
      setCheckboxVal(val);
    }
  }

  function addToCart() {
    store.AddAddonItem(store.currentId, radioboxVal, checkboxVal);
    setRadioVal("");
    setCheckboxVal([]);
  }

  return (
    <div>
      {store.currentId && (
        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="confirmation-dialog-title">Item Addon</DialogTitle>
            {radio_obj.length > 0 &&
              radio_obj.map((obj, i) => {
                return (
                  <React.Fragment key={i}>
                    <DialogContent dividers>
                      <RadioGroup
                        // ref={radioGroupRef}
                        aria-label="Ringtone"
                        // name="ringtone"
                        value={radioboxVal}
                        onChange={handleChange}
                      >
                        {obj.choices.map((choice, index) => (
                          <FormControlLabel
                            value={choice.name}
                            key={index}
                            control={<Radio />}
                            label={choice.name + " $" + choice.price.base_unit}
                          />
                        ))}
                      </RadioGroup>
                    </DialogContent>
                  </React.Fragment>
                );
              })}

            {checkbox_obj.length > 0 && (
              <React.Fragment>
                <DialogContent dividers>
                  {checkbox_obj[0].choices.map((choice, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={
                              checkboxVal.includes(choice.name) ? true : false
                            }
                            name={choice.name}
                            onChange={e =>
                              handleCheckboxChange(
                                e.target.value,
                                e.target.checked
                              )
                            }
                            value={choice.name}
                            inputProps={{
                              "aria-label": "primary checkbox"
                            }}
                          />
                        }
                        label={choice.name}
                      />
                    );
                  })}
                </DialogContent>
              </React.Fragment>
            )}

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={addToCart} color="primary" autoFocus>
                Add To Cart
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </div>
  );
}

export default inject("store")(observer(FoodDetailsPage));
