import { PasswordInput, TextInput, Button } from "@lanaco/lnc-react-ui";
import { Form, ErrorLabel, Label, LinkTo } from "./styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationLoginSchema } from "http://localhost:5173/src/validation/validator.jsx";
import { ErrorValidation } from "../common-styles";
import { Link } from "react-router-dom";
import useLoginStore from "../../../store/loginStore";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationLoginSchema),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Label>Login</Label>
        <ErrorLabel id="error-message" />
        <TextInput
          name="email"
          placeholder="Email"
          style={{ width: "100%" }}
          {...register("email")}
          onChange={useLoginStore((state) => state.setEmail)}
        />
        <ErrorValidation>{errors.email?.message}</ErrorValidation>
        <PasswordInput
          name="password"
          placeholder="Password"
          {...register("password")}
          onChange={useLoginStore((state) => state.setPassword)}
        />
        <ErrorValidation>{errors.password?.message}</ErrorValidation>
        <Button
          type="submit"
          text="Login"
          style={{ width: "100%", marginTop: "10px" }}
        />
        <LinkTo>
          <Link to="/register">Create an account</Link>
        </LinkTo>
      </Form>
    </>
  );
};

export default LoginForm;
