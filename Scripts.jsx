var app = app || {};
app.documents = app.documents || [];

if (app.documents.length === 0) {
    alert("Não há nenhum documento aberto. Abra um documento antes de executar este script.");
} else {
    var dlg = new Window("dialog", "Scripts");

    // Adiciona um texto explicativo
    var textoExplicativo = dlg.add("statictext", undefined, "Número da Ordem de Serviço:");

    // Adiciona um campo de texto maior para o número de ordem de serviço
    var numeroOrdemInput = dlg.add("edittext", undefined, "", {
        characters: 30,
        justify: "left"
    });

    // Ajusta a largura do campo de entrada
    numeroOrdemInput.preferredSize.width = 150;

    // Ajusta a largura da janela
    dlg.preferredSize.width = 150;

    numeroOrdemInput.active = true;

    // Adiciona checkboxes em linhas separadas
    var checkbox1 = dlg.add("checkbox", undefined, "Montagem");
    var checkbox8 = dlg.add("checkbox", undefined, "Montagem + Distorção");
    var checkbox2 = dlg.add("checkbox", undefined, "Label Alpha");
    var checkbox3 = dlg.add("checkbox", undefined, "Distorção");
    var checkbox4 = dlg.add("checkbox", undefined, "Números Pistas");
    var checkbox5 = dlg.add("checkbox", undefined, "Escalas Lorena");
    var checkbox6 = dlg.add("checkbox", undefined, "Úteis");
    var checkbox7 = dlg.add("checkbox", undefined, "Micropontos");
    var checkbox9 = dlg.add("checkbox", undefined, "Box Valfilm Mg");

    // Adiciona um painel vazio para espaçamento
    dlg.add("panel");

    // Botão Executar para confirmar a seleção
    var btnExecutar = dlg.add("button", undefined, "Executar");
    // Botão Cancelar para fechar sem fazer nada
    var btnCancelar = dlg.add("button", undefined, "Cancelar");

    // Adiciona manipulador de eventos para checkboxes
    var checkboxes = [checkbox1, checkbox8, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6, checkbox7, checkbox9];
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].alignment = "left";
        checkboxes[i].onClick = function() {
            for (var j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j] != this) {
                    checkboxes[j].value = false;
                }
            }
        };
    }

    // Ação do botão Executar
    btnExecutar.onClick = function() {
        var serviceOrderNumber = numeroOrdemInput.text;

        if (serviceOrderNumber.length !== 7) {
            alert("O número de ordem de serviço deve ter 7 dígitos.");
            return;
        }

        // Lógica dos checkboxes
        if (checkbox1.value) {
            // Chama o script associado a "SR"
            if (activeDocument.selection.length === 0) {
                alert("Nada está selecionado. Selecione pelo menos um item no documento antes de executar este script.");
            } else {
                #include "z_Complementos/1_SR_Montagens.jsx";

            }

        } else if (checkbox2.value) {
            // Chama o script associado a "Label"
            #include "z_Complementos/2_Label_Alpha.jsx";

        } else if (checkbox3.value) {
            // Chama o script associado a "Distorcao"
            if (activeDocument.selection.length === 0) {
                alert("Nada está selecionado. Selecione pelo menos um item no documento antes de executar este script.");
            } else {
                #include "z_Complementos/3_Distorcao_Alpha.jsx";

            }

        } else if (checkbox8.value) {
            // Chama o script associado a "Distorcao"
            if (activeDocument.selection.length === 0) {
                alert("Nada está selecionado. Selecione pelo menos um item no documento antes de executar este script.");
            } else {
                #include "z_Complementos/1_SR_Montagens.jsx";
 // Seleciona todos os objetos no documento.
                doc.selectObjectsOnActiveArtboard();

                #include "z_Complementos/3_Distorcao_Alpha.jsx";

            }
        } else if (checkbox4.value) {
            // Chama o script associado a "Numeros Pistas"
            #include "z_Complementos/5_Numeros_PPPrintBRL.jsx";

        } else if (checkbox5.value) {
            // Chama o script associado a "Escalas Lorena"
            #include "z_Complementos/6_Escalas_valfilm_lorena.jsx";

        } else if (checkbox6.value) {
            // Chama o script associado a "Uteis"
            #include "z_Complementos/7_Uteis.jsx";

        } else if (checkbox7.value) {
            // Chama o script associado a "Uteis"
            #include "z_Complementos/8_Micropontos.jsx";

        } else if (checkbox9.value) {
            // Chama o script associado a "Distorcao"
            if (activeDocument.selection.length === 0) {
                alert("Nada está selecionado. Selecione pelo menos um item no documento antes de executar este script.");
            } else {
                #include "z_Complementos/9_Box_Valfilm.jsx";

            }
        }

        dlg.close();
    };

    // Ação do botão Cancelar
    btnCancelar.onClick = function() {
        dlg.close();
    };

    dlg.show();
}
