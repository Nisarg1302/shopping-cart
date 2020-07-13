var json = `[   { "name": "new1", "price": 10, "image" : "01.jpg", "cat": ["new"] }, 
                    { "name": "new2", "price": 20, "image" : "02.jpg", "cat": ["new"] }, 
                    { "name": "sale1", "price": 30, "image" : "03.jpg", "cat": ["sale"] }, 
                    { "name": "sale2", "price": 40, "image" : "04.jpg", "cat": ["sale"] }, 
                    { "name": "food1", "price": 50, "image" : "05.jpg", "cat": ["food"] }, 
                    { "name": "food2", "price": 60, "image" : "06.jpg", "cat": ["food"] }, 
                    { "name": "new & sale", "price": 70, "image" : "07.jpg", "cat": ["new","sale"] }, 
                    { "name": "sale & food", "price": 80, "image" : "08.jpg", "cat": ["sale","food"] }
                ]`;
var products = JSON.parse(json);
var list = document.getElementsByClassName('product-list')[0];
// console.log(list);

products.forEach(product => {
    list.innerHTML += `
    <div class="col-md-3 single-product text-center">
        <img src="image/${product.image}">
        <h3>${product.name}</h3>
        <h5>$<span>${product.price}</span></h5>
        <button>Add To Cart</button>
    </div>`;
});

$("input[name=submit]").click(function(event){
    let name = $(".loginform input[name=name]").val();
    let password = $(".loginform input[name=password]").val();
    event.preventDefault();
    if(name == "user" && password == "user"){
        sessionStorage.setItem("loggedin", true);
        $("#logout-link").show();
        $("#login-link").hide();
        $("#popup-wrapper").hide();
        $(".wrong-cred").hide();
    }else{
        $(".wrong-cred").show();
    }
});

function logout(){
    sessionStorage.setItem("loggedin", false);
    sessionStorage.setItem("cart", null);
    $("#logout-link").hide();
    $("#login-link").show();
}
$(".side-menu li").click(function(event){
    $("input[name=search]").val("");
    let cat_active = $(this).data("cat");
    document.querySelectorAll(".side-menu li").forEach(li => {
        li.classList.remove("active");
        if($(li).data("cat") == cat_active){
            li.classList.add("active");
        }
    });
    list.innerHTML = "";


    if(cat_active == "all"){
        
        products.forEach(product => {
            list.innerHTML += `
            <div class="col-md-3 single-product text-center">
                <img src="image/${product.image}">
                <h3>${product.name}</h3>
                <h5>$<span>${product.price}</span></h5>
                <button>Add To Cart</button>
            </div>`;
        });
    }else{
        products.forEach(product => {
            if(product.cat.includes(cat_active)){
                list.innerHTML += `
                                    <div class="col-md-3 single-product text-center">
                                        <img src="image/${product.image}">
                                        <h3>${product.name}</h3>
                                        <h5>$<span>${product.price}</span></h5>
                                        <button>Add To Cart</button>
                                    </div>`;
            }
            
        });
    }
});


function search(input){
    // console.log(input.value);
    let cat_active = $(".side-menu li.active").data("cat");
    // console.log(cat_active);
    list.innerHTML = "";
    console.log(input.value);
    
    products.forEach(product => {
        
        // console.log(product.name.indexOf(input.value));
        if((product.cat.includes(cat_active) || cat_active=="all" ) && (product.name.indexOf(input.value) >= 0)){
            // console.log(product.name.indexOf(input.value));
            // console.log(product.name);
            
            list.innerHTML += `
                                <div class="col-md-3 single-product text-center">
                                    <img src="image/${product.image}">
                                    <h3>${product.name}</h3>
                                    <h5>$<span>${product.price}</span></h5>
                                    <button>Add To Cart</button>
                                </div>`;
        }
        
    });
}

// If user clicks anywhere outside of the popup, popup will close
    
var popup = document.getElementsByClassName('loginform')[0];
var popup1 = document.getElementById('popup-cart');
window.onclick = function(event) {

    if (event.target == popup) {
        popup.style.display = "none";
    }
    
    if (event.target == popup1) {
        popup1.style.display = "none";
    }
}

$(document).ready(function(){
    // alert(sessionStorage.getItem("loggedin"));
    if(sessionStorage.getItem("loggedin")=="true"){
        $("#login-link").hide();
    }else{
        $("#logout-link").hide();
    }
    $(".wrong-cred").hide();
});

function open_cart(){
    if(sessionStorage.getItem("loggedin")=="true"){
        document.getElementById('popup-cart').style.display='block';
        let container = $("#popup-cart .items");
        // console.log(container);
        
        // container.html("asdwad");
        // console.log(container.html());
        
        container.html("");
        let total = 0;

        var cart = sessionStorage.getItem("cart");
        
        
        cart_array = JSON.parse(cart);
        // console.log(cart_array);
        let string = "";
        cart_array.forEach(item => {

            string += `
            <div class="single-cart-item">
                <p> ${item.name}</p>
                <span>$${item.price}</span>
            </div>`;
            total += +item.price;
        });

        container.html(string);

        $(".total-cart span").html(total);
    }else{
        alert("Please login to access cart");
    }
    
}

$(".single-product button").click(function(event){
    // console.log($(this).parent());
    var cart = sessionStorage.getItem("cart");
    cart_array = JSON.parse(cart);
    let single = $(this).parent();
    
    
    let name = single.find("h3")[0].innerHTML;
    let price = single.find("span")[0].innerHTML;
    // console.log(name);
    temp = {"name" : name,"price":price};
    if(cart_array == null){
        var cart_array = [];
    }
    cart_array.push(temp);
    console.log(cart_array);
    cart = JSON.stringify(cart_array);
    // console.log(cart);
    sessionStorage.setItem("cart", cart);
});