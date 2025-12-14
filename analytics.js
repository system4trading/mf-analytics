const AMFI = "https://raw.githubusercontent.com/system4trading/mf-analytics/tree/main/mf-data-cache/amfi/";
const NIFTY = "https://raw.githubusercontent.com/system4trading/mf-analytics/blob/main/mf-data-cache/nifty/nifty50.json";

export async function loadMF(code){
  const nav = await fetch(`${AMFI}nav_${code}.json`).then(r=>r.json());
  const nifty = await fetch(NIFTY).then(r=>r.json());
  return { nav, nifty };
}

export function plotNAV({nav,nifty}){
  new Chart(navChart,{
    type:'line',
    data:{
      labels:nav.map(x=>x.date),
      datasets:[
        {label:'MF',data:nav.map(x=>x.nav)},
        {label:'Nifty',data:nifty.map(x=>x.close)}
      ]
    }
  });
}
