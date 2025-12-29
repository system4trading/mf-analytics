let mfDB = [];

// load local MF database
async function loadMFDatabase() {
  if (mfDB.length) return;
  const url = "mf_symbols.json";  // or your hosted URL
  const res = await fetch(url);
  mfDB = await res.json();
}

// fuzzy match
function fuzzySearch(query) {
  query = query.toLowerCase();
  return mfDB.filter(x =>
    x.name.toLowerCase().includes(query) ||
    x.symbol.toLowerCase().includes(query)
  ).slice(0, 20);
}

// autocomplete handler
mfInput.addEventListener("input", async () => {
  await loadMFDatabase();

  const q = mfInput.value.trim();
  if (!q) {
    resultsBox.style.display = "none";
    return;
  }

  const matches = fuzzySearch(q);
  resultsBox.innerHTML = "";

  if (matches.length === 0) {
    resultsBox.style.display = "none";
    return;
  }

  matches.forEach(item => {
    const div = document.createElement("div");
    div.className = "resultItem";
    div.innerHTML = `<strong>${item.name}</strong>
                     <div class="small">${item.symbol}</div>`;

    div.onclick = () => {
      selectedSymbol = item.symbol;
      mfInput.value = item.name;
      selectedMeta.textContent = `Selected: ${item.symbol}`;
      resultsBox.style.display = "none";
    };
    resultsBox.appendChild(div);
  });

  resultsBox.style.display = "block";
});
