/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Content({ tittle, Icon, children, MainMenu }: any) {
  return (
    <div className="px-4 md:left-1/6 md:w-5/6 py-20 md:pb-4 relative">
      <div className="flex items-center  text-gray-700  justify-start flex-wrap gap-2 mb-4">
        <Icon className="w-9 h-9" />

        <h4 className="text-3xl md:text-4xl font-bold">{tittle}</h4>
        {MainMenu ? <MainMenu /> : null}
      </div>

      {children}
    </div>
  );
}
