import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { observer, inject } from "mobx-react";
import item_options from "./food/options.json";
import store from "./mobx/store.js";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const FoodListPage = ({ item }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {(store.searchvalue === "" ||
        item.name.toLowerCase().includes(store.searchvalue)) && (
        <div className="List_Item_Box_Main">
          <Card className={classes.card}>
            {/* {(store.searchvalue === "" ||
            item.name.toLowerCase().includes(store.searchvalue)) && ( */}
            <React.Fragment>
              {/* <FoodDetailsPage /> */}
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.picture_url}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    let item_option = item_options[item.item_id];
                    if (item_option.length > 0) {
                      store.setCurrentItem(item);
                    } else store.AddItem(item);
                  }}
                >
                  Add To Cart
                </Button>
                {item_options[item.item_id].length > 0 && (
                  <Button size="small" color="primary" onClick={() => {}}>
                    Details
                  </Button>
                )}
              </CardActions>
            </React.Fragment>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default inject("store")(observer(FoodListPage));
