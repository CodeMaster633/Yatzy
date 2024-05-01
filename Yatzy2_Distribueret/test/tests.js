import { assert } from 'chai';
import { twoPairPoints, fullHousePoints } from '../Logic.js';

describe('Terningespil Point Tests', function() {
    describe('twoPairPoints', function() {
        it('bør returnere summen af to par', function() {
            assert.strictEqual(twoPairPoints([2,2,3,3,4]), 10);
        });

        it('bør returnere 0 hvis der ikke er præcis to par', function() {
            assert.strictEqual(twoPairPoints([2,2,3,4,5]), 0);
        });
    });

    describe('fullHousePoints', function() {
        it('bør returnere summen for et fuldt hus', function() {
            assert.strictEqual(fullHousePoints([2,2,2,3,3]), 12);
        });

        it('bør returnere 0 hvis der ikke er et fuldt hus', function() {
            assert.strictEqual(fullHousePoints([2,2,3,3,4]), 0);
        });
    });
});
