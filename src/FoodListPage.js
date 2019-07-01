import React from 'react';
import {observer, inject} from 'mobx-react';

const FoodListPage = ({item, store}) => {
  return (
    <div onClick={() => store.AddItem(item.item_id) } >
      <span style={{fontSize: "18px"}}>{item.name}</span>  
      --> <span>{item.description}</span>
      <img src={item.picture_url} height={50} width={50}/>
    </div>
   );
}

export default inject('store')(observer(FoodListPage))
