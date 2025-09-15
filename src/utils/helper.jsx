import moment from "moment";

export const showPrice = (price) => price?.toFixed(2);

export const showImage = (image) =>
  import.meta.env.VITE_IMAGE_URL + "/" + image;

export const getUserAccount = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const isLoggedIn = () => {
  const user = getUserAccount();

  return !!user?.api_token;
};

export const showNotifiDate = (getDate) => {
  const notfiDate = moment.utc(getDate).local();
  const curDate = moment.utc(moment()).local();
  const units = [
    {
      name: "year",
      plural: "years",
    },
    {
      name: "month",
      plural: "months",
    },
    {
      name: "week",
      plural: "weeks",
    },
    {
      name: "day",
      plural: "days",
    },
    {
      name: "hour",
      plural: "hours",
    },
    {
      name: "minute",
      plural: "minutes",
    },
    {
      name: "second",
      plural: "seconds",
    },
  ];
  for(let unit of units){
    const diff = curDate.diff(notfiDate, unit.name)
    const label = diff > 1   ? unit.plural : unit.name
    return `${diff} ${label} ago`
  }
};
