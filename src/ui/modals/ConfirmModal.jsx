import { ConfirmationForm } from "@lanaco/lnc-react-ui";
import React from "react";
import { Button } from "@lanaco/lnc-react-ui";

const ConfirmModal = React.forwardRef((props, ref) => {
  return (
    <>
      <ConfirmationForm
        ref={ref}
        actions={<Button onClick={props.okClicked}>Ok</Button>}
        title={"Registration successful"}
        showCloseButton={false}
      ></ConfirmationForm>
    </>
  );
});

export default ConfirmModal;
