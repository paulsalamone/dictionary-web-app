import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'dictionary',
    state: () => ({
        searchString: '',
        searchResponse: null
    }),
    actions: {
        async searchDictionary(word) {
            this.searchString = word;
            console.log('searched dictionary for', word)
            // https://api.dictionaryapi.dev/api/v2/entries/en/<word>

            await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(response => response.text())
                .then(data => {
                    console.log(data)
                    this.searchResponse = data
                })
                .catch(error => {
                    console.log("ERROR! ", error)
                })
        }
    }
})
