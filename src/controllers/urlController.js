import { db } from "../database/database.js";

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await db.query(
      'SELECT id, "shortUrl", url FROM urls WHERE id=$1',
      [id]
    );
    if (!rows[0]) return res.sendStatus(404);

    return res.status(200).send(rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const { rows } = await db.query(
      'UPDATE urls SET "visitCount"="visitCount"+1 WHERE "shortUrl"=$1 RETURNING url;',
      [shortUrl]
    );
    if (!rows[0]) return res.sendStatus(404);

    const { url } = rows[0];
    return res.redirect(url);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function ranking(req, res) {
  try {
    const { rows } = await db.query(
      'SELECT u.id, u.name, COUNT(l.id) AS "linksCount", SUM("visitCount") AS "visitCount" FROM users u LEFT JOIN urls l ON u.id=l."userId" GROUP BY u.id ORDER BY "visitCount" DESC LIMIT 10;'
    );

    return res.status(200).send(rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
