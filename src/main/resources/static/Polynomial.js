function Polynomial(ss) {
	this.terms = [];
	
	var i,j;
	//remove spaces
	var s = ss.split(' ').join('');
	var negativeParts = s.split('-');
	var startWithNegative = s[0] === '-';

	for(i=0; i<negativeParts.length; i++) {
		if(negativeParts[i] !== '') {
			var terms = negativeParts[i].split('+');
			for(j=0; j<terms.length; j++) {
				if(terms[j] !== '') {
					//read in coefficient
					var coef;
					var c = terms[j].split('x')[0];
					if(c==='') {
						coef = 1;
					} else {
						coef = Number(c);
					}
					if(j===0 && (i!==0 || startWithNegative)) {
						coef = -1*coef;
					}
					var a = terms[j].split('^');
					var exp = 0;
					if(a.length === 2) {
						exp = Number(a[1]);
					} else {
						var b = terms[j].split('x');
						if(b.length === 2) {
							exp = 1;
						}
					}
					this.terms.push({coefficient: coef, degree: exp});
				}
			}
		}
	}
}

Polynomial.prototype.add = function(p2) {
	this.terms = this.terms.concat(p2.terms);
	return this;
};

Polynomial.prototype.simplify = function() {
	
};

Polynomial.prototype.multiply = function(p2) {
	
};

Polynomial.prototype.isEqual = function(p2) {
	
};

Polynomial.prototype.isEquivalent = function(p2) {
	
};