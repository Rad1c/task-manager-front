import * as Yup from "yup";

const validationLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalid email Address")
    .required("email is required"),

  password: Yup.string()
    .min(4, "min length is 4 chars")
    .max(15, "max lenght is 15 chars")
    .required("password is required"),
});

const validationRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "min length is 3 chars")
    .max(55, "max lenght is 55 chars")
    .required("first name is required"),
  lastName: Yup.string()
    .min(3, "min length is 3 chars")
    .max(55, "max lenght is 55 chars")
    .required("last name is required"),
  email: Yup.string()
    .email("invalid email Address")
    .required("email is required"),

  password: Yup.string()
    .min(4, "min length is 4 chars")
    .max(15, "max lenght is 15 chars")
    .required("password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const validateStorySchema = Yup.object().shape({
  name: Yup.string()
    .max(55, "Max lenght is 55 chars")
    .required("Story name is required"),
  status: Yup.mixed()
    .oneOf(["New", "Active", "Resolved", "Closed"])
    .required("Story status is required"),
  priority: Yup.mixed()
    .oneOf(["Low", "Medium", "High"])
    .required("Story priority is required"),
  description: Yup.string().max(250, "Max lenght is 250 chars"),
});

const validateTaskSchema = Yup.object().shape({
  name: Yup.string()
    .max(55, "Max lenght is 55 chars")
    .required("Story name is required"),
  dateOn: Yup.date().required("start date is required"),
  dateOf: Yup.date().min(
    Yup.ref("dateOn"),
    "end date can't be before start date"
  ),
  status: Yup.mixed()
    .oneOf(["New", "Active", "Resolved", "Closed"])
    .required("story status is required"),
  priority: Yup.mixed()
    .oneOf(["Low", "Medium", "High"])
    .required("story priority is required"),
  description: Yup.string().max(250, "Max lenght is 250 chars"),
});

export {
  validationLoginSchema,
  validationRegisterSchema,
  validateStorySchema,
  validateTaskSchema,
};
