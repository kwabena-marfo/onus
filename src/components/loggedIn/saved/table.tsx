/* eslint-disable @typescript-eslint/no-explicit-any */
import useColumns from "@/hooks/saved/tableColumn";

import { DataTable } from "@/components/loggedIn/global/dataTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BsSearch } from "react-icons/bs";

export default function SavedTable({
  data: {
    setQueryMembersResults,
    setSearchQuery,
    deepFilterFunction,
    searchQuery,
    sortedMembership,
    queryMembersResults,
    mutateGetMembers,
  },
}: any) {
  const columns = useColumns({
    sortedMembership,
    setQueryMembersResults,
    mutateGetMembers,
    searchQuery,
  });

  const DeepFilterComp = () => (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-bold">Filter Search</p>
      <div className="grid grid-cols-1 flex-wrap justify-center gap-2">
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Reception Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {new Array(new Date().getFullYear() - 2015 + 1)
                .fill("")
                .map((_, index) => 2015 + index)
                .reverse()
                .map((value, key) => (
                  <SelectItem key={key} value="Self Owned">
                    {value}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="button" className="text-gray-700 w-full my-4">
        Apply Filter <BsSearch className="ml-2" />
      </Button>
    </div>
  );

  return (
    <DataTable
      DeepFilterComp={() => DeepFilterComp()}
      deepFilterFunction={deepFilterFunction}
      data={queryMembersResults || sortedMembership?.[0]?.data || []}
      columns={columns}
      sortedData={sortedMembership}
      searchQuery={searchQuery}
      setQueryMembersResults={setQueryMembersResults}
      setSearchQuery={setSearchQuery}
    />
  );
}
