import { StoryHeader } from "./styled";
import { motion } from "framer-motion";
import Story from "../../components/story/";
import { Headerdiv, StoriesContainer } from "../../components/common-styles";
import useStoriesStore from "../../../store/storiesStore";
import { useEffect, useRef, useState } from "react";
import CreateEditStoryModal from "../../modals/CreateEditStoryModal";
import {
  Kanban,
  Button,
  notification,
  NotificationMessage,
} from "@lanaco/lnc-react-ui";

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
  const {
    getStories,
    stories,
    status,
    deleteStory,
    getTasksByStoryId,
    createStory,
    updateStory,
  } = useStoriesStore();
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

  const deleteStoryHandler = async (id) => {
    const response = await getTasksByStoryId(id);
    console.log(response);

    if (response.tasks.length === 0) {
      deleteStory(id);
      notifySuccess("Story is succesful deleted.");
    } else {
      notifyError("Story has tasks. First delete tasks!");
    }
  };

  const createStoryHandler = (data) => {
    createStory(data);
    createStoryModalRef.current.close();
    notifySuccess("Story is succesful created.");
  };

  const updateStoryHandler = (data) => {
    updateStory(data);
    notifySuccess("Story is succesful updated.");
  };

  const notifySuccess = (message, title = "Success") => {
    console.log(message, title);
    notification.success(
      <NotificationMessage title={title}>{message}</NotificationMessage>
    );
  };

  const notifyError = (message, title = "Error") => {
    console.log(message, title);
    notification.error(
      <NotificationMessage title={title}>{message}</NotificationMessage>
    );
  };

  const cardMoved = (e, items, column) => {
    console.log(e);
    console.log(itme);
    console.log(column);
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
            updateStory={updateStoryHandler}
          />
        ),
      });
    }
  });

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.2 },
    },
    exit: {
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="home container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <CreateEditStoryModal
        ref={createStoryModalRef}
        title="Create Story"
        cancel={() => createStoryModalRef.current.close()}
        create={createStoryHandler}
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
          // onCardMoved={cardMoved}
          style={{ width: "100%" }}
          horizontalDisplay={true}
          data={dataArr}
          columns={columns}
        />
      </StoriesContainer>
    </motion.div>
  );
};

export default Stories;
