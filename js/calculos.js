var tamMP = document.getElementById("txtMP");
var tamCache = document.getElementById("txtCache");
var qtdPalavra = document.getElementById("txtPalavra");
var enderecoRA = document.getElementById("txtRA");

var bitsTagDir = document.getElementById("bitsTagsDir");
var bitsLinhasDir = document.getElementById("bitsLinhasDir");
var bitsPalavrasDir = document.getElementById("bitsPalavrasDir");

var bitsTagAss = document.getElementById("bitsTagsAss");
var bitsLinhasAss = document.getElementById("bitsLinhasAss");
var bitsPalavrasAss = document.getElementById("bitsPalavrasAss");


function consultaDireta() {
    if (tamMP.value == "" || tamCache.value == "" || qtdPalavra.value == "" || enderecoRA.value == "") {
        alertMensagem();
    } else {

        calculoTagDireto();
        calculoLinhasDireto();
        calculoPalavrasDireto();
        hexadecimalBinarioDireto();

        document.getElementById('resultDadosDireto').classList.remove('d-none');
        document.getElementById('resultDadosAssociativo').classList.remove('d-none');
        document.getElementById('resultDadosAssociativo').classList.add('d-none');
    }
}

function consultaAssociativa() {
    if (tamMP.value == "" || tamCache.value == "" || qtdPalavra.value == "" || enderecoRA.value == "") {
        alertMensagem();
    } else {

        calculoTagAssociativa();
        calculoPalavrasAssociativa();
        hexadecimalBinarioAssociativa();

        document.getElementById('resultDadosAssociativo').classList.remove('d-none');
        document.getElementById('resultDadosDireto').classList.remove('d-none');
        document.getElementById('resultDadosDireto').classList.add('d-none');
    }
}

//////////////////////// Direto ////////////////////////

function calculoTagDireto() {

    var qtdTag = parseInt(tamanhoMP() / tamanhoCache());
    var bitsTagDir = Math.log2(qtdTag);

    document.getElementById("qtdTagsDir").innerHTML = qtdTag;
    document.getElementById("bitsTagsDir").innerHTML = bitsTagDir;
}

function calculoLinhasDireto() {

    var qtdLinhas = parseInt(tamanhoCache() / qtdPalavra.value);
    var bitsLinhasDir = parseInt(Math.log2(qtdLinhas));

    document.getElementById("qtdLinhasDir").innerHTML = qtdLinhas;
    document.getElementById("bitsLinhasDir").innerHTML = bitsLinhasDir;
}

function calculoPalavrasDireto() {

    var palavras = qtdPalavra.value;
    var bitsPalavrasDir = parseInt(Math.log2(palavras));

    document.getElementById("qtdPalavrasDir").innerHTML = palavras;
    document.getElementById("bitsPalavrasDir").innerHTML = bitsPalavrasDir;

    document.getElementById("qtdPalavrasAss").innerHTML = palavras;
    document.getElementById("bitsPalavrasAss").innerHTML = bitsPalavrasDir;
}

///////////////////////////// Assoaciativo /////////////////////////////

function calculoTagAssociativa() {

    var qtdTag = parseInt(tamanhoMP() / tamanhoCache());
    var bitsTagDir = parseInt(Math.log2(qtdTag));

    var qtdLinhas = parseInt(tamanhoCache() / qtdPalavra.value);
    var bitsLinhasAss = parseInt(Math.log2(qtdLinhas));

    document.getElementById("qtdTagsAss").innerHTML = qtdLinhas;
    document.getElementById("bitsTagsAss").innerHTML = bitsTagDir + bitsLinhasAss;
}

function calculoPalavrasAssociativa() {

    var palavras = qtdPalavra.value;
    var bitsPalavrasAss = parseInt(Math.log2(palavras));

    document.getElementById("qtdPalavrasAss").innerHTML = palavras;
    document.getElementById("bitsPalavrasAss").innerHTML = bitsPalavrasAss;
}


