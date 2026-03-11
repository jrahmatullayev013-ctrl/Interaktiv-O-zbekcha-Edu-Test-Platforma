let ball = 0;
let savollar = [];
let javoblar = [];

// Savollarni JSON fayldan yuklash
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    savollar = data;
    chiqar();
  });

// Savollarni chiqarish
function chiqar() {
  const testDiv = document.getElementById("test");
  testDiv.innerHTML = "";
  savollar.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "savol";
    div.innerHTML = `<p>${i+1}-savol: ${s.savol}</p>`;
    s.variantlar.forEach(v => {
      const btn = document.createElement("button");
      btn.innerText = v;
      btn.onclick = () => {
        if (v === s.togri) {
          ball++;
          javoblar.push({savol: s.savol, tanlangan: v, togri: s.togri, status: "✅ To‘g‘ri"});
        } else {
          javoblar.push({savol: s.savol, tanlangan: v, togri: s.togri, status: "❌ Xato"});
        }
        Array.from(div.querySelectorAll("button")).forEach(b => b.disabled = true);
      };
      div.appendChild(btn);
    });
    testDiv.appendChild(div);
  });
}

// Tugatish tugmasi bosilganda natija chiqarish
document.getElementById("finishBtn").onclick = () => {
  const natijaDiv = document.getElementById("natija");
  natijaDiv.style.display = "block";

  // Progress bar
  let foiz = Math.round((ball / savollar.length) * 100);
  natijaDiv.innerHTML = `
    <p>Test tugadi! To‘g‘ri javoblar: ${ball} / ${savollar.length} (${foiz}%)</p>
    <div style="width:100%;background:#ddd;border-radius:8px;">
      <div style="width:${foiz}%;background:#4caf50;color:white;padding:5px;border-radius:8px;">
