import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "POST") {
    try {
      const {
        name,
        lname,
        email,
        company,
        phone,
        country,
        project,
        price,
        description,
      } = req.body;

      const contactDoc = await Contact.create({
        name,
        lname,
        email,
        company,
        phone,
        country,
        project,
        price,
        description,
      });

      res.status(201).json(contactDoc);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
