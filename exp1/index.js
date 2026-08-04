const fields = [
  { id: 'name', label: 'Name', placeholder: 'Enter your name' },
  { id: 'age', label: 'Age', placeholder: 'Enter your age' },
  { id: 'email', label: 'Email', placeholder: 'Enter your email' },
  { id: 'rollNumber', label: 'Roll Number', placeholder: 'Enter your roll number' },
  { id: 'grade', label: 'Grade', placeholder: 'Enter your grade' },
];

const f = document.getElementById('form');

fields.forEach(field => {
  const w = document.createElement('div');
  const l = document.createElement('label');
  l.setAttribute('for', field.id);
  l.textContent = field.label;
  const i = document.createElement('input');
  i.setAttribute('type', 'text');
  i.setAttribute('id', field.id);
  i.setAttribute('placeholder', field.placeholder);
  w.setAttribute('class', 'form-field');
  w.appendChild(l);
  w.appendChild(i);
  f.appendChild(w);
});

const submitBtn = document.getElementById("submitBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

submitBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {

  if (event.target === modal) {
    modal.classList.remove("show");
  }

});
document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    modal.classList.remove("show");
  }

});