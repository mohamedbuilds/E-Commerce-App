export interface UpdateUserCartParams {
  id: string;
  count: string;
}

export interface Root {
  _id: string
  count: number
  price: number
  product: Product
}

export interface Product {
  brand: Brand
  category: Category
  id: string
  imageCover: string
  quantity: number
  ratingsAverage: number
  subcategory: any[]
  title: string
  _id: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}
