const btnAjouterEmploye = document.getElementById("btnAjouterEmploye");
const autreExperience = document.getElementById("autreExperience");

let compteurExp = 0;

const users = JSON.parse(localStorage.getItem("utilisateur")) || [];

function ajouter() {
    btnAjouterEmploye.addEventListener("click", () => {

        const nom = document.getElementById("nom").value.trim();
        const role = document.getElementById("role").value.trim();
        const photo = document.getElementById("photo").value.trim();
        const email = document.getElementById("email").value.trim();
        const telephone = document.getElementById("telephone").value.trim();

        if (!nom || !role || !photo || !email || !telephone)
            return alert("Veuillez remplir toutes les informations de base.");

        const poste = document.getElementById("poste").value.trim();
        const entreprise = document.getElementById("entreprise").value.trim();
        const DateDebut = document.getElementById("DateDebut").value.trim();
        const DateFin = document.getElementById("DateFin").value.trim();

        if (!poste || !entreprise || !DateDebut || !DateFin)
            return alert("Veuillez remplir l'expérience principale.");

        let experiences = [{
            poste,
            entreprise,
            DateDebut,
            DateFin,
        }];

        for (let i = 1; i <= compteurExp; i++) {
            const p = document.getElementById(`poste-${i}`).value.trim();
            const e = document.getElementById(`entreprise-${i}`).value.trim();
            const d1 = document.getElementById(`DateDebut-${i}`).value.trim();
            const d2 = document.getElementById(`DateFin-${i}`).value.trim();

            if (p && e && d1 && d2) {
                experiences.push({
                    poste: p,
                    entreprise: e,
                    DateDebut: d1,
                    DateFin: d2,
                });
            }
        }

        const utilisateur = {
            nom,
            role,
            photo,
            email,
            telephone,
            assigned: true,
            experiences
        };

        const users = JSON.parse(localStorage.getItem("utilisateur")) || [];
        users.push(utilisateur);

        localStorage.setItem("utilisateur", JSON.stringify(users));

        alert("Employé ajouté avec succès !");
    });

    afficherEmployes();
}


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




function afficherEmployes() {
    const listeEmployes = document.getElementById("listeEmployes");
    listeEmployes.innerHTML = "";

    users.forEach(u => {
        const li = document.createElement("li");

        li.innerHTML = `
            <button 
                data-modal-target="informationEmp" 
                data-modal-toggle="informationEmp"
                class="flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                
                <img class="border-2 rounded-full w-[50px] h-[50px]" src="${u.photo}" alt="image">
                <p class="flex flex-col">
                    ${u.nom} 
                    <small class="text-gray-600"> ${u.role} </small>
                </p>
            </button>
        `;

        const btn = li.querySelector("button");

        btn.addEventListener("click", () => {
            informationEmp(u);
        });

        listeEmployes.appendChild(li);
    });
}


