const { getFieldStatus } = require("../../lib/fieldStatus");

export default async function handler(req, res) {
  const status = await getFieldStatus();
  res.status(200).json(status);
}
