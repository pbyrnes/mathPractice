describe('getPolynomial', function() {
	it('parses monomial', function() {
		expect(Util.getPolynomial('3x^4')).toEqual([{coefficient: 3, degree: 4}]);
	});

	it('parses negative monomial', function() {
		expect(Util.getPolynomial('-32x^4')).toEqual([{coefficient: -32, degree: 4}]);
	});

	it('parses monomial with space', function() {
		expect(Util.getPolynomial('3 x^4')).toEqual([{coefficient: 3, degree: 4}]);
	});

	it('parses monomial of degree 0', function() {
		expect(Util.getPolynomial('3')).toEqual([{coefficient: 3, degree: 0}]);
	});

	it('parses binomial pos+pos', function() {
		expect(Util.getPolynomial('3x^4+x^2')).toEqual([{coefficient: 3, degree: 4}, {coefficient: 1, degree: 2}]);
	});

	it('parses binomial pos+neg', function() {
		expect(Util.getPolynomial('3x^4-5x^2')).toEqual([{coefficient: 3, degree: 4}, {coefficient: -5, degree: 2}]);
	});

	it('parses binomial neg+pos', function() {
		expect(Util.getPolynomial('-x^4+2')).toEqual([{coefficient: -1, degree: 4}, {coefficient: 2, degree: 0}]);
	});

	it('parses binomial neg+neg', function() {
		expect(Util.getPolynomial('-3x^4-2x^2')).toEqual([{coefficient: -3, degree: 4}, {coefficient: -2, degree: 2}]);
	});
	
	it('parses binomial with leading +', function() {
		expect(Util.getPolynomial('+3x^4+x^2')).toEqual([{coefficient: 3, degree: 4}, {coefficient: 1, degree: 2}]);
	});

	it('parses binomial with pos+-(pos)', function() {
		expect(Util.getPolynomial('3x^4+-5x^2')).toEqual([{coefficient: 3, degree: 4}, {coefficient: -5, degree: 2}]);
	});
	
	it('recognizes x as x^1', function() {
		expect(Util.getPolynomial('3x-5x^1')).toEqual([{coefficient: 3, degree: 1}, {coefficient: -5, degree: 1}]);
	});
	
	it('interprets +0', function() {
		expect(Util.getPolynomial('3x-9+0')).toEqual([{coefficient: 3, degree: 1}, {coefficient: -9, degree: 0},{coefficient:0,degree:0}]);
	});
});

describe('arePolynomialsEqual', function() {
	it('returns true for same polynomial', function() {
		expect(Util.arePolynomialsEqual([{coefficient:3,degree:4},{coefficient:5,degree:2}], [{coefficient:3,degree:4},{coefficient:5,degree:2}])).toEqual(true);
	});

	it('returns false for different polynomial', function() {
		expect(Util.arePolynomialsEqual([{coefficient:2,degree:4},{coefficient:5,degree:2}], [{coefficient:3,degree:4},{coefficient:5,degree:2}])).toEqual(false);
	});

	it('returns false for polynomials with different number of terms', function() {
		expect(Util.arePolynomialsEqual([{coefficient:3,degree:4},{coefficient:3,degree:4}], [{coefficient:3,degree:4}])).toEqual(false);
	});

	it('returns true for same polynomials with terms in different order', function() {
		expect(Util.arePolynomialsEqual([{coefficient:5,degree:2},{coefficient:3,degree:4},{coefficient:-1,degree:4}], [{coefficient:-1,degree:4},{coefficient:3,degree:4},{coefficient:5,degree:2}])).toEqual(true);
	});
});

describe('arePolynomialsEquivalent', function() {
	it('returns true for same polynomial', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:3,degree:4},{coefficient:5,degree:2}], [{coefficient:3,degree:4},{coefficient:5,degree:2}])).toEqual(true);
	});

	it('returns false for different polynomial', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:2,degree:4},{coefficient:5,degree:2}], [{coefficient:3,degree:4},{coefficient:5,degree:2}])).toEqual(false);
	});

	it('returns false for polynomials with different number of terms', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:3,degree:4},{coefficient:3,degree:4}], [{coefficient:3,degree:4}])).toEqual(false);
	});

	it('returns true for same polynomials with terms in different order', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:5,degree:2},{coefficient:3,degree:4},{coefficient:-1,degree:4}], [{coefficient:-1,degree:4},{coefficient:3,degree:4},{coefficient:5,degree:2}])).toEqual(true);
	});

	it('returns true for binomial equal to sum of monomials', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:5,degree:2}], [{coefficient:-1,degree:2},{coefficient:6,degree:2}])).toEqual(true);
	});

	it('returns true for sum of monomials equal to binomial', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:-1,degree:2},{coefficient:6,degree:2}],[{coefficient:5,degree:2}])).toEqual(true);
	});

	it('returns false if first polyomial has extra term', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:-1,degree:2},{coefficient:6,degree:2},{coefficient:2,degree:3}],[{coefficient:5,degree:2}])).toEqual(false);
	});

	it('returns false if second polyomial has extra term', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:-1,degree:2},{coefficient:6,degree:2}],[{coefficient:5,degree:2},{coefficient:2,degree:3}])).toEqual(false);
	});

	it('returns true if terms cancel in first polynomial and do not exist in second polynomial', function() {
		expect(Util.arePolynomialsEquivalent([{coefficient:-6,degree:2},{coefficient:6,degree:2},{coefficient:3,degree:1}],[{coefficient:3,degree:1}])).toEqual(true);
	});

	it('returns true if difference is +0', function() {
			expect(Util.arePolynomialsEquivalent([{coefficient:6,degree:1},{coefficient:-9,degree:0}],[{coefficient:6,degree:1},{coefficient:-9,degree:0},{coefficient:0,degree:0}])).toEqual(true);
	});
});