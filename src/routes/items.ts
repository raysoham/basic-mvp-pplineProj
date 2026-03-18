import { Router } from 'express';

type Item = {
  id: number;
  name: string;
};

const items: Item[] = [];
let nextId = 1;

const itemsRouter = Router();


itemsRouter.get('/', (_req, res) => {
  let html = '<h1>Here are the items</h1>\n';
  
  if (items.length === 0) {
    html += '<p>No Items Added</p>';
  } else {
    html += '<ul>\n';
    items.forEach(item => {
      html += `  <li>${item.name}</li>\n`;
    });
    html += '</ul>';
  }
  
  res.send(html);
});

itemsRouter.post('/', (req, res) => {
  const { name } = req.body as { name?: string };

  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  const newItem: Item = {
    id: nextId++,
    name
  };

  items.push(newItem);

  return res.status(201).json(newItem);
});

export { itemsRouter };

