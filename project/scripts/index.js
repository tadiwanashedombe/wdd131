const year = document.getElementById("year").textContent = new Date().getFullYear();
const galleryContainer = document.querySelector(".gallery-container");
const image = document.getElementsByClassName("image");

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
        url: "images/rafting1.webp",
        description: "Rafting1",
        fileName: "rafting1"
    },
    {
        url: "images/rafting2.jpg",
        description: "Rafting2",
        fileName: "rafting2"
    },
    {
        url: "images/rafting2.webp",
        description: "Rafting2",
        fileName: "rafting2"
    },
    {
        url: "images/rafting3.jpg",
        description: "Rafting3",
        fileName: "rafting3"
    },
    {
        url: "images/rafting3.webp",
        description: "Rafting3",
        fileName: "rafting3"
    },
    {
        url: "images/rafting4.jpg",
        description: "Rafting4",
        fileName: "rafting4"
    },
    {
        url: "images/rafting4.webp",
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

function displayGallery() {
    gallery.forEach(picture => {
        const img = document.createElement("picture");
        img.innerHTML = `<img src="${picture.url}" alt="${picture.description}" class='image'>`;

        // image.addEventListener("click", () => {
        //     showImage(picture.url,picture.description,picture.fileName);
        // });

        galleryContainer.appendChild(img);

    });

}

function showImage(url,description,fileName){
    const imageOpen = document.createElement("div");

}

displayGallery();