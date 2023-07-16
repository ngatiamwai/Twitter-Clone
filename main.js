const header = document.getElementsByClassName('header')[0];
const postsContainer = document.getElementsByClassName('posts')[0];
const commentsContainer = document.getElementsByClassName('post-comments')[0];

class User {
    static async getUser(userId) {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const user = await response.json();
        return user;
    }

    static async getUserPosts(userId) {
        const response = await fetch(`http://localhost:3000/posts?userId=${userId}`);
        const posts = await response.json();
        return posts;
    }

    static async getPostComments(postId) {
        const response = await fetch(`http://localhost:3000/comments?postId=${postId}`);
        const comments = await response.json();
        return comments;
    }
}

class Posts {
    static async showPosts(userId) {
        const user = await User.getUser(userId);
        const userPosts = await User.getUserPosts(userId);

        let postsHtml = '';

        for (const post of userPosts) {
            postsHtml += `
        <div class="post-pic">
          <img src="/Images/lec 6.jpeg" alt="">
        </div>
        <div class="profile-info" onclick="Comments.showComments(${post.id})">
          <h2>
            ${user.name} 
            <img src="/Images/icons8-blue-tick-48.png" alt="" style="height: 3vh;"> 
            <img src="/Images/icons8-twitter-squared-48.png" alt="" style="height: 3vh;">
          </h2>
          <p>${post.title}</p>
          <p>${post.body}</p>
          <div class="reactions">
            <img src="/Images/icons8-comments-48.png" alt="" style="height: 3vh;"><p>200</p>
            <img src="/Images/icons8-retweet-24.png" alt="" style="height: 3vh;"><p>200</p>
            <img src="/Images/icons8-like-30.png" alt="" style="height: 3vh;"><p>200</p>
          </div>
          
        </div>
      `;
        }

        console.log(postsHtml);
        postsContainer.innerHTML = postsHtml;
    }
}

class Comments {
    static async showComments(postId) {
        const comments = await User.getPostComments(postId);

        let commentsHtml = '';

        for (const comment of comments) {
            commentsHtml += `
        <div class="post-pic">
        <div class="noofcomments">
            <p>Post 1 Comment</p>
        </div>
        <img src="/Images/lec 6.jpeg" alt="">
    </div>
    <div class="post-content">
    <div class="comment">
    <h4>
    ${comment.name}
    <img src="/Images/icons8-blue-tick-48.png" alt="" style="height: 3vh;"> 
    <img src="/Images/icons8-twitter-squared-48.png" alt="" style="height: 3vh;">
    </h4>
    <p>${comment.body}</p>
  </div>
    <hr>
    <div class="reactions">
        <img src="/Images/icons8-comments-48.png" alt="" style="height: 3vh;"><p>200</p>
        <img src="/Images/icons8-retweet-24.png" alt="" style="height: 3vh;"><p>200</p>
        <img src="/Images/icons8-like-30.png" alt="" style="height: 3vh;"><p>200</p>
    </div>
    </div>
      `;
        }

        console.log(commentsHtml);
        commentsContainer.innerHTML = commentsHtml;
    }
}

User.getUser(1)
    .then(user => {
        header.innerHTML = `
      <div class="nav1">
        <div class="pic">
          <img src="/Images/lec 6.jpeg" alt="">
        </div>
        <h2 style="color: azure;">Twitter Clone</h2>
        <div class="search">
          <p style="color: azure;">Search</p>
          <input type="text" placeholder="Search">
        </div>
      </div>
      <div class="nav2">
        <div class="profile-info">
          <h2>${user.name}</h2>
          <p>@ ${user.username}</p>
          <p>${user.website}</p>
          <p>${user.company.catchPhrase}</p>
          <p>
            <img src="/Images/icons8-location-50.png" alt="" style="height: 3vh;"> 
            ${user.address.city}
          </p>
        </div>
      </div>`;
    })
    .catch(error => {
        console.log('Error:', error);
    });

Posts.showPosts(1);
