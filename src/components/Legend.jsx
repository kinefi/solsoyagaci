import { useState } from 'react';
import { Scale, BookOpen, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { groupsList } from '../config/graphConfig';

export default function Legend({ selectedGroups, toggleGroup, selectedLayout, setSelectedLayout, viewMode, setViewMode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Legend Ana Kartı */}
      <div
        className={`w-full transition-all duration-300 ${
          isOpen ? 'block opacity-100' : 'hidden opacity-0'
        }`}
      >
        {/* Üst Başlık ve Sekmeler */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <div>
            <h1 className="text-lg font-extrabold text-red-500 leading-tight">Türkiye Devrimci Hareketi</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Tarihsel Soyağacı ve İttifaklar Ağı</p>
          </div>

          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-700/80 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('map')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                viewMode === 'map' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Harita
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                viewMode === 'table' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tablo
            </button>
          </div>
        </div>

        {/* Akım Filtreleri */}
        <div className="space-y-2 pt-3 border-t border-slate-700/80 w-full">
          <div className="text-xs font-semibold text-slate-400 mb-2">Akım Filtreleri (Aç/Kapat):</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium w-full">
            {groupsList.map((g) => {
              const isSelected = selectedGroups.includes(g.name);
              return (
                <button
                  key={g.name}
                  onClick={() => toggleGroup(g.name)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border transition cursor-pointer text-left w-full min-w-0 ${
                    isSelected
                      ? 'bg-slate-700/80 border-slate-500 text-slate-100 shadow-sm'
                      : 'bg-slate-900/50 border-slate-800 text-slate-500 line-through opacity-50'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full shrink-0 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-30'}`}
                    style={{ backgroundColor: g.color }}
                  ></span>
                  <span className="truncate text-[11px]">{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Görünüm Düzeni */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2 w-full">
          <span className="text-xs text-slate-400 font-medium shrink-0">Görünüm Düzeni:</span>
          <select
            value={selectedLayout}
            onChange={(e) => setSelectedLayout(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs px-2 py-1.5 rounded-lg border border-slate-700 focus:outline-none cursor-pointer w-full max-w-[180px] truncate"
          >
            <option value="dagre">Hiyerarşik Akış (Dagre)</option>
            <option value="breadthfirst">Ağaç Şeması (Tree)</option>
            <option value="fcose">Organik Kümeler (fCose)</option>
            <option value="cola">Fiziksel Ağ (Cola)</option>
            <option value="concentric">Çembersel (Concentric)</option>
            <option value="grid">Matris (Grid)</option>
          </select>
        </div>

        {/* Kaynak Eser Bilgisi */}
        <a
          href="https://fliphtml5.com/peavd/xeud/H%C3%BCseyin_Aykol_-_T%C3%BCrkiye%26%2339%3Bde_Sol_%C3%96rg%C3%BCtler%2C_B%C3%B6l%C3%BCne_B%C3%BCy%C3%BCmek_(Phoenix_Yay%C4%B1nevi%2C_2022)/261"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 pt-3 border-t border-slate-700/60 flex items-start gap-2 text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800 hover:border-slate-600 transition group w-full"
        >
          <BookOpen size={16} className="text-red-400 shrink-0 mt-0.5 group-hover:text-red-300 transition" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-semibold text-slate-200 group-hover:text-white transition">Kaynak Eser:</span> Hüseyin Aykol - <span className="italic text-slate-300">Türkiye'de Sol Örgütler</span> (<span className="text-red-300 font-medium">sf. 259-264</span> "Türkiye Solunun Dört Damarı" bölümünden yararlanılmıştır).
          </div>
        </a>

        {/* Kaynak Kod ve Lisans */}
        <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2 w-full">
          <a
            href="https://github.com/kinefi/solsoyagaci"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700/80 transition"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Kaynak Kod</span>
          </a>
          <a
            href="https://github.com/kinefi/solsoyagaci/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition shrink-0"
            title="Apache License 2.0"
          >
            <Scale size={13} />
            <span>Apache-2.0</span>
          </a>
        </div>
      </div>

      {/* Alt Açma / Kapama Şeridi */}
      <div className="flex justify-end pt-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-slate-400 hover:text-slate-200 py-1 px-2 rounded-md hover:bg-slate-800 transition cursor-pointer flex items-center gap-1"
        >
          {isOpen ? (
            <>
              <ChevronLeft size={14} />
              <span>Detayları Daralt</span>
            </>
          ) : (
            <>
              <SlidersHorizontal size={14} />
              <span>Lejantı Göster</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
