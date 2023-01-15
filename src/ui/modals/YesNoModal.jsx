import { ConfirmationForm } from "@lanaco/lnc-react-ui";
import React from "react";
import { Button } from "@lanaco/lnc-react-ui";

const YesNoModal = React.forwardRef((props, ref) => {
  const { yesClicked, noClicked, title, description } = props;

  return (
    <ConfirmationForm
      ref={ref}
      color={"warning"}
      actionsAlignment={"center"}
      actions={
        <>
          <Button color={"danger"} onClick={yesClicked}>
            Yes
          </Button>
          <Button onClick={noClicked}>No</Button>
        </>
      }
      title={title}
      showCloseButton={false}
    >
      {description}
    </ConfirmationForm>
  );
});

export default YesNoModal;
