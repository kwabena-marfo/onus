import Menu from "./menu";

const Aside = () => {
  return (
    <aside
      className="fixed  top-0 left-0 bg-[#0F3187] w-1/6 h-screen pt-4 pl-3 transition-transform -translate-x-full lg:translate-x-0 z-50"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <Menu />
      </div>
    </aside>
  );
};

export default Aside;
