
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up pb-2">
              About RiverSkills
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              The story behind our mission to make learning flow naturally.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-left flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex-shrink-0 text-center">
                <Avatar className="w-32 h-32 md:w-48 md:h-48 border-4 border-white shadow-lg mx-auto">
                  <AvatarImage src="/placeholder.svg" alt="Diwakar Ray Yadav" />
                  <AvatarFallback>DRY</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">Diwakar Ray Yadav</h2>
                <p className="text-gray-500">Founder & Creator</p>
              </div>
              <div className="flex-grow">
                <p className="text-lg text-gray-700 mb-6 italic">
                  "Welcome to <span className="font-bold text-blue-600">RiverSkills</span>! I created this platform to help people like you flow through the world of learning."
                </p>
                <p className="text-gray-600 mb-6">
                  I've always been passionate about helping others grow, and I wanted to build a space where anyone can gain new skills in an easy and engaging way. RiverSkills is designed to make learning feel like a natural part of your journey.
                </p>
                <div className="space-y-6 border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">My Motivation</h3>
                      <p className="text-gray-600">
                        From early on, I recognized the challenges people face when navigating new knowledge and career paths. With RiverSkills, my vision is to break down barriers to learning—making education accessible, practical, and inspiring for everyone.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full flex-shrink-0">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">My Journey</h3>
                      <p className="text-gray-600">
                        As an educator and lifelong learner myself, I've gathered the best resources and tools to support your personal growth. Every feature on RiverSkills reflects my commitment to making learning smooth, meaningful, and enjoyable.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-lg font-semibold text-gray-800 text-center md:text-right">
                  Join me, and let's explore new possibilities together!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
