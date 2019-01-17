// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  let url = "https://api.github.com/users/" + getValueFromInput() + "/repos"
  req.open('GET', url);
  req.send();
}

function getValueFromInput(){
  return document.getElementById("username").value
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
 console.log(repos);
 const repoList = `<ul>${repos
   .map( r =>
       '<li>' + r.name +
       ' - <a href="#" data-repo="' + r.name + '"data-username="' + r.owner.login +
       '" onclick="getCommits(this)">Get Commits</a>' +
       ' - <a href="#" data-repo="' + r.name + '"data-username="' + r.owner.login +
       '" onclick="getBranches(this)">Get Branches</a>'
   )
   .join('')}</ul>`;
 document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const username = el.dataset.username
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/'+ username + "/" + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit => {
        if (commit.author){
          console.log(commit)
          return '<li><strong>' +
          commit.author.login +
          '</strong> - ' +
          commit.commit.message +
          '</strong> - ' +
          commit.commit.author.name +
          '</li>'
        }
      }
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el){
  const name = el.dataset.repo;
  const username = el.dataset.username
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/'+ username + "/" + name + '/branches');
  req.send();
}

function displayBranches(){
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches
      .map(
        branch => {
            return '<li><strong>' +
            branch.name +
            '</li>'
        }
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}
