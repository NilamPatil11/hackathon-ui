const PROXY_CONFIG = [{
	context: [
		"/server"
	],
	target: "http://localhost:4402",
	secure: false
}]

module.exports = PROXY_CONFIG;