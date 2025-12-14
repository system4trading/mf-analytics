import { loadMF, plotNAV } from './analytics.js';
import { buildFactsheet } from './pdf.js';

const masterURL = "https://raw.githubusercontent.com/system4trading/mf-analytics/blob/main/mf-data-cache/mf_master.json";

let mfMaster = [];

fetch(masterURL).then(r=>r.json()).then(d => mfMaster = d);

document.getElementById("search").oninput = e => {
  const q = e.target.value.toLowerCase();
  const r = mfMaster.filter(m => m.name.toLowerCase().includes(q)).slice(0,10);
  results.innerHTML = r.map(m => `<div onclick="select('${m.code}')">${m.name}</div>`).join("");
};

window.select = async code => {
  const data = await loadMF(code);
  plotNAV(data);
  buildFactsheet(data);
};

window.exportPDF = () => window.print();

