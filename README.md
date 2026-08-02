# Sol Soyağacı - Türkiye Devrimci Hareketi Tarihsel Ağı ve İttifaklar Ağı

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub Pages Deploy](https://github.com/kinefi/solsoyagaci/actions/workflows/deploy.yml/badge.svg)](https://kinefi.github.io/solsoyagaci/)

Sol Soyağacı, Türkiye sol/devrimci hareketinin 1919'dan günümüze (TKP, THKP-C, THKO ve TKP-ML gelenekleri) tarihsel gelişimini, bölünmelerini, birleşmelerini ve güncel ittifak yapılarını görselleştiren etkileşimli bir ağ ve soyağacı uygulamasıdır.

## Özellikler

* Kronolojik ve Hiyerarşik Düzen (Dagre Layout): Soldan sağa tarihsel akışa göre düzenlenmiş 113+ düğüm ve 128+ bağlantı.
* Akımlara Göre Dinamik Filtreleme: Sol üst lejant üzerinden gelenekleri tek tıkla gizleyip/açma ve haritayı anında yeniden oluşturma.
* Akıllı Arama ve Odaklanma: Örgüt adı veya kuruluş yılına göre arama yapma; seçilen örgüte otomatik yumuşak geçişle odaklanma.
* Detaylı Bilgi Paneli: Her düğüme tıklandığında açılan örgüt açıklaması, kuruluş yılı, geleneği ve çapraz ilişkileri içeren bilgi penceresi.
* Tam Ekran Responsive Tasarım: Dark mode (Slate-900) Tailwind CSS arayüzü.

## Teknolojiler ve Gereksinimler

* Paket Yöneticisi: pnpm (Önerilen)
* Frontend Framework: React + Vite
* Grafik ve Ağ Kütüphanesi: Cytoscape.js + react-cytoscapejs
* Hiyerarşik Düzen Algoritması: cytoscape-dagre
* Stilleme: Tailwind CSS
* İkon Seti: Lucide React

## Yerelde Kurulum ve Geliştirme

Projeyi bilgisayarınızda pnpm ile çalıştırmak için:

```
git clone https://github.com/kinefi/solsoyagaci.git
cd solsoyagaci
pnpm install
pnpm dev
```

## Proje Yapısı

```
├── eslint.config.js
├── generate_python.py
├── index.html
├── LICENSE
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.svg
│   └── icons.svg
├── README.md
├── src
│   ├── App.jsx          # Ana yönetim bileşeni
│   ├── components
│   │   ├── DetailPanel.jsx # Sağ bilgi paneli
│   │   ├── Legend.jsx      # Sol lejant ve filtreler
│   │   └── SearchBar.jsx   # Üst arama çubuğu
│   ├── config
│   │   └── graphConfig.js  # Harita stil ve layout ayarları
│   ├── data.json        # Tarihsel ağ verileri
│   ├── index.css        # Tailwind CSS importları
│   └── main.jsx         # React giriş noktası
└── vite.config.js
```

## Lisans

Bu proje [Apache License 2.0](./LICENSE) altında lisanslanmıştır.
