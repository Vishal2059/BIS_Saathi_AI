import {
  FileText,
  ExternalLink,
} from "lucide-react";

const sources = [
  {
    title: "IS 17556:2021",
    subtitle: "Stainless Steel Water Bottle – Specification",
    section: "View Clause 4.1, 5.2, 6.1",
  },
  {
    title: "BIS Conformity Assessment Schemes",
    subtitle: "Scheme-I Guidelines",
    section: "View Section 2.1, 2.2",
  },
  {
    title: "Product Certification Manual",
    subtitle: "PCD-01: General Guidelines",
    section: "View Section 3, 4, 5",
  },
  {
    title: "Marking & Labelling Guidelines",
    subtitle: "For ISI Marked Products",
    section: "View Section 7",
  },
];

function Sources() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center justify-between px-5 py-5">

        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
          Sources
        </h2>

        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
          4
        </span>

      </div>

      <div className="px-5">

        {sources.map((source) => (
          <div
            key={source.title}
            className="border-t border-slate-100 py-4 dark:border-slate-800"
          >

            <div className="flex gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
                <FileText size={16} />
              </div>

              <div className="min-w-0">

                <h3 className="text-[10px] font-bold text-slate-700 dark:text-slate-200">
                  {source.title}
                </h3>

                <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">
                  {source.subtitle}
                </p>

                <button className="mt-2 text-[9px] font-semibold text-blue-600 hover:underline dark:text-blue-400">
                  {source.section}
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

      <button className="flex w-full items-center justify-center gap-2 border-t border-slate-100 py-4 text-[10px] font-semibold text-blue-600 hover:bg-blue-50 dark:border-slate-800 dark:text-blue-400 dark:hover:bg-blue-950/30">
        View More Sources
        <ExternalLink size={12} />
      </button>

    </div>
  );
}

export default Sources;