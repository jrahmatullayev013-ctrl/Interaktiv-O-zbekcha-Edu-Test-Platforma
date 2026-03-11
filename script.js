let ball = 0;
let savollar = [];

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
    
    for (let harf in s.variantlar) {
      const btn = document.createElement("button");
      btn.innerText = `${harf}) ${s.variantlar[harf]}`;
      btn.onclick = () => {
        if (harf === s.togri) ball++;
        Array.from(div.querySelectorAll("button")).forEach(b => b.disabled = true);
      };
      div.appendChild(btn);
    }
    testDiv.appendChild(div);
  });
}

document.getElementById("finishBtn").onclick = () => {
  document.getElementById("natija").innerText =
    `Test tugadi! To‘g‘ri javoblar: ${ball} / ${savollar.length}`;
};
