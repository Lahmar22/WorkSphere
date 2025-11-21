document.addEventListener('DOMContentLoaded', () => {
    const btnAjouterEmploye = document.getElementById("btnAjouterEmploye");
    const autreExperience = document.getElementById("autreExperience");
    let compteurExp = 0;

    const btnAjouter = document.getElementById("btnAjouter");
    const modalAjouter = document.getElementById("ajouterEmploye");
    btnAjouter.addEventListener("click", () => {
        modalAjouter.classList.remove("hidden");
        modalAjouter.classList.add("block");
    });

    const closeModalAjouter = document.getElementById("closeModalAjouter");
    closeModalAjouter.addEventListener("click", () => {
        modalAjouter.classList.remove("block");
        modalAjouter.classList.add("hidden");
    });

    const closeModalCancel = document.getElementById("closeModalCancel");
    closeModalCancel.addEventListener("click", () => {
        modalAjouter.classList.remove("block");
        modalAjouter.classList.add("hidden");
    });

    btnAjouterEmploye.addEventListener("click", () => {
        modalAjouter.classList.remove("block");
        modalAjouter.classList.add("hidden");
    });

    const conference = document.getElementById("conference");
    conference.addEventListener("click", () => {
        const listeConference = document.getElementById("listeConference");
        listeConference.classList.remove("hidden");
        listeConference.classList.add("block");
    });

    const closeListeConference = document.getElementById("closeListeConference");
    closeListeConference.addEventListener("click", () => {
        const listeConference = document.getElementById("listeConference");
        listeConference.classList.remove("clock");
        listeConference.classList.add("hidden");
    });

    const reception = document.getElementById("reception");
    reception.addEventListener("click", () => {
        const listeReception = document.getElementById("listeReception");
        listeReception.classList.remove("hidden");
        listeReception.classList.add("block");
    });

    const closeListeReception = document.getElementById("closeListeReception");
    closeListeReception.addEventListener("click", () => {
        const listeReception = document.getElementById("listeReception");
        listeReception.classList.remove("clock");
        listeReception.classList.add("hidden");
    });

    const serveursSalle = document.getElementById("serveursSalle");
    serveursSalle.addEventListener("click", () => {
        const listeIT = document.getElementById("listeIT");
        listeIT.classList.remove("hidden");
        listeIT.classList.add("block");
    });

    const closeListeIT = document.getElementById("closeListeIT");
    closeListeIT.addEventListener("click", () => {
        const listeIT = document.getElementById("listeIT");
        listeIT.classList.remove("clock");
        listeIT.classList.add("hidden");
    });

    const personneSalle = document.getElementById("personneSalle");
    personneSalle.addEventListener("click", () => {
        const listePersonne = document.getElementById("listePersonne");
        listePersonne.classList.remove("hidden");
        listePersonne.classList.add("block");
    });

    const closeListePersonne = document.getElementById("closeListePersonne");
    closeListePersonne.addEventListener("click", () => {
        const listePersonne = document.getElementById("listePersonne");
        listePersonne.classList.remove("clock");
        listePersonne.classList.add("hidden");
    });

    const securiteSalle = document.getElementById("securiteSalle");
    securiteSalle.addEventListener("click", () => {
        const listeSecurite = document.getElementById("listeSecurite");
        listeSecurite.classList.remove("hidden");
        listeSecurite.classList.add("block");
    });

    const closeListeSecurite = document.getElementById("closeListeSecurite");
    closeListeSecurite.addEventListener("click", () => {
        const listeSecurite = document.getElementById("listeSecurite");
        listeSecurite.classList.remove("clock");
        listeSecurite.classList.add("hidden");
    });

    const archiveSalle = document.getElementById("archiveSalle");
    archiveSalle.addEventListener("click", () => {
        const listeArchive = document.getElementById("listeArchive");
        listeArchive.classList.remove("hidden");
        listeArchive.classList.add("block");
    });

    const closeListeArchive = document.getElementById("closeListeArchive");
    closeListeArchive.addEventListener("click", () => {
        const listeArchive = document.getElementById("listeArchive");
        listeArchive.classList.remove("clock");
        listeArchive.classList.add("hidden");
    });


    document.getElementById("photo").addEventListener("keyup", function () {
        document.getElementById("photoPersonnelle").src = document.getElementById("photo").value;
    })

    function ajouter() {
        if (!btnAjouterEmploye) return;


        const newBtn = btnAjouterEmploye.cloneNode(true);
        btnAjouterEmploye.parentNode.replaceChild(newBtn, btnAjouterEmploye);

        newBtn.addEventListener("click", () => {
            const nom = document.getElementById("nom").value.trim();
            const role = document.getElementById("role").value.trim();
            const photo = document.getElementById("photo").value.trim();
            const email = document.getElementById("email").value.trim();
            const telephone = document.getElementById("telephone").value.trim();
            const poste = document.getElementById("poste").value.trim();
            const entreprise = document.getElementById("entreprise").value.trim();
            const DateDebut = document.getElementById("DateDebut").value.trim();
            const DateFin = document.getElementById("DateFin").value.trim();

            if (!nom || !role || !photo || !email || !telephone || !poste || !entreprise || !DateDebut || !DateFin) {
                return alert("Veuillez remplir toutes les informations obligatoires.");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return alert("Email invalide.");

            const telRegex = /^[0-9]{10}$/;
            if (!telRegex.test(telephone)) return alert("Le numéro de téléphone doit contenir 10 chiffres.");

            if (new Date(DateDebut) > new Date(DateFin)) {
                return alert("La date de début doit être inférieure à la date de fin.");
            }

            let experiences = [{ poste, entreprise, DateDebut, DateFin }];

            for (let i = 1; i <= compteurExp; i++) {
                const p = document.getElementById(`poste-${i}`)?.value.trim();
                const e = document.getElementById(`entreprise-${i}`)?.value.trim();
                const d1 = document.getElementById(`DateDebut-${i}`)?.value.trim();
                const d2 = document.getElementById(`DateFin-${i}`)?.value.trim();

                if (p && e && d1 && d2) {
                    experiences.push({ poste: p, entreprise: e, DateDebut: d1, DateFin: d2 });
                }
            }

            const utilisateur = {
                nom, role, photo, email, telephone,
                assigned: false,
                departmentId: null,
                experiences
            };

            const currentUsers = JSON.parse(localStorage.getItem("utilisateur")) || [];
            if (currentUsers.some(u => u.email === email)) {
                return alert("Cet email existe déjà !");
            }

            currentUsers.push(utilisateur);
            localStorage.setItem("utilisateur", JSON.stringify(currentUsers));

            alert("Employé ajouté avec succès !");
            location.reload();
        });
    }

    function afficherPlusExp() {
        const plusExperiences = document.getElementById("plusExperiences");
        if (!autreExperience || !plusExperiences) return;

        const newBtn = autreExperience.cloneNode(true);
        autreExperience.parentNode.replaceChild(newBtn, autreExperience);

        newBtn.addEventListener('click', () => {
            compteurExp++;
            const nouveauFormulaire = `
                <div id="experiences-${compteurExp}" class="col-span-2 p-3 border-t mt-4">
                    <h2 class="flex bg-green-600 rounded-xl w-32 h-8 justify-center items-center text-white mb-4">
                        Expérience ${compteurExp}
                    </h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="col-span-2">
                            <input type="text" id="poste-${compteurExp}" class="border p-2 w-full rounded" placeholder="Titre du Poste">
                        </div>
                        <div class="col-span-2">
                            <input type="text" id="entreprise-${compteurExp}" class="border p-2 w-full rounded" placeholder="Nom de l'entreprise">
                        </div>
                        <div class="col-span-1">
                            <input type="date" id="DateDebut-${compteurExp}" class="border p-2 w-full rounded">
                        </div>
                        <div class="col-span-1">
                            <input type="date" id="DateFin-${compteurExp}" class="border p-2 w-full rounded">
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
                    <div class="flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center">
                        <img class="border-2 rounded-full w-[50px] h-[50px] object-cover" src="${u.photo}" alt="image">
                        <p class="flex flex-col text-left">
                            ${u.nom} 
                            <small class="text-gray-600"> ${u.role} </small>
                        </p>
                    </div>`;
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

        if (!image || !nomEmp) return;

        experiencesPlus.innerHTML = "";
        image.innerHTML = `<img class="w-full h-full object-cover" src="${user.photo}" alt="image">`;
        nomEmp.innerHTML = `<h1 class="text-xl font-bold">${user.nom}</h1>`;
        roleEmp.innerHTML = `<p class="text-gray-600">${user.role}</p>`;
        emailEmp.innerHTML = `<p>${user.email}</p>`;
        telephoneEmp.innerHTML = `<p>${user.telephone}</p>`;

        user.experiences.forEach((exp, index) => {
            experiencesPlus.innerHTML += `
            <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border shadow-sm mt-2">
                <div class="col-span-2 font-bold text-green-600">Expérience ${index + 1}</div>
                <div class="text-sm"><strong>Poste:</strong> ${exp.poste}</div>
                <div class="text-sm"><strong>Entr.:</strong> ${exp.entreprise}</div>
                <div class="text-sm text-gray-500">${exp.DateDebut} au ${exp.DateFin}</div>
            </div>`;
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
            <div class="flex bg-white p-3 gap-3 border-2 rounded w-[180px] h-[50px] items-center justify-between">
                <button class="display-info-btn flex items-center gap-2 cursor-pointer">
                    <img class="border-2 rounded-full w-[30px] h-[30px] object-cover" src="${u.photo}">
                    <small class="text-gray-600 text-xs truncate w-20 text-left">${u.nom}</small>
                </button>
                <button class="removeBtn text-red-500 font-bold text-lg cursor-pointer hover:scale-110">×</button>
            </div>`;

        container.appendChild(li);

        li.querySelector(".display-info-btn").addEventListener("click", () => {
            informationEmp(u);
            const modalInfo = document.getElementById("informationEmp");
            if (modalInfo) {
                modalInfo.classList.remove("hidden");
                modalInfo.classList.add("block");
            }
        });

        li.querySelector(".removeBtn").addEventListener("click", () => {
            if (confirm(`Voulez-vous retirer ${u.nom} de cette salle ?`)) {
                const allUsers = JSON.parse(localStorage.getItem("utilisateur")) || [];
                const index = allUsers.findIndex(user => user.email === u.email);

                if (index !== -1) {
                    allUsers[index].assigned = false;
                    allUsers[index].departmentId = null;
                    localStorage.setItem("utilisateur", JSON.stringify(allUsers));
                }
                li.remove();

                if (container.children.length === 0 && salle) {
                    salle.classList.remove("bg-transparent");
                    salle.classList.add("bg-red-500", "bg-opacity-50");
                }
                location.reload();
            }
        });
    }

    function listeEmployesParRole(ulId, containerId, rolesToFilter, departmentId, salleId, taille) {
        const ulElement = document.getElementById(ulId);
        const assignedContainer = document.getElementById(containerId);

        const salle = document.getElementById(salleId);

        if (!ulElement || !assignedContainer) return;

        ulElement.innerHTML = "";
        const users = JSON.parse(localStorage.getItem("utilisateur")) || [];

        assignedContainer.innerHTML = "";
        users.forEach(u => {
            if (u.departmentId === departmentId) {
                assignEmployee(u, assignedContainer, salle);
            }
        });

        const filteredUsers = users.filter(user =>
            !user.assigned &&
            user.role &&
            rolesToFilter.some(role => user.role.toLowerCase().includes(role.toLowerCase()))
        );

        filteredUsers.forEach(u => {
            const li = document.createElement("li");
            li.innerHTML = `
                <button class="btnDept flex bg-white p-3 gap-3 border-2 rounded w-[300px] h-[80px] items-center hover:bg-gray-100 transition">
                    <img class="border-2 rounded-full w-[50px] h-[50px] object-cover" src="${u.photo}">
                    <p class="flex flex-col text-left">
                        <span class="font-bold">${u.nom}</span>
                        <small class="text-gray-600">${u.role}</small>
                    </p>
                </button>
            `;

            ulElement.appendChild(li);

            li.querySelector(".btnDept").addEventListener("click", () => {

                const currentCount = assignedContainer.querySelectorAll(".assigned-item").length;

                if (currentCount >= taille) {
                    alert(`La salle est pleine ! (Maximum : ${taille} personnes)`);
                    return;
                }

                const allUsers = JSON.parse(localStorage.getItem("utilisateur")) || [];
                const index = allUsers.findIndex(user => user.email === u.email);

                if (index !== -1) {
                    allUsers[index].assigned = true;
                    allUsers[index].departmentId = departmentId;
                    localStorage.setItem("utilisateur", JSON.stringify(allUsers));


                    assignEmployee(u, assignedContainer, salle);
                    li.remove();
                    afficherEmployes();
                }
            });
        });
    }




    function listeIT() {
        listeEmployesParRole(
            "ulIT",
            "assignedServeur",
            ["techniciens it", "manager", "nettoyage"],
            "assignedServeur",
            "salleServeurs",
            3
        );
    }

    function listeReception() {
        listeEmployesParRole(
            "ulReception",
            "assignedReception",
            ["réception", "manager", "nettoyage"],
            "assignedReception",
            "salleReception",
            4
        );
    }

    function listeSecurite() {
        listeEmployesParRole(
            "ulSecurite",
            "assignedSecurite",
            ["sécurité", "manager", "nettoyage"],
            "assignedSecurite",
            "salleSecurite",
            3
        );
    }

    function listeArchives() {
        listeEmployesParRole(
            "ulArchive",
            "assignedArchive",
            ["sécurité", "techniciens it", "manager", "réception"],
            "assignedArchive",
            "salleArchive",
            3
        );
    }

    function listeConference() {
        listeEmployesParRole(
            "ulConference",
            "assignedConference",
            ["techniciens it", "manager", "réception", "sécurité", "nettoyage"],
            "assignedConference",
            "salleConference",
            4
        );
    }

    function listePersonne() {
        listeEmployesParRole(
            "ulPersonne",
            "assignedPersonne",
            ["techniciens it", "manager", "réception", "sécurité", "nettoyage"],
            "assignedPersonne",
             "sallePersonne",
            4
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

    const informationEmpy = document.getElementById("informationEmp");

    const closeModalInformation = document.getElementById("closeModalInformation");
    closeModalInformation.addEventListener("click", () => {
        informationEmpy.classList.remove("block");
        informationEmpy.classList.add("hidden");
    });


});