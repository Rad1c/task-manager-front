import { useParams } from "react-router-dom";
import { StoryHeader } from "../stories-page/styled";
import { Button, Kanban } from "@lanaco/lnc-react-ui";
import { Headerdiv, StoriesContainer } from "../../components/common-styles";
import Task from "../../components/task";

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

const data = {
  New: [
    {
      id: 1,
      name: "Card 1",
      content: <div>Card 1</div>,
    },
    {
      id: 2,
      name: "Card 2",
      content: <div>Card 2</div>,
    },
    {
      id: 3,
      name: "Card 3",
      content: <div>Card 3</div>,
    },
  ],
  Active: [
    {
      id: 4,
      name: "Card 4",
      content: <div>Card 4</div>,
    },
    {
      id: 5,
      name: "Card 5",
      content: <div>Card 5</div>,
    },
    {
      id: 6,
      name: "Card 6",
      content: <div>Card 6</div>,
    },
  ],
  Resolved: [
    {
      id: 7,
      name: "Card 7",
      content: <div>Card 7</div>,
    },
    {
      id: 8,
      name: "Card 8",
      content: <div>Card 8</div>,
    },
    {
      id: 9,
      name: "Card 9",
      content: <div>Card 9</div>,
    },
  ],
  Closed: [
    {
      id: 7,
      name: "Card 7",
      content: <div>Card 7</div>,
    },
    {
      id: 8,
      name: "Card 8",
      content: <div>Card 8</div>,
    },
    {
      id: 9,
      name: "Card 9",
      content: <div>Card 9</div>,
    },
  ],
};

data.New[0].content = (
  <Task
    name="Task 1"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.New[1].content = (
  <Task
    name="Task 2"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.New[2].content = (
  <Task
    name="Task 3"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Active[0].content = (
  <Task
    name="Task 4"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Active[1].content = (
  <Task
    name="Task 5"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Active[2].content = (
  <Task
    name="Task 6"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Resolved[0].content = (
  <Task
    name="Task 7"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Resolved[1].content = (
  <Task
    name="Task 8"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Resolved[2].content = (
  <Task
    name="Task 9"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Closed[0].content = (
  <Task
    name="Task 10"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Closed[1].content = (
  <Task
    name="Task 11"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

data.Closed[2].content = (
  <Task
    name="Task 12"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    priority="MEDIUM"
    dateOn="2022.05.22"
    dateOf="2022.05.25"
  />
);

const Story = () => {
  let { storyId } = useParams();
  const storyName = "Story 1";
  return (
    <div>
      <StoryHeader>
        <Headerdiv>{storyName}</Headerdiv>
        <Button
          style={{ marginLeft: "5px", padding: "22px", fontSize: "1.25rem" }}
          text="+"
        />
      </StoryHeader>
      <StoriesContainer>
        <Kanban
          style={{ width: "100%" }}
          horizontalDisplay={true}
          data={data}
          columns={columns}
        ></Kanban>
      </StoriesContainer>
    </div>
  );
};

export default Story;
