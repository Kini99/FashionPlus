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

//Sign In function

let signup_data = JSON.parse(localStorage.getItem("signupData"))
if (signup_data === null) {
    signup_data = [];
}

let formel=document.querySelector("form");
formel.addEventListener("submit", (element)=>{
//    element.preventDefault()
    for(let i=0;i<signup_data.length;i++){
        // console.log("data"+signup_data[i].name)
        // console.log(formel.username.value)
        if(formel.username.value==signup_data[i].name&&formel.pass.value==signup_data[i].pass){
            let success=true;
            alert("LOGIN SUCCESSFUL!");
            window.location.href = "./index.html"
        }else{
            alert("Invalid Username/Password");
        }
        if(success==true){
            window.location.href = "./home_signedIn.html"
            document.getElementById("userName").innerText=signup_data[i].name;
        }
    }
})
// localStorage.clear()


function home(){
    window.location = '/'
}

function topsSignedInPage(){
    window.location = "./tops_signedIn.html"
}

function cart_page(){
    window.location = "./cart.html"
}

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

function tops(){
    window.location = "./tops.html"
  }
  
  function soon(){
    window.location = "./coming_soon.html"
  }