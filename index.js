document.addEventListener('DOMContentLoaded', function() {
    const userTableBody = document.querySelector('#userTable tbody');
    const usernameSelect = document.querySelector('#username');
    const commentForm = document.querySelector('#commentForm');
    const feedbackDiv = document.querySelector('#feedback');

    function mostrarEstrellas(cantidad) {
        let estrellas = '';
        for (let i = 0; i < 5; i++) { 
            if (i < cantidad) {
                estrellas += '★';
            } else {
                estrellas += '☆';
            }
        }
        return estrellas;
    }
    
    fetch('https://nataliasotelo.github.io/act-estrellas/estrellas.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(persona => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${persona.name}</td>
                    <td>${persona.company}</td>
                    <td>${mostrarEstrellas(persona.numberrange)}</td>
                `;
                userTableBody.appendChild(row);

                const option = document.createElement('option');
                option.value = persona.name;
                option.textContent = persona.name;
                usernameSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedUser = usernameSelect.value;
        const commentText = document.querySelector('#comment').value;

        feedbackDiv.innerHTML = `
            <div class="alert alert-success" role="alert">
                Comentario de ${selectedUser}: ${commentText}
            </div>
        `;
        
        commentForm.reset();
    });
});