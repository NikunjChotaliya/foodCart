import React from "react";
import { Provider } from "mobx-react";
import Store from "./mobx/store";
import items from "./food/items.json";
import FoodListPage from "./FoodListPage";
import Header from "./Header";
import "./app.scss";
import FoodBanner from "./assests/images/food-ecommerce.png";

function App() {
  return (
    <Provider store={Store}>
      <React.Fragment>
        <div className="main_page_full">
          <div className="main_page_fixed">
            <Header />

            <div className="FoodListPage_Fixed_Container">
              <div className="Main_Banner">
                <img src={FoodBanner} alt="" />
              </div>
              <div className="inner-container">
                {items.map(item => {
                  return <FoodListPage key={item.item_id} item={item} />;
                })}
              </div>
            </div>
            {/* <FoodCartPage /> */}
          </div>
        </div>
      </React.Fragment>
    </Provider>
  );
}

export default App;
