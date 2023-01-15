import { StoryHeader } from "./styled";
import { Kanban, Button, Modal } from "@lanaco/lnc-react-ui";
import Story from "../../components/story/";
import { Headerdiv, StoriesContainer } from "../../components/common-styles";
import useStoriesStore from "../../../store/storiesStore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import useTaskStore from "../../../store/tasksStore";
import CreateEditStoryModal from "../../modals/CreateEditStoryModal";

const columns = [
  {
    id: "New",
    header: "New",
  },
  {
    id: "Active",
    header: "Active",
  },
  {
    id: "Resolved",
    header: "Resolved",
  },
  {
    id: "Closed",
    header: "Closed",
  },
];

const Stories = () => {
  const { getStories, stories, status, deleteStory } = useStoriesStore();
  const navigate = useNavigate();
  const createStoryModalRef = useRef();

  const dataArr = {
    New: [],
    Active: [],
    Resolved: [],
    Closed: [],
  };

  useEffect(() => {
    getStories();
  }, []);

  /*if (
    status === 400 &&
    localStorage.getItem("access") &&
    localStorage.getItem("refresh")
  ) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  }
  */
  const deleteStoryHandler = (id) => {
    /*if (tasks.length === 0) deleteStory(id);
    else console.log("greska");*/
    deleteStory(id);
  };

  const createStoryHandler = (data) => {
    console.log(data);
  };

  stories.map((story) => {
    const { status, priority, description, name, id } = story;
    if (!dataArr[`${status}`].some((item) => item.id == id)) {
      dataArr[`${status}`].push({
        id,
        name,
        content: (
          <Story
            priority={priority}
            status={status}
            description={description}
            name={name}
            id={id}
            deleteStory={deleteStoryHandler}
          />
        ),
      });
    }
  });

  return (
    <>
      <CreateEditStoryModal
        ref={createStoryModalRef}
        title="Create Story"
        cancel={() => createStoryModalRef.current.close()}
        save={createStoryHandler}
      />
      <StoryHeader>
        <Headerdiv>Stories</Headerdiv>
        <Button
          style={{ marginLeft: "5px", padding: "22px", fontSize: "1.25rem" }}
          text="+"
          onClick={() => createStoryModalRef.current.open()}
        />
      </StoryHeader>
      <StoriesContainer>
        <Kanban
          style={{ width: "100%" }}
          horizontalDisplay={true}
          handle={false}
          data={dataArr}
          columns={columns}
        />
      </StoriesContainer>
    </>
  );
};

export default Stories;
