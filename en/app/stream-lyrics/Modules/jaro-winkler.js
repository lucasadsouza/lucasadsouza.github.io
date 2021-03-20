export class JaroWinkler {
  jaro (input, text) {
    if (input === '') {return 0.0}

    let m = 0;
    const s1 = input.length;
    const s2 = text.length;
    let t = 0;
    const dFactor = Math.max(s1, s2) / 2 - 1
    let match = '';
    let dMatch = '';
    let clone1, clone2;

    if (input === text) {return 1.0}

    clone1 = text;
    input.split('').map((current) => {
      if (clone1.indexOf(current) !== -1) {
        clone1 = clone1.replace(current, '');

        match += current;
        m++;
      }
    });

    if (m === 0) {return 0.0}

    clone1 = input, clone2 = text;
    match.split('').map((current) => {
      if (clone1[clone1.indexOf(current)] !== clone2[clone2.indexOf(current)]) {
        clone1.replace(current, '');
        clone2.replace(current, '');

        dMatch += current;
      }
    });

    clone1 = input, clone2 = text;
    dMatch.split('').map((current) => {
      if (clone1.indexOf(current) > clone2.indexOf(current)) {
        if ((clone1.indexOf(current) - clone2.indexOf(current)) > dFactor) {
          clone1.replace(current, '');
          clone2.replace(current, '');

          t++;

        } else if ((clone2.indexOf(current) - clone1.indexOf(current)) > dFactor) {
          clone1.replace(current, '');
          clone2.replace(current, '');

          t++;
        }
      }
    });

    // console.log(`(${m}/${s1} + ${m}/${s2} + (${m} - ${t})/${m}) * ${1/3}`);

    return (m / s1 + m / s2 + (m - t) / m) * 1 / 3;
  }

  jaroWinkler(input, text) {
    input = input.toLocaleLowerCase();
    text = text.toLocaleLowerCase();
  
    const simJ = this.jaro(input, text);

    if (simJ == 0.0) {return 0.0}
    else if (simJ == 1.0) {return 1.0}

    const p = 0.1;
    let l = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] !== input[i]) {break}

      l++;
    }

    let simW = simJ + ((l * p) * (1 - simJ));

    if (simW >= 1.0) {return 1.0}

    return simW;
  }
}