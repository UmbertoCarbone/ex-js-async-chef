
/* In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
 Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef


☑️Note del docente
Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch */

//🎯 Bonus 1
/* Attualmente,
 se la prima richiesta non trova una ricetta,
  la seconda richiesta potrebbe comunque essere eseguita
   causando errori a cascata.
   Modifica getChefBirthday(id)
    per intercettare eventuali errori prima
     di fare la seconda richiesta.
 */

async function getChefBirthday(id) {
    let recipe;
    try {
        const ricetta = await fetch(`https://dummyjson.com/recipes/${id}`)
        recipe = await ricetta.json()
    } catch (error) {
        throw new Error(`non recupero la ricetta id${id}`)
    }
    if (!recipe) {
        throw new Error(`ricetta con ${id} non trovata!`)
    }
    let chef;
    try {
        const chefBirthday = await fetch(`https://dummyjson.com/users/${recipe.userId}`)
        chef = await chefBirthday.json()
    } catch (error) {
        throw new Error(`non recupero la chef id ${id}`)
    }
    if (!chef) {
        throw new Error(`Chef con id ${id} non trovato`)
    }
    const DataIT = dayjs(chef.birthDate).format('DD/MM/YYYY')
    return DataIT
}

(async () => {
    try {
        const birthday = await getChefBirthday(1)
        console.log("data di nascita dello chef", birthday)
    } catch (error) {
        console.error("errore", error.message)
    } finally {
        console.log("Fine Codice")
    }
})()





