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
    key: "/dashboard",
  },
  {
    label: "My ONUS Bible",
    icon: <BsBook />,
    key: "/myonusbible",
  },
  {
    label: "Saved Verses",
    icon: <BsBookmark />,
    key: "/saved",
  },
  {
    label: "Quizzes",
    icon: <BsLightbulb />,
    key: "/quize",
  },

  {
    label: "Settings",
    icon: <BsGear />,
    key: "/settings",
  },
];
