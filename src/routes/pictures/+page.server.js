import fs from "fs";
import path from "path";
import { redirect } from "@sveltejs/kit";

export async function load() {
  let dir = path.join(process.cwd(), "images");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  let imgs = fs.readdirSync(dir);

  // imgs = imgs.map((img) => {
  //   return path.join(dir, img);
  // });

  return { imgs };
}

export const actions = {
  avatar: async ({ request, route, url }) => {
    try {
      const data = Object.fromEntries(await request.formData());
      const filePath = path.join(
        // process.cwd(),
        "images",
        `${crypto.randomUUID()}.${data.avatar.type.split("/")[1]}`
      );
      console.log(filePath);
      fs.writeFileSync(filePath, Buffer.from(await data.avatar.arrayBuffer()));

      // TODO: store the file path in database for further references.
      throw redirect(303, url.pathname);
    } catch (err) {
      console.log(err);
    }
  },
};
