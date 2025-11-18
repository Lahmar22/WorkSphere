const btnAjouterEmploye = document.getElementById("btnAjouterEmploye");
const autreExperience = document.getElementById("autreExperience");

const users = JSON.parse(localStorage.getItem("utilisateur")) || [];

function ajouter() {
    btnAjouterEmploye.addEventListener("click", () => {
        const nom = document.getElementById("nom").value.trim();
        const role = document.getElementById("role").value.trim();
        const photo = document.getElementById("photo").value.trim();
        const email = document.getElementById("email").value.trim();
        const telephone = document.getElementById("telephone").value.trim();
        const poste = document.getElementById("poste").value.trim();
        const entreprise = document.getElementById("entreprise").value.trim();
        const DateDebut = document.getElementById("DateDebut").value.trim();
        const DateFin = document.getElementById("DateFin").value.trim();




        if (!nom || !role || !photo || !email || !telephone || !poste || !entreprise || !DateDebut || !DateFin) return alert("svp entrez les information ");


        const utilisateur = {
            nom: nom,
            role: role,
            photo: photo,
            email: email,
            telephone: telephone,
            experiences: {
                poste: poste,
                entreprise: entreprise,
                DateDebut: DateDebut,
                DateFin: DateFin,
            },
        }

        const users = JSON.parse(localStorage.getItem("utilisateur")) || [];
        users.push(utilisateur);
        localStorage.setItem("utilisateur", JSON.stringify(users));


        alert("Added successfully");
    });

    afficherEmployes();
    
}

let compteurExp = 0;

function afficherPlusExp() {
    const plusExperiences = document.getElementById("plusExperiences");

    autreExperience.addEventListener('click', () => {


        compteurExp++;

        const nouveauFormulaire = `
        <div id="experiences-${compteurExp}" class="col-span-2 p-3 border-t mt-4">
            <h2 class="flex bg-green-600 rounded-xl w-32 h-8 justify-center items-center text-white mb-4">
                Expérience ${compteurExp}
            </h2>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2">
                    <label for="poste-${compteurExp}" class="block mb-2.5 text-sm font-medium text-heading">Poste</label>
                    <input type="text" name="poste[]" id="poste-${compteurExp}"
                        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Entrez le Titre du Poste" required>
                </div>

                <div class="col-span-2">
                    <label for="entreprise-${compteurExp}" class="block mb-2.5 text-sm font-medium text-heading">Entreprise</label>
                    <input type="text" name="entreprise[]" id="entreprise-${compteurExp}"
                        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Entrez le Nom de l'entreprise" required>
                </div>

                <div class="col-span-2 md:col-span-1">
                    <label for="DateDebut-${compteurExp}" class="block mb-2.5 text-sm font-medium text-heading">Date début</label>
                    <input type="date" name="DateDebut[]" id="DateDebut-${compteurExp}"
                        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        required>
                </div>

                <div class="col-span-2 md:col-span-1">
                    <label for="DateFin-${compteurExp}" class="block mb-2.5 text-sm font-medium text-heading">Date fin</label>
                    <input type="date" name="DateFin[]" id="DateFin-${compteurExp}"
                        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        required>
                </div>
            </div>
        </div>`;

        plusExperiences.insertAdjacentHTML('beforeend', nouveauFormulaire);    
    }); 
}



function afficherEmployes(){
    const listeEmployes = document.getElementById("listeEmployes");

    

    listeEmployes.innerHTML = "";

    users.forEach(u => {
        const li = document.createElement("li");
        li.innerHTML=`<button class="flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center"><img class="border-2 rounded-full w-[50px] h-[50px]" src="${u.photo}" alt="image">
                    <p class="flex flex-col">${u.nom} <small class="flex text-gray-600 justify-left"> ${u.role} </small></p> </button>`;

        listeEmployes.appendChild(li);
        
    });




}


ajouter();
afficherPlusExp();
