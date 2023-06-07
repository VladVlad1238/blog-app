let posts = [];


const TITLE_INPUT_LIMIT = 100;
const TEXT_INPUT_LIMIT = 300;
const ZERO = 0;
const RESET_TEXT_INPUT = 'You have 100 symbols';
const RESET_TEXT = 'You have 300 symbols';


const titleInputNode = document.querySelector('.js-input-title');
const textInputNode = document.querySelector('.js-input-text');
const postsNode = document.querySelector('.js-posts');
const inputValidationNode = document.querySelector('.js-input-validation');
const textValidationNode = document.querySelector('.js-text-validation');
const publishButtonNode = document.querySelector('.js-publish-btn');
const publishButtonDisabled = document.querySelector('.js-button__disabled');
const clearInputButtonNode = document.querySelector('.js-clear-input-btn');
const deleteBlogButtonNode = document.querySelector('.js-delete-blog-btn');



const getPostFromUser = () => {
  const title = titleInputNode.value;
  const text = textInputNode.value;
  const options = {hour: 'numeric', minute: 'numeric'};
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString([], options);
  
  return {
    title: title,
    text: text,
    date: date,
    time: time,
  };
};

const addPost = ({title, text, date, time}) => {
  posts.push({
    title,
    text,
    date,
    time,
  })
  return;
};

const getPosts = () => {
  return posts;
};

const deleteBlog = () => {
  posts = [];
  renderPosts();
  inputManipulation();
};

const renderPosts = () => {
  const posts = getPosts();

  let postsHTML = '';

  posts.forEach((post) => {
     postsHTML += `
      <div class='post'>
        <p class='post__date-time'>${post.date} ${post.time}</p>
        <p class='post__title'>${post.title}</p>
        <p class='post__text'>${post.text}</p>
      </div>`
  });
  postsNode.innerHTML = postsHTML;
};


const inputManipulation = () => {
  const focusInput = () => {
    titleInputNode.focus();
  };

  const clearInput = () => {
    titleInputNode.value = '';
    textInputNode.value = '';
    inputValidationNode.innerText = RESET_TEXT_INPUT;
    textValidationNode.innerText = RESET_TEXT;
    focusInput();
  };
  focusInput();
  clearInput();
};

const validation = () => {
  const titleLen = titleInputNode.value.length;
  const textLen = textInputNode.value.length;
  
  if(titleLen <= TITLE_INPUT_LIMIT) {
    inputValidationNode.innerText = `You have ${TITLE_INPUT_LIMIT - titleLen} symbols`;
    inputValidationNode.classList.remove('color_red');
  } else {
    inputValidationNode.innerText = `Title more than ${TITLE_INPUT_LIMIT} symbols`;
    inputValidationNode.classList.add('color_red');
  };

  if(textLen <= TEXT_INPUT_LIMIT) {
    textValidationNode.innerText= `You have ${TEXT_INPUT_LIMIT - textLen} symbols`;
    textValidationNode.classList.remove('color_red');
  } else {
    textValidationNode.innerText = `Text more than ${TEXT_INPUT_LIMIT} symbols`;
    textValidationNode.classList.add('color_red');
  };
};


const buttonDisabled = () => {
  if(titleInputNode.value.length > ZERO &&
    textInputNode.value.length > ZERO ) {
     publishButtonNode.removeAttribute('disabled');
    } else {
     publishButtonNode.setAttribute('disabled', 'disabled');
     publishButtonNode.classList.add('btn-disabled');
    };

  if(titleInputNode.value.length > TITLE_INPUT_LIMIT) {
      publishButtonNode.setAttribute('disabled', 'disabled');
    }; 

  if(textInputNode.value.length > TEXT_INPUT_LIMIT) {
    publishButtonNode.setAttribute('disabled', 'disabled');
  };
};

const publishButtonHandler = () => {
  const postFromUser = getPostFromUser();

  addPost(postFromUser); 
  renderPosts();
  inputManipulation();
  buttonDisabled();
};

const clearInputButton = () => {
  buttonDisabled();
  inputManipulation();
};

const deleteBlogButtonHandler = () => {
  deleteBlog();
  inputManipulation();
};


publishButtonNode.addEventListener('click', publishButtonHandler);
clearInputButtonNode.addEventListener('click', clearInputButton);
deleteBlogButtonNode.addEventListener('click', deleteBlogButtonHandler);
publishButtonDisabled.addEventListener('input', buttonDisabled);
titleInputNode.addEventListener('input', validation);
textInputNode.addEventListener('input', validation);

