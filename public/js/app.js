const searchBox = document.querySelector("input")
const weatherBox = document.querySelector("form")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")



weatherBox.addEventListener("submit", (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    const location = searchBox.value
    fetch(`/weather/?address=${location}`).then( (res) => {
        res.json().then( (data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
                console.log(data.location)
                console.log(data.weather)
            }
        })
    })
})

