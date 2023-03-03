import chalk from 'chalk';
import internalError from '../utils/functions/internalError.js';
import { nanoid } from 'nanoid';
import { idSize } from '../utils/constants/nanoid.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import { createUrlRecord, deleteUrlRecord, getShortUrl, getUrl } from '../repositories/urls.repository.js';

export const showUrl = async (req, res) => {
  const { id } = req.Params;
  console.log(chalk.cyan(`GET /urls/${id}`));

  try {
    const {
      rows: [url],
    } = await getUrl(id);

    if (!url) return res.status(404).send('Url not found');

    return res.json(url);
  } catch (error) {
    internalError(error, res);
  }
};

export const openUrl = async (req, res) => {
  const { shortUrl } = req.Params;
  console.log(chalk.cyan(`GET /urls/open/${shortUrl}`));

  try {
    const {
      rows: [url],
    } = await getShortUrl(shortUrl);

    if (!url) return res.status(404).send('Url not found');

    return res.redirect(url.url);
  } catch (error) {
    internalError(error, res);
  }
};

export const createUrl = async (req, res) => {
  const { userId, url } = req.Params;
  console.log(chalk.cyan('POST /urls/shorten'));

  const shortUrl = nanoid(idSize);

  try {
    const {
      rows: [newUrl],
    } = await createUrlRecord({ url, shortUrl, userId });

    return res.status(201).json(newUrl);
  } catch (error) {
    if (error.code === valueAlreadyExistsError) return res.status(409).send('Url already registered');

    internalError(error, res);
  }
};

export const deleteUrl = async (req, res) => {
  const { userId, id } = req.Params;
  console.log(chalk.cyan(`DELETE /urls/${id}`));

  try {
    const {
      rows: [{ code }],
    } = await deleteUrlRecord({ id, userId });

    return res.status(code).send();
  } catch (error) {
    internalError(error, res);
  }
};
