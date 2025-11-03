import { FilterQuery, Query } from "mongoose";
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.query };

    const excluding = ["searchTerm", "fields"];
    excluding.forEach((val) => delete queryObj[val]);
    console.log(queryObj, "hi");
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort =
      this?.query?.sort ||
      "-createdAt" ||
      (this?.query?.sort as string).split(",").join(" ");
    this.modelQuery = this?.modelQuery?.sort(sort as string);
    return this;
  }

  fields() {
    const fields =
      this.query && this.query.fields && typeof this.query.fields === "string"
        ? this.query.fields.split(",").join(" ")
        : "-__v" || null;

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async priceCalculation() {
    const products = await this.modelQuery.exec();
    return products.map((item: any) => {
      const discountAmount = ((item?.discount || 0) * item.price) / 100;
      const finalPrice = item?.price - discountAmount;

      return {
        ...item.toObject(),
        finalPrice,
      };
    });
  }
}
export default QueryBuilder;
