mathPracticeApp.controller('mppProblemController', ['$scope', function($scope) {
	$scope.currGuess = undefined;
	
	$scope.getString = function(orig) {
		return "\\(" + orig + "\\)";
	};
	
	$scope.update = function() {
		document.getElementById($scope.id+"Guess").innerHTML = $scope.getString($scope.currGuess);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	};
	
	$scope.getClass = function() {
		if(Util.arePolynomialsEqual(Util.getPolynomial($scope.currGuess),Util.getPolynomial($scope.answer))) {
			$scope.correct = true;
			return 'correct';
		}
		$scope.correct = false;
		if(Util.arePolynomialsEquivalent(Util.getPolynomial($scope.currGuess),Util.getPolynomial($scope.answer))) {
			return 'correctNotSimplified';
		}
		return 'wrong';
	};
}]);