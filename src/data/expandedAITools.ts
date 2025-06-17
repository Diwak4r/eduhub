
export interface AITool {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  url: string;
  pricing: string;
  features: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export const aiTools: AITool[] = [
  // Development Tools
  {
    id: 1,
    name: "GitHub Copilot",
    description: "AI-powered code completion and programming assistant",
    category: "Development",
    image: "/placeholder.svg",
    url: "https://github.com/features/copilot",
    pricing: "Free for students",
    features: ["Code completion", "Multi-language support", "Context-aware suggestions"],
    isFeatured: true
  },
  {
    id: 2,
    name: "Replit AI",
    description: "AI assistant for coding, debugging, and explaining code",
    category: "Development",
    image: "/placeholder.svg",
    url: "https://replit.com",
    pricing: "Free tier available",
    features: ["Code generation", "Bug fixing", "Code explanation"],
    isNew: true
  },
  {
    id: 3,
    name: "Tabnine",
    description: "AI code completion for all programming languages",
    category: "Development",
    image: "/placeholder.svg",
    url: "https://tabnine.com",
    pricing: "Free tier available",
    features: ["Auto-completion", "Code suggestions", "Team learning"]
  },
  {
    id: 4,
    name: "Codex by OpenAI",
    description: "AI system that translates natural language to code",
    category: "Development",
    image: "/placeholder.svg",
    url: "https://openai.com/codex",
    pricing: "Free trial available",
    features: ["Natural language to code", "Multiple languages", "Code explanation"]
  },
  {
    id: 5,
    name: "Cursor",
    description: "AI-first code editor built for pair programming with AI",
    category: "Development",
    image: "/placeholder.svg",
    url: "https://cursor.sh",
    pricing: "Free",
    features: ["AI pair programming", "Code editing", "Natural language commands"]
  },

  // Design Tools
  {
    id: 6,
    name: "Figma AI",
    description: "AI-powered design assistant in Figma",
    category: "Design",
    image: "/placeholder.svg",
    url: "https://figma.com",
    pricing: "Free tier available",
    features: ["Design automation", "Asset generation", "Layout suggestions"],
    isFeatured: true
  },
  {
    id: 7,
    name: "Canva Magic Design",
    description: "AI-powered design creation and editing",
    category: "Design",
    image: "/placeholder.svg",
    url: "https://canva.com",
    pricing: "Free tier available",
    features: ["Auto design", "Background removal", "Magic resize"]
  },
  {
    id: 8,
    name: "DALL-E 2",
    description: "AI system that creates realistic images from text descriptions",
    category: "Design",
    image: "/placeholder.svg",
    url: "https://openai.com/dall-e-2",
    pricing: "Free credits monthly",
    features: ["Text to image", "Image editing", "Style variations"]
  },
  {
    id: 9,
    name: "Midjourney",
    description: "AI art generator that creates images from text prompts",
    category: "Design",
    image: "/placeholder.svg",
    url: "https://midjourney.com",
    pricing: "Free trial available",
    features: ["Art generation", "Style control", "High quality images"]
  },
  {
    id: 10,
    name: "Stable Diffusion",
    description: "Open-source AI image generation model",
    category: "Design",
    image: "/placeholder.svg",
    url: "https://stability.ai",
    pricing: "Free (open source)",
    features: ["Image generation", "Local installation", "Customizable models"]
  },

  // Learning Tools
  {
    id: 11,
    name: "ChatGPT",
    description: "AI chatbot for learning, coding help, and explanations",
    category: "Learning",
    image: "/placeholder.svg",
    url: "https://chat.openai.com",
    pricing: "Free tier available",
    features: ["Code help", "Explanations", "Learning assistance"],
    isFeatured: true
  },
  {
    id: 12,
    name: "Claude",
    description: "AI assistant for analysis, research, and learning",
    category: "Learning",
    image: "/placeholder.svg",
    url: "https://claude.ai",
    pricing: "Free tier available",
    features: ["Research help", "Document analysis", "Learning support"]
  },
  {
    id: 13,
    name: "Perplexity AI",
    description: "AI-powered search engine for research and learning",
    category: "Learning",
    image: "/placeholder.svg",
    url: "https://perplexity.ai",
    pricing: "Free tier available",
    features: ["Research assistance", "Source citations", "Real-time information"]
  },
  {
    id: 14,
    name: "Socratic by Google",
    description: "AI-powered homework helper for students",
    category: "Learning",
    image: "/placeholder.svg",
    url: "https://socratic.org",
    pricing: "Free",
    features: ["Homework help", "Step-by-step solutions", "Multiple subjects"]
  },
  {
    id: 15,
    name: "Khan Academy Khanmigo",
    description: "AI tutor for personalized learning",
    category: "Learning",
    image: "/placeholder.svg",
    url: "https://khanacademy.org",
    pricing: "Free",
    features: ["Personalized tutoring", "Learning paths", "Progress tracking"]
  },

  // API and Integration Tools
  {
    id: 16,
    name: "Postman AI",
    description: "AI-powered API testing and development",
    category: "Development",
    image: "/placeholder.svg",
    url: "https://postman.com",
    pricing: "Free tier available",
    features: ["API testing", "Documentation generation", "Test automation"]
  },
  {
    id: 17,
    name: "Zapier AI",
    description: "AI-powered automation between apps",
    category: "Productivity",
    image: "/placeholder.svg",
    url: "https://zapier.com",
    pricing: "Free tier available",
    features: ["Workflow automation", "App integration", "AI suggestions"]
  },
  {
    id: 18,
    name: "Notion AI",
    description: "AI writing assistant built into Notion",
    category: "Productivity",
    image: "/placeholder.svg",
    url: "https://notion.so",
    pricing: "Free trial available",
    features: ["Writing assistance", "Content generation", "Data analysis"]
  },

  // Free Text and Content Tools
  {
    id: 19,
    name: "Grammarly",
    description: "AI-powered writing assistant and grammar checker",
    category: "Writing",
    image: "/placeholder.svg",
    url: "https://grammarly.com",
    pricing: "Free tier available",
    features: ["Grammar checking", "Style suggestions", "Plagiarism detection"]
  },
  {
    id: 20,
    name: "QuillBot",
    description: "AI paraphrasing and writing enhancement tool",
    category: "Writing",
    image: "/placeholder.svg",
    url: "https://quillbot.com",
    pricing: "Free tier available",
    features: ["Paraphrasing", "Grammar checking", "Summarization"]
  },

  // Additional Free Tools
  {
    id: 21,
    name: "Hugging Face",
    description: "Open-source AI models and tools platform",
    category: "Development",
    image: "/placeholder.svg",
    url: "https://huggingface.co",
    pricing: "Free",
    features: ["Pre-trained models", "Model hosting", "AI demos"],
    isNew: true
  },
  {
    id: 22,
    name: "Google Colab",
    description: "Free cloud-based Jupyter notebook environment",
    category: "Development",
    image: "/placeholder.svg",
    url: "https://colab.research.google.com",
    pricing: "Free",
    features: ["GPU access", "Python environment", "Collaborative coding"]
  },
  {
    id: 23,
    name: "Teachable Machine",
    description: "Easy-to-use tool for creating machine learning models",
    category: "Learning",
    image: "/placeholder.svg",
    url: "https://teachablemachine.withgoogle.com",
    pricing: "Free",
    features: ["No-code ML", "Image recognition", "Sound classification"]
  },
  {
    id: 24,
    name: "RunwayML",
    description: "Creative AI tools for content creation",
    category: "Design",
    image: "/placeholder.svg",
    url: "https://runwayml.com",
    pricing: "Free tier available",
    features: ["Video editing", "Image generation", "Creative effects"]
  },
  {
    id: 25,
    name: "Poe by Quora",
    description: "Access to multiple AI chatbots in one platform",
    category: "Learning",
    image: "/placeholder.svg",
    url: "https://poe.com",
    pricing: "Free tier available",
    features: ["Multiple AI models", "Chat interface", "Learning assistance"]
  }
];
