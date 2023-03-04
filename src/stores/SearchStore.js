import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'dictionary',
    state: () => ({
        searchString: '',
        searchResponse: {}
    }),

    // async fetchData() {
    //     const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     const data = await response.json()
    //     this.responseData = data
    // },

    actions: {
        async searchDictionary(word) {
            this.searchString = word;
            console.log('searched dictionary for', this.searchString)

            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

            const data = await response.json()

            data ? this.searchResponse = data : null

            console.log("STORE: ", this.searchResponse[0])


        }
    }
})
