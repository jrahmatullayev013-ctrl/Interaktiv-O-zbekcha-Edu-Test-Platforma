let ball = 0;
let savollar = [];
let javoblar = [];
let vaqt = 300; // 5 daqiqa (300 soniya)
let timerInterval;

// Boshlash tugmasi
document.getElementById("startBtn").onclick = () => {
  const fan = document.getElementById("fanSelect").value;
  fetch(`${fan}.json`)
    .then(res => res.json())
    .then(data => {
      savollar = data;
      chiqar();
      document.getElementById("finishBtn").style.display = "block";
      startTimer();
    });
};

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

// Tugatish tugmasi
document.getElementById("finishBtn").onclick = tugat;

function tugat() {
  clearInterval(timerInterval);
  const natijaDiv = document.getElementById("natija");
  natijaDiv.style.display = "block";

  let foiz = Math.round((ball / savollar.length) * 100);
  natijaDiv.innerHTML = `
    <p>Test tugadi! To‘g‘ri javoblar: ${ball} / ${savollar.length} (${foiz}%)</p>
    <div style="width:100%;background:#ddd;border-radius:8px;">
      <div style="width:${foiz}%;background:#4caf50;color:white;padding:5px;border-radius:8px;">
        ${foiz}%
      </div>
    </div>
    <h3>Natija tahlili:</h3>
  `;

  javoblar.forEach(j => {
    const p = document.createElement("p");
    p.innerText = `${j.status} | Savol: ${j.savol} | Tanlangan: ${j.tanlangan} | To‘g‘ri: ${j.togri}`;
    natijaDiv.appendChild(p);
  });
}

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    let min = Math.floor(vaqt / 60);
    let sec = vaqt % 60;
    document.getElementById("timer").innerText = `Qolgan vaqt: ${min}:${sec}`;
    vaqt--;
    if (vaqt < 0) {
      tugat();
    }
  }, 1000);
}
