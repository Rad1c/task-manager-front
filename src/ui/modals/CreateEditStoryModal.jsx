import {
  ConfirmationForm,
  DropdownLookup,
  TextAreaInput,
  TextInput,
} from "@lanaco/lnc-react-ui";
import React, { useState } from "react";
import { Button } from "@lanaco/lnc-react-ui";

const CreateEditStoryModal = React.forwardRef((props, ref) => {
  const { title, cancel, save } = props;
  const [name, setName] = useState(props.name || "");
  console.log("renerovan modal za dodavanje storija");
  return (
    <ConfirmationForm
      ref={ref}
      color={"information"}
      actionsAlignment={"center"}
      actions={
        <>
          <TextInput
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            value={name}
          />
          <DropdownLookup size="small" />
          <DropdownLookup
            size="small"
            defaultInputValue="1"
            options={[
              {
                value: "1",
                label: "option 1",
              },
              {
                value: "2",
                label: "option 2",
              },
              {
                value: "3",
                label: "option 3",
              },
            ]}
          />
          <TextAreaInput
            minRows={6}
            maxRows={8}
            style={{ width: "280px" }}
            value={props.description || ""}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="danger" onClick={cancel}>
              Cancel
            </Button>
            <Button color="success">Save</Button>
          </div>
        </>
      }
      title={title}
      type={"centered"}
      showCloseButton={false}
      statusIcon={"false"}
    />
  );
});

export default CreateEditStoryModal;
