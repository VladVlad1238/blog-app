let posts = [];


const TITLE_INPUT_LIMIT = 100;
const TEXT_INPUT_LIMIT = 200;
const RESET_TEXT_INPUT = 'You have 100 symbols';
const RESET_TEXT = 'You have 200 symbols';


const titleInputNode = document.querySelector('.js-input-title');
const textInputNode = document.querySelector('.js-input-text');
const postsNode = document.querySelector('.js-posts');
const inputValidationNode = document.querySelector('.js-input-validation');
const textValidationNode = document.querySelector('.js-text-validation');
const publishButtonNode = document.querySelector('.js-publish-btn');
const publishButtonDisabled = document.querySelector('.js-button__disabled');
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
  }
};

const addPosts = ({title, text, date, time}) => {
  posts.push({
    title,
    text,
    date,
    time,
  })
  return
};

const getPosts = () => {
  return posts;
};

const renderPost = () => {
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

const clearInput = () => {
  titleInputNode.value = '';
  textInputNode.value = '';
  inputValidationNode.innerText = RESET_TEXT_INPUT;
  textValidationNode.innerText = RESET_TEXT;
};

const deleteBlog = () => {
  posts = [];
  renderPost();
}

const validation = () => {
  const titleLen = titleInputNode.value.length;
  const textLen = textInputNode.value.length;
  
  const titleMaxLen = TITLE_INPUT_LIMIT - titleLen; 
  const textMaxLen = TEXT_INPUT_LIMIT - textLen; 

  if(titleLen <= TITLE_INPUT_LIMIT) {
    inputValidationNode.textContent = `You have ${titleMaxLen} symbols`;
    inputValidationNode.classList.remove('color_red');
  } else {
    inputValidationNode.textContent = `Title more than ${TITLE_INPUT_LIMIT} symbols`;
    inputValidationNode.classList.add('color_red');
  }

  if(textLen <= TEXT_INPUT_LIMIT) {
    textValidationNode.textContent = `You have ${textMaxLen} symbols`;
    textValidationNode.classList.remove('color_red');
  } else {
    textValidationNode.textContent = `Text more than ${TEXT_INPUT_LIMIT} symbols`;
    textValidationNode.classList.add('color_red');
  }
};


const buttonDisabled = () => {
  if(titleInputNode.value.length > 0 &&
    textInputNode.value.length > 0) {
     publishButtonNode.removeAttribute('disabled');
    } else {
     publishButtonNode.setAttribute('disabled', 'disabled');
     publishButtonNode.classList.add('btn-disabled');
    }

  if(titleInputNode.value.length > 100 &&
    textInputNode.value.length > 200) {
      publishButtonNode.setAttribute('disabled', 'disabled');
    }
};

const publishButtonHandler = () => {
  const postFromUser = getPostFromUser();
 
  addPosts(postFromUser); 

  renderPost();

  clearInput();

  buttonDisabled();

};

const deleteBlogButtonHandler = () => {
  deleteBlog();
};


publishButtonNode.addEventListener('click', publishButtonHandler);
deleteBlogButtonNode.addEventListener('click', deleteBlogButtonHandler);
publishButtonDisabled.addEventListener('input', buttonDisabled);
inputValidationNode.addEventListener('input', validation);
textValidationNode.addEventListener('input', validation);
inputValidationNode.addEventListener('paste', validation);
textValidationNode.addEventListener('paste', validation);
