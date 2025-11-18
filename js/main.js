
btnAjouterEmploye.addEventListener("click", () => {
    const nom = document.getElementById("nom").value.trim();
    const role = document.getElementById("role").value.trim();
    const photo = document.getElementById("photo").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();

    if(!nom || !role || !photo || !email || !telephone) return alert("svp entrez les information ");
    

    const user = JSON.parse(localStorage.getItem("utilisateur")) || [];
    user.push({ nom, role,photo, email, telephone });
    localStorage.setItem("utilisateur", JSON.stringify(user));


    alert("Added successfully");
});

function uploadPhoto(){
    const photoPersonnelle = document.getElementById("photoPersonnelle");
    const photo = document.getElementById("photo").value.trim();
    
    photoPersonnelle.innerHTML=`<img src="${photo}" alt="photoPersonelle">`;

}

uploadPhoto();