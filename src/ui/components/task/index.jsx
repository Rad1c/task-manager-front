import {
  ButtonContainer,
  Separator,
  ContentStoryDiv,
  PriorityDiv,
  TitleSeparator,
} from "../common-styles";
import { Button } from "@lanaco/lnc-react-ui";
import DateRange from "../date-range";

const Task = (props) => {
  const { id, priority, name, description, dateOn, dateOf } = props;

  return (
    <div>
      <h3>{name}</h3>
      <Separator />
      <DateRange dateOn={dateOn} dateOf={dateOf} />
      <PriorityDiv>{priority}</PriorityDiv>
      <Separator />
      <ContentStoryDiv>{description}</ContentStoryDiv>
      <ButtonContainer>
        <Button color="danger" text="x" style={{ marginTop: "10px" }} />
        <Button color="success" text="Detail" style={{ marginTop: "10px" }} />
      </ButtonContainer>
    </div>
  );
};

export default Task;
