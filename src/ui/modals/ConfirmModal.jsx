import { ConfirmationForm } from "@lanaco/lnc-react-ui";
import React from "react";
import { Button } from "@lanaco/lnc-react-ui";
import { useTranslation } from "react-i18next";

const ConfirmModal = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  return (
    <>
      <ConfirmationForm
        ref={ref}
        actions={<Button onClick={props.okClicked}>Ok</Button>}
        title={t("registerSuccesful")}
        showCloseButton={false}
      ></ConfirmationForm>
    </>
  );
});

export default ConfirmModal;
