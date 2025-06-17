
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Header />
      <main className="pt-20">
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <Dashboard />
          </div>
        </section>
      </main>
    </div>
  );
}
