const exibicao = document.getElementsByTagName('section')[0];const entrada = document.getElementById('pesquisa');

entrada.addEventListener('keyup', function exibirDados(){    
    let nome = entrada.value;
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if(!regex.test(nome)){        
        return;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "paises.php?nome=" + encodeURIComponent(nome));
    xhttp.onload = function(){
        exibicao.innerHTML = "";
        if(xhttp.responseText == '[]'){
            return;
        }

        let vetor = JSON.parse(xhttp.responseText);
        for(let v of vetor){
            exibicao.innerHTML += `<p>${v.name}</p>`;
        }
        eventosNosPaises();
    }
    xhttp.send();
});

function isEntradaValida(entrada){
    if(entrada === '' || entrada.trim() === '')
        return false;
    else 
        return true;
}

let caixaDeCidades = document.querySelector('.cidades');

function eventosNosPaises(){
    const paises = document.querySelectorAll(".paises p");
    for(let pais of paises){
        pais.addEventListener('click', consulta);
    }
}

function consulta(){
    let nome = pais.innerText;

    caixaDeCidades.innerHTML = "";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "cidades.php?nome=" + encodeURIComponent(nome));
    xhttp.onload = function(){
        if(xhttp.responseText == '[]'){
            return;
        }
        
        const cidades = JSON.parse(xhttp.responseText);
        for(let c of cidades){
            console.log(c.name);
            caixaDeCidades.innerHTML += `<p>${c.name}</p>`;
        }
    }
    xhttp.send();
}