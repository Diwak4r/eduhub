
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";

export default function Chat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up pb-2">
                Chat with Diwa
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Your intelligent AI assistant with two modes: Lite for focused RiverSkills help, or Steroids for unlimited capabilities across any topic.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <ChatInterface />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
