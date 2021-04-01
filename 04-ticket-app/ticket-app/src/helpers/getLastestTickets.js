
const getLastestTickets = async() => {
    const resp = await fetch('http://localhost:8080/lastest');
    const data = await resp.json();
    return data.lastest;
}

export default getLastestTickets;