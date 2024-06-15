const areaArquivoArrastavel = document.querySelector('.form-produto__area-arquivo');
const inputArquivo = document.querySelector('.input-arquivo');
const blocoArquivo = document.querySelector('.form-produto__bloco-arquivo');
const nomeArquivo = document.querySelector('.arquivo-nome');
const botaoRemoverAquivo = document.querySelector('.arquivo-info img');
const areaArquivoTexto = document.querySelector('.messagem-dinamica');

let objectURL = '';

inputArquivo.addEventListener('click', () => {
    inputArquivo.value = '';
    console.log(inputArquivo.value);
})

inputArquivo.addEventListener('change', () => {
    console.log(" > ", inputArquivo.value);
    areaArquivoTexto.innerHTML = 'Arquivo selecionado!';
    nomeArquivo.innerHTML = inputArquivo.files[0].name;
    blocoArquivo.style.display = 'block';

    if (inputArquivo.files && inputArquivo.files[0]) {
        const file = inputArquivo.files[0];
        
        // Cria um URL temporário para o arquivo
        // objectURL = URL.createObjectURL(file);
        // console.log(objectURL);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            objectURL = reader.result;
            console.log(objectURL);
        }
    }
})

botaoRemoverAquivo.addEventListener('click', () => {
    blocoArquivo.style.display = 'none';
    inputArquivo.value = '';
    areaArquivoTexto.innerHTML = 'Araste e solte o arquivo aqui!';
})

var isAdvancedUpload = function() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

if (isAdvancedUpload) {
    ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach( evt => 
        areaArquivoArrastavel.addEventListener(evt, e => {
            e.preventDefault();
            e.stopPropagation();
        })
    );

    ["dragover", "dragenter"].forEach( evt => {
        areaArquivoArrastavel.addEventListener(evt, e => {
            e.preventDefault();
            e.stopPropagation();
            areaArquivoTexto.innerHTML = 'Solte seu arquivo aqui!';
            areaArquivoArrastavel.style.cssText = 'border: 3px dashed #000;color: #000;';
            document.querySelector('.label').style.cssText = 'color: #000;';
            document.querySelector('.procurar-arquivo__texto').style.cssText = 'color: #000;';
        });

        areaArquivoArrastavel.addEventListener("drop", e => {
            areaArquivoTexto.innerHTML = 'Arquivo selecionado!';
            
            
            let arquivos = e.dataTransfer.files;
            inputArquivo.files = arquivos;
            // inputArquivo.dispatchEvent(new Event('change'));
            console.log(arquivos[0].name + " " + arquivos[0].size);
            console.log(inputArquivo.value);
            nomeArquivo.innerHTML = arquivos[0].name;
            blocoArquivo.style.cssText = "display: block;";
            areaArquivoArrastavel.style.cssText = 'border: 3px dashed #03318c;color: #03318c;';
            document.querySelector('.label').style.cssText = 'color: #03318c;';
            document.querySelector('.procurar-arquivo__texto').style.cssText = 'color: #03318c;';
        });
    });
}