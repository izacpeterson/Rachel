import * as db from "../../../lib/server/db";

export async function load({ params }) {
  let list = params.id;

  let items = await db.getListItems(list);
  return { list: list, items: items };
}
export const actions = {
  newListItem: async ({ request }) => {
    const data = await request.formData();
    let item = data.get("item");
    let uuid = data.get("uuid");
    console.log("LIST ITEM:", item);
    console.log("LIST UUID: ", uuid);
    db.newListItem(item, uuid);
  },
};
