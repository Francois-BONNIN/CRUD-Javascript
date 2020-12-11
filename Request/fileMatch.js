const matchService = (() => {

  const PAGE_SIZE = 5;

  return {
    findAllAsync: callback => {
      httpService.get('https://js-ingesup-b2.herokuapp.com/matches?sort=homeTeam&size=10&page=1', callback);
    }
  };
})();