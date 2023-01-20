import { ConfirmationForm } from "@lanaco/lnc-react-ui";
import React from "react";
import { Button } from "@lanaco/lnc-react-ui";
import { useTranslation } from "react-i18next";

const YesNoModal = React.forwardRef((props, ref) => {
  const { yesClicked, noClicked, title, description } = props;
  const { t } = useTranslation();

  return (
    <ConfirmationForm
      ref={ref}
      color={"warning"}
      actionsAlignment={"center"}
      actions={
        <>
          <Button color={"danger"} onClick={yesClicked}>
            {t("yes")}
          </Button>
          <Button onClick={noClicked}>{t("no")}</Button>
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
