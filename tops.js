// slideshow header
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides_fade");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3000); 
}

//Tops data fetch
let tops_data=[]
fetchTopsData();
async function fetchTopsData(){
  try{
    let request=await fetch("./data/tops.json");
    let tops_data=await request.json();
    display_tops(tops_data);
    console.log(tops_data);
  }catch(error){
    // console.log(error);
  }
}

// Add to Cart array

let cartitems = JSON.parse(localStorage.getItem("cart"));
    if (cartitems === null) {
        cartitems = [];
    }

// tops data display function 

let displayel=document.querySelector("#products");
function display_tops(data){
displayel.innerHTML=null;
data.forEach((element)=>{
  let productCard=document.createElement("div");
  productCard.setAttribute("class","ProductCard");
  productCard.style.boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px";

  let img=document.createElement("img");
  img.setAttribute("src",element.img)
  img.style.margin="10px";
  img.style.border="0.5px solid #bebebe";

  let title=document.createElement("h3");
  title.innerText=element.name;
  title.style.margin="0";

  let brand=document.createElement("p");
  brand.innerText="by "+element.brand;
  brand.style.margin="0";

  let tag=document.createElement("p");
  tag.innerText=element.tag;
  tag.style.color="#32a2a7c";

  let rating=document.createElement("p");
  rating.innerText=element.rating+"/5";
  rating.style.color="#32a2a7c";

  let price=document.createElement("p");
  price.innerText="₹ "+element.price+" /-";
  price.style.margin="0 0 5px 0";
  price.style.textDecoration="line-through";

  let addBtn = document.createElement("button");
  addBtn.innerText = "Add to Cart";
  addBtn.style.height="30px";
  addBtn.style.margin="0 0 10px 0";

  addBtn.addEventListener("click", () => {
    let flag = false;
    for (let i = 0; i < cartitems.length; i++) {
      if (cartitems[i].id === element.id) {
        flag = true;
      }
    }
    if (flag == false) {
      let payload = { ...element, qty: 1 };
      cartitems.push(payload);
      localStorage.setItem("cart", JSON.stringify(products));
      addBtn.innerText = "Added to Cart";
    } else {
      alert("Product Already in Cart");
    }
})

  let wishlistimg = document.createElement("img");
  wishlistimg.setAttribute("src","./Images/blank heart.png")
  wishlistimg.style.height="30px";
  wishlistimg.style.margin="10px ";

  wishlistimg.addEventListener("click", () => {
    // wishlistItems.push(element);
    // localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    // if(wishlistimg.src.value=="./Images/blank heart.png"){
    //   wishlistimg.setAttribute("src","./Images/red heart.png")
    // }else{
    //   wishlistimg.setAttribute("src","./Images/blank heart.png")
    // }
    wishlistimg.setAttribute("src","./Images/red heart.png")
    wishlistimg.addEventListener("click", () => {
      wishlistimg.setAttribute("src","./Images/blank heart.png")
      //to change on every click
    })
})

productCard.append(img, title, brand, price, addBtn,wishlistimg);
displayel.append(productCard);

})
}

//search function

let form = document.querySelector("#search");
form.addEventListener("submit", (element) => {
  element.preventDefault();
  let search = form.search.value;
  let searched = data.filter((el) => {
    if (el.country.toLowerCase().includes(search.toLowerCase()) == true) {
      return true;
    } else {
      return false;
    }
  })
  display(searched)
})

// filter function

document.getElementById("brand").addEventListener("change", (e) => {
  let filter = e.target.value;
  // console.log(allData);
  // let arr=getdata();
  tops_data = tops_data.filter((el, index) => {
    if (filter === "") {
      return el;
    } else {
      return el.brand === filter;
    }

  })
  display_tops(tops_data);
})

document.getElementById("price").addEventListener("change", (e) => {
  let filter = e.target.value;
  // console.log(allData);
  // let arr=getdata();
  tops_data = tops_data.filter((el, index) => {
    if (filter === "") {
      return el;
    } else if(filter === "3000+"){
      return el.price >=3000;
    }else if(filter === "1500 - 2999"){
      return el.price >=1500 && <3000;
    }else if(filter === "0 - 1499"){
      return el.price >=0 && <1500;
    }
  })
  display_tops(tops_data);
})

//sort function

function sort_asc(a,b){
  return b-a;
}
function sort_des(a,b){
  return a-b;
}

document.getElementById("sort").addEventListener("change", (e) => {
  let sort = e.target.value;
  // console.log(allData);
  // let arr=getdata();
  tops_data = tops_data.filter((el, index) => {
    if (sort === "") {
      return el;
    } else if(sort === "Top Rated"){
      return sort_asc(el.rating);
    }else if(sort === "Highest Price"){
      return sort_asc(el.price);
    }else if(sort === "Lowest Price"){
      return sort_des(el.price);
    }
  })
  display_tops(tops_data);
})

function home(){
  window.location = '/'
}

function home_signedIn(){
  window.location = "./home_signedIn.html"
}