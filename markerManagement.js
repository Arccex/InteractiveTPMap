//Copyright 2018, Lukas Müller, All rights reserved.

function placeMarkerFromDatabase(id, name, date, bent, typ, save, location, markerIcon) {
	  
	var containsID = false;
	  
	var arrayLength = signList.length;
	for (var i = 0; i < arrayLength; i++) {
		if(signList[i].id === id){
			containsID = true;
		}
	}
			
	if(!containsID){
		var marker = new google.maps.Marker({
			icon: markerIcon,
			position: location,
			map: map,
					
			id: '',
			name: '',
			date: '',
			bent: '',
			save: '',
			typ: ''
		});
				
		marker.set('id', id);
		marker.set('name',name);
		marker.set('date',date);
		marker.set('bent',bent);
		marker.set('typ',typ);
		marker.set('save',save);
				
		var idOfMarker = marker.get(id);
				
		var overviewwindow = new google.maps.InfoWindow({
			content: '<p><b><font size="4">Name: </font></b>' + marker.get('name') + '</p>' + '<p><b><font size="4">Aenderungsdatum: </font></b>' + marker.get('date') + '</p>' + '<p><b><font size="4">Eigenschaft: </font></b>' + marker.get('bent') + '</p>' + '<p><b><font size="4">Kategorie: </font></b>' + marker.get('typ') + '</p>' + '<p><b><font size="4">Speicherort: </font></b>' + marker.get('save') + '</p>' + '<button onclick="deleteData(clickedMarker)">Makierung und Eintrag löschen</button>',
			position: location
		});

		google.maps.event.addListener(marker, 'click', function() {
			overviewwindow.open(map);
			lastOverviewWindow = overviewwindow;
			clickedMarker = marker;
		} );
				
		signList.push(marker);
				
		var formatedBent = 'Nein';
				
		if (bent === 'Schild ist gebogen') {
			formatedBent = 'Ja';
		} else {
			formatedBent = 'Nein';
		}
				
		$(document).ready(function() {
			var t = $('#example').DataTable();	 
				t.row.add( [
					id,
					name,
					formatedBent,
					typ,
					save,
					date
				] ).draw( false );
		} );
				
	}
				
}
			
function saveData() {
				
	var id = parseInt(lastID) + parseInt(1);
	console.log(lastID + '|' + id);
	lastID = id;
	var name = document.getElementById('name').value;
	var gebogen = document.getElementById('gebogen').value;
	var typ = document.getElementById('typ').value;
	var save = document.getElementById('save').value;
	var lat = LatLng.lat();
	var lng = LatLng.lng();
				
	var d = new Date().toDateString();
	var parts = d.split(' ');
	var day = parts[2];
	var month = parts[1]
	var year = parts[3]
				
	var monthAsNumber = "1";
				
	if (month === 'Jan') {
		monthAsNumber='1';
	} else if (month === 'Feb') {
		monthAsNumber='1';
	} else if (month === 'Mar') {
		monthAsNumber='1';
	} else if (month === 'Apr') {
		monthAsNumber='1';
	} else if (month === 'May') {
		monthAsNumber='1';
	} else if (month === 'Jun') {
		monthAsNumber='1';
	} else if (month === 'Jul') {
		monthAsNumber='1';
	} else if (month === 'Aug') {
		monthAsNumber='1';
	} else if (month === 'Sep') {
		monthAsNumber='1';
	} else if (month === 'Oct') {
		monthAsNumber='1';
	} else if (month === 'Nov') {
		monthAsNumber='1';
	}else{
		monthAsNumber='1';
	}
				
	var date = day + '.' + monthAsNumber + "." + year;
				
	firebase.database().ref('signs/' + id).set({
		name: name,
		gebogen : gebogen,
		typ: typ,
		save: save,
		date: date,
		lat: lat,
		lng: lng
	});
				
	document.getElementById('name').value = null;
	document.getElementById('gebogen').value = null;
	document.getElementById('typ').value = null;
	document.getElementById('save').value = null;
				
	LatLng = location;
	infowindow.close(map);
	infowindowContent.style.display='none';
			
}
		
function deleteData(lastClickedMarker){
	
	var indexOfMarker;
			
	var markerID = lastClickedMarker.get('id');
			
	console.log(lastClickedMarker.get('name') + '|' + markerID);
			
	var newSignList = new Array();
		
	var arrayLength = signList.length;
	for (var i = 0; i < arrayLength; i++) {
		if(signList[i].id === markerID){
			signList[i].setMap(null);
			indexOfMarker = i;
		}else{
			newSignList.push(signList[i])
		}
	}
			
	signList = newSignList;
			
	lastClickedMarker.setMap(null);
	lastOverviewWindow.close(map);
			
	table
		.column( 0 )
		.data()
		.each( function ( value, index ) {
			if(value === markerID){
				table.row( index ).remove().draw();
			}
		} );
				
	var updates = {};
	updates['/signs/' + markerID] = null;
			
	return firebase.database().ref().update(updates);

		
}
		
function loadData() {
		
}