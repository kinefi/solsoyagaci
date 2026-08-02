import React from 'react';
import { Scale } from 'lucide-react';
import { groupsList } from '../config/graphConfig';

export default function Legend({ selectedGroups, toggleGroup }) {
  return (
    <div className="absolute top-5 left-5 z-10 bg-slate-800/90 backdrop-blur p-5 rounded-2xl border border-slate-700 shadow-xl max-w-md">
      <h1 className="text-2xl font-extrabold text-red-500">Türkiye Devrimci Hareketi</h1>
      <p className="text-sm text-slate-400 mt-1 mb-4">Tarihsel Soyağacı ve İttifaklar Ağı</p>

      <div className="space-y-2 pt-3 border-t border-slate-700">
        <div className="text-xs font-semibold text-slate-400 mb-2">Akım Filtreleri (Aç/Kapat):</div>
        <div className="grid grid-cols-2 gap-2 text-xs font-medium">
          {groupsList.map((g) => {
            const isSelected = selectedGroups.includes(g.name);
            return (
              <button
                key={g.name}
                onClick={() => toggleGroup(g.name)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition cursor-pointer text-left ${
                  isSelected
                    ? 'bg-slate-700/80 border-slate-500 text-slate-100 shadow-sm'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500 line-through opacity-50'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full shrink-0 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-30'}`}
                  style={{ backgroundColor: g.color }}
                ></span>
                <span className="truncate">{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
        <a
          href="https://github.com/kinefi/solsoyagaci/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition"
          title="Apache License 2.0"
        >
          <Scale size={13} />
          <span>Apache-2.0</span>
        </a>
        <a
          href="https://github.com/kinefi/solsoyagaci"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700/80 transition"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub Repo</span>
        </a>
      </div>
    </div>
  );
}
