(async function (d) {
  /** Fuente de datos para el Sitio Web */
  async function getData() {
    let response = await fetch("assets/data.json");
    let json = await response.json();
    return json;
  }
  let data = await getData();

  /** Ministerios Data */
  if (d.getElementById("ministerios")) {
    const ministerios = data.ministerios;
    let $ministerios = "";

    ministerios.forEach(
      (el) =>
        ($ministerios += `
          <section class="card-list">
            <figure>
            <img src="${el.img}" alt="${el.name}" loading="lazy">
              <figcaption>
                <span>${el.name} - <small>Director(a): ${el.director}</small></span>
                <small>${el.excerpt}</small>
              </figcaption>
            </figure>
          </section>
        `)
    );
    d.getElementById("ministerios").innerHTML = $ministerios;
  }
})(document);
