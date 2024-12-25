// 페이드인 스크롤
const content = document.getElementsByClassName("fade-interactive");
window.addEventListener("scroll", () => {
    const winH = window.innerHeight;

    for (let i = 0; i < content.length; i++) {
        const contentTop = content[i].getBoundingClientRect().top;

        if (contentTop - winH < 0) {
            content[i].classList.add("in");
        }
        if (contentTop - winH > 0) {
            content[i].classList.remove("in");
        }
    }
});