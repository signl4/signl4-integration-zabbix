// SIGNL4 Webhook
try {

	var req = new CurlHttpRequest();
	req.AddHeader('Content-Type: application/json');
	 
	Zabbix.Log(4, 'SIGNL4 webhook: ' + value);
	
	var params = JSON.parse(value);
	
	// Read and then remove the team secret
	var teamsecret = '';
	if ((params.teamsecret != undefined) && (params.teamsecret != null)) {
		teamsecret = params.teamsecret;
		params.teamsecret = '';
		delete params[teamsecret];
	}
	 
	// HTTP Post
	var resp = req.Post('https://connect.signl4.com/webhook/' + teamsecret, 'payload=' + JSON.stringify(params));
	 
	Zabbix.Log(4, 'response code: '+ req.Status());

	if (req.Status() != 201) {
		throw 'Response code: ' + req.Status();
	}

	result = resp;

} catch (error) {
	Zabbix.Log(4, 'SIGNL4 alert failed: ' + error);
 
    result = {};
}

return JSON.stringify(result);
