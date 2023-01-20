import { useNavigate, useParams, useLocation } from "react-router-dom";
import { StoryHeader } from "../stories-page/styled";
import { Button, Kanban, notification, NotificationMessage } from "@lanaco/lnc-react-ui";
import { Headerdiv, StoriesContainer } from "../../components/common-styles";
import Task from "../../components/task";
import { useEffect, useRef } from "react";
import useTaskStore from "../../../store/tasksStore";
import CreateEditTaskModal from "../../modals/CreateEditTaskModal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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

const Story = () => {
  const { t } = useTranslation();
  const {
    tasks,
    getTasks,
    storyName,
    status,
    createTask,
    updateTaskStatus,
    deleteTask,
    updateTask,
  } = useTaskStore();
  const navigate = useNavigate();
  let { id } = useParams();
  const createTaskModalRef = useRef();

  const dataArr = {
    New: [],
    Active: [],
    Resolved: [],
    Closed: [],
  };

  useEffect(() => {
    getTasks(id);
  }, []);

  useEffect(() => {
    if (status === 404) {
      navigate("/not-found", { replace: true });
    }

    if (status === 401) {
      navigate("/login");
    }
  }, [status]);

  const deleteTaskHandler = (id) => {
    deleteTask(id).then(() => notifySuccess(t("deleteTaskSuccess")));
  };

  const createTaskHandler = (data) => {
    createTask(data).then(() => notifySuccess(t("createTaskSuccess")));
    createTaskModalRef.current.close();
  };

  const updateTaskHandler = (data) => {
    updateTask(data).then(() => notifySuccess(t("updateTaskSuccess")));
  };

  const notifySuccess = (message, title = t("success")) => {
    notification.success(<NotificationMessage title={title}>{message}</NotificationMessage>);
  };

  const cardMoved = (event, items, status, previousColumn) => {
    if (status) {
      const task = items[`${status}`].at(items[`${status}`].length - 1);
      updateTaskStatus(status, task.id);
    }
  };

  if (tasks) {
    tasks.map((task) => {
      const { dateOf, dateOn, description, id, name, priority, status, storyId } = task;

      if (!dataArr[`${status}`].some((item) => item.id == id)) {
        dataArr[`${status}`].push({
          id,
          name,
          content: (
            <Task
              priority={priority}
              description={description}
              name={name}
              id={id}
              storyId={storyId}
              dateOn={dateOn}
              dateOf={dateOf}
              status={status}
              deleteTask={deleteTaskHandler}
              updateTask={updateTaskHandler}
            />
          ),
        });
      }
    });
  }

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
    <>
      <CreateEditTaskModal
        cancel={() => createTaskModalRef.current.close()}
        ref={createTaskModalRef}
        create={createTaskHandler}
        title={t("createTask")}
        storyId={id}
      />
      <StoryHeader>
        <Headerdiv>{tasks && storyName}</Headerdiv>
        <Button
          style={{ marginLeft: "5px", padding: "22px", fontSize: "1.25rem" }}
          text="+"
          onClick={() => createTaskModalRef.current.open()}
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
          ></Kanban>
        </StoriesContainer>
      </motion.div>
    </>
  );
};

export default Story;
