export default function getNumberOfDaysInMonth() { 
  return new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
}