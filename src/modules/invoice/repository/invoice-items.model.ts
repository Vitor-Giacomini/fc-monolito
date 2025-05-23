import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: 'invoiceItems',
  timestamps: false
})

export class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoice_id: string;

  @BelongsTo(() => InvoiceModel)
  declare invoice: Awaited<InvoiceModel>

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  price: number
} 