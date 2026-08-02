# Sol Soyağacı - Türkiye Devrimci Hareketi Tarihsel Ağı ve İttifaklar Ağı

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub Pages Deploy](https://github.com/kinefi/solsoyagaci/actions/workflows/deploy.yml/badge.svg)](https://kinefi.github.io/solsoyagaci/)

Sol Soyağacı, Türkiye sol/devrimci hareketinin 1919'dan günümüze (TKP, THKP-C, THKO ve TKP-ML gelenekleri) tarihsel gelişimini, bölünmelerini, birleşmelerini ve güncel ittifak yapılarını görselleştiren etkileşimli bir ağ, veri tablosu ve soyağacı uygulamasıdır.

Proje, **Hüseyin Aykol**'un *"Türkiye'de Sol Örgütler / Bölüne Bölüne Büyümek"* eserindeki (sf. 259-264, "Türkiye Solunun Dört Damarı") tarihsel şemalardan ilham alınarak dijitalleştirilmiştir.

---

## Özellikler

* **Etkileşimli Görsel Ağ ve Çeşitli Layout Seçenekleri:** Hiyerarşik Akış (`Dagre`), Ağaç Şeması (`Tree`), Organik Kümeler (`fCOSE`), Fiziksel Ağ (`Cola`), Çembersel (`Concentric`) ve Matris (`Grid`) yerleşim algoritmaları arasında anlık geçiş.
* **Harita ve Tablo Modu (Dual View):** Sol üst lejant üzerinden Harita ve Filtrelenebilir/Aranabilir Veri Tablosu görünümleri arasında geçiş.
* **Başlangıç (Kök) Düğümleri Vurgusu:** Ana akımların çıkış/kök noktası olan örgütlerin özel çerçeve ve stillerle haritada öne çıkarılması.
* **Akımlara Göre Dinamik Filtreleme:** Lejant üzerinden gelenekleri tek tıkla gizleyip/açma ve haritayı anında yeniden oluşturma.
* **Akıllı Arama ve Odaklanma:** Örgüt adı veya kuruluş yılına göre arama yapma; seçilen örgüte otomatik yumuşak geçişle odaklanma.
* **Detaylı Bilgi Paneli:** Her düğüme tıklandığında açılan örgüt açıklaması, kuruluş yılı, geleneği, Wikipedia bağlantısı ve çapraz ilişkileri içeren bilgi penceresi.
* **Tam Ekran Responsive Tasarım:** Dark mode (Slate-900) Tailwind CSS arayüzü.

---

## Teknolojiler ve Gereksinimler

* **Paket Yöneticisi:** `pnpm` (Önerilen)
* **Frontend Framework:** React + Vite
* **Grafik ve Ağ Kütüphanesi:** Cytoscape.js + react-cytoscapejs
* **Layout Algoritmaları:** `cytoscape-dagre`, `cytoscape-fcose`, `cytoscape-cola`
* **Stilleme:** Tailwind CSS
* **İkon Seti:** Lucide React

---

## Yerelde Kurulum ve Geliştirme

Projeyi bilgisayarınızda çalıştırmak için:

```bash
git clone [https://github.com/kinefi/solsoyagaci.git](https://github.com/kinefi/solsoyagaci.git)
cd solsoyagaci
pnpm install
pnpm dev
```

## Proje Yapısı

```bash
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── data.json        # Örgüt ve bağlantı verileri
│   ├── favicon.svg
│   └── icons.svg
├── README.md
├── src
│   ├── App.jsx          # Ana yönetim bileşeni ve görünüm modları
│   ├── components
│   │   ├── DataTable.jsx   # Filtrelenebilir ve aranabilir tablo görünümü
│   │   ├── DetailPanel.jsx # Sağ bilgi paneli
│   │   ├── GraphCanvas.jsx # Cytoscape tuval bileşeni ve sığdırma mantığı
│   │   ├── Legend.jsx      # Sol lejant, filtreler, layout seçimi ve kaynakça
│   │   └── SearchBar.jsx   # Üst arama çubuğu
│   ├── config
│   │   └── graphConfig.js  # Harita stil, renk ve layout yapılandırmaları
│   ├── index.css        # Tailwind CSS importları
│   └── main.jsx         # React giriş noktası
└── vite.config.js
```

## Kaynakça ve Referans

Bu projedeki tarihsel ağ ve aktör dizilimi aşağıdaki eser referans alınarak dijitalleştirilmiştir:

- **Hüseyin Aykol** – _Türkiye'de Sol Örgütler / Bölüne Bölüne Büyümek_ (Phoenix Yayınevi), _Türkiye Solunun Dört Damarı_ bölümü (sf. 259-264).
- Orijinal şemalara ve dijital taramaya [buradan](https://www.google.com/search?q=https://fliphtml5.com/peavd/xeud/H%25C3%25BCseyin_Aykol_-_T%25C3%25BCrkiye%2526%252339%253Bde_Sol_%25C3%2596rg%25C3%25BCtler%252C_B%25C3%25B6l%25C3%25BCne_B%25C3%25BCy%25C3%25BCmek_(Phoenix_Yay%25C4%25B1nevi%252C_2022)/261) ulaşabilirsiniz

## Lisans

Bu proje [Apache License 2.0](./LICENSE) altında lisanslanmıştır.
