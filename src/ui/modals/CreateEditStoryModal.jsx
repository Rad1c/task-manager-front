import {
  ConfirmationForm,
  Dropdown,
  TextAreaInput,
  TextInput,
} from "@lanaco/lnc-react-ui";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@lanaco/lnc-react-ui";
import priorityOptions from "../../enums/priorityOptionsEnum";
import statusOptions from "../../enums/statusOptionsEnum";
import { validateStorySchema } from "../../validation/validator";
import { ErrorValidation } from "../components/common-styles";

const CreateEditStoryModal = React.forwardRef((props, ref) => {
  const [createEditError, setCreateEditError] = useState();
  const { title, cancel, create, status, priority, description, name, update } =
    props;
  const formValuesRef = useRef({
    newStatus: status || statusOptions[0].value,
    newPriority: priority || priorityOptions[0].value,
    newName: name,
    newDescription: description,
  });

  const onSaveHandler = async () => {
    const { newStatus, newPriority, newName, newDescription } =
      formValuesRef.current;

    const data = {
      name: newName,
      status: newStatus,
      priority: newPriority,
      description: newDescription,
    };

    try {
      await validateStorySchema.validate(data);

      if (create) {
        create(data);
      }

      if (update) {
        update(data);
      }
      setCreateEditError("");
    } catch (err) {
      setCreateEditError(err.errors);
    }
  };

  return (
    <ConfirmationForm
      ref={ref}
      color={"information"}
      actionsAlignment={"center"}
      actions={
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ErrorValidation>{createEditError}</ErrorValidation>
          </div>
          <TextInput
            placeholder="Name"
            value={name}
            onChange={(e) => (formValuesRef.current.newName = e.target.value)}
          />
          <Dropdown
            size="small"
            options={priorityOptions}
            defaultInputValue={priority || priorityOptions[0].value}
            onChange={(e) => (formValuesRef.current.newPriority = e.value)}
          />
          <Dropdown
            size="small"
            options={status ? statusOptions : [statusOptions[0]]}
            defaultInputValue={status || statusOptions[0].value}
            onChange={(e) => (formValuesRef.current.newStatus = e.value)}
          />
          <TextAreaInput
            minRows={8}
            maxRows={12}
            style={{ width: "350px" }}
            value={description}
            onChange={(e) =>
              (formValuesRef.current.newDescription = e.target.value)
            }
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="danger" onClick={cancel}>
              Cancel
            </Button>
            <Button color="success" onClick={onSaveHandler}>
              Save
            </Button>
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
