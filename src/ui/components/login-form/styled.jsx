import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  max-height: 250px;
  gap: 10px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 10px;
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
  font-size: 1rem;
`;

const LinkTo = styled.p`
  color: blue;
  font-size: 0.9rem;
  margin-top: -5px;
  cursor: pointer;
`;

export { Form, Label, ErrorLabel, LinkTo };
