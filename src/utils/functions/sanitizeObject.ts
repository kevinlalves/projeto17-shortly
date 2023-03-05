import { ParamsDictionary } from 'express-serve-static-core';
import { stripHtml } from 'string-strip-html';
import { GenericObject } from '../../types/object.js';

const sanitizeObject = (object: GenericObject): ParamsDictionary => {
  for (const key of Object.keys(object)) {
    if (typeof object[key] === 'string') {
      object[key] = stripHtml(object[key]).result.trim();
    } else if (typeof object[key] === 'object') {
      object[key] = sanitizeObject(object[key]);
    }
  }

  return object;
};

export default sanitizeObject;
