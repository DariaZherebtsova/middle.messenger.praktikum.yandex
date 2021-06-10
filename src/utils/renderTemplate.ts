// utils/renderDOM.js

export function renderTemplate(query, block) {
  const root = document.querySelector(query);

  console.log('block', block);
  
  // Можно завязаться на реализации вашего класса Block
  // let tmpl = document.importNode(block.getContent().content, true);
  root.append(block.getContent().content);
  return root;
}