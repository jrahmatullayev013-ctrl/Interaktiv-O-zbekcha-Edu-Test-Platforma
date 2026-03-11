let ball = 0;
let savollar = [];
let javoblar = [];

// Matematika savollarini yuklash
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    savollar = data;
    chiqar();
  });

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

document.getElementById("finishBtn").onclick = () => {
  const natijaDiv = document.getElementById("natija");
  natijaDiv.style.display = "block";
  let foiz = Math.round((ball / savollar.length) * 100);
  natijaDiv.innerHTML = `
    <p>Test tugadi! To‘g‘ri javoblar: ${ball} / ${savollar.length} (${foiz}%)</p>
  `;
};
