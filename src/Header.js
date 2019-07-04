import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { inject, observer } from "mobx-react";
import FoodDetailsPage from "./FoodDetailsPage";
import FoodCartPage from "./FoodCartPage";
import "./Header.scss";
import logo from "./assests/images/Logo.svg";
import cart from "./assests/images/cart-icon.svg";
import store from "./mobx/store";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className="Main_Header">
      <div className={classes.root}>
        {store.currentId && <FoodDetailsPage />}
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar className="123">
            {/* <Typography variant="h6" noWrap className={classes.title}>
              Food Listing
            </Typography> */}
            <div className="Main_Logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search From Menu"
                onChange={e => store.setSearchName(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "Search" }}
              />
            </div>

            <div className="menu_button">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
              >
                {/* <MenuIcon /> */}
                {Object.keys(store.itemIds).length > 0 && (
                  <span className="Item_Counter">
                    {Object.keys(store.itemIds).length}
                  </span>
                )}
                <img src={cart} alt="cart" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                // <img src={cart} />
                <ChevronRightIcon />
              )}
            </IconButton>

            <h3>My Cart</h3>
          </div>
          <FoodCartPage />

          {/* {
            Object.keys(store.itemIds).length > 0 &&
          } */}
          {/* <div className="checkout_content">
            <div className="cart_item_name_block">
              <span className="cart_item_name">Item Subtotal</span>
              <span className="cart_item_price_main">${store.total}</span>
            </div>

            <div className="cart_item_name_block">
              <span className="cart_item_name">Delivery Fee</span>
              <span className="cart_item_price_main">$00</span>
            </div>

            <div className="cart_item_name_block">
              <span className="cart_item_name">Sales Tax</span>
              <span className="cart_item_price_main">$00</span>
            </div>

            <div className="cart_item_name_block">
              <span className="cart_item_name">Total</span>
              <span className="cart_item_price_main">${store.total}</span>
            </div>

            <div className="cart_item_name_block">
              <button>Proceed to Checkout $45.85</button>
            </div>
          </div> */}
        </Drawer>
      </div>
    </div>
  );
}

export default inject("store")(observer(Header));
