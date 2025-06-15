
import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  capabilities: string[];
  pricing: "Free" | "Freemium" | "Paid";
}

const aiTools: AITool[] = [
  // Text Generation & Writing
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Advanced AI chatbot for conversations, writing, and problem-solving",
    url: "https://chat.openai.com",
    category: "Text Generation",
    capabilities: ["Writing", "Coding", "Analysis", "Problem Solving"],
    pricing: "Freemium"
  },
  {
    id: "claude",
    name: "Claude",
    description: "AI assistant by Anthropic for writing, analysis, and creative tasks",
    url: "https://claude.ai",
    category: "Text Generation",
    capabilities: ["Writing", "Analysis", "Research", "Code Review"],
    pricing: "Freemium"
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's AI for conversations, writing, and multimodal tasks",
    url: "https://gemini.google.com",
    category: "Text Generation",
    capabilities: ["Writing", "Research", "Multimodal", "Integration"],
    pricing: "Freemium"
  },
  {
    id: "writesonic",
    name: "Writesonic",
    description: "AI writing assistant for marketing copy, blogs, and ads",
    url: "https://writesonic.com",
    category: "Text Generation",
    capabilities: ["Marketing Copy", "Blog Writing", "Ad Copy", "SEO"],
    pricing: "Freemium"
  },
  {
    id: "jasper",
    name: "Jasper",
    description: "AI content platform for marketing teams and businesses",
    url: "https://jasper.ai",
    category: "Text Generation",
    capabilities: ["Marketing", "Brand Voice", "Templates", "Team Collaboration"],
    pricing: "Paid"
  },

  // Presentations & Design
  {
    id: "gamma",
    name: "Gamma",
    description: "AI-powered presentation maker with beautiful templates",
    url: "https://gamma.app",
    category: "Presentations",
    capabilities: ["Presentation Design", "Templates", "Collaboration", "Export"],
    pricing: "Freemium"
  },
  {
    id: "tome",
    name: "Tome",
    description: "AI storytelling platform for presentations and narratives",
    url: "https://tome.app",
    category: "Presentations",
    capabilities: ["Storytelling", "Interactive Content", "Templates", "Sharing"],
    pricing: "Freemium"
  },
  {
    id: "canva-ai",
    name: "Canva AI",
    description: "Design platform with AI-powered design suggestions",
    url: "https://canva.com",
    category: "Design",
    capabilities: ["Graphic Design", "Templates", "AI Suggestions", "Collaboration"],
    pricing: "Freemium"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "AI image generator for creating stunning artwork and visuals",
    url: "https://midjourney.com",
    category: "Image Generation",
    capabilities: ["Art Generation", "Style Transfer", "High Quality", "Creative"],
    pricing: "Paid"
  },
  {
    id: "dall-e",
    name: "DALL-E 3",
    description: "OpenAI's image generator for creating images from text descriptions",
    url: "https://openai.com/dall-e-3",
    category: "Image Generation",
    capabilities: ["Text-to-Image", "High Quality", "Creative", "Prompt Following"],
    pricing: "Paid"
  },

  // Code & Development
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster",
    url: "https://github.com/features/copilot",
    category: "Code Generation",
    capabilities: ["Code Completion", "Multiple Languages", "Context Aware", "IDE Integration"],
    pricing: "Paid"
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-powered code editor built for productivity",
    url: "https://cursor.sh",
    category: "Code Generation",
    capabilities: ["AI Code Editor", "Chat with Code", "Debugging", "Refactoring"],
    pricing: "Freemium"
  },
  {
    id: "codeium",
    name: "Codeium",
    description: "Free AI-powered code completion and chat",
    url: "https://codeium.com",
    category: "Code Generation",
    capabilities: ["Code Completion", "AI Chat", "Multiple IDEs", "Free Tier"],
    pricing: "Freemium"
  },
  {
    id: "replit-ai",
    name: "Replit AI",
    description: "AI assistant integrated into the Replit coding environment",
    url: "https://replit.com",
    category: "Code Generation",
    capabilities: ["Code Generation", "Debugging", "Explanation", "Cloud IDE"],
    pricing: "Freemium"
  },

  // Video & Audio
  {
    id: "runway",
    name: "Runway",
    description: "AI-powered video generation and editing platform",
    url: "https://runwayml.com",
    category: "Video Generation",
    capabilities: ["Video Generation", "Video Editing", "AI Effects", "Text-to-Video"],
    pricing: "Freemium"
  },
  {
    id: "synthesia",
    name: "Synthesia",
    description: "AI video generation platform with virtual avatars",
    url: "https://synthesia.io",
    category: "Video Generation",
    capabilities: ["Avatar Videos", "Text-to-Speech", "Multiple Languages", "Professional"],
    pricing: "Paid"
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "AI voice generator with realistic speech synthesis",
    url: "https://elevenlabs.io",
    category: "Audio Generation",
    capabilities: ["Voice Cloning", "Text-to-Speech", "Multiple Languages", "Realistic"],
    pricing: "Freemium"
  },
  {
    id: "murf",
    name: "Murf",
    description: "AI voice generator for voiceovers and narration",
    url: "https://murf.ai",
    category: "Audio Generation",
    capabilities: ["Professional Voices", "Voiceovers", "Multiple Accents", "Studio Quality"],
    pricing: "Freemium"
  },

  // Research & Analysis
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI-powered search engine and research assistant",
    url: "https://perplexity.ai",
    category: "Research",
    capabilities: ["Real-time Search", "Source Citations", "Research", "Q&A"],
    pricing: "Freemium"
  },
  {
    id: "consensus",
    name: "Consensus",
    description: "AI search engine for scientific research papers",
    url: "https://consensus.app",
    category: "Research",
    capabilities: ["Scientific Papers", "Evidence-based", "Citations", "Academic Research"],
    pricing: "Freemium"
  },
  {
    id: "scholarai",
    name: "ScholarAI",
    description: "AI research assistant for academic papers and studies",
    url: "https://scholarai.io",
    category: "Research",
    capabilities: ["Academic Research", "Paper Analysis", "Literature Review", "Citations"],
    pricing: "Freemium"
  },

  // Productivity & Business
  {
    id: "notion-ai",
    name: "Notion AI",
    description: "AI assistant integrated into Notion workspace",
    url: "https://notion.so/product/ai",
    category: "Productivity",
    capabilities: ["Writing Assistant", "Summarization", "Brainstorming", "Organization"],
    pricing: "Paid"
  },
  {
    id: "grammarly",
    name: "Grammarly",
    description: "AI writing assistant for grammar, style, and tone",
    url: "https://grammarly.com",
    category: "Writing Assistant",
    capabilities: ["Grammar Check", "Style Suggestions", "Tone Detection", "Plagiarism"],
    pricing: "Freemium"
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    description: "AI copywriting tool for marketing and sales content",
    url: "https://copy.ai",
    category: "Marketing",
    capabilities: ["Marketing Copy", "Sales Content", "Templates", "Workflows"],
    pricing: "Freemium"
  },

  // Data & Analytics
  {
    id: "julius-ai",
    name: "Julius AI",
    description: "AI data analyst that helps analyze and visualize data",
    url: "https://julius.ai",
    category: "Data Analysis",
    capabilities: ["Data Analysis", "Visualization", "Python Code", "Statistics"],
    pricing: "Freemium"
  },
  {
    id: "tableau-ai",
    name: "Tableau AI",
    description: "AI-powered data visualization and analytics platform",
    url: "https://tableau.com",
    category: "Data Analysis",
    capabilities: ["Data Visualization", "Analytics", "Dashboards", "Business Intelligence"],
    pricing: "Paid"
  },

  // Education & Learning
  {
    id: "khan-academy-ai",
    name: "Khanmigo",
    description: "Khan Academy's AI tutor for personalized learning",
    url: "https://khanacademy.org/khan-labs",
    category: "Education",
    capabilities: ["Tutoring", "Personalized Learning", "Math Help", "Educational"],
    pricing: "Paid"
  },
  {
    id: "socratic",
    name: "Socratic by Google",
    description: "AI homework help app for students",
    url: "https://socratic.org",
    category: "Education",
    capabilities: ["Homework Help", "Step-by-step Solutions", "Visual Learning", "Subject Coverage"],
    pricing: "Free"
  },

  // Translation & Language
  {
    id: "deepl",
    name: "DeepL",
    description: "AI-powered translation service with high accuracy",
    url: "https://deepl.com",
    category: "Translation",
    capabilities: ["Translation", "Multiple Languages", "Context Aware", "Professional"],
    pricing: "Freemium"
  },
  {
    id: "duolingo-ai",
    name: "Duolingo Max",
    description: "AI-powered language learning with GPT-4 integration",
    url: "https://duolingo.com",
    category: "Language Learning",
    capabilities: ["Language Learning", "Conversation Practice", "Personalized", "Gamified"],
    pricing: "Freemium"
  },

  // Creative & Entertainment
  {
    id: "character-ai",
    name: "Character.AI",
    description: "Chat with AI characters and create your own",
    url: "https://character.ai",
    category: "Entertainment",
    capabilities: ["Character Chat", "Creative Writing", "Roleplay", "Entertainment"],
    pricing: "Freemium"
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    description: "Open-source AI image generator",
    url: "https://stability.ai",
    category: "Image Generation",
    capabilities: ["Open Source", "Image Generation", "Customizable", "Art Creation"],
    pricing: "Free"
  }
];

