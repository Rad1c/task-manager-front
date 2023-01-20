import i18next from "../localization/i18n";

const priorityOptions = [
  {
    value: "Low",
    label: i18next.t("low"),
  },
  {
    value: "Medium",
    label: i18next.t("medium"),
  },
  {
    value: "High",
    label: i18next.t("high"),
  },
];

export default priorityOptions;
