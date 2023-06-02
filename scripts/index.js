let posts = [];


const TITLE_INPUT_LIMIT = 10;
const TEXT_INPUT_LIMIT = 20;


const titleInputNode = document.querySelector('.js-input-title');
const textInputNode = document.querySelector('.js-input-text');
const postsNode = document.querySelector('.js-posts');
const inputValidationNode = document.querySelector('.js-input-validation');
const textValidationNode = document.querySelector('.js-text-validation');
const publishButtonNode = document.querySelector('.js-publish-btn');
const publishButtonDisabled = document.querySelector('.js-button__disabled');
const deleteBlogButtonNode = document.querySelector('.js-delete-blog-btn');







const validation = () => {
  const titleLen = titleInputNode.value.length;
  const textLen = textInputNode.value.length;
  
  const titleMaxLen = TITLE_INPUT_LIMIT - titleInputNode.value.length; 
  const textMaxLen = TEXT_INPUT_LIMIT - textInputNode.value.length; 

  if(titleLen <= TITLE_INPUT_LIMIT) {
    inputValidationNode.innerText = `You have ${titleMaxLen} symbols`;
  } else {
    inputValidationNode.innerText = `Title more than ${TITLE_INPUT_LIMIT} symbols`;
  }

  if(textLen <= TEXT_INPUT_LIMIT) {
    textValidationNode.innerText = `You have ${textMaxLen} symbols`;
  } else {
    textValidationNode.innerText = `Text more than ${TEXT_INPUT_LIMIT} symbols`;
  }
};
inputValidationNode.addEventListener('input', validation());
textValidationNode.addEventListener('input', validation());


const getPostFromUser = () => {
  const title = titleInputNode.value;
  const text = textInputNode.value;

  return {
    title: title,
    text: text,
  }
};

const addPosts = ({title, text}) => {
  posts.push({
    title,
    text,
  })
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
        <p class='post__title'>${post.title}</p>
        <p class='post__text'>${post.text}</p>
      </div>`
  });
  postsNode.innerHTML = postsHTML;
};

const clearInput = () => {
  titleInputNode.value = '';
  textInputNode.value = '';
};

const deleteBlog = () => {
  posts = [];
  renderPost();
}

const buttonDisabled = () => {
  if(titleInputNode.value.length > 0 &&
    textInputNode.value.length > 0) {
     publishButtonNode.removeAttribute('disabled');
    } else {
     publishButtonNode.setAttribute('disabled', 'disabled');
    }

  if(titleInputNode.value.length > 10 &&
    textInputNode.value.length > 20) {
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
