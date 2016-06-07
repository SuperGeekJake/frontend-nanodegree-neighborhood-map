export class Utilities {
  static titleCase(str: string) {
    return str.replace(/(^|\s)[a-z]/g, char => char.toUpperCase());
  }
}
