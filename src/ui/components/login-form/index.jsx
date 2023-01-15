import { PasswordInput, TextInput, Button } from "@lanaco/lnc-react-ui";
import { Form, ErrorLabel, Label, LinkTo } from "./styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationLoginSchema } from "http://localhost:5173/src/validation/validator.jsx";
import { ErrorValidation } from "../common-styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLoginStore from "../../../store/loginStore";
import axios from "../../../api/axios";
import { useState, useRef } from "react";

const LOGIN_URL = "/login";

const LoginForm = () => {
  const [loginErr, setLoginErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationLoginSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { isUserLoggedIn, setIsUserLoggedIn } = useLoginStore();
  const from = location.state?.from?.pathname || "/";

  const submitForm = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);

      setIsUserLoggedIn(true);

      navigate(from, { replace: true });
    } catch (error) {
      setLoginErr("Login unsuccesful");
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Label>Login</Label>
      {loginErr && <ErrorLabel id="error-message">{loginErr}</ErrorLabel>}
      <TextInput
        name="email"
        placeholder="Email"
        style={{ width: "100%" }}
        {...register("email")}
        value="mmarko@mail.com"
      />
      <ErrorValidation>{errors.email?.message}</ErrorValidation>
      <PasswordInput
        name="password"
        placeholder="Password"
        {...register("password")}
        value="0000"
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
  );
};

export default LoginForm;