function informationEmp(users) {
    const image = document.getElementById("image");
    const nomEmp = document.getElementById("nomEmp");
    const roleEmp = document.getElementById("roleEmp");
    const emailEmp = document.getElementById("emailEmp");
    const telephoneEmp = document.getElementById("telephoneEmp");
    const experiencesPlus = document.getElementById("experiencesPlus");

    experiencesPlus.innerHTML = "";

    image.innerHTML = `<img src="${users.photo}" alt="image">`
    nomEmp.innerHTML = `<h1>${users.nom}</h1>`
    roleEmp.innerHTML = `<p>${users.role}</p>`
    emailEmp.innerHTML = `<p>${users.email}</p>`
    telephoneEmp.innerHTML = `<p>${users.telephone}</p>`
    console.log(users.experiences);
    users.experiences.forEach((u, index) => {
        experiencesPlus.innerHTML += `<div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border shadow-sm">

    <div class="col-span-2">
        <h2 class="text-green-600 font-semibold text-lg">
            Expérience ${index + 1}
        </h2>
    </div>

    <div class="col-span-2 md:col-span-1 flex flex-col gap-1">
        <label class="text-xs text-gray-500">Poste</label>
        <div class="p-3 bg-white rounded-lg border text-sm text-gray-800">
            ${u.poste}
        </div>
    </div>

    <div class="col-span-2 md:col-span-1 flex flex-col gap-1">
        <label class="text-xs text-gray-500">Entreprise</label>
        <div class="p-3 bg-white rounded-lg border text-sm text-gray-800">
            ${u.entreprise}
        </div>
    </div>

    <div class="col-span-2 md:col-span-1 flex flex-col gap-1">
        <label class="text-xs text-gray-500">Date début</label>
        <div class="p-3 bg-white rounded-lg border text-sm text-gray-800">
            ${u.DateDebut}
        </div>
    </div>

    <div class="col-span-2 md:col-span-1 flex flex-col gap-1">
        <label class="text-xs text-gray-500">Date fin</label>
        <div class="p-3 bg-white rounded-lg border text-sm text-gray-800">
            ${u.DateFin}
        </div>
    </div>

</div>`;
    })


}


function listeIT() {
    const users = JSON.parse(localStorage.getItem("utilisateur")) || [];

    const rolesToFilter = [
        "techniciens it",
        "manager",
        "nettoyage",
    ];

    const IT = users.filter(user =>
        user.role &&
        rolesToFilter.some(role => user.role.toLowerCase().includes(role.toLowerCase()))
    );

    const ulIT = document.getElementById("ulIT");

    const assignedServeur = document.getElementById("assignedServeur");

    ulIT.innerHTML = "";

    IT.forEach(u => {
        const li = document.createElement("li");

        li.innerHTML = `
            <button 
                class="btnIt flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                
                <img class="border-2 rounded-full w-[50px] h-[50px]" src="${u.photo}" alt="image">
                <p class="flex flex-col">
                    ${u.nom}
                    <small class="text-gray-600"> ${u.role} </small>
                </p>
            </button>
        `;


        ulIT.appendChild(li);

        li.querySelector(".btnIt").addEventListener("click", () => {
            assignEmployee(u , assignedServeur);
        });
    });


}

function listeReception() {
    const users = JSON.parse(localStorage.getItem("utilisateur")) || [];

    const rolesToFilter = [
        "réception",
        "manager",
        "nettoyage",
    ];

    const reception = users.filter(user =>
        user.role &&
        rolesToFilter.some(role => user.role.toLowerCase().includes(role.toLowerCase()))
    );

    const ulReception = document.getElementById("ulReception");

    const assignedReception = document.getElementById("assignedReception");

    ulReception.innerHTML = "";

    reception.forEach(u => {
        const li = document.createElement("li");

        li.innerHTML = `
            <button 
                class="btnReception flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                
                <img class="border-2 rounded-full w-[50px] h-[50px]" src="${u.photo}" alt="image">
                <p class="flex flex-col">
                    ${u.nom}
                    <small class="text-gray-600"> ${u.role} </small>
                </p>
            </button>
        `;


        ulReception.appendChild(li);

        li.querySelector(".btnReception").addEventListener("click", () => {
            assignEmployee(u , assignedReception);
        });
    });




}


function listeArchives() {
    const users = JSON.parse(localStorage.getItem("utilisateur")) || [];

    const rolesToFilter = [
        "agents de sécurité",
        "techniciens it",
        "manager",
        "réception"
    ];

    const archive = users.filter(user =>
        user.role &&
        rolesToFilter.some(role => user.role.toLowerCase().includes(role.toLowerCase()))
    );

    const ulArchive = document.getElementById("ulArchive");
    const assignedArchive = document.getElementById("assignedArchive");

    ulArchive.innerHTML = "";

    archive.forEach(u => {
        const li = document.createElement("li");

        li.innerHTML = `
            <button 
                class="btnArchive flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                
                <img class="border-2 rounded-full w-[50px] h-[50px]" src="${u.photo}" alt="image">
                <p class="flex flex-col">
                    ${u.nom}
                    <small class="text-gray-600"> ${u.role} </small>
                </p>
            </button>
        `;


        ulArchive.appendChild(li);

        li.querySelector(".btnArchive").addEventListener("click", () => {
            assignEmployee(u , assignedArchive);
        });
    });
}



