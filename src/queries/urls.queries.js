export const showUrlQuery = () => `
  SELECT
    id,
    short_url AS "shortUrl",
    url
  FROM urls
  WHERE id = $1;
`;

export const createUrlQuery = () => `
  INSERT INTO urls (url, short_url, user_id) VALUES
  ($1, $2, $3);
`;
