let username=document.querySelector('#username')
let password=document.querySelector('#password')

let sign_in_btn =document.querySelector('#sign_in')

sign_in_btn.addEventListener('click',function(e){

e.preventDefault();

if(username.value === "" || password.value ===""){
    alert('please fill the data');
}else{
    localStorage.setItem('username',username.value)
    localStorage.setItem('password',password.value)
    setTimeout( ()=>{


        window.location="index.html"
    },1000)
}


})