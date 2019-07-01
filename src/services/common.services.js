import items from '../food/items.json';

export const getCarts = (() => {
  let tmp = {}
  items.forEach(item => tmp[item["item_id"]] = item )
  return tmp
})()