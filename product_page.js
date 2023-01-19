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

display_tops();

let displayel=document.querySelector("#products");
function display_tops(data){
displayel.innerHTML=null;
data.forEach((element)=>{
  let imgDiv=document.createElement("div");
  imgDiv.setAttribute("class","img_div");
  imgDiv.style.boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px";
  let detailsDiv=document.createElement("div");
  detailsDiv.setAttribute("class","details_div");;

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

  let desc=document.createElement("p");
  desc.innerText=element.desc;

  let fabric=document.createElement("p");
  fabric.innerText=element.fabric;

  let details=document.createElement("p");
  details.innerText=element.details;

  let meas=document.createElement("p");
  meas.innerText=element.measurements;

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
    
//     cartitems.push(element);
//     localStorage.setItem("cart", JSON.stringify(cartitems));
//     addBtn.innerText="Added to Cart!"
// })

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
imgDiv.append(img)
detailsDiv.append(title, brand, tag, rating, desc, fabric, details, meas, price, addBtn, wishlistimg);
displayel.append(imgDiv, detailsDiv);

})
}

function home(){
  window.location = '/'
}

function home_signedIn(){
  window.location = "./home_signedIn.html"
}