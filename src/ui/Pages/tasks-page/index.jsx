import { useNavigate, useParams, useLocation } from "react-router-dom";
import { StoryHeader } from "../stories-page/styled";
import { Button, Kanban } from "@lanaco/lnc-react-ui";
import { Headerdiv, StoriesContainer } from "../../components/common-styles";
import Task from "../../components/task";
import { useEffect, useRef } from "react";
import useTaskStore from "../../../store/tasksStore";
import CreateEditTaskModal from "../../modals/CreateEditStoryModal";

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
  const { tasks, getTasks, storyName, status } = useTaskStore();
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

  if (
    status === 400 &&
    localStorage.getItem("access") &&
    localStorage.getItem("refresh")
  ) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  }

  if (tasks) {
    tasks.map((task) => {
      const {
        dateOf,
        dateOn,
        description,
        id,
        name,
        priority,
        status,
        storyId,
      } = task;

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
            />
          ),
        });
      }
    });
  }

  return (
    <>
      <CreateEditTaskModal
        cancel={() => createTaskModalRef.current.close()}
        ref={createTaskModalRef}
      />
      <StoryHeader>
        <Headerdiv>{tasks && storyName}</Headerdiv>
        <Button
          style={{ marginLeft: "5px", padding: "22px", fontSize: "1.25rem" }}
          text="+"
          onClick={() => createTaskModalRef.current.open()}
        />
      </StoryHeader>
      <StoriesContainer>
        <Kanban
          style={{ width: "100%" }}
          horizontalDisplay={true}
          handle={false}
          data={dataArr}
          columns={columns}
        ></Kanban>
      </StoriesContainer>
    </>
  );
};

export default Story;
