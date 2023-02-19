export const createUrlQuery = () => `
  INSERT INTO urls (url, short_url, user_id) VALUES
  ($1, $2, $3);
`;
