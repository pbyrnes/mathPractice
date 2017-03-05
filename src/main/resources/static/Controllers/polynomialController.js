mathPracticeApp.controller('PolynomialController', ['$scope', function($scope){
	$scope.problems = [];
	
	var i;
	var maxCoef = 3;
	for(i=0;i<10;i++) {
		//problem is (ax+b)(cx+d)
		var a=0,b=0,c=0,d=0;
		while((a===0&&b===0) || (c===0&&d===0)) {
			a = Math.floor(Math.random()*(2*maxCoef+1))-maxCoef;
			b = Math.floor(Math.random()*(2*maxCoef+1))-maxCoef;
			c = Math.floor(Math.random()*(2*maxCoef+1))-maxCoef;
			d = Math.floor(Math.random()*(2*maxCoef+1))-maxCoef;
		}
		
		var probString = "";
		var ansString = "";
		
		if(a!==0 && b!== 0) {
			probString += '(';
		}

		if(a!==0) {
			switch(a) {
			case 1:
				probString += 'x';
				break;
			case -1:
				probString += '-x';
				break;
			default:
				probString += a + 'x';
			}
		}
		
		if(b!==0) {
			if(b > 0) {
				if(a!==0){
					probString += '+';
				}
				probString += b;
			} else {
				probString += b;
			}
		}
		
		if(a!==0 && b!==0) {
			probString += ')';
		}
			
		probString += '(';
		
		if(c!==0) {
			switch(c) {
			case 1:
				probString += 'x';
				break;
			case -1:
				probString += '-x';
				break;
			default:
				probString += c + 'x';
			}
		}
		
		if(d!==0) {
			if(d > 0) {
				if(c!==0){
					probString += '+';
				}
				probString += d;
			} else {
				probString += d;
			}
		}
		
		probString += ')';
		
		var aa = a*c;
		var bb = a*d+b*c;
		var cc = b*d;
		
		if(aa!==0) {
			ansString += aa + 'x^2';
		}
		
		if(bb > 0) {
			ansString += '+' + bb + 'x';
		}
		if(bb < 0) {
			ansString += bb + 'x';
		}
		
		if(cc > 0) {
			ansString += '+' + cc;
		}
		if(cc < 0) {
			ansString += cc;
		}

		$scope.problems.push({problem:probString, answer:ansString, correct: false});
	}
	
	$scope.numCorrect = function() {
		var tot = 0;
		var i;
		for(i=0; i<$scope.problems.length; i++) {
			var p = $scope.problems[i];
			if(p.correct) {
				tot++;
			}
		}
		return tot;
	};
}]);