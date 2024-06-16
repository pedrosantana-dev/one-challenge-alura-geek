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
});

const carregarImagem = (file) => {
	// Cria um URL temporário para o arquivo
	// objectURL = URL.createObjectURL(file);
	// console.log(objectURL);

	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		objectURL = reader.result;
	};
};

inputArquivo.addEventListener('change', () => {
	console.log(' > ', inputArquivo.value);
	areaArquivoTexto.innerHTML = 'Arquivo selecionado!';
	nomeArquivo.innerHTML = inputArquivo.files[0].name;
	blocoArquivo.style.display = 'block';

	if (inputArquivo.files && inputArquivo.files[0]) {
		carregarImagem(inputArquivo.files[0]);
	}
});

const reiniciarDropzone = () => {
	blocoArquivo.style.display = 'none';
	inputArquivo.value = '';
	areaArquivoTexto.innerHTML = 'Araste e solte o arquivo aqui!';
};

botaoRemoverAquivo.addEventListener('click', () => {
	reiniciarDropzone();
});

var isAdvancedUpload = (function () {
	var div = document.createElement('div');
	return (
		('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
	);
})();

if (isAdvancedUpload) {
	['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((evt) =>
		areaArquivoArrastavel.addEventListener(evt, (e) => {
			e.preventDefault();
			e.stopPropagation();
		})
	);

	['dragover', 'dragenter'].forEach((evt) => {
		areaArquivoArrastavel.addEventListener(evt, (e) => {
			e.preventDefault();
			e.stopPropagation();
			areaArquivoTexto.innerHTML = 'Solte seu arquivo aqui!';
			areaArquivoArrastavel.style.cssText = 'border: 3px dashed #000;color: #000;';
			document.querySelector('.label').style.cssText = 'color: #000;';
			document.querySelector('.procurar-arquivo__texto').style.cssText = 'color: #000;';
		});

		areaArquivoArrastavel.addEventListener('drop', (e) => {
			areaArquivoTexto.innerHTML = 'Arquivo selecionado!';

			let arquivos = e.dataTransfer.files;
			inputArquivo.files = arquivos;
			// inputArquivo.dispatchEvent(new Event('change'));
			carregarImagem(arquivos[0]);
			console.log(arquivos[0].name + ' ' + arquivos[0].size);
			console.log(inputArquivo.value);
			nomeArquivo.innerHTML = arquivos[0].name;
			blocoArquivo.style.cssText = 'display: block;';
			areaArquivoArrastavel.style.cssText = 'border: 3px dashed #03318c;color: #03318c;';
			document.querySelector('.label').style.cssText = 'color: #03318c;';
			document.querySelector('.procurar-arquivo__texto').style.cssText = 'color: #03318c;';
		});
	});
}

const produtosDiv = document.querySelector('.produtos');

let itens = [
	{
		id: 1,
		nome: 'Stormtrooper',
		preco: '79,90',
		imagem: 'img/stormtrooper.jpg',
	},
	{
		id: 2,
		nome: 'Game Boy Classic',
		preco: '59,90',
		imagem: 'img/Game-Boy-FL.jpg',
	},
];

const adicionarProduto = (item) => {
	const produtoEl = document.createElement('div');
	produtoEl.classList.add('produtos__produto');
	produtoEl.innerHTML = `
        <img class="produtos__produto__img" src="${item.imagem}" alt="${item.nome}">
        <p class="produtos__produto__nome">${item.nome}</p>
        <span>
            <p>R$ ${item.preco}</p>
            <a href="#" onclick="event.preventDefault();removerProduto(${item.id})"><img src="img/icon_trash.png"></a>
        </span>
    `;

	produtosDiv.appendChild(produtoEl);
};

const removerProduto = (id) => {
	itens = itens.filter((item) => item.id !== id);
	localStorage.setItem('aluraGeekItens', JSON.stringify(itens));
	produtosDiv.innerHTML = '';
	itens.forEach((item) => adicionarProduto(item));
};

document.addEventListener('DOMContentLoaded', () => {
	console.log('adicionando produtos...');

	const itensSalvos = localStorage.getItem('aluraGeekItens');
	if (itensSalvos) {
		itens = JSON.parse(itensSalvos);
	}
	itens.forEach((item) => adicionarProduto(item));
});

document.querySelector('.form-produto').addEventListener('submit', (e) => {
	e.preventDefault();

	const item = {
		id: itens.length + 1,
		nome: e.target.elements.nome.value,
		preco: e.target.elements.preco.value,
		imagem: objectURL,
	};

	console.log(item);

	itens.push(item);
	localStorage.setItem('aluraGeekItens', JSON.stringify(itens));

	adicionarProduto(item);

	e.target.reset();
	reiniciarDropzone();
});
document.querySelector('.form-produto').addEventListener('reset', () => reiniciarDropzone());
