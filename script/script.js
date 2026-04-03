
//A Function to ease retrieval of DOM elements
const elem = (x) => document.getElementById(x);

var preloader = elem("preloader");
var counter = elem("counter");
var text = elem("text");

var nameBox = elem("nameBox");
var nameInput = elem("nameInput");
var nameBtn = elem("nameBtn");

function loader() {

  let c = 0;

  let count = setInterval(function () {
    c++;
    counter.innerText = c;

    if (c === 100) {

      clearInterval(count);
      counter.classList.add("hide");
      text.classList.add("fadeIn");
      text.classList.add("fadeOut");

      setTimeout(function () {        
        nameBox.style.display = "block";
      }, 1000);

    }

  }, 40);
}

nameBtn.onclick = function () {
  const visitors = document.querySelectorAll(".visitor");
  const name = nameInput.value.trim() || "My Guest";
  visitors.forEach((visitor) => {
    visitor.innerText = name;
  });
  preloader.classList.add("active");
};

loader();

//Sticky menu part
let header = elem("header");

window.addEventListener("scroll", function () {
  if (this.scrollY > 20) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

//auto typing texts
let typed = new Typed(".typing", {
  strings: [
    "Computer Science Student",
    "Aspiring Web Developer",
    "Frontend Developer",
    "Networking Enthusiast",
  ],

  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

//for skills animation
var skill = document.querySelectorAll("#skill");

window.addEventListener("scroll", function () {
  if (this.scrollY >= 1400) {
    for (var i = 0; i < skill.length; i++) {
      skill[i].style.display = "block";
    }
  } else {
    for (var i = 0; i < skill.length; i++) {
      skill[i].style.display = "none";
    }
  }
});

//for more skills
var more_btn = elem("more_btn");
var more_card = elem("more_card");

more_btn.addEventListener("click", function () {
  more_card.style.display = "block";
});

//for menu buttons
var menu = document.querySelector("#menu");

const toggleMenu = (menu_btn) => {
  menu.classList.toggle("active");

  menu_btn.innerHTML =
    menu_btn.innerHTML == `<i class="fa fa-bars"></i>`
      ? (menu_btn.innerHTML = `<i class="fa fa-times"></i>`)
      : (menu_btn.innerHTML = `<i class="fa fa-bars"></i>`);
};

//for move to top button and the sidebar icons
var top_btn = elem("top");
var sidebar = elem("sidebar");
window.addEventListener("scroll", function () {
  if (this.scrollY > 20) {
    top_btn.style.display = "block";
    sidebar.style.display = "block";
  } else {
    top_btn.style.display = "none";
    sidebar.style.display = "none";
  }
});

const url = "data.json";

const project_container = document.querySelector(
  "#projects .part_2 .container",
);
const loading_screen = document.querySelector(
  "#projects .part_2 .loading_screen",
);

const filter_buttons = document.querySelectorAll(".filter_bar ul li");

// Load projects first time
loadProjects();

// Fetch + filter projects
async function loadProjects(type = "all", clickedBtn = null) {
  // active button
  if (clickedBtn) {
    filter_buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    clickedBtn.classList.add("active");
  }

  project_container.innerHTML = "";
  loading_screen.style.display = "flex";

  const res = await fetch(url);
  const data = await res.json();

  let projects = data;

  if (type !== "all") {
    projects = data.filter((p) => p.type === type);
  }

  projects = projects.sort((a, b) => b.id - a.id);

  showProjects(projects);

  loading_screen.style.display = "none";
}

// Render projects
function showProjects(projects) {
  project_container.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("div");

    card.className = project.type === "mobile" ? "p_cards mobile" : "p_cards";

    card.innerHTML = `
    
    <div class="${project.type === "mobile" ? "p_image mobile" : "p_image"}">
      <img src="${project.screenshot}" width="100%" height="100%" alt="${project.name} image">
    </div>

    <div class="info">

      <div class="text_part">
        <h4>${project.title}</h4>
        <p>${project.info}</p>
      </div>

      <div class="btn_part">
        <a href="${project.link}" target="_blank" title="${project.title}">
          <button class="btn">
          ${
            project.type === "mobile"
              ? 'Download <i class="fa fa-android"></i>'
              : 'View Live <i class="fa fa-globe"></i>'
          }
          </button>
        </a>
      </div>

    </div>
    
    `;

    project_container.appendChild(card);
  });
}

// Filter handler
function handleFilter(elem, type) {
    loadProjects(type, elem);
}

// Project Counter
const count_all = document.querySelector("span.count_all");
const count_landing = document.querySelector("span.count_landing");
const count_api = document.querySelector("span.count_api");
const count_mobile = document.querySelector("span.count_mobile");
const count_personal = document.querySelector("span.count_personal");
const count_formal = document.querySelector("span.count_formal");

const options = document.querySelectorAll(".custom_select option");

countProjects();

async function countProjects() {
  const res = await fetch(url);
  const data = await res.json();

  const all_projects = data.length;
  const landing_projects = data.filter((p) => p.type === "landing_page").length;
  const api_projects = data.filter((p) => p.type === "api").length;
  const mobile_projects = data.filter((p) => p.type === "mobile").length;
  const personal_projects = data.filter(
    (p) => p.type === "personal_project",
  ).length;
  const formal_projects = data.filter(
    (p) => p.type === "formal_project",
  ).length;

  count_all.innerText = `${all_projects}+`;
  count_landing.innerText = `${landing_projects}+`;
  count_api.innerText = `${api_projects}+`;
  count_mobile.innerText = `${mobile_projects}+`;
  count_personal.innerText = `${personal_projects}+`;

  options[0].innerText = `All (${all_projects}+)`;
  options[1].innerText = `Landing Pages (${landing_projects}+)`;
  options[2].innerText = `API's (${api_projects}+)`;
  options[3].innerText = `Mobile (${mobile_projects}+)`;
  options[4].innerText = `Personal Projects (${personal_projects}+)`;

};





