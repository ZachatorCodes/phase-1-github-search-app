document.addEventListener("DOMContentLoaded", () => {
    button = document.getElementById("github-form")[1];
    form = document.getElementById("search");
    userList = document.getElementById("user-list");
    repoList = document.getElementById("repos-list");
    button.addEventListener("click", (e) => {
        e.preventDefault();
        userList.textContent = "";
        userSearch(form.value);
    });
});

function userSearch(user) {
    fetch(`https://api.github.com/search/users?q=${user}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(data => {
        data.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.login;
            li.addEventListener("click", userRepos)
            userList.appendChild(li);
        });
    });
}


function userRepos(e) {
    repoList.textContent = "";
    const user = e.target.textContent;
    fetch(`https://api.github.com/users/${user}/repos`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.name;
            repoList.appendChild(li);
        });
    })
}
