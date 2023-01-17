import {
  ButtonContainer,
  Separator,
  ContentStoryDiv,
  PriorityDiv,
} from "../common-styles";
import { Button } from "@lanaco/lnc-react-ui";
import DateRange from "../date-range";
import YesNoModal from "../../modals/YesNoModal";
import { useRef } from "react";
import CreateEditTaskModal from "../../modals/CreateEditTaskModal";

const Task = (props) => {
  const {
    id,
    storyId,
    priority,
    name,
    description,
    status,
    dateOn,
    dateOf,
    deleteTask,
    updateTask,
  } = props;
  const deleteTaskModalRef = useRef();
  const editTaskModalRef = useRef();

  const deleteTaskHandler = () => {
    deleteTask(id);
    deleteTaskModalRef.current.close();
  };

  const updateTaskHandler = (data) => {
    updateTask({ ...data, id, storyId });
    editTaskModalRef.current.close();
  };

  return (
    <div>
      <CreateEditTaskModal
        cancel={() => editTaskModalRef.current.close()}
        ref={editTaskModalRef}
        title="Edit Task"
        name={name}
        priority={priority}
        description={description}
        status={status}
        dateOn={dateOn}
        dateOf={dateOf}
        update={updateTaskHandler}
      />
      <YesNoModal
        ref={deleteTaskModalRef}
        taskName={name}
        yesClicked={deleteTaskHandler}
        noClicked={() => deleteTaskModalRef.current.close()}
        title={"Delete Task"}
        description={`Are you sure to want delete task '${name}'`}
      />
      <h3>{name}</h3>
      <Separator />
      <DateRange dateOn={dateOn} dateOf={dateOf} />
      <PriorityDiv>{priority}</PriorityDiv>
      <Separator />
      <ContentStoryDiv>{description}</ContentStoryDiv>
      <ButtonContainer>
        <Button
          color="danger"
          onClick={() => deleteTaskModalRef.current.open()}
          text="x"
          style={{ marginTop: "10px" }}
        />
        <Button
          color="success"
          onClick={() => editTaskModalRef.current.open()}
          text="Detail"
          style={{ marginTop: "10px" }}
        />
      </ButtonContainer>
    </div>
  );
};

export default Task;
