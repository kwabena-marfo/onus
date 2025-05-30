import {
  BsBook,
  BsGear,
  BsHouse,
  BsJournalCheck,
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
    icon: <BsJournalCheck />,
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
