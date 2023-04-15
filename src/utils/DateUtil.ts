import moment from "moment/moment";

export const date_back = (days: number) => {
  let earlier = moment().subtract(days, "days").format("YYYY-MM-DD");
  return new Date(earlier);
};

export const date_forward = (format: string, days: number) => {
  let mom = moment(format).add(days, "days").format("YYYY-MM-DD");
  return new Date(mom);
};
