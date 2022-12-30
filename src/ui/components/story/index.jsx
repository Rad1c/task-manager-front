import { StoryContainer, TitleSeparator } from "./styled";
import {
  ButtonContainer,
  ContentStoryDiv,
  ContentSeparator,
  PriorityDiv,
} from "../common-styles";
import { Button } from "@lanaco/lnc-react-ui";

const Story = (props) => {
  const priority = props.priority;
  const name = props.name;
  const description = props.description;

  return (
    <StoryContainer>
      <h3>{name}</h3>
      <TitleSeparator />
      <PriorityDiv>{priority}</PriorityDiv>
      <ContentSeparator />
      <ContentStoryDiv>{description}</ContentStoryDiv>
      <ButtonContainer>
        <Button color="danger" text="x" style={{ marginTop: "10px" }} />
        <Button color="success" text="Detail" style={{ marginTop: "10px" }} />
      </ButtonContainer>
    </StoryContainer>
  );
};

export default Story;
