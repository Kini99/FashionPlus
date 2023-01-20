// slideshow header
let slideIndex2 = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides_fade");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex2++;
  if (slideIndex2 > slides.length) {slideIndex2 = 1}
  slides[slideIndex2-1].style.display = "block";
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
            alert("LOGIN SUCCESSFUL!");
            home_signedIn()
        }else{
            alert("Invalid Username/Password");
        }
            // home_signedIn()
            document.getElementById("userName").innerText=signup_data[i].name;
        }
    }
)
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

function home_signedIn(){
  window.location = "./homeSignedIn.html"
}

function tops(){
    window.location = "./tops.html"
  }
  
  function soon(){
    window.location = "./coming_soon.html"
  }