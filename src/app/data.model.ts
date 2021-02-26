export class bookedData{
  constructor(
    public facility: string,
    public fromTime: Date,
    public toTime: Date,
    public cost: number,
    public fromTimeShow: string,
    public toTimeShow: string,
    public status: boolean) {}
}
