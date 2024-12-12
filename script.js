const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

function addHTMLTimeRunning() {
	const newDiv = document.createElement("div")
	newDiv.setAttribute("id", "timeProgress")
	
	const textNode = document.createTextNode("Time Running...")
	
	newDiv.appendChild(textNode)
	
	const bodyTag = document.body
	bodyTag.appendChild(newDiv)
}

function removeHTMLById(id) {
	const element = document.getElementById(id)
	element.remove()
}

// START BUTTON
startButton.addEventListener("click", function() {
	if (document.getElementById("timeProgress") == null) {
		addHTMLTimeRunning()
		const now = Date.now()

		chrome.storage.local.set({timeStart: now})
	}
})

// STOP BUTTON
stopButton.addEventListener("click", function() {
	if (document.getElementById("timeProgress") != null) {
		removeHTMLById("timeProgress")
		const now = new Date()

		chrome.storage.local.get("timeStart", (result) => {
			const timeStart = new Date(result["timeStart"])
			const timeDiff = now.getTime() - timeStart.getTime()
			const minutes = Math.floor(timeDiff / (1000 * 60))
			const hours = Math.floor(minutes / 60)
			alert("Time Passed " + hours + ":" + minutes)

			chrome.storage.local.set({timeStart: null})
		})
	}
})

chrome.storage.local.get("timeStart", (result) => {
	let timeStart = result["timeStart"];

	if (timeStart != null) {
		addHTMLTimeRunning()
	}
})
