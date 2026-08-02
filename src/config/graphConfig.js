import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import fcose from 'cytoscape-fcose';
import cola from 'cytoscape-cola';

cytoscape.use(dagre);
cytoscape.use(fcose);
cytoscape.use(cola);

export const layouts = {
  dagre: {
    name: 'dagre',
    rankDir: 'TB',
    nodeSep: 50,
    rankSep: 70,
  },
  breadthfirst: {
    name: 'breadthfirst',
    directed: true,
    padding: 30,
  },
  fcose: {
    name: 'fcose',
    quality: 'default',
    nodeRepulsion: 4500,
    idealEdgeLength: 50,
  },
  cola: {
    name: 'cola',
    maxSimulationTime: 1000,
  },
  concentric: {
    name: 'concentric',
    padding: 30,
  },
  grid: {
    name: 'grid',
    padding: 30,
  }
};

/* Ortak Renk Kaynağı (Single Source of Truth) */
export const GROUP_COLORS = {
  'TKP ve Türevleri': '#E63946',         // Kırmızı
  'THKP-C ve Türevleri': '#9333EA',      // Mor / Menekşe
  'THKO ve Türevleri': '#F77F00',        // Turuncu
  'TKP-ML ve Türevleri': '#10B981',      // Yeşil / Zümrüt Yeşili
};

export const groupsList = Object.entries(GROUP_COLORS).map(([name, color]) => ({
  name,
  label: name,
  color
}));

export const cytoscapeStyle = [
  {
    selector: 'node',
    style: {
      'background-color': 'data(color)',
      'label': 'data(fullLabel)',
      'color': '#ffffff',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '12px',
      'font-weight': 'bold',
      'width': '120px',
      'height': '120px',
      'padding': '12px',
      'text-max-width': '100px',
      'text-wrap': 'wrap',
      'line-height': 1.2,
      'border-width': 2,
      'border-color': '#ffffff',
      'cursor': 'pointer'
    }
  },
  /* Grup Bazlı Dinamik Renk Kuralları (Ortak Renk Kodlarını Kullanır) */
  ...Object.entries(GROUP_COLORS).map(([groupName, color]) => ({
    selector: `node[group = "${groupName}"]`,
    style: {
      'background-color': color,
      'color': '#ffffff'
    }
  })),
  /* Ana Kök / Başlangıç Düğümleri Vurgusu */
  {
    selector: 'node[?isRoot]',
    style: {
      'border-width': 5,
      'border-color': '#FACC15', // Altın Sarısı Çerçeve
      'width': '130px',
      'height': '130px'
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2.5,
      'line-color': '#475569',
      'target-arrow-color': '#475569',
      'target-arrow-shape': 'triangle',
      'arrow-scale': 1.2,
      'curve-style': 'bezier'
    }
  },
  /* Seçilen Düğüm Vurgusu */
  {
    selector: ':selected',
    style: {
      'border-width': 5,
      'border-color': '#FACC15',
      'width': '135px',
      'height': '135px'
    }
  }
];
