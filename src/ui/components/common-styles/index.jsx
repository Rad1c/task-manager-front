import styled from "@emotion/styled";

const loginBackgroundImgPath =
  "http://localhost:5173/src/img/login-background.jpg";

const Container = styled.div`
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

const ButtonContainer = styled.span`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ContentStoryDiv = styled.div`
  width: 250px;
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const Headerdiv = styled.div`
  border: 2px solid #e9edef;
  border-radius: 10px;
  padding: 10px 50px;
  width: fit-content;
  font-weight: 600;
  font-size: 1.25rem;
  background-color: #ffffff;
`;

const StoriesContainer = styled.div`
  height: 90vh;
  display: flex;
`;

const TitleSeparator = styled.hr`
  margin-top: 5px;
  margin-bottom: 5px;
  width: 40%;
  border-top: 2px solid #48576b;
`;

const ContentSeparator = styled.hr`
  width: 80%;
  margin-top: 5px;
  border-top: 2px solid #48576b;
`;

const Separator = styled.hr`
  margin-top: 5px;
  border-top: 2px solid #48576b;
  margin-left: 5px;
  margin-right: 5px;
`;

const PriorityDiv = styled.div`
  width: 100%;
  margin-top: 5px;
  font-size: 1rem;
  font-weight: 600;
  padding: 2px 15px;
  text-align: center;
`;

const ErrorValidation = styled.p`
  color: red;
  font-size: 0.85rem;
  margin-top: -10px;
`;

export {
  Container,
  ButtonContainer,
  ContentStoryDiv,
  Headerdiv,
  StoriesContainer,
  TitleSeparator,
  ContentSeparator,
  PriorityDiv,
  Separator,
  ErrorValidation,
};
