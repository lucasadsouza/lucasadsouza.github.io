import { JaroWinkler } from './jaro-winkler.js';

export class Search {
  constructor (data, URL) {
    this.data = data;
    this.URL = URL;
  }

  _searchBox = document.querySelector(".searchbox");
  _inputBox = this._searchBox.querySelector("input");
  _suggBox = this._searchBox.querySelector(".auto-comp-box");

  find () {
    this._inputBox.onkeyup = (curQuery) => {
      let query = (curQuery.target.value).toLocaleLowerCase();

      const jaroWinkler = new JaroWinkler();
      let results = {
        sortedValue: [],
        value: [],
        title: []
      };

      this.data.map((current) => {
        const simJ = jaroWinkler.jaroWinkler(query, current.title);
        results.sortedValue.push(simJ);
        results.value.push(simJ);
        results.title.push(current.title);
      });

      results.sortedValue.sort().reverse();

      let queries = [];
      if (query) {
        queries = this.data.filter((current) => {
          return current.title.toLocaleLowerCase().startsWith(query);
        });
      }

      queries = results.sortedValue.map((current, idx) => {
        let title = results.title[results.value.indexOf(current)];
        this.data.map((cur) => {
          if (cur.title === title) {
            title = cur;
          }
        });

        if (current >= 0.70 && idx < 5) {
          return `<li onclick="selectSearch('${title.query}')" >${`${title.title} - ${title.singer}`.toLocaleLowerCase().replace(query, `<span>${query}</span>`)}</li>`;
        }
      });

      this.show(queries);
    }
  }

  show (queries) {
    let stringQueries;
    if(queries.length) {
      stringQueries = queries.join('');
    }

    if (queries[0]) {
      this._suggBox.style.display = "block";

    } else {
      this._suggBox.style.display = "none";
    }

    this._suggBox.innerHTML = stringQueries;
  }

  select (query) {
    window.location.href = `${this.URL}?id=${query}`;
  }
}
