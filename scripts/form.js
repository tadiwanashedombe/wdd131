const year = document.querySelector(".getyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;


const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];
// populate select 
function populateProductOptions() {
    const productSelect = document.getElementById("products");

    if (!productSelect) {
        return; // Exit if products select doesn't exist
    }

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option)
    });
}

// review counter
function handleReviewCounter() {
    if (window.location.pathname.includes('review.html')) {
        // Retrieve current count
        let reviewCount = localStorage.getItem("reviewCount");

        // Parse count or set to zero if not exist
        reviewCount = reviewCount ? parseInt(reviewCount) : 0;

        // Increment counter
        reviewCount++;

        // update counter
        localStorage.setItem("reviewCount", reviewCount.toString());

        displayReviewCount(reviewCount);

    }
}

function displayReviewCount(count){
    const main = document.querySelector('main');

    const countDiv = document.createElement("p");
    const flashcard = document.querySelector('.reviewCounter')    
    if(count === 1){
        countDiv.textContent = "🎉🎉🎉 This is your 1st product review."
    }else{
        countDiv.textContent = `🎉 You have completed ${count} product reviews!`
    }
    
    flashcard.appendChild(countDiv);

}
// 
document.addEventListener('DOMContentLoaded',() => {
    populateProductOptions();
    handleReviewCounter();
})


