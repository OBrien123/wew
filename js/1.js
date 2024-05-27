
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('showFormButton').addEventListener('click', function() {
        document.getElementById('eligibilityForm').style.display = 'block';
        document.getElementById('showFormButton').style.display = 'none';
    });

    document.getElementById('eligibilityForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var mathScore = parseFloat(document.getElementById('mathScore').value);
        var physScore = parseFloat(document.getElementById('physScore').value);
        var infoScore = parseFloat(document.getElementById('infoScore').value);

        if (isNaN(mathScore) || isNaN(physScore) || isNaN(infoScore) || mathScore<0 || mathScore>20 || physScore<0 || physScore>20 || infoScore<0 || infoScore>20 ) {
            document.getElementById('eligibilityResult').innerHTML = '<p class="error">Veuillez entrer des notes valides.</p>';
            return;
        }

        // Vérification des critères d'éligibilité
        if (mathScore >= 12 && physScore >= 10 && infoScore >= 12) {
            document.getElementById('eligibilityResult').innerHTML = '<p class="success">Félicitations ! Vous êtes éligible pour la Licence d\'Ingénierie Informatique.</p>';
        } else {
            document.getElementById('eligibilityResult').innerHTML = '<p class="error">Désolé, vous ne remplissez pas tous les critères d\'éligibilité.</p>';
        }
    });
});

//
function typeWriter(element, strings, speed) {
  let text = '';
  let index = 0;
  let isDeleting = false;

  function type() {
      const currentString = strings[index];
      if (!isDeleting && text.length < currentString.length) {
          text = currentString.substring(0, text.length + 1);
      } else if (isDeleting && text.length > 0) {
          text = currentString.substring(0, text.length - 1);
      }

      element.textContent = text;

      let delta = speed;
      if (isDeleting) {
          delta /= 2;
      }

      if (!isDeleting && text === currentString) {
          delta = 1000;
          isDeleting = true;
      } else if (isDeleting && text === '') {
          isDeleting = false;
          index = (index + 1) % strings.length;
          delta = 500;
      }

      setTimeout(type, delta);
  }

  setTimeout(type, speed);
}

const element = document.getElementById('typed-text');
const strings = ['Mamadou', 'Malal-BALDE', 'un étudiant', 'En L2 L2i'];
const speed = 200; // Vitesse de frappe en millisecondes

typeWriter(element, strings, speed);

function validationForm() {
    var prenom = document.querySelector('input[placeholder="Prenom"]').value.trim();
    var nom = document.querySelector('input[placeholder="Nom"]').value.trim();
    var email = document.querySelector('input[placeholder="Email"]').value.trim();
    var telephone = document.querySelector('input[placeholder="numero de telephone"]').value.trim();
    var message = document.querySelector('textarea[placeholder="votre message"]').value.trim();

    // Validation du prénom
    if (prenom.length < 2 || prenom.length > 30) {
        alert("Le prénom doit contenir entre 2 et 30 lettres.");
        return false;
    }

    // Validation du nom
    if (nom.length < 2 || nom.length > 30) {
        alert("Le nom doit contenir entre 2 et 30 lettres.");
        return false;
    }

    // Validation de l'email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return false;
    }

    // Validation du téléphone
    var telephoneRegex = /^(77|78|70|76|33)\s\d{3}\s\d{2}\s\d{2}$/;
    if (!telephoneRegex.test(telephone)) {
        alert("Veuillez entrer un numéro de téléphone valide au format sénégalais (Exemple : 77 867 34 44).");
        return false;
    }

    // Validation du message
    if (message.length === 0 || message.length > 10) {
        alert("Le message est obligatoire et doit contenir au maximum 10 lettres.");
        return false;
    }

    // Si toutes les validations sont passées, le formulaire est valide
    return true;
}
// Fonction pour ajouter un nouvel enseignement à une table
function ajouterEnseignement(tableId, nom, description) {
    console.log("Ajout d'enseignement à la table avec l'ID :", tableId);
    var tableBody = document.querySelector('#' + tableId + ' tbody');
    if (!tableBody) {
        console.error("Aucun élément tbody trouvé pour la table avec l'ID :", tableId);
        return;
    }
    var newRow = tableBody.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    cell1.textContent = nom;
    cell2.textContent = description;
}

