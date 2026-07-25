const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");
const year = document.querySelector("#currentyear");
const imgContainer = document.querySelector(".container");
const containerTitle = document.querySelector("main h2");
hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});



const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Accra Ghana Temple",
        location: "Accra Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-71217.jpg"

    },
    {
        templeName: "Detroit Michigan Temple",
        location: "Bloomfield Hills, Michigan  48304 United States",
        dedicated: "1999, October, 23",
        area: 10700,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/detroit-michigan-temple/detroit-michigan-temple-61664.jpg"

    },
    {
        templeName: "Apia Samoa Temple",
        location: "Apia Samoa",
        dedicated: "2005, September, 4",
        area: 18691,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/apia-samoa-temple/apia-samoa-temple-13903.jpg"

    }
];


function showTemples(temples, pageTitle) {
    
    containerTitle.innerHTML = pageTitle;
    imgContainer.innerHTML = '';

    const loading = i == 0?"eager":"lazy";
    const fetchPriority = index === 0? "high" : "auto";

    temples.forEach(element => {
        const card = document.createElement("div")
        card.className = "card";
        card.innerHTML = `
    
    <h3>${element.templeName}</h3> 
    <p><b>Location: </b>${element.location}</p>
    <p><b>Dedication:</b>${element.dedicated}</p>
    <p><b>Size: </b>${element.area}</p>
    <figure>
    <img src="${element.imageUrl}" 
         alt='${element.templeName}' 
         width='300' 
         height='200' 
         loading='${loading}'
         fetchPriority='${fetchPriority}' >
    </figure>` ;

        imgContainer.appendChild(card);
    });
};

// home
document.querySelector("#home").addEventListener('click', (event) => {
    showTemples(temples, "Home");
});

// old
document.querySelector("#old").addEventListener("click", (event) => {
    const old = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(",")[0]);
        return year < 1900;
    });
    showTemples(old, "Temples before 1900");
});

// new
document.querySelector("#new").addEventListener("click", (event) => {
    const old = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(",")[0]);
        return year > 2000;
    });
    showTemples(old, "Temples After 2000");
});

// large
document.querySelector("#large").addEventListener("click", (event) => {
    const old = temples.filter(temple => {
        const squareFeet = parseInt(temple.area);
        return squareFeet < 90000;
    });
    showTemples(old, "Temples With More Than 90,000ft<sup>2</sup>");
});

// small
document.querySelector("#small").addEventListener("click", (event) => {
    const old = temples.filter(temple => {
        const squareFeet = parseInt(temple.area);
        return squareFeet < 10000;
    });
    showTemples(old, "Temples With Less Than 10,000ft<sup>2</sup>");
});

showTemples(temples,"Home")




year.textContent = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
