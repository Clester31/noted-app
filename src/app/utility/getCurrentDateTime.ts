export default function getCurrentDateTime() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}