document.title = `${new Date().toISOString()} TypeScript compiled`;

const el = document.getElementById("root");

el!.innerHTML = `${new Date().toISOString()} TypeScript compiled`;

const data = [
  {
    id: 1,
    name: "Вася",
  },
  {
    id: 2,
    name: "Петя",
  },
  {
    id: 3,
    name: "Надя",
  },
];

interface ID {
  id: number;
}

interface Data extends ID {
  name: string;
}

function sort<T extends ID>(data: T[], opt: "asc" | "desc" = "asc"): T[] {
  return data.sort((a, b) => (opt === "asc" ? a.id - b.id : b.id - a.id));
}
