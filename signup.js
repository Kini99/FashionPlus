let formel=document.querySelector("form");
let signup_data = JSON.parse(localStorage.getItem("signupData"))
if (signup_data === null) {
    signup_data = [];
}
formel.addEventListener("submit", (e)=>{
    
    // for(let i=0;i<signup_data.length;i++){
    //     if(username.value==signup_data[i].name){
    //         // e.preventDefault();
    //         document.getElementById("name_err").innerText="Username Already Exists"
    //     }else if(email.value==signup_data[i].email){
    //         // e.preventDefault();
    //         document.getElementById("email_err").innerText="Email ID Already Exists"
    //     }else{
    //         addData();
    //     }
    // }
    // function addData(){
        let signup = {
        name: username.value,
        email: email.value,
        pass:pass.value
    }
    signup_data.push(signup);
    localStorage.setItem("signupData", JSON.stringify(signup_data));
// }

alert("Account Created Successfully");
window.location.href = "./index.html"
})
// localStorage.clear()


function home(){
    window.location = '/'
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