import { useTranslation } from "react-i18next";
import { ErrorPageContainer, ErrorDiv, ErrorText } from "./styled";

const Error = () => {
  const { t } = useTranslation();
  return (
    <>
      <ErrorPageContainer>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ErrorDiv />
          <ErrorText>{t("pageNotFound")}</ErrorText>
        </div>
      </ErrorPageContainer>
    </>
  );
};

export default Error;
