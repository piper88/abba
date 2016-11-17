'use strict';

module.exports = function(){
  return function(residences, searchTerm){
    let fuzzyRegex = generateFuzzyRegex(searchTerm);

    return residences.filter(residence => {
      return fuzzyRegex.text(residence.name.toUpperCase());
    });
  };
};

function generateFuzzyRegex(input){
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
