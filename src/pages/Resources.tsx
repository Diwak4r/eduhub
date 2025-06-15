
import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Code, Wrench } from "lucide-react";

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

const sectionIcons: { [key: string]: React.ReactNode } = {
  Articles: <BookOpen className="h-6 w-6 text-blue-500" />,
  Tutorials: <Code className="h-6 w-6 text-purple-500" />,
  Tools: <Wrench className="h-6 w-6 text-green-500" />,
};

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
              Learning Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Browse curated articles, tutorials, and tools to accelerate your learning journey.
            </p>
            <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <SearchBar value={search} onChange={setSearch} placeholder="Search for articles, tutorials, tools..." />
            </div>
          </div>
        </section>

        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-12">
              {filteredSections.map(
                ({ section, items }) =>
                  items.length > 0 && (
                    <div key={section} className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white rounded-xl shadow-md">
                          {sectionIcons[section]}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">{section}</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map((item, index) => (
                          <Card key={item.title} className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 bg-white/80 backdrop-blur-sm border-0 animate-fade-in-up" style={{ animationDelay: `${0.7 + index * 0.1}s` }}>
                            <CardContent className="p-6">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 mt-2">{item.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
              )}
              {filteredSections.every((s) => s.items.length === 0) && (
                <div className="text-center py-16 bg-white/50 rounded-lg shadow-sm">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">No resources found</h3>
                  <p className="text-gray-500">Try adjusting your search terms.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
