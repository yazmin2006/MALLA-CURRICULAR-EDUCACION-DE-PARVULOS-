const ramos = [
  {
    semestre: 1,
    nombre: "Desarrollo y Aprendizaje de la Persona",
    id: "ramo1"
  },
  {
    semestre: 2,
    nombre: "Factores del Desarrollo y Aprendizaje Integral",
    id: "ramo2",
    prerequisitos: ["ramo1"]
  },
  {
    semestre: 3,
    nombre: "Didáctica en Primera Infancia II",
    id: "ramo3",
    prerequisitos: ["ramo2"]
  },
  {
    semestre: 4,
    nombre: "Práctica Inicial I",
    id: "ramo4",
    prerequisitos: ["ramo3"]
  },
  {
    semestre: 5,
    nombre: "Práctica Inicial II",
    id: "ramo5",
    prerequisitos: ["ramo4"]
  },
  {
    semestre: 6,
    nombre: "Práctica Intermedia I",
    id: "ramo6",
    prerequisitos: ["ramo5"]
  },
  {
    semestre: 7,
    nombre: "Práctica Intermedia II",
    id: "ramo7",
    prerequisitos: ["ramo6"]
  },
  {
    semestre: 8,
    nombre: "Práctica Intermedia III",
    id: "ramo8",
    prerequisitos: ["ramo7"]
  },
  {
    semestre: 9,
    nombre: "Práctica Profesional",
    id: "ramo9",
    prerequisitos: ["ramo8"]
  }
];

function crearMalla() {
  const container = document.getElementById("malla");
  for (let s = 1; s <= 9; s++) {
    const semDiv = document.createElement("div");
    semDiv.classList.add("semestre");
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${s}`;
    semDiv.appendChild(titulo);

    ramos
      .filter(r => r.semestre === s)
      .forEach(r => {
        const div = document.createElement("div");
        div.classList.add("ramo");
        div.id = r.id;
        div.textContent = r.nombre;

        if (r.prerequisitos && r.prerequisitos.length > 0) {
          div.classList.add("bloqueado");
          div.dataset.bloqueado = "true";
        }

        div.addEventListener("click", () => aprobarRamo(r.id));
        semDiv.appendChild(div);
      });

    container.appendChild(semDiv);
  }
}

function aprobarRamo(id) {
  const ramo = document.getElementById(id);
  if (ramo.classList.contains("bloqueado")) return;

  ramo.classList.toggle("aprobado");

  ramos.forEach(r => {
    if (r.prerequisitos && r.prerequisitos.includes(id)) {
      const todosAprobados = r.prerequisitos.every(pid =>
        document.getElementById(pid).classList.contains("aprobado")
      );
      if (todosAprobados) {
        const target = document.getElementById(r.id);
        target.classList.remove("bloqueado");
        target.dataset.bloqueado = "false";
      }
    }
  });
}

window.onload = crearMalla;