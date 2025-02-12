
async function getData() {
    try {

        const data = await fetch('https://fakestoreapi.com/products');
        const jsonData = await data.json();
        // console.log(jsonData);
        localStorage.setItem('productsList', JSON.stringify(jsonData))
        if (jsonData) {
            showData(jsonData);
        }

    } catch (error) {
        console.error("Api fetching error", error);
    }
};

if (localStorage.getItem('productsList')) {
    showData(JSON.parse(localStorage.getItem('productsList')));


}
else {
    getData();

}

function showData(data) {
    const container = document.querySelector('#card-container');
    container.innerHTML = '';  // Clear previous data

    data.forEach((element) => {
        let anchor = document.createElement("a");
        let div = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("p");
        let ratingPara = document.createElement("p");
        let pricePara = document.createElement("p");

        anchor.classList.add('card-link')
        // anchor.target='_blank';
        anchor.href = `cardPage.html?id=${element.id}`
        anchor.classList.add('col-sm-4', 'col-md-3');

        div.classList.add('cardItem');

        img.classList.add("card-img");
        img.src = element.image;

        title.classList.add("product-title");
        title.innerText = (element.title).substring(0, 20) + '...';

        ratingPara.classList.add("rating");
        ratingPara.innerText = element.rating.rate + '☆ ' + '(' + element.rating.count + ' ratings' + ')';

        pricePara.classList.add("price");
        pricePara.innerText = '$' + element.price;

        // create button for add to Cart 
        let addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart-btn','cardHoverBtn');
        addToCartButton.textContent = 'Add to Cart';

        // appending
        div.appendChild(img)
        div.appendChild(title)
        div.appendChild(ratingPara)
        div.appendChild(pricePara)
        div.appendChild(addToCartButton)

        anchor.appendChild(div);

        document.querySelector('#card-container').appendChild(anchor)
    });
}


//By the event bubbling concept
document.querySelector(".category-section").addEventListener('click', (event) => getCategoryproduct(event.target.innerText, event))


function getCategoryproduct(category, event) {

    event.stopPropagation()

    // console.log(event.target.tagName);

    if (event.target.tagName == 'BUTTON') {

        document.querySelectorAll('.category-section button').forEach((btn) => {
            btn.removeAttribute('id');


        });

        event.target.id = 'active';

    }



    let allCard = JSON.parse(localStorage.getItem('productsList'))


    let categoryCard = allCard.filter((item) => {
        return item.category == category.toLowerCase();
    })

    if (categoryCard.length > 0) {
        showData(categoryCard)
    }
    else {
        showData(allCard)
    }


}

