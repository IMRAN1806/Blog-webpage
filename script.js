function displayBlogPosts() {
  const blogPosts = getBlogPostsFromLocalStorage();
  const blogPostsContainer = document.getElementById('blog-posts');
  blogPostsContainer.innerHTML = '';

  if (blogPosts && blogPosts.length > 0) {
    blogPosts.forEach((post, index) => {
      const postElement = document.createElement('div');
      postElement.classList.add('blog-post');

      const titleElement = document.createElement('h3');
      titleElement.textContent = post.title;

      const contentElement = document.createElement('p');
      contentElement.textContent = post.content;

 
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        editBlogPost(index);
      });

 
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteBlogPost(index);
      });

      postElement.appendChild(titleElement);
      postElement.appendChild(contentElement);
      postElement.appendChild(editButton);
      postElement.appendChild(deleteButton);

      blogPostsContainer.appendChild(postElement);
    });
  } else {
    const noPostsMessage = document.createElement('p');
    noPostsMessage.textContent = 'No blog posts found.';
    blogPostsContainer.appendChild(noPostsMessage);
  }
}

 
function getBlogPostsFromLocalStorage() {
  const postsJSON = localStorage.getItem('blogPosts');
  if (postsJSON) {
    return JSON.parse(postsJSON);
  } else {
    return [];
  }
}

 
function addBlogPost(title, content) {
  const blogPosts = getBlogPostsFromLocalStorage();
  const newPost = { title, content };
  blogPosts.push(newPost);
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  displayBlogPosts();
}
 
function editBlogPost(index) {
  const blogPosts = getBlogPostsFromLocalStorage();
  const post = blogPosts[index];

  const updatedTitle = prompt('Enter updated title:', post.title);
  const updatedContent = prompt('Enter updated content:', post.content);

  if (updatedTitle && updatedContent) {
    post.title = updatedTitle;
    post.content = updatedContent;
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    displayBlogPosts();
  }
}

 
function deleteBlogPost(index) {
  const blogPosts = getBlogPostsFromLocalStorage();
  blogPosts.splice(index, 1);
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  displayBlogPosts();
}
 
const createPostForm = document.getElementById('create-post-form');
createPostForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');

  const title = titleInput.value;
  const content = contentInput.value;

  if (title && content) {
    addBlogPost(title, content);
    titleInput.value = '';
    contentInput.value = '';
  }
});

 
displayBlogPosts();
