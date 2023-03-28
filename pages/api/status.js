// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const status = require("../../status");

export default function handler(req, res) {
  res.status(200).json(status);
}
