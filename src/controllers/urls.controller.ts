import chalk from 'chalk';
import internalError from '../utils/functions/internalError.js';
import { nanoid } from 'nanoid';
import { idSize } from '../utils/constants/nanoid.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import { createUrlRecord, deleteUrlRecord, getShortUrl, getUrl } from '../repositories/urls.repository.js';
import { Request, Response } from 'express';
import { ErrnoException } from '../types/error.js';

export const showUrl = async (req: Request, res: Response): Promise<void> => {
  const { id } = res.locals as { id: string };
  console.log(chalk.cyan(`GET /urls/${id}`));

  try {
    const {
      rows: [url],
    } = await getUrl(id);

    if (!url) {
      res.status(404).send('Url not found');
      return;
    }

    res.json(url);
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};

export const openUrl = async (req: Request, res: Response): Promise<void> => {
  const { shortUrl } = res.locals as { shortUrl: string };
  console.log(chalk.cyan(`GET /urls/open/${shortUrl}`));

  try {
    const {
      rows: [url],
    } = await getShortUrl(shortUrl);

    if (!url) {
      res.status(404).send('Url not found');
      return;
    }

    res.redirect(url.url);
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};

export const createUrl = async (req: Request, res: Response): Promise<void> => {
  const { userId, url } = res.locals as { userId: string; url: string };
  console.log(chalk.cyan('POST /urls/shorten'));

  const shortUrl = nanoid(idSize);

  try {
    const {
      rows: [newUrl],
    } = await createUrlRecord({ url, shortUrl, userId });

    res.status(201).json(newUrl);
  } catch (error) {
    if ((error as ErrnoException).code === valueAlreadyExistsError) {
      res.status(409).send('Url already registered');
      return;
    }

    internalError(error as ErrnoException, res);
  }
};

export const deleteUrl = async (req: Request, res: Response): Promise<void> => {
  const { userId, id } = res.locals as { userId: string; id: string };
  console.log(chalk.cyan(`DELETE /urls/${id}`));

  try {
    const {
      rows: [{ code }],
    } = await deleteUrlRecord({ id, userId });

    res.status(code).send();
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};
