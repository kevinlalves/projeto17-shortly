export const signupQuery = () => `
  INSERT INTO users (name, email, password) VALUES
  ($1, $2, $3);
`;

export const showCurrentUserQuery = () => `
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
  JOIN urls
  ON users.id = urls.user_id
  WHERE users.id = $1
  GROUP BY users.id;
`;
