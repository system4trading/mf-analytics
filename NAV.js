async function loadNAV(code) {
  const source = document.getElementById("navSource").value;
  let url = "";

  if (source === "amfi") url = `data/amfi/nav_${code}.json`;
  if (source === "yahoo") url = `data/yahoo_nav/${code}.json`;
  if (source === "merged") url = `data/nav_merged/nav_${code}.json`;

  const r = await fetch(url);
  return r.json();
}
