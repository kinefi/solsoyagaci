import React from 'react';
import { X, Info } from 'lucide-react';

export default function DetailPanel({ selectedNode, setSelectedNode }) {
  if (!selectedNode) return null;

  return (
    <div className="absolute top-5 right-5 z-30 bg-slate-800/95 backdrop-blur border border-slate-700 p-6 rounded-3xl shadow-2xl w-96 animate-in fade-in slide-in-from-right duration-200">
      <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
        <span className="text-xs font-semibold px-2.5 py-1 bg-red-950 text-red-400 rounded-md border border-red-800/50">
          {selectedNode.group}
        </span>
        <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white p-1">
          <X size={20} />
        </button>
      </div>

      <h2 className="text-xl font-extrabold text-white mb-2 leading-tight">{selectedNode.label}</h2>
      <div className="inline-block bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg text-xs font-mono font-semibold mb-4 border border-amber-500/20">
        Kuruluş / Yıl: {selectedNode.year}
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-1.5">Açıklama & Tarihçe:</span>
          <p className="text-slate-200 leading-relaxed text-sm bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            {selectedNode.desc}
          </p>
        </div>

        {selectedNode.crossLink && (
          <div className="bg-indigo-950/50 p-4 rounded-xl border border-indigo-800/60">
            <span className="text-xs text-indigo-300 font-bold flex items-center gap-2 mb-1">
              <Info size={16} /> Çapraz İlişki / İttifak:
            </span>
            <p className="text-xs text-slate-300 leading-normal">{selectedNode.crossLink}</p>
          </div>
        )}
      </div>
    </div>
  );
}
