/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsX } from "react-icons/bs";
import { cn } from "@/lib/utils";

type Tag = {
  tag: string;
  color: string;
};

/* ---------------- DEFAULT TAGS ---------------- */
const defaultTags: Tag[] = [
  { tag: "peace", color: "bg-blue-400" },
  { tag: "faith", color: "bg-purple-400" },
  { tag: "love", color: "bg-red-400" },
  { tag: "grace", color: "bg-pink-200" },
  { tag: "hope", color: "bg-yellow-200" },
  { tag: "joy", color: "bg-orange-200" },
  { tag: "wisdom", color: "bg-green-400" },
  { tag: "strength", color: "bg-gray-400" },
  { tag: "truth", color: "bg-indigo-400" },
  { tag: "salvation", color: "bg-teal-400" },
  { tag: "obedience", color: "bg-sky-400" },
  { tag: "righteousness", color: "bg-emerald-400" },
  { tag: "kindness", color: "bg-rose-200" },
  { tag: "discipline", color: "bg-amber-200" },
  { tag: "patience", color: "bg-fuchsia-200" },
  { tag: "humility", color: "bg-slate-400" },
  { tag: "reverence", color: "bg-yellow-400" },
  { tag: "fellowship", color: "bg-green-200" },
  { tag: "devotion", color: "bg-purple-200" },
  { tag: "holiness", color: "bg-indigo-200" },
  { tag: "light", color: "bg-zinc-200" },
  { tag: "eternity", color: "bg-cyan-400" },
  { tag: "healing", color: "bg-lime-400" },
  { tag: "purpose", color: "bg-orange-400" },
  { tag: "courage", color: "bg-red-400" },
];

/* ---------------- COLOR PICKER FALLBACK ---------------- */
const randomColors = [
  "bg-rose-400",
  "bg-lime-200",
  "bg-violet-400",
  "bg-amber-400",
  "bg-cyan-200",
  "bg-emerald-200",
  "bg-teal-200",
  "bg-fuchsia-400",
  "bg-blue-200",
  "bg-zinc-400",
  "bg-stone-300",
  "bg-sky-200",
];

const getNextUnusedColor = (used: string[]) => {
  const fromDefaults = defaultTags.find((t) => !used.includes(t.color));
  if (fromDefaults) return fromDefaults.color;
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

/* ---------------- COMPONENT ---------------- */
export default function Tags({ tags, addTag, removeTag }: any) {
  const [customInput, setCustomInput] = useState("");
  const [allTags, setAllTags] = useState<Tag[]>(defaultTags);

  /* -------- LOAD SAVED TAGS -------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("custom-tags") || "[]");
    if (Array.isArray(saved)) {
      setAllTags((prev) => [...prev, ...saved]);
    }
  }, []);

  /* -------- SAVE TAG -------- */
  const persistTag = (tag: Tag) => {
    const stored = JSON.parse(localStorage.getItem("custom-tags") || "[]");
    localStorage.setItem("custom-tags", JSON.stringify([...stored, tag]));
  };

  /* -------- ADD CUSTOM TAGS -------- */
  const handleCustomInput = () => {
    if (!customInput.trim()) return;

    const usedColors = allTags.map((t) => t.color);
    const newTags = customInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    newTags.forEach((tagName) => {
      if (tags.some((t: Tag) => t.tag === tagName)) return;

      const existing = allTags.find((t) => t.tag === tagName);
      if (existing) {
        addTag(existing);
        return;
      }

      const newTag: Tag = {
        tag: tagName,
        color: getNextUnusedColor(usedColors),
      };

      persistTag(newTag);
      setAllTags((prev) => [...prev, newTag]);
      addTag(newTag);
    });

    setCustomInput("");
  };

  return (
    <div className="space-y-1">
      {/* SELECT TAG */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm">Select Tags or Add Custom Tags</Label>
        <Select
          onValueChange={(value) => {
            const found = allTags.find((t) => t.tag === value);
            if (found && !tags.some((t: Tag) => t.tag === value)) {
              addTag(found);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto">
            {allTags.map((t) => (
              <SelectItem key={t.tag} value={t.tag}>
                {t.tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* CUSTOM INPUT */}
      <Input
        placeholder="Type tag and press Enter or comma"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            handleCustomInput();
          }
        }}
      />

      {/* SELECTED TAGS */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, color }: Tag, index: number) => (
            <div
              key={index}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2",
                color,
              )}
            >
              <span>{tag}</span>
              <BsX
                className="cursor-pointer"
                onClick={() => removeTag(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