const categories = Array.from(new Set(aiTools.map(tool => tool.category)));

const categoryColors: { [key: string]: string } = {
  "Text Generation": "bg-blue-100 text-blue-800 border-blue-200",
  "Presentations": "bg-purple-100 text-purple-800 border-purple-200",
  "Design": "bg-pink-100 text-pink-800 border-pink-200",
  "Image Generation": "bg-green-100 text-green-800 border-green-200",
  "Code Generation": "bg-gray-100 text-gray-800 border-gray-200",
  "Video Generation": "bg-red-100 text-red-800 border-red-200",
  "Audio Generation": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Research": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Productivity": "bg-teal-100 text-teal-800 border-teal-200",
  "Writing Assistant": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Marketing": "bg-orange-100 text-orange-800 border-orange-200",
  "Data Analysis": "bg-violet-100 text-violet-800 border-violet-200",
  "Education": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Translation": "bg-lime-100 text-lime-800 border-lime-200",
  "Language Learning": "bg-rose-100 text-rose-800 border-rose-200",
  "Entertainment": "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200"
};

const pricingColors: { [key: string]: string } = {
  "Free": "bg-green-100 text-green-800",
  "Freemium": "bg-blue-100 text-blue-800",
  "Paid": "bg-orange-100 text-orange-800"
};

