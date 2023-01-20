import { StoryHeader } from "./styled";
import { motion } from "framer-motion";
import Story from "../../components/story/";
import { Headerdiv, StoriesContainer } from "../../components/common-styles";
import useStoriesStore from "../../../store/storiesStore";
import { useEffect, useRef, useState } from "react";
import CreateEditStoryModal from "../../modals/CreateEditStoryModal";
import { Kanban, Button, notification, NotificationMessage, Dropdown } from "@lanaco/lnc-react-ui";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Logout from "../../components/logout";

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
  const { t } = useTranslation();
  const {
    getStories,
    stories,
    status,
    deleteStory,
    getTasksByStoryId,
    createStory,
    updateStory,
    updateStoryStatus,
  } = useStoriesStore();
  const createStoryModalRef = useRef();
  const navigate = useNavigate();

  const dataArr = {
    New: [],
    Active: [],
    Resolved: [],
    Closed: [],
  };

  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
    if (status === 404) {
      navigate("/not-found", { replace: true });
    }

    if (status === 401) {
      navigate("/login");
    }
  }, [status]);

  const deleteStoryHandler = async (id) => {
    const response = await getTasksByStoryId(id);

    if (response.tasks.length === 0) {
      deleteStory(id).then(() => notifySuccess(t("deleteStorySuccess")));
    } else {
      notifyError(t("storyHasTasks"));
    }
  };

  const createStoryHandler = (data) => {
    createStory(data).then(() => notifySuccess(t("createStorySuccess")));
    createStoryModalRef.current.close();
  };

  const updateStoryHandler = (data) => {
    updateStory(data).then(() => notifySuccess(t("updateStorySuccess")));
  };

  const notifySuccess = (message, title = t("success")) => {
    console.log(message, title);
    notification.success(<NotificationMessage title={title}>{message}</NotificationMessage>);
  };

  const notifyError = (message, title = t("error")) => {
    console.log(message, title);
    notification.error(<NotificationMessage title={title}>{message}</NotificationMessage>);
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

  const cardMoved = (event, items, status, previousColumn) => {
    if (status) {
      const story = items[`${status}`].at(items[`${status}`].length - 1);
      updateStoryStatus(status, story.id);
    }
  };

  return (
    <>
      <CreateEditStoryModal
        ref={createStoryModalRef}
        title={t("createStory")}
        cancel={() => createStoryModalRef.current.close()}
        create={createStoryHandler}
      />
      <StoryHeader>
        <Logout />
        <Headerdiv>Stories</Headerdiv>
        <Button
          style={{ marginLeft: "5px", padding: "22px", fontSize: "1.25rem" }}
          text="+"
          onClick={() => createStoryModalRef.current.open()}
        />
      </StoryHeader>
      <motion.div
        className="home container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <StoriesContainer>
          <Kanban
            onCardChangedColumns={cardMoved}
            style={{ width: "100%" }}
            horizontalDisplay={true}
            data={dataArr}
            columns={columns}
          />
        </StoriesContainer>
      </motion.div>
    </>
  );
};

export default Stories;
