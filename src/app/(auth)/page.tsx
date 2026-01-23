import localFont from "next/font/local";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Eye, Compass, Brain, Archive } from "lucide-react";

const myFont = localFont({
  src: [{ path: "../../fonts/Austrian.otf", weight: "400" }],
});

type OnusFeatureProps = {
  title: string;
  description: string;
  Icon: React.ElementType;
};

function OnusFeatureModal({ title, description, Icon }: OnusFeatureProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full pr-2 flex flex-col items-center justify-center text-[#e77306] md:text-lg gap-1 hover:opacity-80 cursor-pointer">
          <span>{title}</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-1 uppercase text-[#e77306]">
            <Icon className="w-12 h-12" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-muted-foreground leading-relaxed">
          {description}
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  return (
    <div className="flex items-center flex-col w-full p-3 px-8 z-10 gap-6">
      <div className="flex justify-center items-center  divide-x-1 gap-1">
        <OnusFeatureModal
          title="Observe"
          Icon={Eye}
          description="Read and reflect on Bible verses carefully. Observe keywords, themes, and meanings to build strong spiritual awareness."
        />

        <OnusFeatureModal
          title="Navigate"
          Icon={Compass}
          description="Move easily through books, chapters, and verses. Navigate Scripture with purpose and clarity using Onus."
        />

        <OnusFeatureModal
          title="Understand"
          Icon={Brain}
          description="Gain deeper insight through context, repetition, and quizzes that help Scripture stay with you."
        />

        <OnusFeatureModal
          title="Store"
          Icon={Archive}
          description="Save verses to memory using flashcards and review tools designed for long-term retention."
        />
      </div>

      <p
        className={`${myFont.className} capitalize text-center text-4xl font-medium text-blue-800`}
      >
        Thy Word have I hid in my heart, That I might not sin against Thee -
        Psalm 119:11{" "}
      </p>

      <div className="flex flex-col items-center  gap-3  w-full text-white mt-5">
        <div className="flex flex-col justify-center items-center">
          <p className="uppercase bg-gradient-to-r from-[#0F3187] via-[#e77306] to-[#01CFFE] bg-clip-text text-5xl md:text-5xl   font-extrabold text-transparent flex items-center ">
            Memorize{" "}
          </p>
          <p className="text-gray-800 font-bold text-lg">Verses With Ease</p>
        </div>
        <div className="flex gap-3 justify-center items-center   max-w-sm w-full">
          <Link href="/login" className="w-full">
            <Button
              className="rounded-full w-full bg-[#e77306]  cursor-pointer"
              size="lg"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
