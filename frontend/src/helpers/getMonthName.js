export default function getMonthName() { 
  return new Date().toLocaleString('default', { month: 'long' });
}