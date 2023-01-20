import * as Yup from "yup";
import i18next from "../localization/i18n";

const t = (t) => {
  i18next.t(t);
};

const validationLoginSchema = Yup.object().shape({
  email: Yup.string().email(t("invalidEmail")).required(t("requiredEmail")),

  password: Yup.string().min(4, t("pwMin")).max(15, t("pwMax")).required(t("pwReq")),
});

const validationRegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(3, t("fnMin")).max(55, t("fnMax")).required(t("fnReq")),
  lastName: Yup.string().min(3, t("lnMin")).max(55, t("lnMax")).required(t("lnReq")),
  email: Yup.string().email(t("invalidEmail")).required(t("requiredEmail")),

  password: Yup.string().min(4, t("pwMin")).max(15, t("pwMax")).required(t("pwReq")),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], t("pwMatch")),
});

const validateStorySchema = Yup.object().shape({
  name: Yup.string().max(55, t("nameMax")).required(t("storyNameReq")),
  status: Yup.mixed().oneOf(["New", "Active", "Resolved", "Closed"]).required(t("storyStatusReq")),
  priority: Yup.mixed().oneOf(["Low", "Medium", "High"]).required(t("storyPriorReq")),
  description: Yup.string().max(250, t("description")),
});

const validateTaskSchema = Yup.object().shape({
  name: Yup.string().max(55, t("nameMax")).required(t("storyNameReq")),
  dateOn: Yup.date().required(),
  dateOf: Yup.date().min(Yup.ref("dateOn"), t("dateOfErr")),
  status: Yup.mixed(t("dateOnReq"))
    .oneOf(["New", "Active", "Resolved", "Closed"])
    .required(t("taskStatusReq")),
  priority: Yup.mixed().oneOf(["Low", "Medium", "High"]).required(t("taskPriorReq")),
  description: Yup.string().max(250, t("description")),
});

export { validationLoginSchema, validationRegisterSchema, validateStorySchema, validateTaskSchema };
