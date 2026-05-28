

//PARA O MENU
    const dashHambur = document.querySelector('.dash-hambur')
    const menuMobil = document.querySelector('.menu-mobil')
    const close_cart = document.querySelector('.close-cart')
    

    dashHambur.addEventListener('click', () =>{
        menuMobil.classList.toggle('active-header')
    })

    close_cart.addEventListener('click', () =>{
        menuMobil.classList.remove('active-header')

    })

    

     window.addEventListener('resize', () =>{{
        const subMenu = document.querySelector('.subMenu')
        if(window.innerWidth > 768){
            
            
     }
     }})

     //GRAFICOS DO DASHBOARD

     //Frequencia diaria

     new Chart(document.getElementById('graficDiario'), {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Quart', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Visitas/Vendas',
                data: [45, 60, 55, 70, 90, 120, 80],
                borderColor: '#4caf50',
                tension: 0.3,
                fill: true,
                backgroundColor: 'rgb(76, 175, 80, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins:{legend: {display: false}}
        }
     })

     //Vendas mensais
     new Chart(document.getElementById('graficMensal'), {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'kz',
                data: [120000, 150000, 180000, 160000, 200000, 220000, 160000, 200000, 220000, 160000, 200000, 220000, 220000],
                backgroundColor: '#2196f3'
            }]
        },
        options: {
            responsive: true
        }
     })


     //Produto mais vendidos
     new Chart(document.getElementById('graficVendido'), {
        type: 'doughnut',
        data: {
            labels: ['Horticula', 'Tubercule', 'Vegetal', 'Fruta'],
            datasets: [{
                label: 'Vendas',
                data: [300, 150, 220, 180],
                backgroundColor:  ['#4caf50', '#ff9800', '#8bc34a', '#ff5722']
            }]
        },
        options: {
            responsive: true
        }
     })

     