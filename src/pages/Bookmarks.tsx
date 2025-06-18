
import Header from "@/components/Header";
import BookmarkSystem from "@/components/BookmarkSystem";

export default function Bookmarks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <BookmarkSystem showBookmarksPanel={true} />
          </div>
        </section>
      </main>
    </div>
  );
}
