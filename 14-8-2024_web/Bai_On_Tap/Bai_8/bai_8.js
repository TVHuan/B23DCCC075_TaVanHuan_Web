const table = document.createElement('table');
        table.border = 1; 

        for (let i = 0; i < 3; i++) {
            const hang = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                const o = document.createElement('td');
                o.innerText = `hang ${i + 1}, ô ${j + 1}`; 
                hang.appendChild(o); 
            }
            table.appendChild(hang); 
        }

        document.getElementById('table-container').appendChild(table);