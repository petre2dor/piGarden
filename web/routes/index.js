var express = require('express');
var moment  = require('moment');
var Request = require('./request')
var router  = express.Router();

/* GET main page. */
router.get('/', (req, res, next) => {
	let data = []
	let chartOptions = {
		type: 'line',
		data: {
			datasets: [{
				label: 'Temperature from DS18B20',
				borderColor: 'rgb(75, 192, 192)',
				fill: true,
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				data: data,
			},
			{
				label: 'Temperature from TMP36',
				borderColor: 'rgb(54, 162, 235)',
				fill: true,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				data: data,
			}]
		},
		options: {
			responsive: true,
			title:{
				display:true,
				text:"Chart.js Time Point Data"
			},
			scales: {
				xAxes: [{
					type: "time",
					display: true,
					time: {
						displayFormats: {
							minute: 'HH:mm'
						}
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'value'
					}
				}]
			}
		}
	};
	res.render('index', { title: 'Express', chartOptions: JSON.stringify(chartOptions) });
});

router.get('/getStats/:deviceId/:areaId/:type/:since', (req, res, next) => {
	processData = function(raw_data){
		let data = []
		raw_data.forEach(el => {
			data.push({
                label: moment(el.date).format('MMM D HH:mm'),
				x: moment(el.date).format(),
				y: el.value.toFixed(1)
			})
		})
		return data
	}

	let ACRequest = new Request('localhost', 3003)
	// let ACRequest = new Request('localhost', 3003)
	ACRequest
    	.post('/graphql', {"query": `{
                              stats(
                                device_id: `+req.params.deviceId+`,
                                area_id: `+req.params.areaId+`,
                                type: "`+req.params.type+`",
                                since: "`+req.params.since+`"
                              )
                              {
                                date,
                                value
                              }
                            }`})
    	.then(response => {
    		data = processData(response.data.stats)
    		res.json({ data: data});
    	})
});

module.exports = router;
