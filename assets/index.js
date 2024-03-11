(async function (d) {
  //Fecha formato humano
  function humanDate(date) {
    return new Date(`${date}T00:00:00`)
      .toDateString()
      .slice(4)
      .replace("Jan", "Ene")
      .replace("Apr", "Abr")
      .replace("Aug", "Ago")
      .replace("Dec", "Dic");
  }

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

  //vlogs
  if (d.getElementById("vlogs")) {
    const vlogs = data.vlogs.filter((el) => el.publish === true);
    let $vlogs = "";
    vlogs.forEach(
      (el) =>
        ($vlogs += `
          <a href="${el.url}" class="blog-item external" target="_blank">
            <figure>
              <img src="img/category/${el.category}.svg" alt="${el.category}" title="Categoría: ${el.category}" loading="lazy">
              <figcaption>
                <span>${el.title}</span>
              </figcaption>
            </figure>
          </a>
      `)
    );
    d.getElementById("vlogs").insertAdjacentHTML("beforeend", $vlogs);
  }

  //Entorno local vs producción
  if (location.host !== "bautistajosecpaz.com") {
    d.querySelectorAll(".menu a").forEach((el) =>
      el.setAttribute("href", `${el.href}.html`)
    );
    d.querySelectorAll(".footer-menu a:not([title='inicio'])").forEach((el) =>
      el.setAttribute("href", `${el.href}.html`)
    );
    d.querySelectorAll(".blog-item:not(.external)").forEach((el) =>
      el.setAttribute("href", `${el.href}.html`)
    );
  } else {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js");
    }
  }
})(document);
