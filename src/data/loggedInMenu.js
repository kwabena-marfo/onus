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
    key: "/app",
  },
  {
    label: "My ONUS Bible",
    icon: <BsBook />,
    key: "/app",
  },
  {
    label: "Saved Verses",
    icon: <BsBookmark />,
    key: "/app",
  },
  {
    label: "Quizzes",
    icon: <BsLightbulb />,
    key: "/app",
  },

  {
    label: "Settings",
    icon: <BsGear />,
    key: "/app",
  },
];
