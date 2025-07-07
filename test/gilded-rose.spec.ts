import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    it('should add new item', function() {
        const gildedRose = new GildedRose([ new Item('Pointy Arrow', 0, 0)]);
        expect(gildedRose.items[0].name).to.equal('Pointy Arrow');
        expect(gildedRose.items[0].sellIn).to.equal(0);
        expect(gildedRose.items[0].quality).to.equal(0);
    });
});

describe('basic quality items', function () {
    it('should update quality for sellIn 1 day', function() {
        const gildedRose = new GildedRose([new Item('Pointy Arrow', 1, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(0);
    });

    it('should update quality x2 as fast fro sellIn 0 days', function() {
        const gildedRose = new GildedRose([new Item('Pointy Arrow', 0, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
        expect(items[0].sellIn).to.equal(-1);
    });

    it('quality should never go below 0', function() {
        const gildedRose = new GildedRose([new Item('Pointy Arrow', 0, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });
});

describe('aged brie quality rules', function () {
    it('should increase quality', function() {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 15)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(16);
        expect(items[0].sellIn).to.equal(9);
    });

    it('quality should never go above 50', function() {
        const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
        expect(items[0].sellIn).to.equal(0);
    });

    it('quality increase up to 50 even after expiration date', function() {
        const gildedRose = new GildedRose([new Item('Aged Brie', -10, 15)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(17);
        expect(items[0].sellIn).to.equal(-11);
    });
});

describe('sulfuras quality rules', function () {
    it('should not decrease quality for Sulfuras', function() {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
        expect(items[0].sellIn).to.equal(1);
    });
});

describe('backstage concert quality rules', function () {
    it('should increase quality by 1 when more then 10 days remaining', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
        expect(items[0].sellIn).to.equal(10);
    });

    it('should increase quality by 2 when less than 10 days remaining', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 9, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(7);
        expect(items[0].sellIn).to.equal(8);
    });

    it('should increase quality by 3 when less than 5 days remaining', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(13);
        expect(items[0].sellIn).to.equal(3);
    });

    it('quality should be 0 after the concert', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });
});

describe('conjured mana cake quality rules', function () {
    it('quality should go down x2 as fast', function() {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 2, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
        expect(items[0].sellIn).to.equal(1);
    });

    it('quality should go down x4 as fast for sellIn 0 days', function() {
       const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 4)]);
       const items = gildedRose.updateQuality();
       expect(items[0].quality).to.equal(0);
       expect(items[0].sellIn).to.equal(-1);
    });

    it('quality should never go below 0', function() {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });
});