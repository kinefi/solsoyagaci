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

export const groupsList = [
  { name: 'TKP ve Türevleri', label: 'TKP Geleneği', color: '#E63946' },
  { name: 'THKP-C ve Türevleri', label: 'THKP-C Geleneği', color: '#D62828' },
  { name: 'THKO ve Türevleri', label: 'THKO Geleneği', color: '#F77F00' },
  { name: 'TKP-ML ve Türevleri', label: 'TKP-ML Geleneği', color: '#003049' }
];

export const cytoscapeStyle = [
  {
    selector: 'node',
    style: {
      'background-color': 'data(color)',
      'label': 'data(fullLabel)',
      'color': '#ffffff',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '16px',
      'font-weight': 'bold',
      'width': '125px',
      'height': '125px',
      'padding': '16px',
      'text-max-width': '80px',
      'text-wrap': 'wrap',
      'border-width': 2,
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
