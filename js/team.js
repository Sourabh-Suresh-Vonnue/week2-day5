import { fetchJSON } from './utils.js';

async function getUsers() {
  let users = await fetchJSON('https://jsonplaceholder.typicode.com/users');
  return users;
}

async function updateTeamMembers() {
  const teamMembersDev = document.querySelector('#developer > .cards');
  const teamMembersMgmt = document.querySelector('#management > .cards');

  try {
    teamMembersDev.classList.add('loading');
    teamMembersMgmt.classList.add('loading');

    const users = await getUsers();

    const usersDev = users.slice(0, 5);
    const usersMgmt = users.slice(5, 10);

    usersDev.forEach((userDev) => {
      const teamMemberli = document.createElement('figure');
      teamMemberli.innerHTML = `<img src="" alt="" />
            <figcaption>
              <h3></h3>
              <p></p>
              <p></p>
              <ul>
                <li><a href="#" class="fa fa-linkedin"></a></li>
                <li><a href="#" class="fa fa-facebook"></a></li>
                <li><a href="#" class="fa fa-twitter"></a></li>
              </ul>
            </figcaption>`;
      teamMemberli.querySelector('h3').textContent = userDev.name;
      teamMemberli.querySelector('p').textContent = userDev.company.bs;
      teamMembersDev.appendChild(teamMemberli);
    });

    usersMgmt.forEach((userMgmt) => {
      const teamMemberli = document.createElement('figure');
      teamMemberli.innerHTML = `<img src="" alt="" />
            <figcaption>
              <h3></h3>
              <p></p>
              <p></p>
              <ul>
                <li><a href="#" class="fa fa-linkedin"></a></li>
                <li><a href="#" class="fa fa-facebook"></a></li>
                <li><a href="#" class="fa fa-twitter"></a></li>
              </ul>
            </figcaption>`;
      teamMemberli.querySelector('h3').textContent = userMgmt.name;
      teamMemberli.querySelector('p').textContent = userMgmt.company.bs;
      teamMembersMgmt.appendChild(teamMemberli);
    });
  } catch (err) {
    console.log(err);
    retryBtn.style.display = 'block';
  } finally {
    teamMembersDev.classList.remove('loading');
    teamMembersMgmt.classList.remove('loading');
  }
}

updateTeamMembers();
const retryBtn = document.querySelector('.retry-btn');
retryBtn.addEventListener('click', (event) => {
  updateServices();
  retryBtn.style.display = 'none';
});
