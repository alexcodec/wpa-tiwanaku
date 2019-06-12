
		var calendar = document.getElementById("calendar-table");
		var gridTable = document.getElementById("table-body");
		var currentDate = new Date();
		var selectedDate = currentDate;
		var selectedDayBlock = null;
		//var globalEventObj = {};
		var globalEventObj = [];

		var sidebar = document.getElementById("sidebar");

		function createCalendar(date, side) {
			var currentDate = date;
			var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

			var monthTitle = document.getElementById("month-name");
			var monthName = currentDate.toLocaleString("es", {
				month: "long"
			});
			var yearNum = currentDate.toLocaleString("es", {
				year: "numeric"
			});
			monthTitle.innerHTML = `${monthName} ${yearNum}`;

			if (side == "left") {
				gridTable.className = "animated fadeOutRight";
			} else {
				gridTable.className = "animated fadeOutLeft";
			}

			setTimeout(() => {
				gridTable.innerHTML = "";

				var newTr = document.createElement("div");
				newTr.className = "row";
				var currentTr = gridTable.appendChild(newTr);

				for (let i = 1; i < startDate.getDay(); i++) {
					let emptyDivCol = document.createElement("div");
					emptyDivCol.className = "col empty-day";
					currentTr.appendChild(emptyDivCol);
				}

				var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
				lastDay = lastDay.getDate();

				for (let i = 1; i <= lastDay; i++) {
					if (currentTr.children.length >= 7) {
						currentTr = gridTable.appendChild(addNewRow());
					}
					let currentDay = document.createElement("div");
					currentDay.className = "col";
					if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
						selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

						document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("es", {
						month: "long",
						day: "numeric",
						year: "numeric"
						});

						selectedDayBlock = currentDay;
						setTimeout(() => {
						currentDay.classList.add("blue");
						currentDay.classList.add("lighten-3");
						}, 900);
					}
					currentDay.innerHTML = i;

					//show marks
					if (globalEventObj[new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()]) {
						let eventMark = document.createElement("div");
						eventMark.className = "day-mark";
						currentDay.appendChild(eventMark);
					}

					currentTr.appendChild(currentDay);
				}

				for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
					let emptyDivCol = document.createElement("div");
					emptyDivCol.className = "col empty-day";
					currentTr.appendChild(emptyDivCol);
				}

				if (side == "left") {
					gridTable.className = "animated fadeInLeft";
				} else {
					gridTable.className = "animated fadeInRight";
				}

				function addNewRow() {
					let node = document.createElement("div");
					node.className = "row";
					return node;
				}

			}, !side ? 0 : 270);
		}

		createCalendar(currentDate);

		var todayDayName = document.getElementById("todayDayName");
		todayDayName.innerHTML = "Hoy es " + currentDate.toLocaleString("es", {
			weekday: "long",
			day: "numeric",
			month: "short"
		});

		var prevButton = document.getElementById("prev");
		var nextButton = document.getElementById("next");

		prevButton.onclick = function changeMonthPrev() {
			currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
			createCalendar(currentDate, "left");
		}
		nextButton.onclick = function changeMonthNext() {
			currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
			createCalendar(currentDate, "right");
		}
		
		function fechaReserva(selectedDate){
			let sidebarMsj = document.getElementById("sidebar-msj");
			sidebarMsj.innerHTML = "";
			
			var dd= selectedDate.getDate();
			var MM = selectedDate.getMonth()+1;
			var yyyy = selectedDate.getFullYear();
			if(dd<10){
				dd = '0' + dd;
			}
			if(MM<10){
				MM = '0' + MM;
			}
			var fechaRes;
			var b;
			const fechaR = yyyy + '-'+MM+'-'+dd;
			//const fechaRes = selectedDate;
			//console.log(globalEventObj.length, globalEventObj);
			var c = globalEventObj.length;
			if(c == 0){
				//console.log('no hay regsitro')
				let emptyMessage = document.createElement("div");
				emptyMessage.className = "empty-message";
				emptyMessage.id = "empty-message";
				emptyMessage.innerHTML = "No tienes reserva";
				sidebarMsj.appendChild(emptyMessage);

				let emptyFormMessage = document.getElementById("emptyFormTitle");
				emptyFormMessage.innerHTML = "No hay reservas ahora";
				fechaRes=yyyy + '-'+MM+'-'+dd;
			}else{
				
				for(var i=0; i<c;i++){
					if(globalEventObj[i][0]==fechaR){
						b = 1;
						
					}else{
						b=0;
					}
				}
				if(b==1){
					//console.log('ya registraste');
						/*let emptyMessage = document.createElement("div");
						emptyMessage.className = "empty-message";
						emptyMessage.id = "empty-message";
						emptyMessage.innerHTML = "Elije otra fecha";
						sidebarMsj.appendChild(emptyMessage);*/

						fechaRes = "nada";
						
				}else{
					//console.log('no hay registro puedes registrar');
						let emptyMessage = document.createElement("div");
						emptyMessage.className = "empty-message";
						emptyMessage.id = "empty-message";
						emptyMessage.innerHTML = "No tienes reserva";
						sidebarMsj.appendChild(emptyMessage);
						
						fechaRes=yyyy + '-'+MM+'-'+dd;
				}
			}
			
			
			return fechaRes;
		}
		function addEvent(extranjero, adulto, escolar) {
			let sidebarMsj = document.getElementById("sidebar-msj");
			sidebarMsj.innerHTML = "";
			var matriz=new Array();
			var fecha=fechaReserva(selectedDate);
			if(globalEventObj.length<1){
				
				if(fecha != 'nada'){
					matriz=[fecha,extranjero,adulto,escolar];
					globalEventObj.push(matriz);
				}
			}else{
				
				let emptyMessage = document.createElement("div");
				emptyMessage.className = "empty-message";
				emptyMessage.id = "empty-message";
				emptyMessage.innerHTML = "Solo puedes hacer un registro";
				sidebarMsj.appendChild(emptyMessage);
			}
			
			
			return;
			//console.log(globalEventObj[selectedDate.toDateString()]= {extranjero, adulto, escolar});
			
		}
		
		function showEvents() {

			let sidebarEvents = document.getElementById("sidebarEvents");
			sidebarEvents.innerHTML = "";

			let eventsCount = 0;
			//for (key in globalEventObj[selectedDate.toDateString()]) {
			for(var i=0;i<globalEventObj.length;i++){
				
					const fechaReservas=globalEventObj[i][0];
					const extranjero=globalEventObj[i][1];
					const adulto=globalEventObj[i][2];
					const escolar=globalEventObj[i][3];
					//console.log(fechaReservas);
					let eventContainer = document.createElement("div");
					eventContainer.className = "eventCard";
					
					let fechaDiv = document.createElement("div");
					fechaDiv.className = "fecha-div";
					let fechaInp = document.createElement("input");
					fechaInp.className = "fecha-inp";
					let labelFecha = document.createElement("label");
					labelFecha.className = "label-fecha";

					let eventHeaderDiv = document.createElement("div");
					eventHeaderDiv.className = "event-header-div";
					let eventHeader = document.createElement("input");
					eventHeader.className = "eventCard-header";
					let labelHeader = document.createElement("label");
					labelHeader.className = "label-header";

					let eventDescriptionDiv = document.createElement("div");
					eventDescriptionDiv.className = "eventCard-description-div";
					let eventDescription = document.createElement("input");
					eventDescription.className = "eventCard-description";
					let labelDescription = document.createElement("label");
					labelDescription.className = "label-description";
					
					let eventDescriptionFootDiv = document.createElement("div");
					eventDescriptionFootDiv.className = "eventCard-description-foot-div";
					let eventDescriptionFoot = document.createElement("input");
					eventDescriptionFoot.className = "eventCard-description-foot";
					let labelDescriptionFoot = document.createElement("label");
					labelDescriptionFoot.className = "label-description-foot";

					fechaInp.type = "date";
					fechaInp.name = "fechaReserva"+i;
					fechaInp.value = fechaReservas;
					labelFecha.appendChild(document.createTextNode("Fecha: "));
					fechaDiv.appendChild(labelFecha);
					fechaDiv.appendChild(fechaInp);
					eventContainer.appendChild(fechaDiv);

					if(extranjero.length>0){
						//eventHeader.appendChild(document.createTextNode(extranjero+" "+"ticket's Extranjero"));
						//eventHeader.appendChild(document.value(extranjero+" "+"ticket's Extranjero"));
						eventHeader.type = "number";
						eventHeader.name = "extranjero"+i;
						eventHeader.value = extranjero;
						labelHeader.appendChild(document.createTextNode(" ticket's Extranjero"));
						eventHeaderDiv.appendChild(eventHeader);
						eventHeaderDiv.appendChild(labelHeader);
						eventContainer.appendChild(eventHeaderDiv);
					}
					
					if(adulto.length>0){
						//eventDescription.appendChild(document.createTextNode(adulto+" ticket's Adulto"));
						eventDescription.type = "text";
						eventDescription.name = "adulto"+i;
						eventDescription.value = adulto;
						labelDescription.appendChild(document.createTextNode(" ticket's Adulto"));
						eventDescriptionDiv.appendChild(eventDescription);
						eventDescriptionDiv.appendChild(labelDescription);
						eventContainer.appendChild(eventDescriptionDiv);
					}
					if(escolar.length>0){
						//eventDescriptionFoot.append(document.createTextNode(escolar+" ticket's escolar"));
						eventDescriptionFoot.type = "text";
						eventDescriptionFoot.name = "escolar"+i;
						eventDescriptionFoot.value = escolar;
						labelDescriptionFoot.appendChild(document.createTextNode(" ticket's escolar"));
						eventDescriptionFootDiv.append(eventDescriptionFoot);
						eventDescriptionFootDiv.append(labelDescriptionFoot);
						eventContainer.append(eventDescriptionFootDiv);
					}			

					let markWrapper = document.createElement("div");
					markWrapper.className = "eventCard-mark-wrapper";
					let mark = document.createElement("div");
					mark.classList = "eventCard-mark";
					markWrapper.appendChild(mark);
					eventContainer.appendChild(markWrapper);

					sidebarEvents.appendChild(eventContainer);

					eventsCount++;

				
			}
		let emptyFormMessage = document.getElementById("emptyFormTitle");
		emptyFormMessage.innerHTML = `${eventsCount} fecha de reserva`;
	
	}
		
		
		

		gridTable.onclick = function (e) {

			if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
				return;
			}

			if (selectedDayBlock) {
				if (selectedDayBlock.classList.contains("blue") && selectedDayBlock.classList.contains("lighten-3")) {
					selectedDayBlock.classList.remove("blue");
					selectedDayBlock.classList.remove("lighten-3");
				}
			}
			selectedDayBlock = e.target;
			selectedDayBlock.classList.add("blue");
			selectedDayBlock.classList.add("lighten-3");

			selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));

			fechaReserva(selectedDate);
			//showEvents(selectedDate);

			document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("es", {
				month: "long",
				day: "numeric",
				year: "numeric"
			});

		}

		var changeFormButton = document.getElementById("changeFormButton");
		var addForm = document.getElementById("addForm");
		changeFormButton.onclick = function (e) {
			addForm.style.top = 0;
		}

		var cancelAdd = document.getElementById("cancelAdd");
		cancelAdd.onclick = function (e) {
			addForm.style.top = "100%";
			let inputs = addForm.getElementsByTagName("input");
			for (let i = 0; i < inputs.length; i++) {
				inputs[i].value = "";
			}
			let labels = addForm.getElementsByTagName("label");
			for (let i = 0; i < labels.length; i++) {
				labels[i].className = "";
			}
		}

		var c = 0;
		var addEventButton = document.getElementById("addEventButton");
		addEventButton.onclick = function (e) {
			if(document.getElementsByClassName('eventCard').length==0){


			let extranjero = document.getElementById("eventExtranjero").value;
			let adulto = document.getElementById("eventAdulto").value;
			let escolar = document.getElementById("eventEscolar").value;
			
			if(extranjero.length==0){
				extranjero=0;
			}
			if(adulto.length==0){
				adulto=0;
			}
			if(escolar.length==0){
				escolar=0;
			}
			if (extranjero==0 && adulto==0 && escolar==0 ) {
				//console.log(document.getElementsByClassName('empty-message').length);
				let sidebarEvents = document.getElementById("sidebar-msj");
				sidebarEvents.innerHTML="";
				
					let emptyMessError = document.createElement("div");
					emptyMessError.className = "empty-message";
					emptyMessError.id = "empty-message";
					
				emptyMessError.innerHTML = "No, elegiste nigun ticket. Debes elegir almenos uno";
				sidebarEvents.appendChild(emptyMessError);
				return;
			}else if(extranjero < 0 || adulto < 0 || escolar < 0){
				document.getElementById("eventExtranjero").value = "";
				document.getElementById("eventAdulto").value = "";
				document.getElementById("eventEscolar").value = "";
				let labels = addForm.getElementsByTagName("label");
				for (let i = 0; i < labels.length; i++) {
					labels[i].className = "";
					//console.log(labels[i]);
				}
				let sidebarEvents = document.getElementById("sidebar-msj");
				sidebarEvents.innerHTML="";
					let emptyMessErr = document.createElement("div");
					emptyMessErr.className = "empty-message-er";
					emptyMessErr.id = "empty-message-er";
					
				emptyMessErr.innerHTML = "No puedes elegir números menores a 1";
				sidebarEvents.appendChild(emptyMessErr);
				return;
			}
			addEvent(extranjero, adulto, escolar);
			//showEvents(extranjero, adulto, escolar);
			showEvents();
			if(c<1){
				if (!selectedDayBlock.querySelector(".day-mark")) {
					selectedDayBlock.appendChild(document.createElement("div")).className = "day-mark";
				}
			}
			c++;

			let inputs = addForm.getElementsByTagName("input");
			for (let i = 0; i < inputs.length; i++) {
				inputs[i].value = "";
			}
			let labels = addForm.getElementsByTagName("label");
			for (let i = 0; i < labels.length; i++) {
				labels[i].className = "";
			}
		}else{
			let sidebarMsj = document.getElementById("sidebar-msj");
			sidebarMsj.innerHTML = "";
			let emptyMessage = document.createElement("div");
			emptyMessage.className = "empty-message";
			emptyMessage.id = "empty-message";
			emptyMessage.innerHTML = "Solo puedes hacer un registro";
			sidebarMsj.appendChild(emptyMessage);

			document.getElementById("eventExtranjero").value = "";
			document.getElementById("eventAdulto").value = "";
			document.getElementById("eventEscolar").value = ""
			return;
		}
			
	}
	