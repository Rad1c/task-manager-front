import React from "react";
import { DateRangeContainer, DateSpan } from "./styled";

const DateRange = (props) => {
  const dateOn = props.dateOn;
  const dateOf = props.dateOf;
  return (
    <DateRangeContainer>
      <DateSpan>{dateOn}</DateSpan>
      {" - "}
      <DateSpan>{dateOf}</DateSpan>
    </DateRangeContainer>
  );
};

export default DateRange;
