class Match {
  constructor(homeTeam, visitorTeam, score, date) {
    this.homeTeam = homeTeam;
    this.visitorTeam = visitorTeam;
    this.score = score;
    this.date = date;
  };
};

class EditMatch extends Match {
  constructor(id, homeTeam, visitorTeam, score, date) {
    super(homeTeam, visitorTeam, score, date);
    this.id = id;
  }
}


function convertPrintDate(sourceDate) {
  let date = sourceDate.toString();
  let day = `${date[8]}${date[9]}`;
  let month = `${date[5]}${date[6]}`;
  let year = `${date[0]}${date[1]}${date[2]}${date[3]}`;
  return `${day}/${month}/${year}`
}

function convertFormDate(sourceDate) {
  let date = sourceDate.toString();
  let day = `${date[8]}${date[9]}`;
  let month = `${date[5]}${date[6]}`;
  let year = `${date[0]}${date[1]}${date[2]}${date[3]}`;
  return `${year}-${month}-${day}`
}

function mySnackbar(string) {
  const toast = document.getElementById("snackbar");
  toast.className = "show";
  switch (string) {
    case ('SuccessAPI'):
      toast.innerHTML = "API Loaded!";
      toast.style.backgroundColor = "#52b788";
      break;

    case ('ErrorAPI'):
      toast.innerHTML = "An error has occurred...";
      toast.style.backgroundColor = "#9e2a2b";
      break;

    case ('SuccessCreate'):
      toast.innerHTML = "Creation Success !";
      toast.style.backgroundColor = "#52b788";
      break;

    case ('ErrorCreate'):
      toast.innerHTML = "Create not possible...";
      toast.style.backgroundColor = "#9e2a2b";
      break;

    case ('SuccessUpdate'):
      toast.innerHTML = "Edit Success !";
      toast.style.backgroundColor = "#52b788";
      break;

    case ('ErrorUpdate'):
      toast.innerHTML = "Edit not possible...";
      toast.style.backgroundColor = "#9e2a2b";
      break;

    case ('SuccessDelete'):
      toast.innerHTML = "Delete Success !";
      toast.style.backgroundColor = "#52b788";
      break;

    case ('ErrorDelete'):
      toast.innerHTML = "Delete not possible...";
      toast.style.backgroundColor = "#9e2a2b";
      break;
  }
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 8000);
}

function EditAction() {
  mySnackbar("SuccessUpdate");
  setTimeout(() => {
    document.location.reload();
  }, 3000);
}

function deleteAction() {
  mySnackbar("SuccessDelete");
  setTimeout(() => {
    document.location.reload();
  }, 2000);
}

function winner(score1, score2) {
  if (score1 > score2) {
    tdHomeTeam.style.backgroundColor = "#4ecdc4";
  } else if (score2 > score1) {
    tdVisitorTeam.style.backgroundColor = "#4ecdc4";
  }
}

function printEdit(homeTeam, visitorTeam, score0, score1, date) {
  const formEdit = document.getElementById("formEdit");
  formEdit.className = "show";
  location.href = '#formEdit';
  document.getElementById("editHomeTeam").value = homeTeam;
  document.getElementById("editVisitorTeam").value = visitorTeam;
  document.getElementById("editHomeScore").value = score0;
  document.getElementById("editVisitorScore").value = score1;
  document.getElementById("editDate").value = convertFormDate(date);
}

function Edit(id, homeTeam, visitorTeam, score0, score1, date) {
  document.getElementById('btnUpdate').addEventListener('click', (event) => {
    event.preventDefault();
    let objDate = new Date(document.getElementById('editDate').value);
    let match = new EditMatch(
      id,
      document.getElementById('editHomeTeam').value,
      document.getElementById('editVisitorTeam').value,
      [parseInt(document.getElementById('editHomeScore').value), parseInt(document.getElementById('editVisitorScore').value)],
      objDate.toISOString()
    );

    fetch(`https://js-ingesup-b2.herokuapp.com/matches/${id}`, PutOpt(match))
      .then(res => {
        res.json();
        EditAction();

      })
      .then(res => console.log(res));

    // document.location.reload();
  });
}

function hideEdit() {
  formEdit.className = formEdit.className.replace("show", "");
}

function printAllMatch() {
  matchService.findAllAsync((error, matchs) => {
    if (error) {

      console.log(error);
      const spanElement = document.createElement('span');
      spanElement.innerText = "La liste des matchs n'a pas pu être chargée";
      spanElement.classList.add('error');
      const mainElement = document.querySelector('main');
      mainElement.insertBefore(spanElement, ulElement);

    } else {
      matchs.forEach(match => {
        localStorage.nameHomeTeam = match.homeTeam;
        tbElement = document.querySelector('tbody');

        trElement = document.createElement('tr');
        tbElement.appendChild(trElement);

        tdDate = document.createElement('td');
        trElement.appendChild(tdDate);

        tdDate.innerText = convertPrintDate(match.date);

        tdHomeTeam = document.createElement('td');
        trElement.appendChild(tdHomeTeam);
        tdHomeTeam.innerText = match.homeTeam;

        tdScoreH = document.createElement('td');
        trElement.appendChild(tdScoreH);
        tdScoreH.innerText = match.score[0];

        tdTiret = document.createElement('td');
        trElement.appendChild(tdTiret);
        tdTiret.innerText = "-";

        tdScoreV = document.createElement('td');
        trElement.appendChild(tdScoreV);
        tdScoreV.innerText = match.score[1];

        tdVisitorTeam = document.createElement('td');
        trElement.appendChild(tdVisitorTeam);
        tdVisitorTeam.innerText = match.visitorTeam;

        winner(match.score[0], match.score[1]);

        tdEdit = document.createElement('td');
        trElement.appendChild(tdEdit);


        btnEdit = document.createElement('button');
        tdEdit.appendChild(btnEdit);
        btnEdit.innerText = "Edit";
        btnEdit.className = "btn btn-primary";
        btnEdit.addEventListener('click', function () {
          printEdit(match.homeTeam, match.visitorTeam, match.score[0], match.score[1], match.date);
          Edit(match.id, match.homeTeam, match.visitorTeam, match.score[0], match.score[1], match.date);
        });

        tdDelete = document.createElement('td');
        trElement.appendChild(tdDelete);


        btnDelete = document.createElement('button');
        tdDelete.appendChild(btnDelete);
        btnDelete.innerText = "Delete";
        btnDelete.className = "btn btn-danger";
        btnDelete.addEventListener('click', () => {
          if (confirm(`Do you want to delete the match ${match.homeTeam} - ${match.visitorTeam} ?`)) {
            fetch(`https://js-ingesup-b2.herokuapp.com/matches/${match.id}`, DeleteOptions)
              .then(res => {
                if (res.ok) {
                  return deleteAction();
                } else {
                  return mySnackbar("ErrorDelete");
                }
              });
          }
        });
      });
    }
  });
}