export class WishItem {
  constructor(
    public id: number,
    public wishText: string,
    public isComplete: boolean = false
  ) {}
}
