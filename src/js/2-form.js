const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formState = {
  email: '',
  message: '',
};

// ---------- Відновлення даних зі сховища при завантаженні ----------

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  const parsedData = JSON.parse(savedData);

  formState.email = parsedData.email || '';
  formState.message = parsedData.message || '';
}

form.elements.email.value = formState.email;
form.elements.message.value = formState.message;

// ---------- Введення даних (делегування на формі) ----------

const onFormInput = event => {
  const { name, value } = event.target;

  formState[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
};

form.addEventListener('input', onFormInput);

// ---------- Відправлення форми ----------

const onFormSubmit = event => {
  event.preventDefault();

  if (formState.email === '' || formState.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formState);

  localStorage.removeItem(STORAGE_KEY);
  formState.email = '';
  formState.message = '';
  form.reset();
};

form.addEventListener('submit', onFormSubmit);
