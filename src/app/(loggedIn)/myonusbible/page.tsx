/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

import Content from "@/components/loggedIn/global/content";
import VerseFlashCardModal from "@/components/loggedIn/global/verseFlashcard";

export default function Dashboard() {
  return (
    <Content
      tittle="My Onus Bible"
      Icon={() => (
        <Image
          priority
          width={25}
          height={25}
          src="/imgs/logos/onusKnot.png"
          alt="logo"
        />
      )}
    >
      <div className="grid  w-full  md:gap-6 gap-4 mt-6">
        <div className="grid h-fit  gap-2 ">
          <p className="md:text-2xl text-lg  font-bold">Old Testament</p>

          <div className="grid h-fit justify-center items-center md:grid-cols-6 grid-cols-2  gap-3 md:pr-2 pb-2">
            {[
              "Genesis",
              "Exodus",
              "Leviticus",
              "Numbers",
              "Deuteronomy",
              "Joshua",
              "Judges",
              "Ruth",
              "1 Samuel",
              "2 Samuel",
              "1 Kings",
              "2 Kings",
              "1 Chronicles",
              "2 Chronicles",
              "Ezra",
              "Nehemiah",
              "Esther",
              "Job",
              "Psalms",
              "Proverbs",
              "Ecclesiastes",
              "Song of Solomon",
              "Isaiah",
              "Jeremiah",
              "Lamentations",
              "Ezekiel",
              "Daniel",
              "Hosea",
              "Joel",
              "Amos",
              "Obadiah",
              "Jonah",
              "Micah",
              "Nahum",
              "Habakkuk",
              "Zephaniah",
              "Haggai",
              "Zechariah",
              "Malachi",
            ].map((label, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg  gap-0 p-2 bg-gray-50 border cursor-pointer border-l-3 border-l-[#8C15E8] hover:bg-[#8C15E8]/10"
              >
                <VerseFlashCardModal
                  label={label}
                  TriggerComp={() => (
                    <>
                      <p className="md:text-xl text-left text-lg text-gray-700 font-bold">
                        {label}
                      </p>
                      <p className="text-left">5 Verses</p>
                    </>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid h-fit  w-full gap-2 ">
          <p className="md:text-2xl text-lg  font-bold">New Testament</p>
          <div className="grid justify-center items-center md:grid-cols-6 grid-cols-2 gap-3  h-fit ">
            {[
              "Matthew",
              "Mark",
              "Luke",
              "John",
              "Acts",
              "Romans",
              "1 Corinthians",
              "2 Corinthians",
              "Galatians",
              "Ephesians",
              "Philippians",
              "Colossians",
              "1 Thessalonians",
              "2 Thessalonians",
              "1 Timothy",
              "2 Timothy",
              "Titus",
              "Philemon",
              "Hebrews",
              "James",
              "1 Peter",
              "2 Peter",
              "1 John",
              "2 John",
              "3 John",
              "Jude",
              "Revelation",
            ].map((label, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg  gap-0 p-2 bg-gray-50 border cursor-pointer border-l-3 border-l-[#0F3187] hover:bg-[#0F3187]/10"
              >
                <VerseFlashCardModal
                  label={label}
                  TriggerComp={() => (
                    <>
                      <p className="md:text-xl text-left text-lg text-gray-700 font-bold">
                        {label}
                      </p>
                      <p className="text-left">5 Verses</p>
                    </>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Content>
  );
}
