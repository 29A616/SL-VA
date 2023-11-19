var btnMode = document.getElementById('mode');
var btnModeBall = document.querySelector('.mode div');
var Echange = document.querySelector("body");

function Cmode(){
	if(Echange.className != "light"){
		Echange.className = "light";
		btnModeBall.style.left = "-1px";
		btnModeBall.style.right = "unset";
	}
	else{
		Echange.className = " ";
		btnModeBall.style.right = "-1px";
		btnModeBall.style.left = "unset";
	}
}

btnMode.addEventListener("click", Cmode);
