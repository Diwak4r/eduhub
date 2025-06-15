
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

const mockResources = [
  {
    section: "Articles",
    items: [
      { title: "The Power of Lifelong Learning", description: "Explore why continuous learning matters in today’s world." },
      { title: "Skill Building in the Digital Age", description: "Tips for quickly picking up new digital skills." },
    ],
  },
  {
    section: "Tutorials",
    items: [
      { title: "JavaScript for Beginners", description: "A step-by-step introduction with examples." },
      { title: "Design Basics: Color and Typography", description: "Get started with visual design principles." },
    ],
  },
  {
    section: "Tools",
    items: [
      { title: "Free Online Code Editor", description: "Experiment with code in your browser, no setup needed." },
      { title: "Resume Builder", description: "Craft a professional resume in minutes." },
    ],
  },
];

export default function Resources() {
  const [search, setSearch] = useState("");
  const filteredSections = mockResources.map(({ section, items }) => ({
    section,
    items: items.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Resources</h1>
      <p className="mb-8 text-gray-600">Browse curated articles, tutorials, and tools to accelerate your learning journey.</p>
      <SearchBar value={search} onChange={setSearch} placeholder="Search resources..." />

      <div className="mt-6 space-y-10">
        {filteredSections.map(
          ({ section, items }) =>
            items.length > 0 && (
              <div key={section}>
                <h2 className="text-xl font-semibold mb-4">{section}</h2>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.title} className="p-4 bg-white rounded-lg shadow-sm border">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-500">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
        {filteredSections.every((s) => s.items.length === 0) && (
          <div className="text-gray-400 text-center py-12">No resources found.</div>
        )}
      </div>
    </div>
  );
}
