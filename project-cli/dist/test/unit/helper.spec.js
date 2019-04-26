"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('Test CacheHelper constructor', () => {
    it('should CacheHelper be defined', () => {
        expect(CacheHelper).toBeDefined();
    });
    it('should key method work', () => {
        const query = CacheHelper.Key(CacheStore.Location_Country, '3');
        const expectedResult = 'lco-3';
        expect(query).toEqual(expectedResult);
    });
});
//# sourceMappingURL=helper.spec.js.map