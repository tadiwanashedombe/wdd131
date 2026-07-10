const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");
const year = document.querySelector("#currentyear");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

year.textContent = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
