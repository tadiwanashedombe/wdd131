const year = document.getElementById("year");
year.textContent = new Date().getFullYear();
const galleryContainer = document.querySelector(".gallery-container");
const nav = document.querySelector("nav");
const menu = document.querySelector("#menu");
const addCollectionBtn = document.querySelector(".add-collection");
const imageGrid = document.getElementById("imageGrid");
const selectedCount = document.getElementById("selectedCount");
const collectionForm = document.getElementById("collectionForm");

let selectedImages = new Set();

if(addCollectionBtn){
    const createContainer = document.querySelector(".create-container");

    addCollectionBtn.addEventListener("click",()=>{
        createContainer.classList.toggle("visible");
        addCollectionBtn.classList.toggle("visible");
    });
}
function displayImagePicker() {
    if(!imageGrid)return;
    imageGrid.innerHTML = '';

    gallery.forEach((picture, index) => {
        const div = document.createElement("div");
        div.className = "image-option";
        div.setAttribute("data-index", index);

        div.innerHTML = `
            <img src='${picture.url}' alt='${picture.description}' loading='lazy'>
            <span class='checkmark'>✓</span>
        `;

        div.addEventListener("click", () => toggleImageSelected(div, picture));

        imageGrid.appendChild(div);
    });
}

function toggleImageSelected(element, picture) {
    if (selectedImages.has(picture)) {
        selectedImages.delete(picture);
        element.classList.remove("selected");
    }
    else {
        selectedImages.add(picture);
        element.classList.add("selected");
    }

    selectedCount.textContent = selectedImages.size;
}
if (collectionForm) {

    collectionForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const collectionName = document.getElementById("collectionName").value.trim();

        if (!collectionName) {
            alert("Please enter a collection name");
            return;
        }

        if (selectedImages.size === 0) {
            alert("Please select at least one photo");
            return;
        }

        const newCollection = {
            id: Date.now(),
            name: collectionName,
            photos: Array.from(selectedImages).map(pic => ({
                url: pic.url,
                fileName: pic.fileName,
                dateAdded: new Date().toISOString()
            })),
            dateCreated: new Date().toISOString()
        };

        const collections = JSON.parse(localStorage.getItem("collections")) || [];
        collections.push(newCollection);
        localStorage.setItem("collections", JSON.stringify(collections));

        collectionForm.reset();
        selectedImages.clear();
        document.querySelectorAll(".image-option").forEach(el => el.classList.remove("selected"));
        selectedCount.textContent = "0";

        alert(`Collection "${collectionName}" created with ${newCollection.photos.length} photos!`);
    });
}


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
        url: "images/harare-small.webp",
        description: "Harare Small",
        fileName: "harare-small"
    },
    {
        url: "images/logo.png",
        description: "Logo",
        fileName: "logo"
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

function displayGallery(container, arr) {
    if (container) {

        container.innerHTML = "";

        arr.forEach(picture => {
            const img = document.createElement("picture");
            img.innerHTML = `<img src="${picture.url}" alt="${picture.description}" class='image' loading='lazy'>`;

            const image = img.querySelector("img");

            image.addEventListener("click", () => {
                showImage(picture.url, picture.description, picture.fileName);
            });

            container.appendChild(img);

        });
    }

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

displayGallery(galleryContainer, gallery);

if (imageGrid) {
    displayImagePicker();

}
