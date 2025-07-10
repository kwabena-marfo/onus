import {
  BsBook,
  BsBookmark,
  BsGear,
  BsHouse,
  BsLightbulb,
} from "react-icons/bs";

export default [
  {
    label: "Dashboard",
    icon: <BsHouse />,
    key: "/app/dashboard",
  },
  {
    label: "My ONUS Bible",
    icon: <BsBook />,
    key: "/app/myonusbible",
  },
  {
    label: "Saved Verses",
    icon: <BsBookmark />,
    key: "/app/saved",
  },
  {
    label: "Quizzes",
    icon: <BsLightbulb />,
    key: "/app/quizzes",
  },

  {
    label: "My Account",
    icon: <BsGear />,
    key: "/app/myaccount",
  },
];
