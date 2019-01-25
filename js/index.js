// your code here
function getRepositories() {
    const req = new XMLHttpRequest();
    const username = document.getElementById('username').value;
    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/users/' + username + '/repos');
    req.send();
  }
  
  function displayRepositories() {
    let repos = JSON.parse(this.responseText);
    const repoList = `<ul>${repos
      .map(r => { 
      return `
      <li><a href="${r.html_url}">${r.name}</a></li>
        <li><a href="#" data-username="${r.owner.login}" data-repository="${r.name} onclick="getCommits(this)">Get Commits</a></li>
        <li><a href="#" data-username="${r.owner.login}" data-repository="${r.name} onclick="getBranches(this)">Get Branches</a></li><br>
      `
    }).join('')}</ul>`
    document.getElementById('repositories').innerHTML = repoList;
  }
  
  function getCommits(el) {
    const username = el.dataset.username;
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/commits');
    req.send();
  }
  
  function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitList = `<ul>${commits
      .map(c => {
      return `
     <li>${c.commit.author.name}</li>
     <li>${c.author.login}</li>
     <li>${c.commit.message}</li>
     `
  }).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
  }
  
  function getBranches(el) {
    const username = el.dataset.username;
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/branches');
    req.send();
  }
  
  function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchList = `<ul>${branches
      .map(b => {
      return `
     <li>${b.name}</li>
     `
  }).join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
  }
  
  // This is a random comment typed in so my code will push to GitHub
  