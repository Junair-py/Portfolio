function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("year").textContent = new Date().getFullYear();

