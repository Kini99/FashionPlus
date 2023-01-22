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

//get cart data
cartitems = JSON.parse(localStorage.getItem("cart"));
if (cartitems === null) {
  cartitems = [];
}
console.log(cartitems)

// localStorage.clear();

//cart functions

display(cartitems)


function display(data) {
  document.querySelector("#cart_products").innerHTML = null;
  data.forEach((element) => {
    let productCard = document.createElement("div");
    productCard.setAttribute("class", "ProductCard");
    productCard.style.boxShadow = "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px";
    productCard.style.width = "750px";
    productCard.style.padding = "15px";
    productCard.style.display = "flex";
    productCard.style.justifyContent = "space-between";

    let detailsCard = document.createElement("div");
    detailsCard.style.margin = "50px 5px";
    detailsCard.style.width = "350px"

    let img = document.createElement("img");
    img.setAttribute("src", element.img)
    //   img.style.margin="10px";
    img.style.border = "0.5px solid #bebebe";
    img.style.width = "20%"

    let title = document.createElement("h3");
    title.innerText = element.name;
    title.style.margin = "0";
    title.style.textAlign = "center";
    title.style.fontSize = "20px";

    let brand = document.createElement("p");
    brand.innerText = "by " + element.brand;
    brand.style.margin = "0";
    brand.style.textAlign = "center";

    let desc = document.createElement("p");
    desc.innerText = element.desc;
    desc.style.textAlign = "center";

    let fabric = document.createElement("p");
    fabric.innerText = "Fabric: " + element.fabric;
    fabric.style.textAlign = "center";

    let price = document.createElement("p");
    price.innerText = "₹ " + element.price + " /-";
    price.style.margin = "0 0 5px 0";
    price.style.textAlign = "center";
    price.style.fontWeight = "bolder";


    let addBtn = document.createElement("button");
    addBtn.innerText = "+";
    addBtn.style.height = "40px";
    addBtn.style.width = "40px";
    addBtn.style.fontSize = "20px";
    addBtn.style.margin = "50px 5px";
    addBtn.style.borderRadius = "5px";
    addBtn.style.border = "0.5px solid grey";

    addBtn.addEventListener("click", () => {
      let flag = false;
      for (let i = 0; i < cartitems.length; i++) {
        if (cartitems[i].id === element.id) {
          flag = true;
        }
      }
      if (flag == true) {
        element.qty++;
      }
      display(cartitems);
    })

    let qty = document.createElement("span");
    if (element.qty == null) {
      element.qty = 1;
    }
    qty.innerText = element.qty;

    qty.style.height = "40px";
    qty.style.fontSize = "20px";
    qty.style.margin = "60px 5px";
    qty.style.textAlign = "center";


    let lessBtn = document.createElement("button");
    lessBtn.innerText = "-";
    lessBtn.style.height = "40px";
    lessBtn.style.width = "40px";
    lessBtn.style.fontSize = "20px";
    lessBtn.style.margin = "50px 5px";
    lessBtn.style.textAlign = "center";
    lessBtn.style.borderRadius = "5px";
    lessBtn.style.border = "0.5px solid grey";

    lessBtn.addEventListener("click", () => {
      let flag = false;
      for (let i = 0; i < cartitems.length; i++) {
        if (cartitems[i].id === element.id) {
          flag = true;
        }
      }
      if (flag == true && element.qty > 1) {
        element.qty--;
      }
      display(cartitems);
    })

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.style.height = "40px";
    removeBtn.style.fontSize = "15px";
    removeBtn.style.margin = "50px 1px";
    removeBtn.style.textAlign = "center";
    removeBtn.style.borderRadius = "5px";
    removeBtn.style.border = "0.5px solid grey";

    removeBtn.addEventListener("click", () => {
      let flag = false;
      for (let i = 0; i < cartitems.length; i++) {
        if (cartitems[i].id === element.id) {
          flag = true;
        }
      }
      if (flag == true) {
        cartitems.splice(element, 1);
        localStorage.setItem("cart", JSON.stringify(cartitems));
      }
      display(cartitems);
    })

    detailsCard.append(title, brand, price, desc)
    productCard.append(img, detailsCard, addBtn, qty, lessBtn, removeBtn);
    document.querySelector("#cart_products").append(productCard);

    let totalPrice = 0;
    for (let i = 0; i < cartitems.length; i++) {
      totalPrice += data[i].price * data[i].qty;
    }

    document.getElementById("totalCost").innerText = "₹ " + totalPrice + " /-";


    document.querySelector("tbody").innerHTML = null;
    for (let i = 0; i < cartitems.length; i++) {
      let tr = document.createElement("tr")

      let titleBill = document.createElement("td");
      titleBill.innerText = cartitems[i].name;

      let qtyBill = document.createElement("td");
      qtyBill.innerText = cartitems[i].qty;;

      let priceBill = document.createElement("td");
      priceBill.innerText = "₹ " + cartitems[i].price;
      priceBill.style.textAlign = "left";
      priceBill.style.paddingLeft = "5px";

      let total = document.createElement("td");
      total.innerText = "₹ " + cartitems[i].price * cartitems[i].qty;
      total.style.textAlign = "left";
      total.style.paddingLeft = "5px";

      tr.append(titleBill, priceBill, qtyBill, total);
      document.querySelector("tbody").append(tr);
    }

    let totalCost = 0;
    document.querySelector("#apply").addEventListener("click", () => {
      console.log("working")
      let flag = false;
      if (document.querySelector("#coupon").value === "DISC25") {
        flag = true;
        document.getElementById("applied").innerText = "Coupon Applied Successfully!"
        document.getElementById("applied").style.color = "rgb(41, 195, 41)";
        document.getElementById("savings").innerText = "Congratulations! You saved ₹ " + Math.floor(totalPrice * (25 / 100)) + " /-"
      } else {
        flag = false;
        document.getElementById("applied").innerText = "Invalid Coupon Code"
        document.getElementById("applied").style.color = "red";
      }
      if (flag == true) {
        // console.log(totalPrice)
        totalCost = totalPrice - Math.floor(totalPrice * (25 / 100))
        // console.log(totalCost)
      } else {
        // console.log(totalPrice)
        totalCost = totalPrice
      }
      document.getElementById("totalCost").innerText = "₹ " + totalCost + " /-";

//       document.getElementById("savings").style.backgroundColor="rgb(41, 195, 41)";
// document.getElementById("savings").style.color="white"
    })

  })
}

document.getElementById("order").addEventListener("click", () => {
  alert("Order Placed Successfully!");
  home_signedIn();
})


function topsSignedInPage() {
  window.location = "./tops_signedIn.html"
}

function home_signedIn() {
  window.location = "./homeSignedIn.html"
}

signup_data = JSON.parse(localStorage.getItem("signupData"))
if (signup_data === null) {
  signup_data = [];
}

document.getElementById("userName").innerText = signup_data[0].name;
document.getElementById("username").innerText = signup_data[0].name.toUpperCase();


function home() {
  window.location = '/'
}

function soon() {
  window.location = "./coming_soon.html"
}