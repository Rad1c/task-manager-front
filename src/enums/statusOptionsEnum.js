import i18next from "../localization/i18n";

const statusOptions = [
  {
    value: "New",
    label: i18next.t("new"),
  },
  {
    value: "Active",
    label: i18next.t("active"),
  },
  {
    value: "Resolved",
    label: i18next.t("resolved"),
  },
  {
    value: "Closed",
    label: i18next.t("closed"),
  },
];

export default statusOptions;
