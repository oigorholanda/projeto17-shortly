import { nanoid } from "nanoid";
import { db } from "../database/database.js";

export async function getMyUrls(req, res) {
  const { userId } = res.locals;

  try {
    const { rows: userQuery } = await db.query(
      "SELECT id, name FROM users WHERE id=$1;",
      [userId]
    );
    const { rows: visitCountQuery } = await db.query(
      'SELECT SUM("visitCount") AS "visitCount" FROM urls WHERE "userId"=$1;',
      [userId]
    );
    const { rows: shortenedUrls } = await db.query(
      'SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId"=$1;',
      [userId]
    );

    const response = {
      ...userQuery[0],
      ...visitCountQuery[0],
      shortenedUrls,
    };

    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function postUrl(req, res) {
  const { userId } = res.locals;
  const shortUrl = nanoid(8);
  const { url } = req.body;

  try {
    const insertion = await db.query(
      'INSERT INTO urls ("userId", "url", "shortUrl") VALUES ($1, $2, $3) RETURNING id, "shortUrl";',
      [userId, url, shortUrl]
    );
    const info = insertion.rows[0];
    return res.status(201).send(info);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    await db.query('DELETE FROM urls WHERE id=$1 AND "userId"=$2;', [
      id,
      userId,
    ]);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
