import * as db from "../../lib/server/db";

export async function load() {
  let lists = db.getLists();
  return { lists };
}

export const actions = {
  newList: async ({ request }) => {
    const data = await request.formData();
    let name = data.get("name");
    db.newList(name);
  },
};
