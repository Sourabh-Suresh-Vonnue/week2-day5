const navs = Array.from(document.getElementsByTagName('nav'));
const navUl = document.createElement('ul');
navUl.innerHTML = `<li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="team.html">Team</a></li>
          <li><a href="contact.html">Contact</a></li>`;
navs.forEach((nav) => nav.appendChild(navUl));
