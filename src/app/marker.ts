export interface MarkerOptions extends google.maps.MarkerOptions {
  description?: string;
}

export class Marker extends google.maps.Marker {
  public description: string;

  constructor(options: MarkerOptions) {
    super(options);

    this.description = options.description;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }

  onClick() {
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => this.setAnimation(null), 700);
  }
}