export default function AITools() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.capabilities.some(cap => cap.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in-up">
                  AI Tools Directory
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Discover the best AI tools for your needs. From text generation to image creation, find the perfect AI assistant for any task.
              </p>
              
              <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <SearchBar 
                  value={search} 
                  onChange={setSearch} 
                  placeholder="Search for AI tools, capabilities, or use cases..." 
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === "All"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  )}
                >
                  All ({aiTools.length})
                </button>
                {categories.map(category => {
                  const count = aiTools.filter(tool => tool.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        selectedCategory === category
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      )}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <Card
                  key={tool.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm animate-fade-in-up border-t-4 border-blue-500"
                  style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                  onClick={() => handleToolClick(tool.url)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge 
                        className={cn("text-xs border", categoryColors[tool.category] || "bg-gray-100 text-gray-800")}
                        variant="outline"
                      >
                        {tool.category}
                      </Badge>
                      <Badge 
                        className={cn("text-xs", pricingColors[tool.pricing])}
                        variant="secondary"
                      >
                        {tool.pricing}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {tool.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
                        Key Capabilities
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {tool.capabilities.map(capability => (
                          <span
                            key={capability}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-blue-600 group-hover:text-blue-800 font-medium">
                        Click to explore →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-16 bg-white/50 rounded-lg shadow-sm">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No tools found</h3>
                <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
