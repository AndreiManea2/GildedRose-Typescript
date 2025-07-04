import { Item, GildedRose } from '../app/gilded-rose';

// Add a master test here
const items = [
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Aged Brie", 2, 10),
    new Item("Pointy Arrows", 5, 15),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
    new Item("Backstage passes to a TAFKAL80ETC concert", 7, 35),
    // Will properly work later
    new Item("Conujured Mana Cake", 3, 6)
];

const gildedRose = new GildedRose(items);
let days: number = 3;

for (let i = 0; i < days; i++) {
    console.log(`----------- day ${i} -----------`);
    console.log("name, sellIn, quality");
    for (const item of items) {
        console.log(item.name + ' ' + item.sellIn + ' ' + item.quality);
    }

    console.log();
    gildedRose.updateQuality();
}