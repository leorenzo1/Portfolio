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

// hire me email composer
const EMAIL = "guiralleorenzo312@gmail.com";
const modal = document.getElementById("hire-modal");
const form = document.getElementById("hire-form");

function openModal(){ modal.classList.add("open"); }
function closeModal(){ modal.classList.remove("open"); }

document.querySelectorAll(".hire-btn").forEach(b => b.onclick = e => {
    e.preventDefault();
    openModal();
});
document.getElementById("modal-close").onclick = closeModal;
modal.onclick = e => { if(e.target === modal) closeModal(); };
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

function buildEmail(){
    const name = document.getElementById("f-name").value.trim();
    const from = document.getElementById("f-email").value.trim();
    const service = document.getElementById("f-service").value;
    const message = document.getElementById("f-message").value.trim();

    const subject = "Inquiry: " + service;
    const body = "Hi Renz,\n\n" + message + "\n\n- " + name + " (" + from + ")";
    return { subject, body };
}

// opens a Gmail compose window with everything filled in
form.onsubmit = e => {
    e.preventDefault();
    const { subject, body } = buildEmail();
    const url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + EMAIL +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    window.open(url, "_blank");
    closeModal();
    form.reset();
};

// fallback: default mail app
document.getElementById("mail-app").onclick = e => {
    e.preventDefault();
    if(!form.reportValidity()) return;
    const { subject, body } = buildEmail();
    window.location.href = "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
};
