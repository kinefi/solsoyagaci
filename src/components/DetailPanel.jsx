import { X, Info } from 'lucide-react';
import { useDraggable } from '../hooks/useDraggable';

export default function DetailPanel({ selectedNode, setSelectedNode }) {
  // Sağ üst köşe varsayılan pozisyonu (Ekran genişliğine göre dinamik hesaplanır)
  const defaultPosition = { x: Math.max(10, window.innerWidth - 410), y: 20 };
  
  const { position, handleMouseDown, isDragging } = useDraggable(
    'detail_panel_position',
    defaultPosition
  );

  if (!selectedNode) return null;

  return (
    <div 
      className={`fixed z-30 bg-slate-800/95 backdrop-blur-md border border-slate-700/80 p-6 rounded-3xl shadow-2xl w-96 flex flex-col select-none transition-shadow ${
        isDragging ? 'shadow-cyan-500/20 cursor-grabbing' : ''
      }`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        maxHeight: 'calc(100vh - 40px)'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Draggable Header / Sürüklenebilir Üst Çubuk */}
      <div className="drag-handle flex justify-between items-center mb-4 border-b border-slate-700 pb-3 cursor-grab select-none">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">⠿</span>
          <span className="text-xs font-semibold px-2.5 py-1 bg-red-950 text-red-400 rounded-md border border-red-800/50">
            {selectedNode.group}
          </span>
        </div>
        
        <button 
          onMouseDown={(e) => e.stopPropagation()} // Sürüklemenin tetiklenmesini engeller
          onClick={() => setSelectedNode(null)} 
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50 transition cursor-pointer"
          title="Kapat"
        >
          <X size={20} />
        </button>
      </div>

      {/* İçerik Alanı */}
      <div className="overflow-y-auto space-y-4 custom-scrollbar pr-1" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        <h2 className="text-xl font-extrabold text-white leading-tight select-text">
          {selectedNode.wikipediaUrl ? (
            <a
              href={selectedNode.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-400 hover:text-blue-300 transition"
              title="Wikipedia'da aç"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {selectedNode.label}
            </a>
          ) : (
            <>{selectedNode.label}</>
          )}
        </h2>

        <div className="inline-block bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg text-xs font-mono font-semibold border border-amber-500/20 select-text">
          Kuruluş / Yıl: {selectedNode.year}
        </div>

        <div className="space-y-4 select-text">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1.5">Açıklama & Tarihçe:</span>
            <p className="text-slate-200 leading-relaxed text-sm bg-slate-900/70 p-4 rounded-xl border border-slate-800/80">
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
    </div>
  );
}