import chalk from 'chalk';
import internalError from '../utils/functions/internalError.js';
import { nanoid } from 'nanoid';
import { idSize } from '../utils/constants/nanoid.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import { createUrlRecord, deleteUrlRecord, getShortUrl, getUrl } from '../repositories/urls.repository.js';
import { Request, Response } from 'express';
import { ErrnoException } from '../types/utils/errors.js';
import { ParamsDictionary } from 'express-serve-static-core';

export const showUrl = async (req: Request, res: Response) => {
  const { id }: ParamsDictionary = req.params;
  console.log(chalk.cyan(`GET /urls/${id}`));

  try {
    const {
      rows: [url],
    } = await getUrl(id);

    if (!url) return res.status(404).send('Url not found');

    return res.json(url);
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};

export const openUrl = async (req: Request, res: Response) => {
  const { shortUrl }: ParamsDictionary = req.params;
  console.log(chalk.cyan(`GET /urls/open/${shortUrl}`));

  try {
    const {
      rows: [url],
    } = await getShortUrl(shortUrl);

    if (!url) return res.status(404).send('Url not found');

    return res.redirect(url.url);
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};

export const createUrl = async (req: Request, res: Response) => {
  const { userId, url }: ParamsDictionary = req.params;
  console.log(chalk.cyan('POST /urls/shorten'));

  const shortUrl = nanoid(idSize);

  try {
    const {
      rows: [newUrl],
    } = await createUrlRecord({ url, shortUrl, userId });

    return res.status(201).json(newUrl);
  } catch (error) {
    if ((error as ErrnoException).code === valueAlreadyExistsError)
      return res.status(409).send('Url already registered');

    internalError(error as ErrnoException, res);
  }
};

export const deleteUrl = async (req: Request, res: Response) => {
  const { userId, id }: ParamsDictionary = req.params;
  console.log(chalk.cyan(`DELETE /urls/${id}`));

  try {
    const {
      rows: [{ code }],
    } = await deleteUrlRecord({ id, userId });

    return res.status(code).send();
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};
