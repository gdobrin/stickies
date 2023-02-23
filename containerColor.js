const colors = {
    "red": "red",
    "blue": "blue",
    "yellow": "yellow"
}

window.onload = function () {
    const colorBtn = document.getElementsByName("color");
    for (let i = 0; i < colorBtn.length; i++) {
        colorBtn[i].onclick = function () {
            let col = colors[this.value];
            document.getElementsByClassName("container")[0].style.visibility = "visible";
            document.getElementsByClassName("container")[0].style.backgroundColor = col;
            document.getElementsByClassName("choose-color")[0].remove();
        }
    }

}