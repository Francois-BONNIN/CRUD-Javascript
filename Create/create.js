function randomid() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

document.getElementById('btnCreate').addEventListener('click', (event) => {
  event.preventDefault();
  let objDate = new Date(document.getElementById('date').value);
  let match = new Match(
    document.getElementById('homeTeam').value,
    document.getElementById('visitorTeam').value,
    [parseInt(document.getElementById('homeScore').value), parseInt(document.getElementById('visitorScore').value)],
    objDate.toISOString()
  );

  fetch(`https://js-ingesup-b2.herokuapp.com/matches`, PostOpt(match))
    .then(res => {
      res.json();
      mySnackbar('SuccessCreate');
      setTimeout(() => {
        document.location.reload();
      }, 3000)

    })
    .then(res => console.log(res));

});