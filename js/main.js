document.addEventListener('DOMContentLoaded', () => {
    const btnAjouterEmploye = document.getElementById("btnAjouterEmploye");
    const autreExperience = document.getElementById("autreExperience");
    let compteurExp = 0;



    function ajouter() {
        if (!btnAjouterEmploye) return;

        btnAjouterEmploye.addEventListener("click", () => {

            const nom = document.getElementById("nom")?.value.trim();
            const role = document.getElementById("role")?.value.trim();
            const photo = document.getElementById("photo")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const telephone = document.getElementById("telephone")?.value.trim();

            if (!nom || !role || !photo || !email || !telephone) {
                return alert("Veuillez remplir toutes les informations de base.");
            }

            const poste = document.getElementById("poste")?.value.trim();
            const entreprise = document.getElementById("entreprise")?.value.trim();
            const DateDebut = document.getElementById("DateDebut")?.value.trim();
            const DateFin = document.getElementById("DateFin")?.value.trim();

            if (!poste || !entreprise || !DateDebut || !DateFin) {
                return alert("Veuillez remplir l'expérience principale.");
            }

            let experiences = [{
                poste,
                entreprise,
                DateDebut,
                DateFin,
            }];

            for (let i = 1; i <= compteurExp; i++) {
                const p = document.getElementById(`poste-${i}`)?.value.trim();
                const e = document.getElementById(`entreprise-${i}`)?.value.trim();
                const d1 = document.getElementById(`DateDebut-${i}`)?.value.trim();
                const d2 = document.getElementById(`DateFin-${i}`)?.value.trim();

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
                assigned: false,
                departmentId: null,
                experiences
            };

            const currentUsers = JSON.parse(localStorage.getItem("utilisateur")) || [];
            currentUsers.push(utilisateur);

            localStorage.setItem("utilisateur", JSON.stringify(currentUsers));

            alert("Employé ajouté avec succès !");

            location.reload();

        });
    }


    function afficherPlusExp() {
        const plusExperiences = document.getElementById("plusExperiences");
        if (!autreExperience || !plusExperiences) return;

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
        if (!listeEmployes) return;

        listeEmployes.innerHTML = "";
        const users = JSON.parse(localStorage.getItem("utilisateur")) || [];

        users.forEach(u => {
            if (u.assigned === false) {
                const li = document.createElement("li");

                li.innerHTML = `
                    <button 
                        
                        class="flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                        
                        <img class="border-2 rounded-full w-[50px] h-[50px] object-cover" src="${u.photo}" alt="image">
                        <p class="flex flex-col text-left">
                            ${u.nom} 
                            <small class="text-gray-600"> ${u.role} </small>
                        </p>
                    </button>
                    `;



                listeEmployes.appendChild(li);
            }
        });
    }


    function informationEmp(user) {
        const image = document.getElementById("image");
        const nomEmp = document.getElementById("nomEmp");
        const roleEmp = document.getElementById("roleEmp");
        const emailEmp = document.getElementById("emailEmp");
        const telephoneEmp = document.getElementById("telephoneEmp");
        const experiencesPlus = document.getElementById("experiencesPlus");

        if (!image || !nomEmp || !roleEmp || !emailEmp || !telephoneEmp || !experiencesPlus) return;

        experiencesPlus.innerHTML = "";

        image.innerHTML = `<img class="w-full h-full object-cover rounded-full" src="${user.photo}" alt="image">`;
        nomEmp.innerHTML = `<h1 class="text-xl font-bold">${user.nom}</h1>`;
        roleEmp.innerHTML = `<p class="text-gray-600">${user.role}</p>`;
        emailEmp.innerHTML = `<p>${user.email}</p>`;
        telephoneEmp.innerHTML = `<p>${user.telephone}</p>`;

        user.experiences.forEach((exp, index) => {
            experiencesPlus.innerHTML += `<div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border shadow-sm">

            <div class="col-span-2">
                <h2 class="text-green-600 font-semibold text-lg">
                    Expérience ${index + 1}
                </h2>
            </div>

            <div class="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label class="text-xs text-gray-500">Poste</label>
                <div class="p-3 bg-white rounded-lg border text-sm text-gray-800">
                    ${exp.poste}
                </div>
            </div>

            <div class="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label class="text-xs text-gray-500">Entreprise</label>
                <div class="p-3 bg-white rounded-lg border text-sm text-gray-800">
                    ${exp.entreprise}
                </div>
            </div>

            <div class="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label class="text-xs text-gray-500">Date début</label>
                <div class="p-3 bg-white rounded-lg border text-sm text-gray-800">
                    ${exp.DateDebut}
                </div>
            </div>

            <div class="col-span-2 md:col-span-1 flex flex-col gap-1">
                <label class="text-xs text-gray-500">Date fin</label>
                <div class="p-3 bg-white rounded-lg border text-sm text-gray-800">
                    ${exp.DateFin}
                </div>
            </div>

        </div>`;
        });
    }


    function listeEmployesParRole(ulId, containerId, rolesToFilter, departmentId, salleId) {
        const ulElement = document.getElementById(ulId);
        const assignedContainer = document.getElementById(containerId);
        const salle = document.getElementById(salleId);

        if (!ulElement || !assignedContainer) return;

        ulElement.innerHTML = "";

        const allUsers = JSON.parse(localStorage.getItem("utilisateur")) || [];

        const filteredUsers = allUsers.filter(user =>
            user.assigned === false &&
            user.role &&
            rolesToFilter.some(role => user.role.toLowerCase().includes(role.toLowerCase()))
        );

        filteredUsers.forEach(u => {
            const li = document.createElement("li");

            li.innerHTML = `
                <button 
                    class="btnDept flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                    
                    <img class="border-2 rounded-full w-[50px] h-[50px] object-cover" src="${u.photo}" alt="image">
                    <p class="flex flex-col text-left">
                        ${u.nom}
                        <small class="text-gray-600"> ${u.role} </small>
                    </p>
                </button>
                `;

            ulElement.appendChild(li);

            li.querySelector(".btnDept").addEventListener("click", () => {

                const allUsers = JSON.parse(localStorage.getItem("utilisateur")) || [];
                const index = allUsers.findIndex(user => user.email === u.email);

                if (index !== -1) {
                    allUsers[index].assigned = true;
                    allUsers[index].departmentId = departmentId;
                }

                localStorage.setItem("utilisateur", JSON.stringify(allUsers));

                assignEmployee(u, assignedContainer, salle);

                afficherEmployes();

                li.remove();

                location.reload();
            });
        });


        assignedContainer.innerHTML = "";
        const assignedUsers = allUsers.filter(user => user.departmentId === departmentId);
        assignedUsers.forEach(u => {
            assignEmployee(u, assignedContainer, salle);
            
        });


    }

    function assignEmployee(u, container, salle) {
        if (!container) return;

        const li = document.createElement("li");
        li.classList.add("assigned-item");

        if (salle) {
            salle.classList.remove("bg-red-500", "bg-opacity-50");
            salle.classList.add("bg-transparent");
        }

        li.innerHTML = `
        <div class="flex bg-white p-3 gap-3 border-2 rounded w-[180px] h-[50px] 
        items-center justify-between">

            <button data-modal-target="informationEmp" 
                    data-modal-toggle="informationEmp" 
                    class="affiche flex items-center gap-2">
                <img class="border-2 rounded-full w-[30px] h-[30px] object-cover" 
                     src="${u.photo}" 
                     alt="image">
                <small class="text-gray-600">${u.nom}</small>
            </button>

            <button class="removeBtn text-red-500 font-bold text-lg cursor-pointer">×</button>
        </div>
    `;

        container.appendChild(li);

        li.querySelector(".affiche").addEventListener("click", () => {
            informationEmp(u);

        });
        

        li.querySelector(".removeBtn").addEventListener("click", () => {

            const allUsers = JSON.parse(localStorage.getItem("utilisateur")) || [];
            const index = allUsers.findIndex(user => user.email === u.email);

            if (index !== -1) {
                allUsers[index].assigned = false;
                allUsers[index].departmentId = null;
            }

            localStorage.setItem("utilisateur", JSON.stringify(allUsers));

           
            li.remove();

            if (container.children.length === 0 && salle) {
                salle.classList.remove("bg-transparent");
                salle.classList.add("bg-red-500", "bg-opacity-50");
            }

            location.reload();
        });

        
    }


    function listeIT() {
        listeEmployesParRole(
            "ulIT",
            "assignedServeur",
            ["techniciens it", "manager", "nettoyage"],
            "assignedServeur",
            "salleServeurs"
        );
    }

    function listeReception() {
        listeEmployesParRole(
            "ulReception",
            "assignedReception",
            ["réception", "manager", "nettoyage"],
            "assignedReception",
            "salleReception"
        );
    }

    function listeSecurite() {
        listeEmployesParRole(
            "ulSecurite",
            "assignedSecurite",
            ["sécurité", "manager", "nettoyage"],
            "assignedSecurite",
            "salleSecurite"
        );
    }

    function listeArchives() {
        listeEmployesParRole(
            "ulArchive",
            "assignedArchive",
            ["sécurité", "techniciens it", "manager", "réception"],
            "assignedArchive",
            "salleArchive"
        );
    }

    function listeConference() {
        listeEmployesParRole(
            "ulConference",
            "assignedConference",
            ["techniciens it", "manager", "réception", "sécurité", "nettoyage"],
            "assignedConference",
            "salleConference",
        );
    }

    function listePersonne() {
        listeEmployesParRole(
            "ulPersonne",
            "assignedPersonne",
            ["techniciens it", "manager", "réception", "sécurité", "nettoyage"],
            "assignedPersonne",
            "sallePersonne"
        );
    }

    ajouter();
    afficherPlusExp();
    afficherEmployes();
    listeIT();
    listeReception();
    listeSecurite();
    listeArchives();
    listeConference();
    listePersonne();
});