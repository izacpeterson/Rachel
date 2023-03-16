import * as fb from "../../../lib/firebase";
export async function load({ params }) {
  let list = params.list;
  let listItems = fb.getListItems(list);
  return { list: list, items: listItems };
}
