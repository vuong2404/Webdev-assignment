import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'scores', timestamps: false })
export class Scores extends Model {
  @PrimaryKey
  @Column
  sbd: string;

  @Column
  toan: number;

  @Column
  ngu_van: number;

  @Column
  ngoai_ngu: number;

  @Column
  vat_li: number;

  @Column
  hoa_hoc: number;

  @Column
  sinh_hoc: number;

  @Column
  lich_su: number;

  @Column
  dia_li: number;

  @Column
  gdcd: number;

  @Column
  ma_ngoai_ngu: string;
}
