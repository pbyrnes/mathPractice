function Util() {};

Util.arePolynomialsEqual = function(p1, p2) {
	if(!p1 || !p2) {
		return false;
	}
	var sortFunction = function(a, b) {
		if(a.degree !== b.degree) {
			return a.degree - b.degree;
		}
		return a.coefficient - b.coefficient;
	};
	
	if(p1.length !== p2.length) {
		return false;
	}
	p1.sort(sortFunction);
	p2.sort(sortFunction);

	var i;
	for(i=0; i<p1.length; i++) {
		if(p1[i].coefficient !== p2[i].coefficient || p1[i].degree != p2[i].degree) {
			return false;
		}
	}
	return true;
};

Util.simplifyPolynomial = function(p,increasingDegree) {
	if(increasingDegree === true) {
		p.sort(function(a,b) {
			return b.degree - a.degree;
		});		
	} else {
		p.sort(function(a,b) {
			return a.degree - b.degree;
		});
	}
	
	var i;
	for(i=0; i<p.length; i++) {
		while(i<p.length-1 && p[i].degree===p[i+1].degree) {
			p[i].coefficient += p[i+1].coefficient;
			p.splice(i+1,1);
		}
		//remove term with coefficient 0
		if(p[i].coefficient===0) {
			p.splice(i,1);
		}
	}
	return p;
};

Util.arePolynomialsEquivalent = function(p1, p2) {
	if(!p1 || !p2) {
		return false;
	}
	var c1 = {};
	var c2 = {};
	
	var i;
	for(i=0; i<p1.length; i++) {
		var d = p1[i].degree;
		if(c1[d]) {
			c1[d] += p1[i].coefficient;
		} else {
			c1[d] = p1[i].coefficient;
		}
	}

	for(i=0; i<p2.length; i++) {
		var d = p2[i].degree;
		if(c2[d]) {
			c2[d] += p2[i].coefficient;
		} else {
			c2[d] = p2[i].coefficient;
		}
	}
	
	for(i in c1) {
		if(c1.hasOwnProperty(i) && c1[i] !== 0) {
			if(!c2[i] || c2[i] !== c1[i]) {
				return false;
			}
		}
	}
	for(i in c2) {
		if(c2.hasOwnProperty(i) && c2[i] !== 0) {
			if(!c1[i] || c2[i] !== c1[i]) {
				return false;
			}
		}
	}
	return true;
};

Util.getPolynomial = function(ss) {
	if(!ss) {
		return;
	}
	var i,j;
	//remove spaces
	var s = ss.split(' ').join('');
	var negativeParts = s.split('-');
	var startWithNegative = s[0] === '-';

	var ret = [];
		
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
					ret.push({coefficient: coef, degree: exp});
				}
			}
		}
	}
	return ret;
};