/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { BsFunnel } from "react-icons/bs";

export function DeepFilterSheet({ DeepFilterComp }: any) {
  const [showQueryBuilder, setShowQueryBuilder] = useState<any>(false);

  return (
    <Sheet open={showQueryBuilder} onOpenChange={setShowQueryBuilder}>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-l-0 rounded-l-none">
          <BsFunnel />
        </Button>
      </SheetTrigger>
      <SheetContent className="pt-5" side="right">
        <DeepFilterComp />
      </SheetContent>
    </Sheet>
  );
}
