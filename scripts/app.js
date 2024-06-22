document.addEventListener("DOMContentLoaded", () => {
  const apiBaseUrl = "http://20.64.234.72:3000"; // Reemplaza con la IP de tu VM

  // Elementos del DOM
  const userForm = document.getElementById("user-form");
  const usersList = document.getElementById("users-list");
  //   const postForm = document.getElementById("post-form");
  //   const postsList = document.getElementById("posts-list");

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/users`);
      const users = await response.json();
      usersList.innerHTML = ""; // Limpiar la lista de usuarios antes de actualizar
      users.forEach((user) => {
        const userDiv = createUserElement(user); // Crear el elemento HTML para cada usuario
        usersList.appendChild(userDiv); // Agregar el elemento a la lista de usuarios
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createUserElement = (user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    userDiv.innerHTML = `
      <img src="${user.profile_pic}" alt="${user.username}" class="profile-pic">
      <div class="user-info">
          <h3>${user.display_name} <span>@${user.username}</span></h3>
          <p>${user.bio}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Followers:</strong> ${user.followers_count} | <strong>Following:</strong> ${user.following_count}</p>
          <button onclick="editUser('${user._id}')">Edit</button>
          <button onclick="deleteUser('${user._id}')">Delete</button>
      </div>
    `;
    return userDiv;
  };
  const saveUser = async (event) => {
    event.preventDefault();
    const userId = document.getElementById("user-id").value;
    const user = {
      username: document.getElementById("username").value,
      display_name: document.getElementById("display_name").value,
      email: document.getElementById("email").value,
      profile_pic: document.getElementById("profile_pic").value,
      bio: document.getElementById("bio").value,
      followers_count: parseInt(
        document.getElementById("followers_count").value
      ),
      following_count: parseInt(
        document.getElementById("following_count").value
      ),
      password_hash: document.getElementById("password_hash").value,
    };

    try {
      if (userId) {
        await fetch(`${apiBaseUrl}/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      } else {
        await fetch(`${apiBaseUrl}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }
      userForm.reset();
      document.getElementById("user-id").value = "";
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  window.editUser = async (userId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/users/${userId}`);
      const user = await response.json();
      document.getElementById("user-id").value = user._id;
      document.getElementById("username").value = user.username;
      document.getElementById("display_name").value = user.display_name;
      document.getElementById("email").value = user.email;
      document.getElementById("profile_pic").value = user.profile_pic;
      document.getElementById("bio").value = user.bio;
      document.getElementById("followers_count").value = user.followers_count;
      document.getElementById("following_count").value = user.following_count;
      document.getElementById("password_hash").value = user.password_hash; // Añadido
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const updateUserSelect = (users) => {
    const userSelect = document.getElementById("user_id");
    userSelect.innerHTML = '<option value="">Select User</option>';
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user._id;
      option.textContent = `${user.display_name} (@${user.username})`;
      userSelect.appendChild(option);
    });
  };
  window.deleteUser = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`${apiBaseUrl}/users/${userId}`, {
          method: "DELETE",
        });
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  userForm.addEventListener("submit", saveUser);

  window.clearUserForm = () => {
    document.getElementById("user-id").value = "";
    userForm.reset();
  };

  //   window.clearPostForm = () => {
  //     document.getElementById("post-id").value = "";
  //     postForm.reset();
  //   };

  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch(`${apiBaseUrl}/posts`);
  //       const posts = await response.json();
  //       postsList.innerHTML = ""; // Limpiar la lista de publicaciones antes de actualizar
  //       posts.forEach((post) => {
  //         const postDiv = createPostElement(post); // Crear el elemento HTML para cada publicación
  //         postsList.appendChild(postDiv); // Agregar el elemento a la lista de publicaciones
  //       });
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };

  //   const createPostElement = (post) => {
  //     const postDiv = document.createElement("div");
  //     postDiv.className = "post";
  //     postDiv.innerHTML = `
  //       <div class="post-header">
  //           <img src="${post.user_id.profile_pic}" alt="${
  //       post.user_id.username
  //     }" class="profile-pic">
  //           <div class="post-info">
  //               <h3>${post.user_id.display_name} <span>@${
  //       post.user_id.username
  //     }</span></h3>
  //           </div>
  //       </div>
  //       <p>${post.content}</p>
  //       ${
  //         post.images.length
  //           ? `<img src="${post.images[0]}" alt="Post image" class="post-image">`
  //           : ""
  //       }
  //       <div class="post-stats">
  //           <span>👍 ${post.likes_count}</span>
  //           <span>👎 ${post.dislikes_count}</span>
  //           <span>💬 ${post.comments_count}</span>
  //           <span>🔁 ${post.retweet_count}</span>
  //       </div>
  //       <button onclick="editPost('${post._id}')">Edit</button>
  //       <button onclick="deletePost('${post._id}')">Delete</button>
  //     `;
  //     return postDiv;
  //   };

  //   const savePost = async (event) => {
  //     event.preventDefault();
  //     const postId = document.getElementById("post-id").value;
  //     const post = {
  //       user_id: document.getElementById("user_id").value,
  //       content: document.getElementById("content").value,
  //       images: document
  //         .getElementById("images")
  //         .value.split(",")
  //         .filter((url) => url.trim() !== ""),
  //       likes_count: parseInt(document.getElementById("likes_count").value),
  //       dislikes_count: parseInt(document.getElementById("dislikes_count").value),
  //       comments_count: parseInt(document.getElementById("comments_count").value),
  //       retweet_count: parseInt(document.getElementById("retweet_count").value),
  //     };
  //     try {
  //       if (postId) {
  //         await fetch(`${apiBaseUrl}/posts/${postId}`, {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(post),
  //         });
  //       } else {
  //         await fetch(`${apiBaseUrl}/posts`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(post),
  //         });
  //       }
  //       postForm.reset();
  //       document.getElementById("post-id").value = "";
  //       fetchPosts();
  //     } catch (error) {
  //       console.error("Error saving post:", error);
  //     }
  //   };

  //   window.editPost = async (postId) => {
  //     try {
  //       const response = await fetch(`${apiBaseUrl}/posts/${postId}`);
  //       const post = await response.json();
  //       document.getElementById("post-id").value = post._id;
  //       document.getElementById("user_id").value = post.user_id._id;
  //       document.getElementById("content").value = post.content;
  //       document.getElementById("images").value = post.images.join(",");
  //       document.getElementById("likes_count").value = post.likes_count;
  //       document.getElementById("dislikes_count").value = post.dislikes_count;
  //       document.getElementById("comments_count").value = post.comments_count;
  //       document.getElementById("retweet_count").value = post.retweet_count;
  //     } catch (error) {
  //       console.error("Error editing post:", error);
  //     }
  //   };

  //   window.deletePost = async (postId) => {
  //     if (confirm("Are you sure you want to delete this post?")) {
  //       try {
  //         await fetch(`${apiBaseUrl}/posts/${postId}`, {
  //           method: "DELETE",
  //         });
  //         fetchPosts();
  //       } catch (error) {
  //         console.error("Error deleting post:", error);
  //       }
  //     }
  //   };

  //   postForm.addEventListener("submit", savePost);

  // Inicializar la aplicación
  fetchUsers();
  //   fetchPosts();
});
