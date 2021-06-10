
export default function insertInDOM(query, block) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());
  return root;
}