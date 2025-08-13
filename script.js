const questions=[
{q:"Barqaror rivojlanish nima?",opts:["Har qanday narx-navo siyosatida iqtisodiy o‘sish","Hozirgi ehtiyojlarni qondirib, kelajak avlodlar imkoniyatlariga ziyon yetkazmaslik","Atrof-muhit cheklovlarisiz turizm sohasida maksimal foyda olish","Ijtimoiy tenglikni nazarda tutuvchi siyosiy barqarorlik"],a:"B"},
{q:"Barqaror rivojlanishning uchta asosiy yo‘nalishi qanday?",opts:["Iqtisodiy, madaniy, texnologik","Atrof-muhit, ijtimoiy, iqtisodiy","Atrof-muhit, siyosiy, texnologik","Ijtimoiy, harbiy, madaniy"],a:"B"},
{q:"BMT va UNEPga ko‘ra barqaror turizm o‘z ichiga nimani oladi?",opts:["Faqat daromadga yo‘naltirilgan sayohat ta’sirlarni hisobga oladi","Hozirgi va kelajakdagi iqtisodiy, ekologik va ijtimoiy ta’sirlarni hisobga oladi","Faqat muhofaza qilinadigan hududlarda ekoturizmni rivojlantirish","Faqat ichki turizmni rivojlantirish va xalqaro bozorga olib chiqish"],a:"B"},
{q:"Turizmda \"carrying capacity\" nimani anglatadi?",opts:["Avtobus sig‘imi va qabul qila olinishi mumkin bo‘lgan turistlar soni","Atrof-muhit va sifatga zarar bermasdan maksimal turistlar soni","Mehmonxonalar soni va butun respublikadagi joylashtiruv vositalari hajmi","Tur operator byudjeti va turagentlar soni"],a:"B"},
{q:"Quyidagilardan qaysi biri ekoturizm tamoyiliga mos keladi?",opts:["Jismoniy va ijtimoiy ta’sirni minimallashtirish","Maksimal turistlar soni","Mahalliy aholining huquqlarini e’tiborga olmaslik","Arzon aviachiptalardan foydalanish"],a:"A"},
{q:"\"Greenwashing\" nima?",opts:["Haqiqiy ekologik reklama","Yolg‘on \"yashil\" reklama orqali mahsulotni ilgari surish","Yashil choy savdo-sotig‘i","Shaharda yashil makon tamoyilini ilgari surish"],a:"B"},
{q:"DMO nima degani?",opts:["Turistlarni himoya qiluvchi tashkilot","Manzillarni marketing qilish tashkiloti","Qiziqish bildiruvchi tomonlarni muvofiqlashtiruvchi organ","Turizm politsiyasi"],a:"C"},
{q:"Regenerativ turizm nima?",opts:["Oqibatlarni inobatga olmaydigan turizm","Ko‘proq turistlarni jalb qilish","Ekologiyadan ustun iqtisodiyot","Sayohat joyini avvaldan yaxshi holatda qoldirish"],a:"D"},
{q:"Mas’uliyatli turizmda ekologik foydaning misoli nima?",opts:["Tabiatni asrash uchun mablag‘ yig‘ish","Axlat ko‘payishi va uni oqilona yo‘qotish","Qo‘riqlanadigan zonalarda mehmonxona qurilishi","Parkda haddan tashqari ko‘p odam to‘planishi va ekologik turizmni rivojlantishi"],a:"A"},
{q:"Ommaviy turizmning atrof-muhitga ta’siri qanday?",opts:["Biologik xilma-xillik ortishi","Tabiiy yashash joylarining buzilishi","Karbon izining kamayishi","Yashil iqtisodiyotning o‘sishi"],a:"B"},
]

let idx = 0;
let correct = 0;
let wrong = 0;
const qnumEl = document.getElementById('qnum');
const qtextEl = document.getElementById('qtext');
const optionsEl = document.getElementById('options');
const form = document.getElementById('quizForm');
const typed = document.getElementById('typedAnswer');
const progress = document.getElementById('progress');
const resultBox = document.getElementById('resultBox');
const submitBtn = document.getElementById('submitBtn');

function renderQuestion() {
  if (idx >= questions.length) return;
  const q = questions[idx];
  qnumEl.textContent = `Savol ${idx + 1} / ${questions.length}`;
  qtextEl.textContent = q.q;
  optionsEl.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.opts.forEach((opt, i) => {
    const id = `opt${i}`;
    const div = document.createElement('label');
    div.className = 'option';
    div.innerHTML = `<input name='choice' type='radio' value='${letters[i]}' id='${id}' /><span>${letters[i]}. ${opt}</span>`;
    optionsEl.appendChild(div);
  });
  progress.textContent = `${idx + 1} / ${questions.length}`;
  typed.value = '';
}

function showResults() {
  resultBox.style.display = 'block';
  resultBox.innerHTML = `<strong>Test yakunlandi</strong><div class='small' style='margin-top:8px'>To'g'ri javoblar: ${correct}<br> Noto'g'ri javoblar: ${wrong}<br> Umumiy: ${questions.length}</div>`;
  submitBtn.disabled = true;
  form.style.display = 'none';
  progress.textContent = `${questions.length} / ${questions.length}`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const chosenRadio = document.querySelector("input[name='choice']:checked");
  let answer = chosenRadio ? chosenRadio.value : typed.value.trim().toUpperCase();
  if (!answer || !['A', 'B', 'C', 'D'].includes(answer)) {
    alert('Iltimos A, B, C yoki D variantidan birini tanlang yoki yozing');
    return;
  }
  const correctAnswer = questions[idx].a;
  if (answer === correctAnswer) correct++; else wrong++;
  idx++;

  if (idx >= questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
});

typed.addEventListener('input', e => {
  const v = e.target.value.trim().toUpperCase();
  if (['A', 'B', 'C', 'D'].includes(v)) {
    const radio = document.querySelector(`input[value='${v}']`);
    if (radio) radio.checked = true;
  }
});

optionsEl.addEventListener('click', e => {
  const input = e.target.closest('label')?.querySelector('input');
  if (input) {
    typed.value = input.value;
  }
});

renderQuestion();
