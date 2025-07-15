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
import { BsX } from "react-icons/bs";
import { cn } from "@/lib/utils";

const defaultTags = [
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

const getNextUnusedColor = (usedColors: string[]) => {
  const available = defaultTags
    .map((t) => t.color)
    .find((c) => !usedColors.includes(c));
  return available || "bg-gray-300";
};

export default function Tags({ tags, addTag, removeTag }: any) {
  const [customInput, setCustomInput] = useState("");
  const [allTags, setAllTags] = useState([...defaultTags]);

  useEffect(() => {
    const savedCustomTags = JSON.parse(
      localStorage.getItem("custom-tags") || "[]"
    );
    if (Array.isArray(savedCustomTags)) {
      setAllTags((prev) => [...prev, ...savedCustomTags]);
    }
  }, []);

  const saveNewTag = (newTag: { tag: string; color: string }) => {
    const existing = JSON.parse(localStorage.getItem("custom-tags") || "[]");
    const updated = [...existing, newTag];
    localStorage.setItem("custom-tags", JSON.stringify(updated));
  };

  const handleCustomInput = () => {
    const newTags = customInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t && !tags.some((tag: any) => tag.tag === t));

    const usedColors = tags
      .map((t: any) => t.color)
      .concat(allTags.map((t) => t.color));

    newTags.forEach((tag) => {
      const existing = allTags.find((pt) => pt.tag === tag);
      if (!existing) {
        const color = getNextUnusedColor(usedColors);
        const newTag = { tag, color };
        saveNewTag(newTag);
        setAllTags((prev) => [...prev, newTag]);
        addTag(newTag);
      } else {
        addTag(existing);
      }
    });

    setCustomInput("");
  };

  return (
    <div className="space-y-2">
      {/* Select predefined or custom tags */}
      <Select
        onValueChange={(value) => {
          const found = allTags.find((pt) => pt.tag === value);
          if (found && !tags.some((t: any) => t.tag === value)) {
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

      {/* Custom tag input */}
      <Input
        placeholder="Type and press Enter or comma to add custom tags"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            handleCustomInput();
          }
        }}
      />

      {/* Tag list */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, color }: any, index: number) => (
            <div
              key={index}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2",
                color || "bg-gray-200"
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
