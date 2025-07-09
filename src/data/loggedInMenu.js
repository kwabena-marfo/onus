import { BsBook, BsBookmark, BsGear, BsHouse } from "react-icons/bs";

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
    label: "My Account",
    icon: <BsGear />,
    key: "/app/myaccount",
  },
];
