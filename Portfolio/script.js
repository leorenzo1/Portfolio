// typing effect
const words = ["Data Analyst", "Developer", "Web Developer", "Video Editor", "2nd Year IT"];
const typing = document.getElementById("typing");
let w = 0, c = 0, deleting = false;

function type(){
    const word = words[w];
    typing.textContent = word.substring(0, c);

    if(!deleting && c < word.length){
        c++;
        setTimeout(type, 110);
    } else if(!deleting){
        deleting = true;
        setTimeout(type, 1400);
    } else if(c > 0){
        c--;
        setTimeout(type, 55);
    } else {
        deleting = false;
        w = (w + 1) % words.length;
        setTimeout(type, 300);
    }
}
type();

// mobile menu
const navbar = document.getElementById("navbar");
document.getElementById("menu-btn").onclick = () => navbar.classList.toggle("open");
navbar.querySelectorAll("a").forEach(a => a.onclick = () => navbar.classList.remove("open"));

// highlight nav link of the section in view
const links = navbar.querySelectorAll("a");
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach(s => {
        if(window.scrollY >= s.offsetTop - 160) current = s.id;
    });
    links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
});
