var req = new XMLHttpRequest();
req.open("GET", "http://192.168.0.1/stlui/user/allowance_request.html");
req.onload = showStatus;
req.send(null);

function showStatus() {
    // Make a place for the data we need to extract from the HTML
  newData = new Array();

  // This is a horrible hack to be able to process the HTML
  document.body.innerHTML = req.responseText;

  // Pull out the third table
  data = document.body.getElementsByTagName("table")[2];

  // Get the actual rows we need from the third table
  data = data.getElementsByTagName("tr");

  // Make safe copies of the data to be used to make the panel
  newData['Max Download (MB)'] = TrimString(data[0].childNodes[2].textContent);
  newData['Remaining MB'] = TrimString(data[1].childNodes[2].textContent) + ' (' + TrimString(data[2].childNodes[2].textContent) + "%)";
  newData['Time Until Refilled'] = TrimString(data[3].childNodes[2].textContent);

  // Clear out the panel
  while(document.body.hasChildNodes()) {
      document.body.removeChild(document.body.lastChild);
  }

  // Put back useful data now.
  var count = 0;
  for(var i in newData) {
    var newdiv = document.createElement('div');
    var newdivname = 'hn9k_'+count;
    count = count + 1;
    newdiv.setAttribute('id', newdivname);
    newdiv.innerHTML = i + " : " + newData[i];
    document.body.appendChild(newdiv);
  }
}  

function TrimString(sInString) {
  sInString = sInString.replace( /^\s+/g, "" );// strip leading
  return sInString.replace( /\s+$/g, "" );// strip trailing
}
