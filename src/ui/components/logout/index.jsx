import { Button } from "@lanaco/lnc-react-ui";
import { useTranslation } from "react-i18next";
import useLoginStore from "../../../store/loginStore";
import { LogoutContainer } from "./styled";

const Logout = () => {
  const { t } = useTranslation();
  const { logout } = useLoginStore();
  return (
    <>
      <LogoutContainer>
        <Button color="danger" onClick={() => logout()}>
          {t("logout")}
        </Button>
      </LogoutContainer>
    </>
  );
};

export default Logout;
