
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ModernIndex from "./pages/ModernIndex";
import Courses from "./pages/Courses";
import Resources from "./pages/Resources";
import AITools from "./pages/AITools";
import Chat from "./pages/Chat";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

console.log('App component loading...');

const App = () => {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<ModernIndex />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
