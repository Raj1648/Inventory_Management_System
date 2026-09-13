const fs = require('fs');
const file = 'inventory-frontend/src/pages/Products.jsx';
let content = fs.readFileSync(file, 'utf8');

const target = `<td className="p-4 font-medium text-slate-800">₹{parseFloat(p.price).toFixed(2)}</td>
                    <td className="p-4">
                      {p.stock <= 5 ? (`;

const replacement = `<td className="p-4 font-medium text-slate-800">₹{parseFloat(p.price).toFixed(2)}</td>
                    <td className="p-4 text-slate-500 text-sm">
                      {p.created_at ? new Date(p.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4">
                      {p.stock <= 5 ? (`;

// Replace handling both CRLF and LF just in case
const normalizedContent = content.replace(/\r\n/g, '\n');
if (normalizedContent.includes(target)) {
  const newContent = normalizedContent.replace(target, replacement);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully updated td!');
} else {
  console.log('Target not found!');
}
