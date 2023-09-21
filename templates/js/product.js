let isExpanded = false;
document.addEventListener('DOMContentLoaded', function() {
document.querySelector('.MenuIcon').addEventListener('click', function () {
    if (isExpanded) {
    document.querySelector('.Navbar').style.width = '4rem'; // 将宽度设置为初始宽度
    } else {
    document.querySelector('.Navbar').style.width = '16rem'; // 将宽度扩展
    }
    isExpanded = !isExpanded;
});
});