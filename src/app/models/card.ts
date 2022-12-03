export class Card {
  constructor(
    public image: string,
    public status: boolean,
  ) {
  }

  getImage() {
    return !this.status ? 'assets/images/purple_back.jpg' : this.image;
  }

  compare(candidate: Card) {
    return this.image.localeCompare(candidate.image)===0;
  }
}
