let ball = 0;
let savollar = [];

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
        if (v === s.togri) ball++;
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
  natijaDiv.innerText = `Test tugadi! To‘g‘ri javoblar: ${ball} / ${savollar.length}`;
};
