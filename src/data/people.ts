export interface Person {
  id: string;
  name: string;
  url: string;
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
