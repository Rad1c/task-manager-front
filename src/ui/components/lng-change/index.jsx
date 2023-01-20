import { Button } from "@lanaco/lnc-react-ui";
import { useTranslation } from "react-i18next";
import { VerticalSeparator, DivLngContainer } from "./styled";

const LngChange = () => {
  const { i18n } = useTranslation();
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <DivLngContainer>
      <VerticalSeparator>
        <Button onClick={() => handleLanguageChange("en")}>En</Button>
      </VerticalSeparator>
      <Button onClick={() => handleLanguageChange("bs")}>BS</Button>
    </DivLngContainer>
  );
};

export default LngChange;
