import { BsBook, BsBookmark, BsGear, BsHouse } from "react-icons/bs";

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
    label: "My Account",
    icon: <BsGear />,
    key: "/account",
  },
];
