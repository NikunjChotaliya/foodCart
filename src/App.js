import React from "react";
import { Provider } from "mobx-react";
import Store from "./mobx/store";
import items from "./food/items.json";
import FoodListPage from "./FoodListPage";
import Header from "./Header";
import FoodCartPage from "./FoodCartPage";
import "./app.scss";

function App() {
  return (
    <Provider store={Store}>
      <React.Fragment>
        <Header />
        <div className="FoodListPage_Fixed_Container">
          {items.map(item => {
            return <FoodListPage key={item.item_id} item={item} />;
          })}
        </div>
        <FoodCartPage />
      </React.Fragment>
    </Provider>
  );
}

export default App;
