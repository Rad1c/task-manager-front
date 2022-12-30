import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 30px 15px;
  margin: auto;
  background-color: #fbfafa;
  box-shadow: 0 0.188em 1.55em rgb(156, 156, 156);
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
`;

const ErrorLabel = styled.div`
  color: red;
  font-size: 0.8rem;
`;

export { Form, Label, ErrorLabel };
