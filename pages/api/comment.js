import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "POST") {
    try {
      const { name, email, title, contentpara, parent } = req.body;

      let commentDoc;

      if (parent) {
        commentDoc = await Comment.create({
          name,
          email,
          title,
          contentpara,
          parent: parent,
        });

        await Comment.findByIdAndUpdate(parent, {
          $push: { children: commentDoc._id },
        });
      } else {
        commentDoc = await Comment.create({
          name,
          email,
          title,
          contentpara,
        });
      }
      res.status(201).json(commentDoc);
    } catch (error) {
      res.status(500).json({ error: "Failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
