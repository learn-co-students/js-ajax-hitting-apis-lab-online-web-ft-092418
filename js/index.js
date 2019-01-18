// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
   req.addEventListener('load', displayRepositories);
   req.open('GET', `https://api.github.com/users/${username.value}/repos`);
   req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' + r.html_url +' - <a href="#" data-repository="' + r.name + '" data-username="'+ r.owner.login +'"onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  console.log(repo, username)
  req.addEventListener('load', displayCommits);
  req.open('GET', "https://api.github.com/repos/"+username+"/"+repo+"/commits");
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  debugger;
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>' + commit.commit.author.name + '-' +
        commit.author.login +
        ' - ' +
        commit.commit.message +
        ' - <a href="#" data-repository="' + "master" + '" data-username="'+ commit.author.login +'" data-branches_url="'+ commit +'" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const req = new XMLHttpRequest();
   req.addEventListener('load', displayBranches);
   const username = el.dataset.username
   const repository = el.dataset.repository
   req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`);
   req.send();
}

function displayBranches() {

}
