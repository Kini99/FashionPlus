// slideshow header
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides_fade");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

// Page locations

function topsSignedInPage() {
  window.location = "./tops_signedIn.html"
}

function soon() {
  window.location = "./coming_soon.html"
}

function home() {
  window.location = '/'
}

function home_signedIn() {
  window.location = "./homeSignedIn.html"
}

function cart() {
  window.location = "./cart.html"
}

function tops() {
  window.location = "./tops.html"
}

// username

let signUp_data = JSON.parse(localStorage.getItem("signupData"))
if (signUp_data === null) {
  signUp_data = [];
}
console.log(signUp_data[0].name)
document.getElementById("userName").innerText = signUp_data[0].name.toUpperCase();
// document.getElementById("username").innerText=signup_data[0].name.toUpperCase();

// Trending data fetch
let trending_data = []

fetchTrendingData();
async function fetchTrendingData() {
  try {
    let request = await fetch("./data/trending.json");
    let trending_data = await request.json();
    display_trending(trending_data);
  } catch (error) {
    // console.log(error);
  }
}


// Add to Cart array

let cartitems = JSON.parse(localStorage.getItem("cart"));
if (cartitems === null) {
  cartitems = [];
}

//Add to Wishlist array

// let wishlistItems = JSON.parse(localStorage.getItem("wishlist"));
//     if (wishlistItems === null) {
//       wishlistItems = [];
//     }

// trending data display function
let trendingdisplayel = document.querySelector("#trending_products");
function display_trending(data) {
  trendingdisplayel.innerHTML = null;
  data.forEach((element) => {
    let productCard = document.createElement("div");
    productCard.setAttribute("class", "trendingProductCard");
    productCard.setAttribute("class", "item");
    productCard.style.boxShadow = "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px";
    productCard.style.display = "grid";
    productCard.style.width = "200px";
    productCard.style.padding = "20px";


    let img = document.createElement("img");
    img.setAttribute("src", element.img)
    img.style.margin = "10px";
    img.style.border = "0.5px solid #bebebe";

    let title = document.createElement("h3");
    title.innerText = element.title;
    title.style.margin = "0";

    let brand = document.createElement("p");
    brand.innerText = element.brand;
    brand.style.margin = "0";

    let price = document.createElement("p");
    price.innerText = "₹ " + element.price + " /-";
    price.style.margin = "0";
    price.style.textDecoration = "line-through";

    let disc_price = document.createElement("h4");
    disc_price.innerText = "₹ " + element.discount_price + " /-";
    disc_price.style.margin = "0 0 5px 0";

    let addBtn = document.createElement("button");
    addBtn.innerText = "Add to Cart";
    addBtn.style.height = "30px";
    addBtn.style.width = "100px";
    addBtn.style.margin = "0 auto 10px auto";
    addBtn.style.backgroundColor = "#3a2a7c";
    addBtn.style.color = "white";
    addBtn.style.border = "none";
    addBtn.style.borderRadius = "10px";

    //   addBtn.addEventListener("click", () => {
    //     cartitems.push(element);
    //     localStorage.setItem("cart", JSON.stringify(cartitems));
    // })

    let wishlistimg = document.createElement("img");
    wishlistimg.setAttribute("src", "./Images/blank heart.png")
    wishlistimg.style.height = "30px";
    wishlistimg.style.margin = "10px ";
    wishlistimg.style.margin = "auto";
    wishlistimg.style.marginBottom = "5px";

    wishlistimg.addEventListener("click", () => {
      // wishlistItems.push(element);
      // localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      // if(wishlistimg.src.value=="./Images/blank heart.png"){
      //   wishlistimg.setAttribute("src","./Images/red heart.png")
      // }else{
      //   wishlistimg.setAttribute("src","./Images/blank heart.png")
      // }
      wishlistimg.setAttribute("src", "./Images/red heart.png")
      wishlistimg.addEventListener("click", () => {
        wishlistimg.setAttribute("src", "./Images/blank heart.png")
        //to change on every click
      })
    })

    productCard.append(img, title, brand, price, disc_price, wishlistimg, addBtn);
    trendingdisplayel.append(productCard);

  })
}

let signup_data = JSON.parse(localStorage.getItem("signupData"))
if (signup_data === null) {
  signup_data = [];
}
// document.getElementById("userName").innerText=signup_data.name;