////////////////////////// Tamanhos //////////////////////////

function tamanhoMP() {

    tamMP.value.replace(" ", "");

    if (tamMP.value.includes("GB") || tamMP.value.includes("gb")) {
        var mpTamanho = tamMP.value.replace("GB", "");
        mpTamanho = mpTamanho.replace("gb", "");
        mpTamanho = mpTamanho * Math.pow(2, 30);
        return mpTamanho;

    } else if (tamMP.value.includes("MB") || tamMP.value.includes("mb")) {

        var mpTamanho = tamMP.value.replace("MB", "");
        mpTamanho = mpTamanho.replace("mb", "");
        mpTamanho = mpTamanho * Math.pow(2, 20);
        return mpTamanho;

    } else if (tamMP.value.includes("KB") || tamMP.value.includes("kb")) {

        var mpTamanho = tamMP.value.replace("KB", "");
        mpTamanho = mpTamanho.replace("kb", "");
        mpTamanho = mpTamanho * Math.pow(2, 10);
        return mpTamanho;

    } else {
        var mpTamanho = tamMP.value;
        return mpTamanho;
    }

}

function tamanhoCache() {

    tamCache.value.replace(" ", "");

    if (tamCache.value.includes("MB") || tamCache.value.includes("mb")) {
        var cacheTamanho = tamCache.value.replace("MB", "");
        cacheTamanho = cacheTamanho.replace("mb", "");
        cacheTamanho = cacheTamanho * Math.pow(2, 20);
        return cacheTamanho;
    }
    else if (tamCache.value.includes("KB") || tamCache.value.includes("kb")) {

        var cacheTamanho = tamCache.value.replace("KB", "");
        cacheTamanho = cacheTamanho.replace("kb", "");
        cacheTamanho = cacheTamanho * Math.pow(2, 10);
        return cacheTamanho;
    } else {
        var cacheTamanho = tamCache.value;
        return cacheTamanho;
    }

}

////////////////////////// Hexadecimal Binario //////////////////////////

function hexadecimalBinarioDireto() {
    enderecoRA.value = enderecoRA.value.replace("0x", "");

    var hex = enderecoRA.value;
    var bin = parseInt(hex, 16).toString(2);
    var binConvertido = "";

    if (bin.length < Math.log2(Number(tamanhoMP()))) {
        while (binConvertido.length < (Math.log2(Number(tamanhoMP())) - bin.length)) {
            binConvertido = "0" + binConvertido;
        }
        bin = binConvertido + bin;
    } else {
        bin = bin.substring(bin.length - Math.log2(Number(tamanhoMP())));
    }

    document.getElementById("tagDir").innerHTML = bin.slice(0, bitsTagDir.innerHTML);
    document.getElementById("linhaDir").innerHTML = bin.slice(bitsTagDir.innerHTML, Number(bitsTagDir.innerHTML) + Number(bitsLinhasDir.innerHTML));
    document.getElementById("palavraDir").innerHTML = bin.slice(Number(bitsTagDir.innerHTML) + Number(bitsLinhasDir.innerHTML), Number(bitsTagDir.innerHTML) + Number(bitsLinhasDir.innerHTML) + Number(bitsPalavrasDir.innerHTML));

    document.getElementById("hexTagsDir").innerHTML = "0x" + parseInt(document.getElementById("tagDir").innerHTML, 2).toString(16);
    document.getElementById("hexLinhasDir").innerHTML = "0x" + parseInt(document.getElementById("linhaDir").innerHTML, 2).toString(16);
    document.getElementById("hexPalavrasDir").innerHTML = "0x" + parseInt(document.getElementById("palavraDir").innerHTML, 2).toString(16);

    document.getElementById("endCacheBinDir").innerHTML = document.getElementById("linhaDir").innerHTML + document.getElementById("palavraDir").innerHTML;
    document.getElementById("endCacheHexDir").innerHTML = "0x" + parseInt(document.getElementById("endCacheBinDir").innerHTML, 2).toString(16).toUpperCase();

    tamanhoDivsDireto();
}

