addEventListener("load", function() {
  let input = document.querySelector("#book-search");
  let results = document.querySelector("#book-search-results");

  Promise.all([
    loadScript("{{ "lunr.min.js" | relURL }}"),
    loadScript("{{ "index.json" | relURL }}")
  ]).then(enableLunr);

  function enableLunr() {
    results.idx = lunr(function() { 
      this.ref('href')
      this.field('title')
      this.field('content')

      window.lunrData.forEach(function (page) {
        this.add(page)
      }, this)
    });
    input.addEventListener("keyup", search);
  }

  function search() {
    if (input.value) {
      var hits = results.idx.search(`${input.value}*`);
      results.innerHTML = JSON.stringify(hits);
    } else {
      results.innerHTML = '';
    }
  }

  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(script);
  
      document.head.append(script);
    });
  }
});
