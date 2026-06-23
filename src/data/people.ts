export interface Person {
  id: string;
  name: string;
  url?: string;
}

export const people: Person[] = [
  {
    id: "bruce-hansen",
    name: "Bruce E. Hansen",
    url: "https://users.ssc.wisc.edu/~behansen/"
  },
  {
    id: "harold-chiang",
    name: "Harold D. Chiang",
    url: "https://sites.google.com/view/haroldchiang"
  },
  {
    id: "laura-schechter",
    name: "Laura Schechter",
    url: "https://users.ssc.wisc.edu/~lschechter/"
  },
  {
    id: "rishabh-kirpalani",
    name: "Rishabh Kirpalani",
    url: "https://www.rkirpalani.com/"
  },
  {
    id: "ananth-seshadri",
    name: "Ananth Seshadri",
    url: "https://users.ssc.wisc.edu/~aseshadr/"
  },
  {
    id: "shengwen-gan",
    name: "Shengwen Gan",
    url: "https://sites.google.com/view/shengwengan/"
  },
  {
    id: "frederic-sala",
    name: "Frederic Sala",
    url: "https://pages.cs.wisc.edu/~fredsala/"
  },
  {
    id: "karam-kang",
    name: "Karam Kang",
    url: "https://karamkang.github.io/"
  },
  {
    id: "panle-barwick",
    name: "Panle Jia Barwick",
    url: "https://panlebarwick.github.io/"
  },
  {
    id: "job-boerma",
    name: "Job Boerma",
    url: "https://jobboerma.com/"
  },
  {
    id: "amanda-smith",
    name: "Amanda Smith",
    url: "https://directory.engr.wisc.edu/ie/Faculty/Smith_Amanda/"
  },
  {
    id: "simeon-alder",
    name: "Simeon Alder",
    url: "https://users.ssc.wisc.edu/~sdalder/"
  },
  {
    id: "yong-cai",
    name: "Yong Cai",
    url: "https://yong-cai.github.io/"
  },
  {
    id: "jack-porter",
    name: "Jack Porter",
    url: "https://users.ssc.wisc.edu/~jporter1/"
  },
  {
    id: "daniel-quint",
    name: "Daniel Quint",
    url: "https://users.ssc.wisc.edu/~dquint/"
  },
  {
    id: "benjamin-bernard",
    name: "Benjamin Bernard",
    url: "https://benjamin-bernard.com/"
  },
  {
    id: "lones-smith",
    name: "Lones Smith",
    url: "https://lonessmith.com/"
  },
  {
    id: "marzena-rostek",
    name: "Marzena Rostek",
    url: "https://users.ssc.wisc.edu/~rostek/"
  },
  {
    id: "dean-corbae",
    name: "Dean Corbae",
    url: "https://sites.google.com/a/wisc.edu/deancorbae/"
  },
  {
    id: "kenneth-hendricks",
    name: "Kenneth Hendricks",
    url: "https://users.ssc.wisc.edu/~khendricks2/"
  },
  {
    id: "jean-francois-houde",
    name: "Jean-François Houde",
    url: "https://jfhoude.econ.wisc.edu/"
  },
  {
    id: "gevorg-mnatsakanyan",
    name: "Gevorg Mnatsakanyan"
  },
  {
    id: "john-gillett",
    name: "John Gillett",
    url: "https://stat.wisc.edu/staff/gillett-john/"
  },
  {
    id: "bi-cheng-wu",
    name: "Bi Cheng Wu",
    url: "https://stat.wisc.edu/staff/wu-bi-cheng/"
  },
  {
    id: "sean-paul",
    name: "Sean T. Paul",
    url: "https://people.math.wisc.edu/~stpaul/"
  },
  {
    id: "david-hansen",
    name: "David Hansen",
    url: "https://econ.wisc.edu/staff/hansen-david/"
  },
  {
    id: "ivan-ermakoff",
    name: "Ivan Ermakoff",
    url: "https://sociology.wisc.edu/staff/ermakoff-ivan/"
  },
  {
    id: "corina-mommaerts",
    name: "Corina Mommaerts",
    url: "https://sites.google.com/site/corinamommaerts/"
  },
  {
    id: "agustin-gutierrez",
    name: "Agustín Gutiérrez",
    url: "https://www.gutierrezagustin.com/"
  },
  {
    id: "taiya-bach",
    name: "Taiya Bach",
    url: "https://www.linkedin.com/in/taiya-bach-86441525/"
  },
  {
    id: "jeremy-foltz",
    name: "Jeremy Foltz",
    url: "https://aae.wisc.edu/faculty/jdfoltz/"
  },
  {
    id: "b-ian-hutchins",
    name: "B. Ian Hutchins",
    url: "https://ischool.wisc.edu/staff/hutchins-b-ian/"
  },
  {
    id: "jeremy-mclaughlin",
    name: "Jeremy L. McLaughlin",
    url: "https://www.linkedin.com/in/jeremy-l-mclaughlin-mlis-9a99402/"
  },
  {
    id: "veronika-kusumaryati",
    name: "Veronika Kusumaryati",
    url: "https://www.anthropology.wisc.edu/staff/kusumaryati-veronika/"
  },
  {
    id: "eduardo-schmidt-passos",
    name: "Eduardo Schmidt Passos",
    url: "https://csld.wisc.edu/staff/schmidt-passos-eduardo/"
  },
  {
    id: "zaidan-wu",
    name: "Zaidan Wu"
  },
  {
    id: "gurmail-singh",
    name: "Gurmail Singh",
    url: "https://pages.cs.wisc.edu/~gurmail-singh/Gurmail.html"
  },
  {
    id: "joseph-bowling",
    name: "Joseph Bowling",
    url: "https://english.wisc.edu/staff/bowling-joseph/"
  }
];

const peopleById = new Map<string, Person>(people.map((person) => [person.id, person]));

export function getPeopleByIds(ids: string[] = [], context = "content entry") {
  return ids.map((id) => {
    const person = peopleById.get(id);

    if (!person) {
      throw new Error(`Unknown person id "${id}" in ${context}. Add it to src/data/people.ts.`);
    }

    return person;
  });
}

export function getPeopleNames(ids: string[] = [], context = "content entry") {
  return getPeopleByIds(ids, context).map((person) => person.name);
}
