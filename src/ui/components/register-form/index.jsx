import { Form, Label, ErrorLabel } from "../register-form/styled";
import { TextInput, Button } from "@lanaco/lnc-react-ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationRegisterSchema } from "../../../validation/validator";
import { ErrorValidation } from "../common-styles";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationRegisterSchema),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Label>Register</Label>
      <ErrorLabel></ErrorLabel>
      <TextInput
        name="firstName"
        style={{ width: "250px" }}
        placeholder="First name"
        {...register("firstName")}
      />
      <ErrorValidation>{errors.firstName?.message}</ErrorValidation>
      <TextInput
        name="lastName"
        style={{ width: "250px" }}
        placeholder="Last Name"
        {...register("lastName")}
      />
      <ErrorValidation>{errors.lastName?.message}</ErrorValidation>
      <TextInput
        name="email"
        {...register("email")}
        style={{ width: "250px" }}
        placeholder="Email"
      />
      <ErrorValidation>{errors.email?.message}</ErrorValidation>
      <TextInput
        style={{ width: "250px" }}
        placeholder="Password"
        name="password"
        {...register("password")}
      />
      <ErrorValidation>{errors.password?.message}</ErrorValidation>
      <TextInput
        style={{ width: "250px" }}
        placeholder="Confirm password"
        name="confirmPassword"
        {...register("confirmPassword")}
      />
      <ErrorValidation>{errors.confirmPassword?.message}</ErrorValidation>
      <Button text="Register" style={{ width: "100%", marginTop: "10px" }} />
    </Form>
  );
};

export default RegisterForm;
