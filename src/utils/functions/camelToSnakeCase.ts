import { upperCaseLetter } from '../constants/regex.js';

const camelToSnakeCase = (camelCaseString: string): string => {
  let snakeCaseString: string = '';

  for (const letter of camelCaseString) {
    snakeCaseString += upperCaseLetter.test(letter) ? `_${letter.toLowerCase()}` : letter;
  }

  return snakeCaseString;
};

export default camelToSnakeCase;
