// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fields = require("../../fields");

export default function handler(req, res) {
  res.status(200).json(fields);
}
