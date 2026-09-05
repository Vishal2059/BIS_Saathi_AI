import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import Sources from "../components/Sources";
import QuickLinks from "../components/QuickLinks";
import Header from "../components/Header";

function Assistant() {
  return (
    <div className="h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="ml-[245px] h-screen overflow-hidden">

        {/* Header */}
        <Header />

        {/* Content */}
        <div className="flex h-[calc(100vh-76px)] gap-4 p-4">

          {/* Chat */}
          <div className="min-w-0 min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            <ChatArea />

          </div>

          {/* Right Panel */}
          <aside className="hidden h-full w-[290px] shrink-0 overflow-y-auto xl:block">

            <Sources />

            <QuickLinks />

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Assistant;