import { StoryContainer, TitleSeparator } from "./styled";
import { useNavigate } from "react-router-dom";
import { Button } from "@lanaco/lnc-react-ui";
import {
  ButtonContainer,
  ContentStoryDiv,
  ContentSeparator,
  PriorityDiv,
} from "../common-styles";
import YesNoModal from "../../modals/YesNoModal";
import { useRef } from "react";
import useStoriesStore from "../../../store/storiesStore";
import CreateEditStoryModal from "../../modals/CreateEditStoryModal";

const Story = (props) => {
  const { priority, status, name, description, id, deleteStory } = props;
  const navigate = useNavigate();
  const deleteStoryModal = useRef();
  const editStoryModal = useRef();

  const deleteHandler = () => {
    deleteStoryModal.current.open();
  };

  const editstoryHandler = () => {
    editStoryModal.current.open();
  };

  const yesClicked = () => {
    deleteStory(id);
    deleteStoryModal.current.close();
  };

  const noClicked = () => {
    deleteStoryModal.current.close();
  };

  const cancelClicked = () => {
    editStoryModal.current.close();
  };

  return (
    <StoryContainer>
      <CreateEditStoryModal
        cancel={cancelClicked}
        ref={editStoryModal}
        title="Edit Story"
        name={name}
        priority={priority}
        description={description}
        status={status}
      />
      <YesNoModal
        ref={deleteStoryModal}
        storyName={name}
        yesClicked={yesClicked}
        noClicked={noClicked}
        title={"Delete Story"}
        description={`Are you sure to want delete to '${name}'`}
      />
      <h3
        onClick={() => navigate(`/story/${id}`)}
        style={{ cursor: "pointer" }}
      >
        {name}
      </h3>
      <TitleSeparator />
      <PriorityDiv>{priority}</PriorityDiv>
      <ContentSeparator />
      <ContentStoryDiv>{description}</ContentStoryDiv>
      <ButtonContainer>
        <Button
          color="danger"
          onClick={deleteHandler}
          text="x"
          style={{ marginTop: "10px" }}
        />
        <Button
          onClick={editstoryHandler}
          color="success"
          text="Detail"
          style={{ marginTop: "10px" }}
        />
      </ButtonContainer>
    </StoryContainer>
  );
};

export default Story;
