const year = document.getElementById("year");
year.textContent = new Date().getFullYear();
const galleryContainer = document.querySelector(".gallery-container");
const nav = document.querySelector("nav");
const menu = document.querySelector("#menu");
menu.addEventListener("click", () => {
    nav.classList.toggle("show");
    menu.classList.toggle("show");
});

const picturesCount = document.querySelector(".photosCount");
const gallery = [
    {
        url: "images/aba-nigeria-temple.webp",
        description: "Aba Nigeria Temple",
        fileName: "aba-nigeria-temple"
    },
    {
        url: "images/abidjan-ivory-coast-templewebp",
        description: "Abidjan Ivory Coast Temple",
        fileName: "abidjan-ivory-coast-templewebp"
    },
    {
        url: "images/add collection.svg",
        description: "Add Collection",
        fileName: "add collection"
    },
    {
        url: "images/anchorage-temple.webp",
        description: "Anchorage Temple",
        fileName: "anchorage-temple"
    },
    {
        url: "images/apostle-paul-imprisoned.webp",
        description: "Apostle Paul Imprisoned",
        fileName: "apostle-paul-imprisoned"
    },
    {
        url: "images/birmingham-alabama-temple.webp",
        description: "Birmingham Alabama Temple",
        fileName: "birmingham-alabama-temple"
    },
    {
        url: "images/by-waters.webp",
        description: "By Waters",
        fileName: "by-waters"
    },
    {
        url: "images/castle.webp",
        description: "Castle",
        fileName: "castle"
    },
    {
        url: "images/collage-frame-svgrepo-com.svg",
        description: "Collage Frame Svg Repo Com",
        fileName: "collage-frame-svgrepo-com"
    },
    {
        url: "images/collection2.svg",
        description: "Collection2",
        fileName: "collection2"
    },
    {
        url: "images/collection.svg",
        description: "Collection",
        fileName: "collection"
    },
    {
        url: "images/dark-theme.svg",
        description: "Dark Theme",
        fileName: "dark-theme"
    },
    {
        url: "images/delete.svg",
        description: "Delete",
        fileName: "delete"
    },
    {
        url: "images/gallery.svg",
        description: "Gallery",
        fileName: "gallery"
    },
    {
        url: "images/harare-small.webp",
        description: "Harare Small",
        fileName: "harare-small"
    },
    {
        url: "images/home.svg",
        description: "Home",
        fileName: "home"
    },
    {
        url: "images/light-theme.svg",
        description: "Light Theme",
        fileName: "light-theme"
    },
    {
        url: "images/logo.png",
        description: "Logo",
        fileName: "logo"
    },
    {
        url: "images/logo.svg",
        description: "Logo",
        fileName: "logo"
    },
    {
        url: "images/plus-svgrepo-com.svg",
        description: "Plus Svg Repo Com",
        fileName: "plus-svgrepo-com"
    },
    {
        url: "images/racing.webp",
        description: "Racing",
        fileName: "racing"
    },
    {
        url: "images/rafting1.jpg",
        description: "Rafting1",
        fileName: "rafting1"
    },
    {
        url: "images/rafting2.jpg",
        description: "Rafting2",
        fileName: "rafting2"
    },
    {
        url: "images/rafting3.jpg",
        description: "Rafting3",
        fileName: "rafting3"
    },
    {
        url: "images/rafting4.jpg",
        description: "Rafting4",
        fileName: "rafting4"
    },
    {
        url: "images/rafting.webp",
        description: "Rafting",
        fileName: "rafting"
    },
    {
        url: "images/salt-lake-temple.webp",
        description: "Salt Lake Temple",
        fileName: "salt-lake-temple"
    },
    {
        url: "images/slide1.webp",
        description: "Slide1",
        fileName: "slide1"
    },
    {
        url: "images/slide3.webp",
        description: "Slide3",
        fileName: "slide3"
    },
    {
        url: "images/slide4.webp",
        description: "Slide4",
        fileName: "slide4"
    },
    {
        url: "images/slide5.webp",
        description: "Slide5",
        fileName: "slide5"
    },
    {
        url: "images/temple-small.webp",
        description: "Temple Small",
        fileName: "temple-small"
    },
    {
        url: "images/trip1.webp",
        description: "Trip1",
        fileName: "trip1"
    },
    {
        url: "images/trip2.webp",
        description: "Trip2",
        fileName: "trip2"
    },
    {
        url: "images/trip3.webp",
        description: "Trip3",
        fileName: "trip3"
    },
    {
        url: "images/wireframes.webp",
        description: "Wireframes",
        fileName: "wireframes"
    }
];

if (picturesCount) {
    picturesCount.textContent = gallery.length;

}

function displayGallery() {
    galleryContainer.innerHTML = "";

    gallery.forEach(picture => {
        const img = document.createElement("picture");
        img.innerHTML = `<img src="${picture.url}" alt="${picture.description}" class='image' loading='lazy'>`;

        const image = img.querySelector("img");

        image.addEventListener("click", () => {
            showImage(picture.url, picture.description, picture.fileName);
        });

        galleryContainer.appendChild(img);

    });

}

function showImage(url, description = 'missing description', fileName) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox",
        lightbox.innerHTML = `
        <span class="close-lightbox">&times;</span>
        <img src="${url}" alt="${description}" class="lightbox-image">
        <div class="details">
            <p class="lightbox-caption"><b>File Name: </b>${fileName}</p>
            <p class="lightbox-caption"><b>Description: </b>${description}</p>
        </div>
        

    `
    const closeBtn = lightbox.querySelector(".close-lightbox");
    closeBtn.addEventListener("click", () => {
        lightbox.remove();
    });

    const closeWithEsc = (e) => {
        if (e.key === "Escape") {
            lightbox.remove();
            document.removeEventListener("keydown", closeWithEsc);
        }
    };

    document.addEventListener("keydown", closeWithEsc);

    document.body.appendChild(lightbox);
}

displayGallery();