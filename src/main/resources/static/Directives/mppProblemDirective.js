mathPracticeApp.directive('mppProblem', function() {
	return {
		restrict: 'E',
		scope: {
				problem: '@problem',
				answer: '@answer',
				id: '@id',
				correct: '=correct'
			},
		templateUrl: 'Directives/templates/mppProblem.html',
		controller: 'mppProblemController',
	};
});