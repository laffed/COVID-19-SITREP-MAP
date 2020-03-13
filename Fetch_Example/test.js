const date = new Date(Date.now())

const format = new Intl.DateTimeFormat("en", {
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric"
})


console.log(format.formatToParts(date))
