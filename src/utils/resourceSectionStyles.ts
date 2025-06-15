
import React from "react";
import { BookOpen, Code, Wrench, Play, Globe, Smartphone, BookMarked } from "lucide-react";

export const sectionStyles: { [key: string]: { icon: React.ReactNode; borderColor: string } } = {
  Articles: {
    icon: React.createElement(BookOpen, { className: "h-6 w-6 text-blue-500" }),
    borderColor: "border-blue-500",
  },
  Tutorials: {
    icon: React.createElement(Code, { className: "h-6 w-6 text-purple-500" }),
    borderColor: "border-purple-500",
  },
  Tools: {
    icon: React.createElement(Wrench, { className: "h-6 w-6 text-green-500" }),
    borderColor: "border-green-500",
  },
  "Video Playlists": {
    icon: React.createElement(Play, { className: "h-6 w-6 text-red-500" }),
    borderColor: "border-red-500",
  },
  "Course Platforms": {
    icon: React.createElement(Globe, { className: "h-6 w-6 text-indigo-500" }),
    borderColor: "border-indigo-500",
  },
  "Learning Apps": {
    icon: React.createElement(Smartphone, { className: "h-6 w-6 text-pink-500" }),
    borderColor: "border-pink-500",
  },
  "Practice Platforms": {
    icon: React.createElement(Code, { className: "h-6 w-6 text-orange-500" }),
    borderColor: "border-orange-500",
  },
  "Community": {
    icon: React.createElement(BookMarked, { className: "h-6 w-6 text-teal-500" }),
    borderColor: "border-teal-500",
  },
};