// Gestion des événements pour afficher/cacher le formulaire d'ajout
var boutonsAjout = document.querySelectorAll('.ajouter-enseignement');
boutonsAjout.forEach(function(bouton) {
    bouton.addEventListener('click', function() {
        var formulaire = bouton.nextElementSibling;
        console.log("Cliquez sur le bouton Ajouter pour afficher/cacher le formulaire :", formulaire);
        if (formulaire.style.display === 'none') {
            formulaire.style.display = 'block';
        } else {
            formulaire.style.display = 'none';
        }
    });
});

// Gestionnaire d'événements pour soumettre le formulaire d'ajout
var formulairesAjout = document.querySelectorAll('.formulaire-ajout');
formulairesAjout.forEach(function(formulaire) {
    formulaire.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        var nom = formulaire.querySelector('.nom-enseignement').value.trim();
        var description = formulaire.querySelector('.description-enseignement').value.trim();
        var tableId = formulaire.closest('section').id; // Récupérer l'ID de la section parente
        console.log("Formulaire soumis avec le nom :", nom, "et la description :", description, "à la table avec l'ID :", tableId);
        // Vérifier si les champs ne sont pas vides
        if (nom !== '' && description !== '') {
            if (nom.length >= 8 && nom.length <= 30 && description.length >= 50) {
                ajouterEnseignement(tableId, nom, description);
                // Effacer les champs du formulaire après ajout
                formulaire.querySelector('.nom-enseignement').value = '';
                formulaire.querySelector('.description-enseignement').value = '';
                // Cacher le formulaire après soumission
                formulaire.style.display = 'none';
            } else {
                alert("Le nom doit avoir entre 8 et 30 lettres et la description doit avoir au moins 50 lettres.");
            }

        } else {
            // Cacher le formulaire sans effectuer d'actions sur le tableau
            formulaire.style.display = 'none';
        }
    });
});

let menuIcon = document.querySelector('#menu-icon');

let sections = document.querySelectorAll('section');
let navbar = document.querySelectorAll('nav a');

window.onscroll = () =>{
  sections.forEach(sec =>{
  let top = window.scrollY;
  let offset = sec.offsetTop - 150;
  let height = sec.offsetHeight;
  let id = sec.getAttribute('id');

  if(top >= offset && top < offset + height){
    navLinks.forEach(Links =>{
      Links.classList.remove('active');
      document.querySelector('nav a [href*=' + id + ' ]').classList.add('active')
    })
  }
})
}

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}




document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('showFormButton').addEventListener('click', function() {
        document.getElementById('eligibilityForm').style.display = 'block';
        document.getElementById('showFormButton').style.display = 'none';
    });

    document.getElementById('eligibilityForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var mathScore = parseFloat(document.getElementById('mathScore').value);
        var physScore = parseFloat(document.getElementById('physScore').value);
        var infoScore = parseFloat(document.getElementById('infoScore').value);

        if (isNaN(mathScore) || isNaN(physScore) || isNaN(infoScore)) {
            document.getElementById('eligibilityResult').innerHTML = '<p class="error">Veuillez entrer des scores valides.</p>';
            return;
        }

        // Vérification des critères d'éligibilité
        if (mathScore >= 12 && physScore >= 10 && infoScore >= 12) {
            document.getElementById('eligibilityResult').innerHTML = '<p class="success">Félicitations ! Vous êtes éligible pour la Licence d\'Ingénierie Informatique.</p>';
        } else {
            document.getElementById('eligibilityResult').innerHTML = '<p class="error">Désolé, vous ne remplissez pas tous les critères d\'éligibilité.</p>';
        }
    });
});

function toggleMobileMenu() {
    const menuHamburger = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".navbar");

    menuHamburger.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-menu');
    });
}

toggleMobileMenu();
