const year = document.getElementById("year");
year.textContent = new Date().getFullYear();
const galleryContainer = document.querySelector(".gallery-container");
const nav = document.querySelector("nav");
const menu = document.querySelector("#menu");
const addCollectionBtn = document.querySelector(".add-collection");
const imageGrid = document.getElementById("imageGrid");
const selectedCount = document.getElementById("selectedCount");
const collectionForm = document.getElementById("collectionForm");
const collectionsContainer = document.querySelector(".collections-container");
const manageCollectionsContainer = document.getElementById("manageCollectionsContainer");
const manageGalleryContainer = document.getElementById("manageGalleryContainer");

function displayManageCollections() {
    if (!manageCollectionsContainer) return;

    const collections = JSON.parse(localStorage.getItem("collections")) || [];
    manageCollectionsContainer.innerHTML = "";

    if (collections.length === 0) {
        manageCollectionsContainer.innerHTML = "<p>No collections yet.</p>";
        return;
    }

    collections.forEach(collection => {
        const thumbnail = collection.photos[0]?.url || "images/collection.svg";
        const card = document.createElement("div");
        card.className = "collection-card manage-card";
        card.innerHTML = `
            <img src="${thumbnail}" alt="collection" loading="lazy" width="200" height="150">
            <div class="collection-info">
                <h3>${collection.name}</h3>
                <p>${collection.photos.length} photos</p>
            </div>
            <button class="delete-btn" title="Delete collection">🗑</button>
        `;

        card.querySelector(".delete-btn").addEventListener("click", () => {
            if (confirm(`Delete collection "${collection.name}"? This can't be undone.`)) {
                deleteCollection(collection.id);
                displayManageCollections();
            }
        });

        manageCollectionsContainer.appendChild(card);
    });
}

function displayManagePhotos() {
    if (!manageGalleryContainer) return;

    manageGalleryContainer.innerHTML = "";

    getActiveGallery().forEach(picture => {
        const div = document.createElement("div");
        div.className = "manage-photo";
        div.innerHTML = `
            <img src="${picture.url}" alt="${picture.description}" loading="lazy" width="80" height="80">
            <button class="delete-btn" title="Remove photo">🗑</button>
        `;

        div.querySelector(".delete-btn").addEventListener("click", () => {
            if (confirm(`Remove "${picture.description}" from your gallery?`)) {
                deletePhoto(picture.fileName);
                displayManagePhotos();
            }
        });

        manageGalleryContainer.appendChild(div);
    });
}

function displayCollections() {
    if (!collectionsContainer) return;

    const collections = JSON.parse(localStorage.getItem("collections")) || [];

    collectionsContainer.innerHTML = '';

    if (collections.length === 0) {
        if (window.location.pathname.includes('index.html')) {
            const card = document.createElement("div");
            card.className = "collection-card";
            card.innerHTML = `
            <img src="images/empty-collection.svg"  alt="collection" loading="lazy" class="default-thumbnail" width="300" height="200">
            <div class="collection-info" >
                <h3>No collections yet</h3>
            </div>
            `;
            collectionsContainer.appendChild(card);

        }
        else {
            collectionsContainer.innerHTML = "<p>No collections yet. Create + to create one</p>";
            return;
        }
    }

    collections.forEach(collection => {
        const thumbnail = collection.photos[0]?.url || "images/collection.svg";
        const card = document.createElement("div");
        card.className = "collection-card";
        card.innerHTML = `
            <img src="${thumbnail}" alt="collection" loading="lazy" width="80" height="80">
            <div class="collection-info" >
                <h3>${collection.name}</h3>
                <p>${collection.photos.length} photos</p>
            </div>
        `;
        card.addEventListener("click", () => showCollectionPhotos(collection));

        collectionsContainer.appendChild(card);
    });
}

function showCollectionPhotos(collection) {
    const overlay = document.createElement("div");
    overlay.className = "collection-overlay";
    overlay.innerHTML = `
        <div class="collections-overlay-content" >
            <span class="close-overlay" >x</span>
            <h2>${collection.name}</>
            <p> ${collection.photos.length} photos</p>
            <div class="collection-photos-grid">
                ${collection.photos.map(p => `<img src="${p.url}" alt="${p.fileName}" class="collection-photo" loading="lazy" width="200" height="150">`).join("")}
            </div>
        </div>
    `;

    const close = () => { overlay.remove(); document.body.style.overflow = ""; };

    overlay.querySelector(".close-overlay").addEventListener("click", close);
    overlay.addEventListener("click", e => { if (e.target == overlay) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); }, { once: true });

    overlay.querySelectorAll(".collection-photo").forEach(img => {
        img.addEventListener("click", () => {
            const pic = collection.photos.find(p => img.src.includes(p.fileName));
            if (pic) {
                showImage(pic.url, pic.fileName, pic.fileName);
            }
        });
    });

    document.body.style.overflow = "hidden";
    document.body.appendChild(overlay);
}

let selectedImages = new Set();

if (addCollectionBtn) {
    const createContainer = document.querySelector(".create-container");

    addCollectionBtn.addEventListener("click", () => {
        createContainer.classList.toggle("visible");
        addCollectionBtn.classList.toggle("visible");
    });
}
function displayImagePicker() {
    if (!imageGrid) return;
    imageGrid.innerHTML = '';

    getActiveGallery().forEach((picture, index) => {
        const div = document.createElement("div");
        div.className = "image-option";
        div.setAttribute("data-index", index);

        div.innerHTML = `
            <img src='${picture.url}' alt='${picture.description}' loading='lazy' width="80" height="80">
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

function getActiveGallery() {
    const deletedPhotos = JSON.parse(localStorage.getItem("deletedPhotos")) || [];
    return gallery.filter(picture => !deletedPhotos.includes(picture.fileName));
}

function deletePhoto(fileName) {
    const deletedPhotos = JSON.parse(localStorage.getItem("deletedPhotos")) || [];
    if (!deletedPhotos.includes(fileName)) {
        deletedPhotos.push(fileName);
        localStorage.setItem("deletedPhotos", JSON.stringify(deletedPhotos));
    }
}

function deleteCollection(id) {
    let collections = JSON.parse(localStorage.getItem("collections")) || [];
    collections = collections.filter(c => c.id !== id);
    localStorage.setItem("collections", JSON.stringify(collections));

}

if (picturesCount) {
    picturesCount.textContent = getActiveGallery().length;

}

function displayGallery(container, arr) {
    if (container) {

        container.innerHTML = "";

        arr.forEach(picture => {
            const img = document.createElement("picture");
            img.innerHTML = `<img src="${picture.url}" alt="${picture.description}" class='image' width="200" height="150" loading='lazy'>`;

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

displayGallery(galleryContainer, getActiveGallery());

if (imageGrid) {
    displayImagePicker();
}

displayCollections();
displayManageCollections();
displayManagePhotos();