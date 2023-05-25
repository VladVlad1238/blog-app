let posts = [];

const titleInputNode = document.querySelector('.js-input-title');
const textInputNode = document.querySelector('.js-input-text');
const postsNode = document.querySelector('.js-posts');
const publishButtonNode = document.querySelector('.js-publish-btn ');
const removePostButtonNode = document.querySelector('.js-remove-btn');
const deleteBlogButtonNode = document.querySelector('.js-delete-blog-btn');


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
  });
};

/*const removePosts = ({title, text}) => {
  posts.odd({
    title,
    text,
  });
};*/


const getPosts = () => {
  return posts;
};

const renderPost = () => {
  const posts = getPosts();

  let postsHTML = '';

  posts.forEach(post => {
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

const publishButtonHandler = () => {
  const postFromUser = getPostFromUser();
 
  addPosts(postFromUser); 

  renderPost();

  clearInput();

  if(!addPosts()) {
    return;
  }
};

/*const removeButtonHanderl = () => {
  removePosts();
}*/

const deleteBlogButtonHandler = () => {
  

  deleteBlog();

};



publishButtonNode.addEventListener('click', publishButtonHandler);
//removePostButtonNode.addEventListener('click', removeButtonHanderl);
deleteBlogButtonNode.addEventListener('click', deleteBlogButtonHandler);