function hexadecimalBinarioAssociativa() {
    enderecoRA.value = enderecoRA.value.replace("0x", "");

    var hex = enderecoRA.value;
    var bin = parseInt(hex, 16).toString(2);
    var binConvertido = "";

    if (bin.length < Math.log2(Number(tamanhoMP()))) {
        while (binConvertido.length < (Math.log2(Number(tamanhoMP())) - bin.length)) {
            binConvertido = "0" + binConvertido;
        }
        bin = binConvertido + bin;
    } else {
        bin = bin.substring(bin.length - Math.log2(Number(tamanhoMP())));
    }

    document.getElementById("tagAss").innerHTML = bin.slice(0, bitsTagAss.innerHTML);
    document.getElementById("palavraAss").innerHTML = bin.slice(Number(bitsTagAss.innerHTML), Number(bitsTagAss.innerHTML) + Number(bitsPalavrasAss.innerHTML));

    document.getElementById("hexTagsAss").innerHTML = "0x" + parseInt(document.getElementById("tagAss").innerHTML, 2).toString(16);
    document.getElementById("hexPalavrasAss").innerHTML = "0x" + parseInt(document.getElementById("palavraAss").innerHTML, 2).toString(16);

    document.getElementById("endCacheBinAss").innerHTML = document.getElementById("palavraAss").innerHTML;
    document.getElementById("endCacheHexAss").innerHTML = "0x" + parseInt(document.getElementById("endCacheBinAss").innerHTML, 2).toString(16).toUpperCase();

    tamanhoDivsAssociativa()
}

//////////////////////////// Tamanho divs ////////////////////////////

function tamanhoDivsDireto() {
    var tamanhoTotal = Math.log2(Number(tamanhoMP()));

    var tamanhoTag = parseInt((Number(document.getElementById("bitsTagsDir").innerHTML) / tamanhoTotal) * 12);
    var tamanhoLinha = parseInt((Number(document.getElementById("bitsLinhasDir").innerHTML) / tamanhoTotal) * 12);
    var tamanhoPalavra = 12 - tamanhoTag - tamanhoLinha;

    document.getElementById('tagDir').classList.add('col-md-' + tamanhoTag);
    document.getElementById('linhaDir').classList.add('col-md-' + tamanhoLinha);
    document.getElementById('palavraDir').classList.add('col-md-' + tamanhoPalavra);
}

function tamanhoDivsAssociativa() {
    var tamanhoTotal = Math.log2(Number(tamanhoMP()));

    var tamanhoTag = parseInt((Number(document.getElementById("bitsTagsAss").innerHTML) / tamanhoTotal) * 12);
    var tamanhoPalavra = 12 - tamanhoTag;

    document.getElementById('tagAss').classList.add('col-md-' + tamanhoTag);
    document.getElementById('palavraAss').classList.add('col-md-' + tamanhoPalavra);
}
//////////////////////////// Cache hit e miss ////////////////////////////

