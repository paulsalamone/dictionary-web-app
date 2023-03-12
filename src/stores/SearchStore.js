import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'dictionary',
    state: () => ({
        searchString: '',
        searchResponse: {},
        empty: false,
        invalid: false
    }),

    actions: {
        handleEmpty() {
            console.log('handle empty')
            this.empty = true;
        },
        handleInvalid() {
            console.log('handle invalid')
            this.invalid = true;
        },
        async searchDictionary(word) {
            this.empty = false;
            this.invalid = false
            this.searchString = word;


            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

                if (response.status === 404) {
                    console.log("404!!!!!!!!")

                }
                const data = await response.json()

                data ? this.searchResponse = data : null


            } catch (error) {
                console.log(typeof error)

            }


        }
    }
})
