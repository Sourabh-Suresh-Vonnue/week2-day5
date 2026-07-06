const nav = document.getElementById('main-nav');
const navUl = document.createElement('ul');
navUl.innerHTML = `<li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="team.html">Team</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="blog.html">Blog</a></li>`;

if (window.location.pathname == '/') {
  const homePageLink = navUl.querySelector('a[href="index.html"');
  homePageLink.setAttribute('aria-current', 'page');
} else {
  const url = window.location.href;
  const links = Array.from(navUl.getElementsByTagName('a'));
  const link = links.find((link) => link.href == url);
  link.setAttribute('aria-current', 'page');
}

nav.appendChild(navUl);
