// Function to switch between pages
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => (page.style.display = 'none'));

    // Show the selected page
    document.getElementById(pageId).style.display = 'block';

    // Update active tab
    document.querySelectorAll('.navbar a').forEach(tab => tab.classList.remove('active'));
    document.getElementById(pageId === 'homePage' ? 'homeTab' : 'createPostTab').classList.add('active');
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent form reload

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('image').files[0];

    if (!title || !content) {
        alert('Please fill in both the title and content!');
        return;
    }

    let imageURL = '';
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageURL = e.target.result;
            addPostToPage(title, content, imageURL); // Display new post on Home Page
        };
        reader.readAsDataURL(imageFile);
    } else {
        addPostToPage(title, content, imageURL); // Display without image
    }

    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('image').value = '';
}

// Function to display posts on the Home page
function addPostToPage(title, content, imageURL) {
    const blogContainer = document.getElementById('blogContainer');

    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');

    const postTitle = document.createElement('h3');
    postTitle.innerText = title;
    postElement.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.innerText = content;
    postElement.appendChild(postContent);

    if (imageURL) {
        const postImage = document.createElement('img');
        postImage.src = imageURL;
        postImage.alt = 'Blog Image';
        postImage.classList.add('blog-image');
        postElement.appendChild(postImage);
    }

    blogContainer.appendChild(postElement);
}

// Fetch and display existing posts from the backend
async function fetchPosts() {
    try {
        const response = await fetch('https://ezojnkvl8g.execute-api.us-west-1.amazonaws.com/dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'fetch' }),
        });

        const posts = await response.json();
        posts.forEach(post => addPostToPage(post.title, post.content, post.imageURL));
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Load existing blogs on page load
window.onload = fetchPosts;