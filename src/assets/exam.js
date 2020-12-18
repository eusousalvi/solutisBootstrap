const addQuestion = document.getElementById('addQuestion');
const questionsContainer = document.getElementById('questionsContainer');
const formExam = document.getElementById('formExam');

function removeEditQuestion(id) {
  const editQuestions = document.getElementById('editQuestions');
  const question = document.getElementById('question' + id);
  editQuestions.removeChild(question);
}

function cleanStorage(key) {
  localStorage.removeItem(key);
}

function saveIdOnStorage(id) {
  try {
    localStorage.setItem('id', id);
  } catch (error) {
    console.log(error);
  }
}

function getIdFromStorage(key, initial) {
  try {
    const id = localStorage.getItem(key);
    if (id) {
      return id;
    } else {
      return initial;
    }
  } catch (error) {
    console.log(error);
  }
}

function removeQuestion(id) {
  const question = document.getElementById('question' + id);
  questionsContainer.removeChild(question);
}

function createQuestion() {
  const id = parseInt(getIdFromStorage('id', 1));
  const apagar = document.createElement('button');
  const container = document.createElement('div');
  const label = document.createElement('label');
  const question = document.createElement('input');
  container.setAttribute('id', `question${id}`);
  container.setAttribute('class', 'form-group row');
  question.setAttribute('required', 'required');
  question.setAttribute('id', id);
  question.setAttribute('type', 'text');
  question.setAttribute('class', 'form-control col-sm-10');
  question.setAttribute('name', 'questions');
  label.setAttribute('class', 'col-sm-1 col-form-label');
  apagar.setAttribute('class', 'col-sm-1 btn btn-danger');
  apagar.setAttribute('type', 'button');
  apagar.innerText = 'Apagar';
  apagar.addEventListener('click', () => removeQuestion(id));
  label.innerText = id + ' -';

  container.appendChild(label);
  container.appendChild(question);
  container.appendChild(apagar);
  questionsContainer.insertBefore(container, addQuestion);

  saveIdOnStorage(id + 1);
}

addQuestion.addEventListener('click', (event) => {
  event.preventDefault();
  createQuestion();
});

window.addEventListener('beforeunload', () => {
  cleanStorage('id');
});
