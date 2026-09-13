const fs = require('fs');
const file = 'inventory-frontend/src/pages/Products.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '<th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock Level</th>',
  '<th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Added On</th>\n                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock Level</th>'
);

content = content.replace(/colSpan="5"/g, 'colSpan="6"');

content = content.replace(
  '<td className="p-4">\n                      {p.stock <= 5 ? (',
  '<td className="p-4 text-slate-500 text-sm">\n                      {p.created_at ? new Date(p.created_at).toLocaleDateString() : \'N/A\'}\n                    </td>\n                    <td className="p-4">\n                      {p.stock <= 5 ? ('
);

fs.writeFileSync(file, content);
console.log('Update done');
