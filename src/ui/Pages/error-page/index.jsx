import { ErrorPageContainer, ErrorDiv, ErrorText } from "./styled";

const Error = () => {
  return (
    <>
      <ErrorPageContainer>
        <div>
          <ErrorDiv />
          <ErrorText>page not found</ErrorText>
        </div>
      </ErrorPageContainer>
    </>
  );
};

export default Error;
