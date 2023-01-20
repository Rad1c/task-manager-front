import { StoryContainer, TitleSeparator } from "./styled";
import { useNavigate } from "react-router-dom";
import { Button } from "@lanaco/lnc-react-ui";
import YesNoModal from "../../modals/YesNoModal";
import { useRef } from "react";
import CreateEditStoryModal from "../../modals/CreateEditStoryModal";
import { ButtonContainer, ContentStoryDiv, ContentSeparator, PriorityDiv } from "../common-styles";
import { useTranslation } from "react-i18next";

const Story = (props) => {
  const { t } = useTranslation();
  const { priority, status, name, description, id, deleteStory, updateStory } = props;
  const navigate = useNavigate();
  const deleteStoryModal = useRef();
  const editStoryModal = useRef();

  const deleteStoryHandler = () => {
    deleteStory(id);

    deleteStoryModal.current.close();
  };

  const onSaveUpdateHandler = (data) => {
    updateStory({ ...data, id });

    editStoryModal.current.close();
  };

  return (
    <StoryContainer>
      <CreateEditStoryModal
        cancel={() => editStoryModal.current.close()}
        ref={editStoryModal}
        title={t("editStory")}
        name={name}
        priority={priority}
        description={description}
        status={status}
        update={onSaveUpdateHandler}
      />
      <YesNoModal
        ref={deleteStoryModal}
        storyName={name}
        yesClicked={deleteStoryHandler}
        noClicked={() => deleteStoryModal.current.close()}
        title={t("deleteStory")}
        description={`${t("sureToDeleteStory")} '${name}'?`}
      />
      <h3 onClick={() => navigate(`/story/${id}`)} style={{ cursor: "pointer" }}>
        {name}
      </h3>
      <TitleSeparator />
      <PriorityDiv>{priority}</PriorityDiv>
      <ContentSeparator />
      <ContentStoryDiv>{description}</ContentStoryDiv>
      <ButtonContainer>
        <Button
          color="danger"
          onClick={() => deleteStoryModal.current.open()}
          text="x"
          style={{ marginTop: "10px" }}
        />
        <Button
          onClick={() => editStoryModal.current.open()}
          color="success"
          text={t("detail")}
          style={{ marginTop: "10px" }}
        />
      </ButtonContainer>
    </StoryContainer>
  );
};

export default Story;
