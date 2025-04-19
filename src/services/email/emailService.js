import {
  userActivationLinkTemplate,
  userActivatedTemplate,
} from "./emailTemplate.js";
import { emailTransporter } from "./transporter.js";

export const userActivationLink = async (obj) => {
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivationLinkTemplate(obj));
  return info.messageId;
};

export const userActivatedNotification = async (obj) => {
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivatedTemplate(obj));
  return info.messageId;
};
