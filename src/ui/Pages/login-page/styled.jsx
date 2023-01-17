import styled from "@emotion/styled";
import loginBackgroundImgPath from "/img/login-background.jpg";

const LoginContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${loginBackgroundImgPath});
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
`;

export default LoginContainer;
