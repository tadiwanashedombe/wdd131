const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

year.textContent = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
