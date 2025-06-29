import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      const blog = await Blog.findById(req.query.id);
      res.json(blog);
    } else if (req.query?.tags) {
      const blogdata = await Blog.find({
        tags: req.query.tags,
      });
      res.json(blogdata);
    } else if (req.query?.slug) {
      const blogslug = await Blog.find({ slug: req.query.slug });
      res.json(blogslug.reverse());
    } else {
      const blogs = await Blog.find();
      res.json(blogs.reverse());
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
