import { Scale } from 'lucide-react';
import { groupsList } from '../config/graphConfig';
import { GithubIcon } from './GithubIcon';

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
          href="https://github.com/kinefi/solsoyagaci"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700/80 transition"
        >
          <GithubIcon />
          <span>Kaynak Kod</span>
        </a>
        <a
          href="https://github.com/kinefi/solsoyagaci/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition"
          title="Apache License 2.0"
        >
          <Scale size={13} />
          <span>Lisans: Apache-2.0</span>
        </a>

      </div>
    </div>
  );
}
