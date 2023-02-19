export const signinQuery = () => `
  SELECT password, id
  FROM users
  WHERE email = $1;
`;
