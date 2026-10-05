/**
 * Malla Curricular Oficial - Programa de Ingeniería de Sistemas
 * Universidad de la Amazonia (SNIES: 52384 | Res. MEN 001562)
 * Total Créditos: 178 créditos distribuidos en 10 semestres
 */

const PENSUM_DATA = [
  {
    semestre: 1,
    titulo: "Primer Semestre",
    materias: [
      { codigo: "101", nombre: "Cálculo Diferencial", creditos: 4, area: "Básica", prerrequisitos: "Ninguno" },
      { codigo: "102", nombre: "Álgebra Lineal", creditos: 3, area: "Básica", prerrequisitos: "Ninguno" },
      { codigo: "103", nombre: "Introducción a la Ingeniería de Sistemas", creditos: 2, area: "Profesional", prerrequisitos: "Ninguno" },
      { codigo: "104", nombre: "Lógica y Algoritmos", creditos: 4, area: "Profesional", prerrequisitos: "Ninguno" },
      { codigo: "105", nombre: "Cátedra Uniamazonia", creditos: 2, area: "Institucional", prerrequisitos: "Ninguno" },
      { codigo: "106", nombre: "Expresión Oral y Escrita", creditos: 3, area: "Humanística", prerrequisitos: "Ninguno" }
    ]
  },
  {
    semestre: 2,
    titulo: "Segundo Semestre",
    materias: [
      { codigo: "201", nombre: "Cálculo Integral", creditos: 4, area: "Básica", prerrequisitos: "Cálculo Diferencial" },
      { codigo: "202", nombre: "Física Mecánica", creditos: 4, area: "Básica", prerrequisitos: "Cálculo Diferencial" },
      { codigo: "203", nombre: "Programación Orientada a Objetos", creditos: 4, area: "Profesional", prerrequisitos: "Lógica y Algoritmos" },
      { codigo: "204", nombre: "Matemáticas Discretas", creditos: 4, area: "Básica", prerrequisitos: "Álgebra Lineal" },
      { codigo: "205", nombre: "Constitución y Democracia", creditos: 2, area: "Humanística", prerrequisitos: "Ninguno" }
    ]
  },
  {
    semestre: 3,
    titulo: "Tercer Semestre",
    materias: [
      { codigo: "301", nombre: "Cálculo Multivariado", creditos: 4, area: "Básica", prerrequisitos: "Cálculo Integral" },
      { codigo: "302", nombre: "Física Electromagnética", creditos: 4, area: "Básica", prerrequisitos: "Física Mecánica" },
      { codigo: "303", nombre: "Estructuras de Datos", creditos: 4, area: "Profesional", prerrequisitos: "Programación Orientada a Objetos" },
      { codigo: "304", nombre: "Arquitectura de Computadores", creditos: 4, area: "Profesional", prerrequisitos: "Matemáticas Discretas" },
      { codigo: "305", nombre: "Inglés I", creditos: 2, area: "Institucional", prerrequisitos: "Ninguno" }
    ]
  },
  {
    semestre: 4,
    titulo: "Cuarto Semestre",
    materias: [
      { codigo: "401", nombre: "Ecuaciones Diferenciales", creditos: 4, area: "Básica", prerrequisitos: "Cálculo Multivariado" },
      { codigo: "402", nombre: "Bases de Datos I", creditos: 4, area: "Profesional", prerrequisitos: "Estructuras de Datos" },
      { codigo: "403", nombre: "Sistemas Operativos", creditos: 4, area: "Profesional", prerrequisitos: "Arquitectura de Computadores" },
      { codigo: "404", nombre: "Análisis y Diseño de Sistemas", creditos: 4, area: "Profesional", prerrequisitos: "Estructuras de Datos" },
      { codigo: "405", nombre: "Inglés II", creditos: 2, area: "Institucional", prerrequisitos: "Inglés I" }
    ]
  },
  {
    semestre: 5,
    titulo: "Quinto Semestre",
    materias: [
      { codigo: "501", nombre: "Probabilidad y Estadística", creditos: 4, area: "Básica", prerrequisitos: "Cálculo Integral" },
      { codigo: "502", nombre: "Bases de Datos II", creditos: 4, area: "Profesional", prerrequisitos: "Bases de Datos I" },
      { codigo: "503", nombre: "Redes y Comunicaciones I", creditos: 4, area: "Profesional", prerrequisitos: "Sistemas Operativos" },
      { codigo: "504", nombre: "Ingeniería de Software I", creditos: 4, area: "Profesional", prerrequisitos: "Análisis y Diseño de Sistemas" },
      { codigo: "505", nombre: "Inglés III", creditos: 2, area: "Institucional", prerrequisitos: "Inglés II" }
    ]
  },
  {
    semestre: 6,
    titulo: "Sexto Semestre",
    materias: [
      { codigo: "601", nombre: "Investigación de Operaciones", creditos: 4, area: "Básica", prerrequisitos: "Probabilidad y Estadística" },
      { codigo: "602", nombre: "Redes y Comunicaciones II", creditos: 4, area: "Profesional", prerrequisitos: "Redes y Comunicaciones I" },
      { codigo: "603", nombre: "Ingeniería de Software II", creditos: 4, area: "Profesional", prerrequisitos: "Ingeniería de Software I" },
      { codigo: "604", nombre: "Desarrollo de Aplicaciones Web", creditos: 4, area: "Profesional", prerrequisitos: "Bases de Datos II" },
      { codigo: "605", nombre: "Inglés IV", creditos: 2, area: "Institucional", prerrequisitos: "Inglés III" }
    ]
  },
  {
    semestre: 7,
    titulo: "Séptimo Semestre",
    materias: [
      { codigo: "701", nombre: "Arquitectura de Software", creditos: 4, area: "Profesional", prerrequisitos: "Ingeniería de Software II" },
      { codigo: "702", nombre: "Seguridad Informática", creditos: 4, area: "Profesional", prerrequisitos: "Redes y Comunicaciones II" },
      { codigo: "703", nombre: "Desarrollo de Aplicaciones Móviles", creditos: 4, area: "Profesional", prerrequisitos: "Desarrollo de Aplicaciones Web" },
      { codigo: "704", nombre: "Metodología de la Investigación", creditos: 3, area: "Investigación", prerrequisitos: "Ninguno" },
      { codigo: "705", nombre: "Electiva Profesional I", creditos: 3, area: "Electiva", prerrequisitos: "60 Créditos aprobados" }
    ]
  },
  {
    semestre: 8,
    titulo: "Octavo Semestre",
    materias: [
      { codigo: "801", nombre: "Inteligencia Artificial", creditos: 4, area: "Profesional", prerrequisitos: "Estructuras de Datos, Probabilidad" },
      { codigo: "802", nombre: "Formulación y Evaluación de Proyectos TI", creditos: 4, area: "Gestión", prerrequisitos: "Arquitectura de Software" },
      { codigo: "803", nombre: "Sistemas Distribuidos y Computación en la Nube", creditos: 4, area: "Profesional", prerrequisitos: "Arquitectura de Software" },
      { codigo: "804", nombre: "Anteproyecto de Grado", creditos: 3, area: "Investigación", prerrequisitos: "Metodología de la Investigación" },
      { codigo: "805", nombre: "Electiva Profesional II", creditos: 3, area: "Electiva", prerrequisitos: "Electiva Profesional I" }
    ]
  },
  {
    semestre: 9,
    titulo: "Noveno Semestre",
    materias: [
      { codigo: "901", nombre: "Gestión de Servicios de TI (ITIL / Cobit)", creditos: 3, area: "Gestión", prerrequisitos: "Formulación y Evaluación de Proyectos TI" },
      { codigo: "902", nombre: "Ciencia de Datos y Big Data", creditos: 4, area: "Profesional", prerrequisitos: "Inteligencia Artificial" },
      { codigo: "903", nombre: "Proyecto de Grado I / Práctica Profesional I", creditos: 6, area: "Investigación", prerrequisitos: "Anteproyecto de Grado" },
      { codigo: "904", nombre: "Ética Profesional y Legislación Informática", creditos: 2, area: "Humanística", prerrequisitos: "Ninguno" },
      { codigo: "905", nombre: "Electiva Profesional III", creditos: 3, area: "Electiva", prerrequisitos: "Electiva Profesional II" }
    ]
  },
  {
    semestre: 10,
    titulo: "Décimo Semestre",
    materias: [
      { codigo: "1001", nombre: "Proyecto de Grado II / Práctica Profesional II", creditos: 8, area: "Investigación", prerrequisitos: "Proyecto de Grado I" },
      { codigo: "1002", nombre: "Auditoría de Sistemas", creditos: 3, area: "Gestión", prerrequisitos: "Gestión de Servicios de TI" },
      { codigo: "1003", nombre: "Electiva Humanística / Emprendimiento Digital", creditos: 3, area: "Humanística", prerrequisitos: "Ninguno" },
      { codigo: "1004", nombre: "Seminario de Actualización Tecnológica", creditos: 2, area: "Profesional", prerrequisitos: "Ninguno" }
    ]
  }
];

// Compatibilidad modular para navegadores y entornos CommonJS/Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PENSUM_DATA;
}
if (typeof window !== 'undefined') {
  window.PENSUM_DATA = PENSUM_DATA;
}
