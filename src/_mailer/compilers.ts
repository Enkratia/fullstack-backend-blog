import jwt from 'jsonwebtoken';
import Handlebars from 'handlebars';

import { emailActivation } from './templates/emailActivation';
import { ICompileActivationTemplate } from './types/types';

export function compileActivationTemplate({ email }: { email: string }) {
  const siteUrl = process.env.FRONTEND_URL;
  const secretKey = process.env.JWT_SECRET_KEY;
  const activationToken = jwt.sign({ email }, secretKey);

  const vars: ICompileActivationTemplate = {
    email: email,
    siteUrl: siteUrl,
    activationUrl: siteUrl + '/activation/' + activationToken,
  };

  const template = Handlebars.compile(emailActivation);
  const htmlBody = template(vars);

  return htmlBody;
}
