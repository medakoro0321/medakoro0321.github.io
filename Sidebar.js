function stickySidebar() {
    const sidebar = document.querySelector(".sidebar");
    let windowTop = window.scrollY + 50;

    sidebar.style.top = windowTop + "px";
}

window.addEventListener("scroll", stickySidebar);
window.addEventListener("load", stickySidebar);