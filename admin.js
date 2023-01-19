// products data display function 
display_products()

let displayel=document.querySelector("tbody");

function display_products(data){
displayel.innerHTML=null;
data.forEach((element)=>{
  let tr=document.createElement("tr")

  let id=document.createElement("td");
  id.innerText=element.id;

  let title=document.createElement("td");
  title.innerText=element.name;

  let brand=document.createElement("td");
  brand.innerText=element.brand;;

  let tag=document.createElement("td");
  tag.innerText=element.tag;

  let rating=document.createElement("td");
  rating.innerText=element.rating;

  let desc=document.createElement("td");
  desc.innerText=element.desc;

  let price=document.createElement("td");
  price.innerText="₹ "+element.price;

  let removeBtn = document.createElement("td");
  removeBtn.innerText = "Remove Item";
  removeBtn.addEventListener("click", () => {
    products = products.filter((el, i) => {
        return index !== i;
      })
      localStorage.setItem("cart", JSON.stringify(products));
      appenddata(products);
})


tr.append(id,title, brand, desc, tag, price, rating, removeBtn);
displayel.append(tr);
})
}

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