function acessoDireto() {
    var end1 = document.getElementById("txtEnd1");
    var end2 = document.getElementById("txtEnd2");
    var end3 = document.getElementById("txtEnd3");
    var end4 = document.getElementById("txtEnd4");

    if (tamMP.value == "" || tamCache.value == "" || qtdPalavra.value == "" || end1.value == "" || end2.value == "" || end3.value == "" || end4.value == "") {
        alertMensagem();
    } else {

        document.getElementById("result").classList.remove("d-none");

        var enderecos = [end1.value, end2.value, end3.value, end4.value];
        var cacheTag = [];
        var cacheEndereco = [];

        for (i = 1; i <= enderecos.length; i++) {
            enderecos[i - 1] = enderecos[i - 1].replace("0x", "");

            var hex = enderecos[i - 1];
            var bin = parseInt(hex, 16).toString(2);
            var binConvertido = "";

            if (bin.length < Math.log2(Number(tamanhoMP()))) {
                while (binConvertido.length < (Math.log2(Number(tamanhoMP())) - bin.length)) {
                    binConvertido = "0" + binConvertido;
                }
                bin = binConvertido + bin;
            } else {
                bin = bin.substring(bin.length - Math.log2(Number(tamanhoMP())));
            }

            if (cacheTag.indexOf(bin.slice(0, bitsTag())) == -1) {
                cacheTag.push(bin.slice(0, bitsTag()));
                cacheEndereco.push(bin.slice(Number(bitsTag()), Number(bitsTag()) + Number(bitsPalavras()) + Number(bitsLinhas())));

                document.getElementById("end" + i + "Hit").classList.add("d-none");
                document.getElementById("end" + i + "Miss").classList.remove("d-none");
            } else {
                if (cacheEndereco.indexOf(bin.slice(Number(bitsTag()), Number(bitsTag()) + Number(bitsPalavras()) + Number(bitsLinhas()))) == -1) {
                    cacheEndereco.push(bin.slice(Number(bitsTag()), Number(bitsTag()) + Number(bitsPalavras()) + Number(bitsLinhas())));

                    document.getElementById("end" + i + "Hit").classList.add("d-none");
                    document.getElementById("end" + i + "Miss").classList.remove("d-none");
                } else {
                    document.getElementById("end" + i + "Miss").classList.add("d-none");
                    document.getElementById("end" + i + "Hit").classList.remove("d-none");
                }

            }
        }
    }
}


function acessoAssociativo() {
    var end1 = document.getElementById("txtEnd1");
    var end2 = document.getElementById("txtEnd2");
    var end3 = document.getElementById("txtEnd3");
    var end4 = document.getElementById("txtEnd4");

    if (tamMP.value == "" || tamCache.value == "" || qtdPalavra.value == "" || end1.value == "" || end2.value == "" || end3.value == "" || end4.value == "") {
        alertMensagem();
    } else {

        document.getElementById("result").classList.remove("d-none");

        var enderecos = [end1.value, end2.value, end3.value, end4.value];
        var cache = [];

        for (i = 1; i <= enderecos.length; i++) {
            enderecos[i - 1] = enderecos[i - 1].replace("0x", "");

            var hex = enderecos[i - 1];
            var bin = parseInt(hex, 16).toString(2);
            var binConvertido = "";

            if (bin.length < Math.log2(Number(tamanhoMP()))) {
                while (binConvertido.length < (Math.log2(Number(tamanhoMP())) - bin.length)) {
                    binConvertido = "0" + binConvertido;
                }
                bin = binConvertido + bin;
            } else {
                bin = bin.substring(bin.length - Math.log2(Number(tamanhoMP())));
            }

            if (cache.indexOf(bin.slice(0, bitsTag())) == -1) {
                cache.push(bin.slice(0, bitsTag()));

                document.getElementById("end" + i + "Hit").classList.add("d-none");
                document.getElementById("end" + i + "Miss").classList.remove("d-none");
            } else {
                document.getElementById("end" + i + "Miss").classList.add("d-none");
                document.getElementById("end" + i + "Hit").classList.remove("d-none");
            }

        }
    }
}


function bitsTag() {
    var qtdTag = parseInt(tamanhoMP() / tamanhoCache());
    return Math.log2(qtdTag);
}

function bitsLinhas() {
    var qtdLinhas = parseInt(tamanhoCache() / qtdPalavra.value);
    return parseInt(Math.log2(qtdLinhas));
}

function bitsPalavras() {
    var palavras = qtdPalavra.value;
    return parseInt(Math.log2(palavras));
}

//////////////////////////// SweetAlert ////////////////////////////
function alertMensagem() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos os campos devem estar preenchidos!'
    })
}

/////////////////////////// Mudar Página ///////////////////////////

function mapeamento(){
    document.location.href = "./index.html";
}

function acesso(){
    document.location.href = "./acesso.html";
}