const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

function convertMinutes(minutes) {
	const hours = Math.floor(minutes / 60)
	const leftoverMinutes = Math.floor(minutes - hours*60)
	return hours + ":" + leftoverMinutes
}

function addHTMLTimeRunning() {
	const newDiv = document.createElement("div")
	newDiv.setAttribute("id", "timeProgress")
	
	const textNode = document.createTextNode("Time Running...")
	
	newDiv.appendChild(textNode)
	
	const bodyTag = document.body
	bodyTag.appendChild(newDiv)
}

function addHTMLMinutesPassed(minutes) {
	const newDiv = document.createElement("div")
	const addToTotalButton = document.createElement("button")
	const discardTotalButton = document.createElement("button")

	newDiv.setAttribute("id", "minutesPassed")
	addToTotalButton.setAttribute("id", "addToTotalButton")
	discardTotalButton.setAttribute("id", "discardTotalButton")

	const textNode = document.createTextNode("Time Passed: " + convertMinutes(minutes))
	const textNodeAdd = document.createTextNode("Add to Total")
	const textNodeDiscard = document.createTextNode("Discard")

	newDiv.appendChild(textNode)
	addToTotalButton.appendChild(textNodeAdd)
	discardTotalButton.appendChild(textNodeDiscard)

	const bodyTag = document.body
	bodyTag.appendChild(newDiv)
	bodyTag.appendChild(addToTotalButton)
	bodyTag.appendChild(discardTotalButton)
}

function removeHTMLById(id) {
	const element = document.getElementById(id)
	element.remove()
}

function addHTMLTotal(total) {
	const newDiv = document.createElement("div")
	newDiv.setAttribute("id", "totalTime")

	const textNode = document.createTextNode("Total: " + convertMinutes(total))

	newDiv.appendChild(textNode)

	const bodyTag = document.body
	bodyTag.appendChild(newDiv)
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

			addHTMLMinutesPassed(minutes)

			chrome.storage.local.get("totalMinutes", (result) => {
				let totalMinutes = result["totalMinutes"]
			})

			chrome.storage.local.set({timeStart: null})
		})
	}
})

// RESET TOTAL BUTTON


chrome.storage.local.get("timeStart", (result) => {
	let timeStart = result["timeStart"];

	if (timeStart != null) {
		addHTMLTimeRunning()
	}
})

chrome.storage.local.get("totalMinutes", (result) => {
	let total
	if (result["totalMinutes"] == null) {
		total = 0
	} else {
		total = result["totalMinutes"]
	}
	addHTMLTotal(total)
})
