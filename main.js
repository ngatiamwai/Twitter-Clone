const header = document.getElementsByClassName("header")[0];
const posts_container = document.getElementsByClassName("posts")[0];
const comment_container = document.getElementsByClassName("post-comments")[0];
const select_container = document.getElementById("select-user");

const userIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const postId = "";

async function fetchUser(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}


async function displayUserPosts(userId) {
    try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await postsResponse.json();
        const userHtml = `
      <div class="nav1">
        <div class="pic">
          <img src="/Images/lec 6.jpeg" alt="">
        </div>
        <h2 style="color: azure;">Twitter Clone</h2>
        <div class="search">
          <p style="color: azure;">Search</p>
          <select name="${user.id}" id="select-user">
          <option value="${user.userIds}">${user.name}</option>
          </select>
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
      </div>
    `;

        header.innerHTML = userHtml;

        let postsHtml = "";
        posts.forEach((post) => {
            postsHtml += `
      <div class="post">
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
    </div>
      `;
        });

        posts_container.innerHTML = postsHtml;
    } catch (error) {
        console.error("Error fetching user posts:", error);
    }
}

displayUserPosts(userIds[1]);


const Comments = {
    showComments: function (postId) {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then((response) => response.json())
            .then((comments) => {
                let commentsHtml = "";
                comments.forEach((comment) => {
                    commentsHtml += `
                            <div class="comment">
                            <div class=" post-pic">
                                
                                <img class="profile-img" src="/Images/lec 6.jpeg" alt="">
                            </div>
                            <div class="post-content">
                                <div class="commen">
                                    <p>
                                        ${comment.name}
                                        <img src="/Images/icons8-blue-tick-48.png" alt="" style="height: 3vh;">
                                        <img src="/Images/icons8-twitter-squared-48.png" alt="" style="height: 3vh;">
                                    </p>
                                    <p>${comment.body}</p>
                                </div>
                                <hr>
                                <div class="reactions">
                                    <img src="/Images/icons8-comments-48.png" alt="" style="height: 3vh;">
                                    <p>200</p>
                                    <img src="/Images/icons8-retweet-24.png" alt="" style="height: 3vh;">
                                    <p>200</p>
                                    <img src="/Images/icons8-like-30.png" alt="" style="height: 3vh;">
                                    <p>200</p>
                                </div>
                            </div>
                        </div>
                                `;
                });

                comment_container.innerHTML = commentsHtml;
            })
            .catch((error) => {

                console.error("cannot pick comments of the post:", error);
            });
    }
};




