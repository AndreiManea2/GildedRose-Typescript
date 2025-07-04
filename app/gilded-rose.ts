export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    MAX_QUALITY = 50;
    MIN_QUALITY = 0;

    isLessThanMaximum(quality: number) {
        return quality < this.MAX_QUALITY;
    }

    isOverMinimum(quality: number) {
        return quality > this.MIN_QUALITY;
    }

    increaseQuality(quality: number) {
        return this.isLessThanMaximum(quality) ? quality + 1 : quality;
    }

    decreaseQuality(quality: number) {
        return this.isOverMinimum(quality) ? quality - 1 : quality;
    }

    increaseQualityConcert(item : Item) {
        let quality = this.increaseQuality(item.quality);
        quality = item.sellIn < 11 ? this.increaseQuality(quality) : quality;
        quality = item.sellIn < 6 ? this.increaseQuality(quality) : quality;
        return quality;
    }

    updateQuality() {
        this.items.forEach(currItem => {
            if (currItem.name === 'Aged Brie') {
                currItem.sellIn -= 1;
                currItem.quality = this.increaseQuality(currItem.quality);
                currItem.quality = currItem.sellIn < 0 ? this.increaseQuality(currItem.quality) : currItem.quality;
            } else if (currItem.name === 'Sulfuras, Hand of Ragnaros') {
                currItem.quality = 80
            } else if (currItem.name === 'Backstage passes to a TAFKAL80ETC concert') {
                currItem.sellIn -= 1;
                currItem.quality = currItem.sellIn === 0 ? 0 : this.increaseQualityConcert(currItem);
            } else if (currItem.name === 'Conjured Mana Cake') {

            } else {

            }
        })

        return this.items;
    }
}
