const burger = document.querySelector(".header .burger")
const nav = document.querySelector(".header nav")
const spnFirst = document.querySelector(".header .burger span:nth-of-type(1)")
const spnSecond = document.querySelector(".header .burger span:nth-of-type(2)")
const spnThird= document.querySelector(".header .burger span:nth-of-type(3)")


burger.addEventListener("click", ()=> {
    nav.classList.toggle("active");
    spnFirst.classList.toggle("left");
    spnSecond.classList.toggle("off");
    spnThird.classList.toggle("right");
});