function listeConference() {
    const users = JSON.parse(localStorage.getItem("utilisateur")) || [];
    const ulConference = document.getElementById("ulConference");

    const assignedConference = document.getElementById("assignedConference");

    ulConference.innerHTML = "";

    users.forEach(u => {
        const li = document.createElement("li");

        li.innerHTML = `
            <button
                class="btnConference flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                
                <img class="border-2 rounded-full w-[50px] h-[50px]" src="${u.photo}" alt="image">
                <p class="flex flex-col">
                    ${u.nom}
                    <small class="text-gray-600"> ${u.role} </small>
                </p>
            </button>
        `;


        ulConference.appendChild(li);

        li.querySelector(".btnConference").addEventListener("click", () => {
            assignEmployee(u , assignedConference);
        });
    });



}


function listePersonne() {
    const users = JSON.parse(localStorage.getItem("utilisateur")) || [];
    const ulPersonne = document.getElementById("ulPersonne");
    const assignedPersonne = document.getElementById("assignedPersonne");

    ulPersonne.innerHTML = "";

    users.forEach(u => {
        const li = document.createElement("li");

        li.innerHTML = `
            <button 
                class="btnPersonne flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                
                <img class="border-2 rounded-full w-[50px] h-[50px]" src="${u.photo}" alt="image">
                <p class="flex flex-col">
                    ${u.nom}
                    <small class="text-gray-600"> ${u.role} </small>
                </p>
            </button>
        `;


        ulPersonne.appendChild(li);
        li.querySelector(".btnPersonne").addEventListener("click", () => {
             assignEmployee(u , assignedPersonne);
        });
    });



}


function listeSecurite() {
    const users = JSON.parse(localStorage.getItem("utilisateur")) || [];

    const rolesToFilter = ["agents de sécurité", "manager", "nettoyage"];

    const securite = users.filter(user =>
        user.role &&
        rolesToFilter.some(role => user.role.toLowerCase().includes(role.toLowerCase()))
    );

    const ulSecurite = document.getElementById("ulSecurite");
    const assignedSecurite = document.getElementById("assignedSecurite");
    ulSecurite.innerHTML = "";

    securite.forEach((u) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <button 
                class="btnSecurite flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                
                <img class="border-2 rounded-full w-[50px] h-[50px]" src="${u.photo}">
                <p class="flex flex-col">
                    ${u.nom}
                    <small class="text-gray-600">${u.role}</small>
                </p>
            </button>
        `;

        ulSecurite.appendChild(li);

        li.querySelector(".btnSecurite").addEventListener("click", () => {
            assignEmployee(u , assignedSecurite);
        });
    });
}

function assignEmployee(u , id) {

    const li = document.createElement("li");

    li.classList.add("assigned-item");

    li.innerHTML = `
        <div class="flex bg-white p-3 gap-3 border-2 rounded w-[180px] h-[50px] items-center justify-between">

            <div class="flex items-center gap-2">
                <img class="border-2 rounded-full w-[30px] h-[30px]" src="${u.photo}">
                <small class="text-gray-600">${u.nom}</small>
            </div>

            <button class="removeBtn text-red-500 font-bold text-lg">×</button>
        </div>
    `;

    id.appendChild(li);

    li.querySelector(".removeBtn").addEventListener("click", () => {
        li.remove();
    });

    
}




ajouter();
afficherPlusExp();
listeConference();

listeIT();
listeReception();
listeSecurite();
listeArchives();
listePersonne();

