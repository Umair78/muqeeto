var randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
};

var config = {
	type: 'doughnut',
	data: {
		datasets: [{
			// data: [
			// randomScalingFactor(),
			// randomScalingFactor(),
			// randomScalingFactor(),
			// randomScalingFactor(),
			// randomScalingFactor(),
			// ],
			data: [
			50,
			50,
			50,
			50,
			50,
			],
			backgroundColor: [
			window.chartColors.red,
			window.chartColors.orange,
			window.chartColors.yellow,
			window.chartColors.green,
			window.chartColors.blue,
			],
			label: 'Dataset 1'
		}],
		labels: [
		'Red',
		'Orange',
		'Yellow',
		'Green',
		'Blue'
		]
	},
	options: {
		responsive: true,
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Human Resources'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		}
	}
};

var config1 = {
	type: 'doughnut',
	data: {
		datasets: [{
			// data: [
			// randomScalingFactor(),
			// randomScalingFactor(),
			// randomScalingFactor(),
			// randomScalingFactor(),
			// randomScalingFactor(),
			// ],
			data: [
			50,
			50,
			50,
			50,
			50,
			],
			backgroundColor: [
			window.chartColors.red,
			window.chartColors.orange,
			window.chartColors.yellow,
			window.chartColors.green,
			window.chartColors.blue,
			],
			label: 'Dataset 1'
		}],
		labels: [
		'Red',
		'Orange',
		'Yellow',
		'Green',
		'Blue'
		]
	},
	options: {
		responsive: true,
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Material Resources'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		}
	}
};

window.onload = function() {
	var ctx = document.getElementById('chart-area').getContext('2d');
	window.myDoughnut = new Chart(ctx, config);

	var ctx1 = document.getElementById('chart-area-1').getContext('2d');
	window.myDoughnut1 = new Chart(ctx1, config1);
};

var colorNames = Object.keys(window.chartColors);

document.getElementById('changeCircleSize').addEventListener('click', function() {
	if (window.myDoughnut.options.circumference === Math.PI) {
		window.myDoughnut.options.circumference = 2 * Math.PI;
		window.myDoughnut.options.rotation = -Math.PI / 2;
	} else {
		window.myDoughnut.options.circumference = Math.PI;
		window.myDoughnut.options.rotation = -Math.PI;
	}

	window.myDoughnut.update();
});

document.getElementById('changeCircleSize1').addEventListener('click', function() {
	if (window.myDoughnut1.options.circumference === Math.PI) {
		window.myDoughnut1.options.circumference = 2 * Math.PI;
		window.myDoughnut1.options.rotation = -Math.PI / 2;
	} else {
		window.myDoughnut1.options.circumference = Math.PI;
		window.myDoughnut1.options.rotation = -Math.PI;
	}

	window.myDoughnut1.update();
});