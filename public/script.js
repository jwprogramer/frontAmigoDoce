const backendUrl = 'https://backamigodoce.onrender.com';

async function checkParticipant() {
    const name = document.getElementById('participantName').value.trim();
    
    if (!name) {
        alert('Por favor, insira seu nome!');
        return;
    }

    const response = await fetch(`${backendUrl}/check-participant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById('welcomeMessage').innerText = `Olá, ${result.name}! Você pode agora iniciar o sorteio.`;
        document.getElementById('drawSection').style.display = 'block';
        document.getElementById('msgPrint').style.display = 'block';
        document.getElementById('checar').style.display = 'none';
        document.getElementById('btnChecar').style.display = 'none';
    } else {
        alert(result.message);
    }
}

async function startDraw() {
    const name = document.getElementById('participantName').value.trim();

    const response = await fetch(`${backendUrl}/draw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById('drawResult').innerText = `Você tirou ${result.drawn}!`;
        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('drawSection').style.display = 'none';

        // Atualizar a página após 5 segundos
        setTimeout(() => {
            location.reload(); // Recarrega a página
        }, 10000); // 5000ms = 5 segundos
    } else {
        alert(result.message);
    }
}
