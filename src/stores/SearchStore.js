import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'dictionary',
    state: () => ({
        searchString: '',
        searchResponse: {},
        empty: false,
        invalid: false,
        fontBold: null
    }),
    actions: {
        handleEmpty() {
            this.empty = true;
            this.invalid = false;
            this.searchResponse = {}
        },
        handleInvalid() {
            this.empty = false;
            this.invalid = true;
            this.searchResponse = {}
        },
        setFont(font) {
            this.htmlEl = document.getElementsByTagName('html')[0]
            localStorage.setItem('font', font)
            this.htmlEl.dataset.font = font;
            // this.font = font;
        },
        setFontBold(font) {
            this.htmlEl = document.getElementsByTagName('html')[0]
            localStorage.setItem('fontBold', font)
            this.htmlEl.dataset.fontBold = font;
            this.fontBold = font;
        },
        setTheme(theme) {
            this.htmlEl = document.getElementsByTagName('html')[0]
            localStorage.setItem('theme', theme)
            this.htmlEl.dataset.theme = theme;
            // this.theme = theme;
        },
        async searchDictionary(word) {
            this.empty = false;

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

            this.searchString = word;
            this.invalid = false

        }
    }
})
