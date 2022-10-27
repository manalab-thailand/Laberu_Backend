const word = '       mumi  gugi tamu  tami      ';

//! result = "mumi gugi tamu tami"

let modifyWord = '';

const main = (val) => {
  let state = val;
  const firstWord = val.charAt(0);
  const lastWord = val.charAt(val.length - 1);

  if (firstWord === ' ' || lastWord === ' ') {
    state = val.trim();
  }

  modifyWord = state
    .split(' ')
    .filter((x) => x)
    .join(' ');
};

main(word);
