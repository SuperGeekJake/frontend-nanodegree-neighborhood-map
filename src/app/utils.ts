export class Utilities {
  static titleCase(str: string) {
    return str.replace(/(^|\s)[a-z]/g, char => char.toUpperCase());
  }

  static categoryToIcon(category) {
    switch(category.toLowerCase()) {
      case 'mexican restaurant':
      case 'chinese restaurant':
      case 'thai restaurant':
      case 'food':
        return 'map-icon-restaurant';

      case 'antique shop':
        return 'map-icon-furniture-store';

      case 'coffee shop':
      case 'breakfast spot':
        return 'map-icon-cafe';

      case 'bar':
      case 'dive bar':
        return 'map-icon-bar';

      case 'park':
        return 'map-icon-park';

      case 'library':
        return 'map-icon-library';

      case 'bagel shop':
        return 'map-icon-bakery';

      case 'automotive shop':
        return 'map-icon-car-repair';

      case 'boutique':
        return 'map-icon-clothing-store';

      default:
        return 'map-icon-store';
    }
  }
}
