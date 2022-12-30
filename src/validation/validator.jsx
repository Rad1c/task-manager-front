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

export { validationLoginSchema, validationRegisterSchema };
