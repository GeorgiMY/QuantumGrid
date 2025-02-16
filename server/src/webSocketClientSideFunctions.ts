const ws = new WebSocket(`ws://${window.location.hostname}:${window.location.port}/work/distribute`);

ws.onopen = () => {
    console.log('Connected to work/distribute');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};

const wsStats = new WebSocket('ws://localhost:3000/stats');
wsStats.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'stats') {
        console.log('Work connections:', data.counts.work);
        console.log('Stats connections:', data.counts.stats);
    }
};