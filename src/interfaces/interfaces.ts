export interface ICity {
	id: number;
	name: string;
}

export type ITag = {
	label: string,
	type?: string,
	onClick(): void;
  }
  