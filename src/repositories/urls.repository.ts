import db from '../database/database.connection.js';

export const getUrl = (id: string) =>
  db.query(
    `
      SELECT
        id,
        short_url AS "shortUrl",
        url
      FROM urls
      WHERE id = $1;
    `,
    [id]
  );

export const getShortUrl = (shortUrl: string) =>
  db.query(
    `
      UPDATE urls
      SET visit_count = visit_count + 1
      WHERE short_url = $1
      RETURNING url;
    `,
    [shortUrl]
  );

export const createUrlRecord = ({ url, shortUrl, userId }: { [key: string]: string }) =>
  db.query(
    `
      INSERT INTO urls (url, short_url, user_id) VALUES
      ($1, $2, $3)
      RETURNING id, short_url AS "shortUrl";
    `,
    [url, shortUrl, userId]
  );

export const deleteUrlRecord = ({ id, userId }: { id: string; userId: string }) =>
  db.query(
    `
      WITH url_to_delete AS (
        SELECT id FROM urls WHERE id = $1
      ),
      deleted_rows AS (
        DELETE FROM urls WHERE id = $1 AND user_id = $2
        RETURNING id
      )
      SELECT CASE
              WHEN EXISTS(SELECT * FROM url_to_delete) THEN
                CASE
                  WHEN EXISTS(SELECT * FROM deleted_rows) THEN 204
                  ELSE 401
                END
              ELSE 404
            END AS code;
    `,
    [id, userId]
  );
