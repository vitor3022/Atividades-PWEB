console.log("===============================")
console.log("====== Exição dos Livros ======")
console.log("===============================n/")

interface ILivro{
    titulo: string;
    ano: number;
    isbn: number;
    preco: number;
    autor: string;
    editora: string;
    estoque: number;

    exibirDados(): void;
    atualizarEstoque(quantidade: number): void;
}

interface IEbook extends ILivro{
    tamanArquivo: number;
}

class LivroFisico implements ILivro{
    titulo: string;
    ano: number;
    isbn: number;
    preco: number;
    autor: string;
    editora: string;
    estoque: number;

    constructor(titulo: string, ano: number, isbn: number, preco: number, autor: string, editora: string, estoque: number){
        this.titulo = titulo;
        this.ano = ano;
        this.isbn = isbn;
        this.preco = preco;
        this.autor = autor;
        this.editora = editora;
        this.estoque = estoque;
    }

    exibirDados(): void {
        console.log(`=== DADOS DO LIVRO ===`);
        console.log(`Título: ${this.titulo}`);
        console.log(`Ano: ${this.ano}`);
        console.log(`ISBN: ${this.isbn}`);
        console.log(`Preço: R$ ${this.preco}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`Editora: ${this.editora}`);
        console.log(`Estoque: ${this.estoque} unidades`);
    }

    atualizarEstoque(quantidade: number): void {
        this.estoque += quantidade;
    }
}

class Ebook implements IEbook{
    titulo: string;
    ano: number;
    isbn: number;
    preco: number;
    autor: string;
    editora: string;
    estoque: number;
    tamanArquivo: number;

    constructor(titulo: string, ano: number, isbn: number, preco: number, autor: string, editora: string, estoque: number, tamanArquivo: number){
        this.titulo = titulo;
        this.ano = ano;
        this.isbn = isbn;
        this.preco = preco;
        this.autor = autor;
        this.editora = editora;
        this.estoque = estoque;
        this.tamanArquivo = tamanArquivo;
    }

    exibirDados(): void {
        console.log(`=== DADOS DO EBOOK ===`);
        console.log(`Título: ${this.titulo}`);
        console.log(`Ano: ${this.ano}`);
        console.log(`ISBN: ${this.isbn}`);
        console.log(`Preço: R$ ${this.preco}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`Editora: ${this.editora}`);
        console.log(`Estoque: ${this.estoque} unidades`);
        console.log(`Tamanho do Arquivo: ${this.tamanArquivo} MB`)
    }

    atualizarEstoque(quantidade: number): void {
        this.estoque += quantidade;
    }
}

class GerenciarLivraria{
    private livros: ILivro[] = [];
    adicionarLivro(livro: ILivro): void {
        this.livros.push(livro);
        console.log(`Livro "${livro.titulo}" adicionado!`);
    }

    excluirLivro(isbn: number): void {
        const index = this.livros.findIndex(l => l.isbn === isbn);
        if (index !== -1) {
            console.log(`Livro "${this.livros[index].titulo}" removido!`);
            this.livros.splice(index, 1);
        } else {
            console.log("Livro não encontrado.");
        }
    }
    venderLivro(isbn: number, quantidade: number): void {
        const livro = this.livros.find(l => l.isbn === isbn);
        if (livro) {
            if (livro.estoque >= quantidade) {
                livro.atualizarEstoque(-quantidade);
                console.log(`Venda realizada: ${quantidade} unidade(s) de "${livro.titulo}".`);
            } else {
                console.log(`Estoque insuficiente de "${livro.titulo}".`);
            }
        } else {
            console.log("Livro não encontrado.");
        }
    }
    listarLivros(): void {
        if (this.livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
        } else {
            console.log("Livros na Livraria:");
            this.livros.forEach(l => l.exibirDados());
        }
    }
}
const livro1 = new LivroFisico("Dom Casmurro", 1899, 12345, 39.9, "Machado de Assis", "Editora A", 10);
const ebook1 = new Ebook("O cortiço", 2008, 67890, 59.9, "Aluiso Azevedo", "Editora B", 5, 15);

const livraria = new GerenciarLivraria();

livraria.adicionarLivro(livro1);
livraria.adicionarLivro(ebook1);
livraria.listarLivros();
livraria.venderLivro(12345, 2);
livraria.venderLivro(67890, 10);
livraria.excluirLivro(12345);
livraria.listarLivros();


    