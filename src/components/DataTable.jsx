import { useState } from 'react';
import { Search } from 'lucide-react';

export default function DataTable({ nodes, selectedGroups, setSelectedNode, onCloseToMap }) {
  const [tableSearch, setTableSearch] = useState('');

  // Sadece seçili gruplara ait ve arama terimine uyan düğümleri filtrele
  const filteredNodes = nodes.filter((node) => {
    const inGroup = selectedGroups.includes(node.data.group);
    const matchesSearch = 
      node.data.label.toLowerCase().includes(tableSearch.toLowerCase()) ||
      (node.data.year && node.data.year.includes(tableSearch)) ||
      (node.data.group && node.data.group.toLowerCase().includes(tableSearch.toLowerCase()));
    
    return inGroup && matchesSearch;
  });

  return (
    <div className="absolute inset-4 md:inset-10 z-20 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
      {/* Üst Bar / Başlık ve Kapatma */}
      <div className="p-5 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Soyağacı Veri Tablosu</h2>
          <p className="text-xs text-slate-400 mt-0.5">Toplam {filteredNodes.length} kayıt gösteriliyor</p>
        </div>
        <button
          onClick={onCloseToMap}
          className="bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
        >
          Haritaya Dön
        </button>
      </div>

      {/* Arama Çubuğu */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-3">
        <Search size={16} className="text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="Tabloda ara (İsim, yıl, akım...)"
          value={tableSearch}
          onChange={(e) => setTableSearch(e.target.value)}
          className="w-full bg-slate-800 text-slate-100 text-sm px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-slate-500"
        />
      </div>

      {/* Tablo İçeriği */}
      <div className="flex-1 overflow-auto p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-xs text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Adı / Etiket</th>
              <th className="py-3 px-4">Akım Grubu</th>
              <th className="py-3 px-4">Yıl</th>
              <th className="py-3 px-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {filteredNodes.length > 0 ? (
              filteredNodes.map((node) => (
                <tr key={node.data.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-medium text-slate-200">
                    {node.data.label}
                    {node.data.isRoot && (
                      <span className="ml-2 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                        Kök
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{node.data.group}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{node.data.year || '-'}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedNode(node.data);
                        onCloseToMap(); // Haritaya dönüp detay panelini açar
                      }}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer"
                    >
                      Haritada Göster
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-slate-500 text-sm">
                  Aranan kriterlere uygun kayıt bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}