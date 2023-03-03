export const showUrlQuery = () => `
  SELECT
    id,
    short_url AS "shortUrl",
    url
  FROM urls
  WHERE id = $1;
`;

export const openUrlQuery = () => `
  UPDATE urls
  SET visit_count = visit_count + 1
  WHERE short_url = $1
  RETURNING url;
`;

export const createUrlQuery = () => `
  INSERT INTO urls (url, short_url, user_id) VALUES
  ($1, $2, $3)
  RETURNING id, short_url AS "shortUrl";
`;

export const deleteUrlQuery = () => `
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
  `;
