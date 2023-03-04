import { ParamsDictionary } from 'express-serve-static-core';
import { stripHtml } from 'string-strip-html';

const sanitizeObject = (object: ParamsDictionary): ParamsDictionary => {
  for (const key of Object.keys(object)) {
    object[key] =
      typeof object[key] === 'string'
        ? stripHtml(object[key]).result.trim()
        : JSON.stringify(sanitizeObject(JSON.parse(object[key]) as ParamsDictionary));
  }

  return object;
};

export default sanitizeObject;
