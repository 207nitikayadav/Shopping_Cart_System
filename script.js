let itemList =  document.querySelector('.items');
let cart = document.querySelector('.cart');
let cartList = document.querySelector('.cart-list');
let total = document.querySelector('.total');
let subtotal = document.querySelector('.subtotal');


let items = [
    {
        id: 1,
        name: 'The Lean Startup',
        image: 'images/LeanStartup.jpg',
        price: 290
    },
    {
        id: 2,
        name: 'Thinking Fast and Slow',
        image: 'images/thinkingfast$slow.jpg',
        price: 395
    },
    {
        id: 3,
        name: 'Atomic Haabits',
        image: 'images/atomichabits.jpg',
        price: 171
    },
    {
        id: 4,
        name: 'Good to Great',
        image: 'images/goodtogreat.jpg',
        price: 175
    },
    {
        id: 5,
        name: 'Mindset      ',
        image: 'images/mindset.jpg',
        price: 199
    },
    {
        id: 6,
        name: 'The 4-Hour Work Week',
        image: 'images/the4hourweek.jpg',
        price: 199
    },
    {
        id: 7,
        name: 'Coffee can Investing',
        image: 'images/coffeecaninvesting.jpg',
        price: 158
    },
    {
        id: 8,
        name: 'The 5 AM Club',
        image: 'images/the5amclub.jpg',
        price: 228
    }
]

function initItem() {
    items.forEach((value, key) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('style', 'width: 15rem;');
        card.innerHTML = `
            <img src="${value.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title text-center">${value.name}</h4>
                <p class="card-text text-center">Price: ${value.price}</p>
                <button class="add-to-cart btn btn-dark form-control" onclick="addToCart(${key})">Add to Cart</button>
            </div>`;
        itemList.appendChild(card);
    });
}

initItem();

let cartLists = [];

function addToCart(key) {
    if (cartLists[key] == null) {
        cartLists[key] = JSON.parse(JSON.stringify(items[key]));
        cartLists[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;
    cartLists.forEach((value, key) => {
        totalPrice = totalPrice + value.price;

        if (value != null) {
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            listItem.innerHTML = `
                <div><img src="${value.image}" style="width: 50px"/></div>
                <div><h5 class="mt-1" style="font-size:15px;">${value.name}</h5></div>
                <div><h6 class="mt-2"style="font-size:15px;">${value.price.toLocaleString()}</h6></div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count m-2 style="font-size:10px;">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            cartList.appendChild(listItem);
        }
    });

    // Calculating  total
    total.innerText = (totalPrice).toLocaleString();

    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete cartLists[key];
    } else {
        cartLists[key].quantity = quantity;
        cartLists[key].price = quantity * items[key].price;
    }
    reloadCart();
}

function clearCart() {
    cartLists = [];
    reloadCart();
}