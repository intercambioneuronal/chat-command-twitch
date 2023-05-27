function createInteraction(interaction){
    return `
    <div class="interaccion">
    <div class="comando">
        <div class="text-comando">&excl;${interaction.comando}</div>
    </div>
    <div class="parameters">
        <div class="text-parameters">${interaction.parametros}</div>
    </div>
    <div class="respuesta">        
        ${interaction.respuesta}
    </div>
</div>
    `;
}
module.exports={createInteraction};