
function queryDB(filiaalnummer) {
	"use strict"
	var dbRef = firebase.database().ref()
	dbRef.orderByChild("filiaalnummer").equalTo(Number(filiaalnummer)).once("value", function(snapshot) {
		if (!snapshot.exists()) { 
			alert("filiaalnummer niet gevonden")
			return
		}
		snapshot.forEach(function(element) {
			var dataList = element.val()
			var div = $("<div></div>",{class: "queryText"} )
			div.html("<span>" +  "<b>Filiaalnummer:</b> " + dataList.filiaalnummer + "</span><br><br>" +
					 "<span>" + "<b>Adres:</b> " + dataList.address + "</span><br><br>" +
					 "<span>" + "<b>Postcode:</b> " + dataList.postcode + "</span><br><br>" +
					 "<span class=\"Info-text\">" + "<b>info:</b> " + dataList.info +"<br><br>-------------------------------------------------------------" + "</span><br><br>"
			)

			$(".main-ui").append(div)	
			if(dataList.mededeling) $(".info-text").before("<span>" + "<b>Mededeling:</b> " + dataList.mededeling + "</span><br><br>") 
			
		})
		
	})
		
}

function getAllMededelingen() {
	"use strict"
		var dbRef = firebase.database().ref()
		dbRef.orderByChild("filiaalnummer").once("value", function(snapshot) {
			if(snapshot.exists()) {
				snapshot.forEach(function(element) {
					var dataList = element.val()
					if (dataList.mededeling) {
						var listElement = $("<li></li>")
						listElement.html("<span>" + "Filiaalnummer: " + dataList.filiaalnummer + "</span><br><br>" +
							"<span>" + "Adres: " + dataList.address + "</span><br><br>" +
							"<span>" + "Mededeling: " + dataList.mededeling + "</span><br><br>"
						)
						listElement.css("color","white")
						listElement.css("background", "grey")
						listElement.css("margin", "20px")
						$(".mededelingen-list").append(listElement)
					}
				})
			}
		})
}
				
				
function clearTextNode() {
	"use strict"
	var element = $(".queryText")
	element.children().remove()
}

