const runCall = async () => {
    const apiValue = await fetchRetry();
    console.log(apiValue);
}

const fetchRetry = async (n = 0) => {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    }
    const maxRetry = 15;

    const apiURL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${getDateString(n)}.csv`

    try {
        const response = await fetch(apiURL, requestOptions);
        return response.ok ?
            response.text() :
            n + 1 < maxRetry ?
            fetchRetry(n + 1) :
            null
    } catch (err) {
        console.log(err);
        return null
    }
}

const getDateString = (n) => {
    const date = new Date(Date.now() - daysToMs(n))
    const format = new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })

    const [month, , day, , year] = format.formatToParts(date);

    return `${month.value}-${day.value}-${year.value}`

}

const daysToMs = (n) => {
    return n * 24 * 60 * 60 * 1000
}