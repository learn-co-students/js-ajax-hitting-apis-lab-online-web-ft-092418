const API = 'https://api.github.com';
function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `${API}/users/${username}/repos`);
  req.send();
}

function getCommits(repo) {
  const name = repo.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `${API}/repos/${repo.dataset.username}/${name}/commits`);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
      .map(repo => {
        const dataUsername = `data-username=${repo.owner.login}`;
        const dataRepoName = `data-RepoName=${repo.name}`;
        return `
          <li>
            <p>${repo.name}</p>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
          </li>`;
      })
      .join('')}
    </ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = 
    `<ul>${commits
      .map(
        commit =>
          `<li>
            <h3> ${commit.commit.author.name} ${commit.author.login}</h3> 
            ${commit.commit.message}
          </li>`
      )
      .join('')}
    </ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(repo) {
  const repoName = repo.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `${API}/repos/${repo.dataset.username}/${repoName}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => `<li>${branch.name}</li>`)
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}