export class WishItem {
  constructor(
    public wishText: string,
    public isComplete: boolean = false,
    public id?: number
  ) {}
}
