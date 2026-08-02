export const groupsList = [
  { name: 'TKP ve Türevleri', label: 'TKP Geleneği', color: '#E63946' },
  { name: 'THKP-C ve Türevleri', label: 'THKP-C Geleneği', color: '#D62828' },
  { name: 'THKO ve Türevleri', label: 'THKO Geleneği', color: '#F77F00' },
  { name: 'TKP-ML ve Türevleri', label: 'TKP-ML Geleneği', color: '#003049' }
];

export const dagreLayout = {
  name: 'dagre',
  rankDir: 'LR',
  align: 'DL',
  nodeSep: 65,
  rankSep: 180,
  animate: true
};

export const cytoscapeStyle = [
  {
    selector: 'node',
    style: {
      'background-color': 'data(color)',
      'label': 'data(fullLabel)',
      'color': '#ffffff',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '14px',
      'font-weight': 'bold',
      'width': '95px',
      'height': '95px',
      'padding': '12px',
      'text-max-width': '80px',
      'text-wrap': 'wrap',
      'border-width': 3,
      'border-color': '#ffffff',
      'cursor': 'pointer'
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': '#475569',
      'target-arrow-color': '#475569',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  },
  {
    selector: ':selected',
    style: {
      'border-width': 6,
      'border-color': '#facc15',
      'width': '105px',
      'height': '105px'
    }
  }
];
