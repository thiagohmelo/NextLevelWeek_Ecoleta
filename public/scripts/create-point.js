function populateUFs() {
    const ufSelect = document.querySelector ("select[name=uf]")
    


    

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )                    
    .then(states => {
        
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`

        }
        

    })
}


populateUFs()

function getCities(event) {
    const citySelect = document.querySelector ("select[name=city]")
    const stateInput = document.querySelector ("input[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text



    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` 

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json() )                    
    .then(cities => {        
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`

        }

        citySelect.disabled = false
        

    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



    //itens de coleta
    //pegar todos os LIs

    const itemsToCollect = document.querySelectorAll(".items-grid li")

    for (let item of itemsToCollect) {
        item.addEventListener("click", handleSelectedItem )
    }

    const collectedItems = document.querySelector("input[name = items]")
    
    let selectedItems= []
    
    function handleSelectedItem(event) {
        const itemLi = event.target


        // adicione ou remover uma classe com javascript
        itemLi.classList.toggle("selected")
        
        const itemId = itemLi.dataset.id


        
        //verificar se existem items selecionados
        //se sim, pegar os items selecionados

        const alreadySelected = selectedItems.findIndex(item => {
            const itemFound = item == itemId //retorna true or false, se true coloca na const
            return itemFound
        })

        //se já estiver selecionado 
        if (alreadySelected >= 0) {
            //tirar na seleção
            const filterditems = selectedItems.filter(item => {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })

            selectedItems = filterditems
        } else {
              //se não estiver selecionado, adicionar a seleção

            selectedItems.push(itemId)

        }
        
        
        //atualizar o campo escondido com os dados selecionados 
        
        document.querySelector("input[name = items]")

        collectedItems.value = selectedItems

    }

    

