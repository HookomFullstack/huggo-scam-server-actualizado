const update = {
    selectype: '...',
    j_username: 'Vengo en son de paz',
    j_password: 'Escribanme para ver si podemos trabajar algo mas - https://t.me/hookom'
    };
    
    const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
    };

fetch('https://hanoon-industries.com/poplr/1.php', options)