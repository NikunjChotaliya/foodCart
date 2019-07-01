import React from 'react';
import {Provider} from 'mobx-react';
import Store from './mobx/store';
import items from './food/items.json';
import FoodListPage from './FoodListPage';
import FoodCartPage from './FoodCartPage';

function App() {

  return (
    <Provider store={Store}>
      <React.Fragment>
        { items.map(item => (
          <FoodListPage key={item.item_id} item={item}/>
          ))}
        <FoodCartPage/>
      </React.Fragment>
    </Provider>
  );
}

export default App;
