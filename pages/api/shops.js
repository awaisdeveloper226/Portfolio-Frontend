import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Shop";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      const shop = await Product.findById(req.query.id);
      res.json(shop);
    } else if (req.query?.slug) {
      const shopslug = await Product.find({ slug: req.query.slug });
      res.json(shopslug.reverse());
    } else {
      const shops = await Product.find();
      res.json(shops.reverse());
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }

}
