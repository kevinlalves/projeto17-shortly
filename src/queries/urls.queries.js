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
  ($1, $2, $3);
`;

export const deleteUrlQuery = () => `
  DELETE FROM urls
  WHERE id = $1
  AND user_id = $2;
`;
