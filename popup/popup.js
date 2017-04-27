function get_alexa_info(){
	browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var tab = tabs[0];
	    var page_url = tab.url;
	    if(isValidSnapshotUrl(page_url))
	    {
			var alexa_url = 'http://xml.alexa.com/data?cli=10&dat=n&url=';
			var page_url = page_url.replace(/^https{0,1}:\/\//, '').replace(/^www\./, '').replace(/\/.*/, '');
			var http = new XMLHttpRequest();
			http.open("GET", alexa_url + page_url, true);
			http.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var html = "<b>"+"<span class='color_code'>"+ page_url +'</span>'+"</b><br/><b>Alexa Rank: </b>";
	 				var xmldata = http.responseXML.documentElement;
					if (xmldata.getElementsByTagName("POPULARITY")) 
					{
	 					html +="<span class='color_code'>"+xmldata.getElementsByTagName("POPULARITY")[0].getAttribute('TEXT')+"</span>";
	 				} 
	 				else {
	 					html += "N/A";
					}
					if(xmldata.getElementsByTagName("COUNTRY"))
					{
						html += '<br/>'+'<b>Country:</b>' +"<span class='color_code'>"+
					            xmldata.getElementsByTagName('COUNTRY')[0].getAttribute('NAME');
					}
					else{
						html+="N/A";
					}
					document.getElementById("show_alexa_data").innerHTML = html;
					document.getElementById("show_nothing").style.display="block";
				}
			};
			http.send(null);
		}
	});
}
function isValidSnapshotUrl(url) {
  return ((typeof url) === "string" &&
    (url.indexOf("http://") === 0 || url.indexOf("https://") === 0)); 
}
window.onload=function(){
	document.getElementById('web_search').onclick =search_url;
	get_alexa_info();
}

function search_url()
{
    var url_to_search=document.getElementById('search').value;
	var main_url="https://web-beta.archive.org/web/*/";
	browser.tabs.create({url:main_url+url_to_search});
}