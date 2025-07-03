import ProfileSidebar from "../components/ProfileSidebar";
import Wall from "../components/Wall";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e9ebee] font-sans">
      {/* Header Bar */}
      <header className="bg-blue-600 text-white px-6 py-3 text-lg font-semibold shadow">
        wall
      </header>
      {/* Main Content */}
      <div className="flex flex-col sm:flex-row justify-start items-start gap-4 w-full min-h-[calc(100vh-56px)] p-4">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-full sm:w-80">
          <ProfileSidebar />
        </div>
        {/* Wall Area */}
        <main className="flex-1 w-full">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200 w-full px-4">
            <Wall />
          </div>
        </main>
      </div>
    </div>
  );
}

