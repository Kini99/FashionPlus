let slideIndex1 = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides_fade");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex1++;
  if (slideIndex1 > slides.length) { slideIndex1 = 1 }
  slides[slideIndex1 - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

//Tops data fetch
let topsData = []
fetchTopsData();
async function fetchTopsData() {
  try {
    let request = await fetch("./data/tops.json");
    let tops_data = await request.json();
    display_tops(tops_data);
    console.log(tops_data);
    topsData = [...tops_data]
  } catch (error) {
    console.log(error);
  }
}

// Add to Cart array

let cartitems = JSON.parse(localStorage.getItem("cart"));
if (cartitems === null) {
  cartitems = [];
}
console.log(cartitems)
// tops data display function 

let displayel = document.querySelector("#products");
function display_tops(data) {
  displayel.innerHTML = null;
  data.forEach((element) => {
    let productCard = document.createElement("div");
    productCard.setAttribute("class", "ProductCard");
    productCard.style.boxShadow = "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px";
    productCard.style.width = "200px";
    productCard.style.padding = "20px";
    productCard.style.display = "grid";

    // productCard.addEventListener("click",productContent(element))

    let img = document.createElement("img");
    img.setAttribute("src", element.img)
    img.style.margin = "10px";
    img.style.border = "0.5px solid #bebebe";
    img.style.width = "90%"

    let title = document.createElement("h3");
    title.innerText = element.name;
    title.style.margin = "0";
    title.style.textAlign = "center";
    title.style.fontSize = "20px";

    let brand = document.createElement("p");
    brand.innerText = "by " + element.brand;
    brand.style.margin = "0";
    brand.style.textAlign = "center";

    let tag = document.createElement("p");
    tag.innerText = element.tag;
    tag.style.color = "#3a2a7c";
    tag.style.textAlign = "center";
    tag.style.fontWeight = "bolder";
    tag.style.marginBottom = "5px";
    tag.style.marginTop = "5px";

    let rating = document.createElement("p");
    rating.innerText = element.rating + "/5";
    rating.style.color = "#32a2a7c";

    let price = document.createElement("p");
    price.innerText = "₹ " + element.price + " /-";
    price.style.margin = "0 0 5px 0";
    price.style.textAlign = "center";
    price.style.fontWeight = "bolder";

    let addBtn = document.createElement("button");
    addBtn.innerText = "Add to Cart";
    addBtn.style.height = "30px";
    addBtn.style.margin = "0 0 10px 0";
    addBtn.style.backgroundColor = "#3a2a7c";
    addBtn.style.color = "white";
    addBtn.style.border = "none";
    addBtn.style.borderRadius = "10px";
    addBtn.style.cursor = "pointer";


    addBtn.addEventListener("click", () => {
      let flag = false;
      for (let i = 0; i < cartitems.length; i++) {
        if (cartitems[i].id === element.id) {
          flag = true;
        }
      }
      if (flag == false) {
        cartitems.push(element);
        localStorage.setItem("cart", JSON.stringify(cartitems));
        addBtn.innerText = "Added to Cart!";
      } else {
        alert("Product Already in Cart!");
      }
    })

    let wishlistimg = document.createElement("img");
    wishlistimg.setAttribute("src", "./Images/blank heart.png")
    wishlistimg.style.height = "30px";
    wishlistimg.style.margin = "10px ";
    wishlistimg.style.margin = "auto";
    wishlistimg.style.marginBottom = "5px";

    wishlistimg.addEventListener("click", () => {
      wishlistimg.setAttribute("src", "./Images/red heart.png")
      wishlistimg.addEventListener("click", () => {
        wishlistimg.setAttribute("src", "./Images/blank heart.png")
        wishlistimg.addEventListener("click", () => {
          wishlistimg.setAttribute("src", "./Images/red heart.png")
          wishlistimg.addEventListener("click", () => {
            wishlistimg.setAttribute("src", "./Images/blank heart.png")
            wishlistimg.addEventListener("click", () => {
              wishlistimg.setAttribute("src", "./Images/red heart.png")
              //to change on every click
            })
          })
        })
      })
    })
    // buttonsDiv.append(addBtn,wishlistimg)
    productCard.append(img, title, brand, tag, price, wishlistimg, addBtn);
    displayel.append(productCard);

  })
}

//search function

let form = document.querySelector("#search");
if(form){
form.addEventListener("submit", (element) => {
  element.preventDefault();
  // console.log("working")
  let search = form.searchWord.value;
  console.log(search)
  console.log(topsData)
  let searched = topsData.filter((el) => {
    // console.log(el)
    if (el.name.toLowerCase().includes(search.toLowerCase()) == true || el.brand.toLowerCase().includes(search.toLowerCase()) == true || el.desc.toLowerCase().includes(search.toLowerCase()) == true || el.fabric.toLowerCase().includes(search.toLowerCase()) == true) {
      return true;
    } else {
      return false;
    }
  })
  display_tops(searched)
})}

// filter function

document.getElementById("brand").addEventListener("change", (e) => {
  let filter = e.target.value;
  // console.log(allData);
  // let arr=getdata();
  filtered = topsData.filter((el, index) => {
    if (filter === "") {
      return el;
    } else {
      return el.brand === filter;
    }
  })
  display_tops(filtered);
})

document.getElementById("price").addEventListener("change", (e) => {
  let filter = e.target.value;
  // console.log(allData);
  // let arr=getdata();
  // console.log(filter)
  pricefiltered = topsData.filter((el, index) => {
    if (filter === "") {
      return el;
    } else if (filter === "high") {
      return el.price >= 3000;
    } else if (filter === "medium") {
      return el.price >= 1500 && el.price < 3000;
    } else if (filter === "low") {
      return el.price >= 0 && el.price < 1500;
    } else if (filter === "limited") {
      return el.tag == "Limited Time Price!"
    } else if (filter === "perfect") {
      return el.tag == "Perfect Price!"
    }
  })
  display_tops(pricefiltered);
})

//sort function

document.querySelector("#sort").addEventListener("change", (e) => {
  let sort = e.target.value;
  // console.log(sort);
  if (sort === "") {
    display_tops(topsData)
  } else if (sort === "topRated") {
    fetch("./data/tops_rating.json")
      .then((required) => {
        return required.json();
      })
      .then((res) => {
        ascData = res;
        console.log(ascData)
        display_tops(ascData);

      })
      .catch((err) = {
        // console.log(err)
      })
  } else if (sort === "highestPrice") {
    fetch("./data/tops_descPrice.json")
      .then((req) => {
        return req.json();
      })
      .then((resp) => {
        descData = resp;
        console.log(descData)
        display_tops(descData);
      })
      .catch((err) = {
        // console.log(err)
      })
  } else if (sort === "lowestPrice") {
    fetch("./data/tops_ascPrice.json")
      .then((required) => {
        return required.json();
      })
      .then((res) => {
        ascData = res;
        display_tops(ascData);
      })
      .catch((err) = {
        // console.log(err)
      })
  }
})

function home() {
  window.location = '/'
}

function home_signedIn() {
  window.location = "./homeSignedIn.html"
}

function cart() {
  window.location = "./cart.html"
}


signup_data = JSON.parse(localStorage.getItem("signupData"))
if (signup_data === null) {
  signup_data = [];
}

if(signup_data[0].name){
document.getElementById("userName").innerText = signup_data[0].name.toUpperCase();
}else{
  document.getElementById("userName").innerText = signup_data[0].name.toUpperCase();
}

function soon() {
  window.location = "./coming_soon.html"
}
// localStorage.clear()
// Individual Product Page

function productContent(element) {
  window.location = "./product_page";

  let displayProductEl = document.getElementById("individual_product")

  let individualProductCard = document.createElement("div");
  individualProductCard.setAttribute("class", "individualProductCard");
  individualProductCard.style.boxShadow = "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px";
  individualProductCard.style.width = "80%";
  individualProductCard.style.padding = "20px";
  individualProductCard.style.display = "grid";

  let img = document.createElement("img");
  img.setAttribute("src", element.img)
  img.style.margin = "10px";
  img.style.border = "0.5px solid #bebebe";
  img.style.width = "90%"

  let title = document.createElement("h3");
  title.innerText = element.name;
  title.style.margin = "0";
  title.style.textAlign = "center";
  title.style.fontSize = "20px";

  let brand = document.createElement("p");
  brand.innerText = "by " + element.brand;
  brand.style.margin = "0";
  brand.style.textAlign = "center";

  let tag = document.createElement("p");
  tag.innerText = element.tag;
  tag.style.color = "#3a2a7c";
  tag.style.textAlign = "center";
  tag.style.fontWeight = "bolder";
  tag.style.marginBottom = "5px";
  tag.style.marginTop = "5px";

  let rating = document.createElement("p");
  rating.innerText = element.rating + "/5";
  rating.style.color = "#3a2a7c";

  let price = document.createElement("p");
  price.innerText = "₹ " + element.price + " /-";
  price.style.margin = "0 0 5px 0";
  price.style.textAlign = "center";
  price.style.fontWeight = "bolder";

  let desc = document.createElement("p");
  desc.innerText = "Description: " + element.desc;
  desc.style.margin = "0";
  desc.style.textAlign = "left";

  let fabric = document.createElement("p");
  fabric.innerText = "Fabric: " + element.fabric;
  fabric.style.margin = "0";
  fabric.style.textAlign = "left";

  let details = document.createElement("p");
  details.innerText = "Details: " + element.details;
  details.style.margin = "0";
  details.style.textAlign = "left";

  let meas = document.createElement("p");
  meas.innerText = "Measurements: " + element.measurements;
  meas.style.margin = "0";
  meas.style.textAlign = "left";

  let addBtn = document.createElement("button");
  addBtn.innerText = "Add to Cart";
  addBtn.style.height = "30px";
  addBtn.style.margin = "0 0 10px 0";
  addBtn.style.backgroundColor = "#3a2a7c";
  addBtn.style.color = "white";
  addBtn.style.border = "none";
  addBtn.style.borderRadius = "10px";
  addBtn.style.cursor = "pointer";


  addBtn.addEventListener("click", () => {
    let flag = false;
    for (let i = 0; i < cartitems.length; i++) {
      if (cartitems[i].id === element.id) {
        flag = true;
      }
    }
    if (flag == false) {
      cartitems.push(element);
      localStorage.setItem("cart", JSON.stringify(cartitems));
      addBtn.innerText = "Added to Cart!";
    } else {
      alert("Product Already in Cart!");
    }
  })

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
      wishlistimg.addEventListener("click", () => {
        wishlistimg.setAttribute("src", "./Images/red heart.png")
        wishlistimg.addEventListener("click", () => {
          wishlistimg.setAttribute("src", "./Images/blank heart.png")
          wishlistimg.addEventListener("click", () => {
            wishlistimg.setAttribute("src", "./Images/red heart.png")
            //to change on every click
          })
        })
      })
    })
  })
  // buttonsDiv.append(addBtn,wishlistimg)
  individualProductCard.append(img, title, brand, tag, rating, price, desc, fabric, details, meas, wishlistimg, addBtn);
  displayProductEl.append(individualProductCard);


}

