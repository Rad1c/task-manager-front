import {
  ConfirmationForm,
  DateInput,
  Dropdown,
  TextAreaInput,
  TextInput,
} from "@lanaco/lnc-react-ui";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@lanaco/lnc-react-ui";
import statusOptions from "../../enums/statusOptionsEnum";
import priorityOptions from "../../enums/priorityOptionsEnum";
import { validateTaskSchema } from "../../validation/validator";
import { ErrorValidation } from "../components/common-styles";
import { reverseDateString } from "../../utils/helper";
import { useTranslation } from "react-i18next";

const CreateEditTaskModal = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [createEditError, setCreateEditError] = useState();
  const {
    title,
    cancel,
    status,
    name,
    description,
    dateOn,
    dateOf,
    create,
    update,
    priority,
    storyId,
  } = props;

  const tmp = new Date().toISOString().slice(0, 10).split("-");

  const formValuesRef = useRef({
    newStatus: status || statusOptions[0].value,
    newPriority: priority || priorityOptions[0].value,
    newName: name,
    newDescription: description,
    newDateOn: dateOn ? reverseDateString(dateOn) : reverseDateString(new Date().toISOString()),
    newDateOf: dateOf && reverseDateString(dateOf),
  });

  const onSaveHandler = async () => {
    const data = {
      name: formValuesRef.current.newName,
      dateOn: formValuesRef.current.newDateOn,
      dateOf: formValuesRef.current.newDateOf,
      status: formValuesRef.current.newStatus,
      priority: formValuesRef.current.newPriority,
      description: formValuesRef.current.newDescription,
      storyId,
    };

    try {
      const valid = await validateTaskSchema.validate(data);

      console.log(valid);

      if (create) {
        create({ ...data, storyId });
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
            placeholder={t("name")}
            value={name}
            onChange={(e) => (formValuesRef.current.newName = e.target.value)}
          />
          <DateInput
            size="small"
            format="yyyy-MM-DD"
            onChange={(_, d) => (formValuesRef.current.newDateOn = d.slice(0, 10))}
            value={formValuesRef.current.newDateOn}
          />
          <DateInput
            size="small"
            format="yyyy-MM-DD"
            onChange={(_, d) => (formValuesRef.current.newDateOf = d.slice(0, 10))}
            value={dateOf && formValuesRef.current.newDateOf}
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
            minRows={12}
            maxRows={15}
            style={{ width: "420px" }}
            value={description}
            onChange={(e) => (formValuesRef.current.newDescription = e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="danger" onClick={cancel}>
              {t("cancel")}
            </Button>
            <Button color="success" onClick={onSaveHandler}>
              {t("save")}
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

export default CreateEditTaskModal;
