export default function animation() {
    const loaderSelector = ".loaderWrapper";

    window.addEventListener("load", () => {
        setTimeout(() => {
            document.querySelector(loaderSelector).classList.add("disappear");
            setTimeout(() => {
                document.querySelector(loaderSelector).style.display = "none";
            }, 400);
        }, 2000);
    });
}