import db from '../database/database.connection.js';

export const getUsersRanked = ({
  orientation,
  offset,
  limit,
}: {
  orientation: string;
  offset: number;
  limit: number;
}) =>
  db.query(
    `
      SELECT
        users.id,
        users.name,
        COUNT(urls.id) AS "linksCount",
        SUM(urls.visit_count) AS "visitCount"
      FROM users
      LEFT JOIN urls
      ON users.id = urls.user_id
      GROUP BY users.id
      ORDER BY "visitCount" ${orientation}
      OFFSET $1
      LIMIT $2;
    `,
    [offset, limit]
  );

export const getCurrentUser = (userId: string) =>
  db.query(
    `
      SELECT
        users.id,
        users.name,
        SUM(urls.visit_count) AS "visitCount",
        json_agg(
          json_build_object(
            'id', urls.id,
            'shortUrl', urls.short_url,
            'url', urls.url,
            'visitCount', urls.visit_count
          )
        ) AS "shortenedUrls"
      FROM users
      LEFT JOIN urls
      ON users.id = urls.user_id
      WHERE users.id = $1
      GROUP BY users.id;
    `,
    [userId]
  );

export const createUser = ({ name, email, encryptedPassword }: { [key: string]: string }) =>
  db.query(
    `
      INSERT INTO users (name, email, password) VALUES
      ($1, $2, $3);
    `,
    [name, email, encryptedPassword]
  );
