export const signupQuery = () => `
  INSERT INTO users (name, email, password) VALUES
  ($1, $2, $3);
`;
