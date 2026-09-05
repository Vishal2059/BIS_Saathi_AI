import {
  Search,
  ShieldCheck,
  FlaskConical,
  Award,
  FileCheck,
} from "lucide-react";

const links = [
  { title: "Check BIS License Details", icon: FileCheck },
  { title: "Verify ISI Mark", icon: ShieldCheck },
  { title: "Find BIS Recognized Labs", icon: FlaskConical },
  { title: "Search Indian Standards", icon: Search },
  { title: "Latest BIS Updates", icon: Award },
];

function QuickLinks() {
  return (
    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

      <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
        Quick Links
      </h2>

      <div className="mt-4 space-y-2">

        {links.map((link) => {

          const Icon = link.icon;

          return (
            <button
              key={link.title}
              className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 text-left text-[9px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
            >

              <Icon size={15} className="text-blue-600 dark:text-blue-400" />

              {link.title}

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default QuickLinks;