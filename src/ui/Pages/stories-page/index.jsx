import { StoryHeader } from "./styled";
import { Kanban, Button } from "@lanaco/lnc-react-ui";
import Story from "../../components/story/";
import { Headerdiv, StoriesContainer } from "../../components/common-styles";

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
      content: <div>Test</div>,
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
      content: (
        <div>
          <h3>Test 4</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          in tortor...
        </div>
      ),
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
      id: 17,
      name: "Card 7",
      content: <div>Card 7</div>,
    },
    {
      id: 18,
      name: "Card 8",
      content: <div>Card 8</div>,
    },
    {
      id: 19,
      name: "Card 9",
      content: <div>Card 9</div>,
    },
  ],
};

const TestStoryCard = <Story />;

data.New[0].content = (
  <Story
    name="Story 1"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  />
);
data.New[1].content = (
  <Story
    name="Story 2"
    priority="HIGH"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);
data.New[2].content = (
  <Story
    name="Story"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);

data.Active[0].content = (
  <Story
    name="Story 5"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);
data.Active[1].content = (
  <Story
    name="Story 3"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);
data.Active[2].content = (
  <Story
    name="Story 4"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);

data.Resolved[0].content = (
  <Story
    name="Story 7"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);
data.Resolved[1].content = (
  <Story
    name="Story 8"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);
data.Resolved[2].content = (
  <Story
    name="Story 9"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);

data.Closed[0].content = (
  <Story
    name="Story 9"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);
data.Closed[1].content = (
  <Story
    name="Story 10"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);
data.Closed[2].content = (
  <Story
    name="Story 11"
    priority="MEDIUM"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
);

const Stories = () => {
  return (
    <div>
      <StoryHeader>
        <Headerdiv>Stories</Headerdiv>
        <Button
          style={{ marginLeft: "5px", padding: "22px", fontSize: "1.25rem" }}
          text="+"
          onClick={() => alert("Click")}
        />
      </StoryHeader>
      <StoriesContainer>
        <Kanban
          style={{ width: "100%" }}
          horizontalDisplay={true}
          data={data}
          columns={columns}
        />
      </StoriesContainer>
    </div>
  );
};

export default Stories;
