export class ProfessionalTitleView  {

  public name: string;
  public label: string;

  public constructor(data: ProfessionalTitleView) {
    this.name = data?.name;
    this.label = data?.label;
  }
}
