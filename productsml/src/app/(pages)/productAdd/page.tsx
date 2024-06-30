import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  addProduct,
  updateProduct,
  useCategory,
} from "@/app/services/products";
import { Product } from "@/app/types/product";
import { useAppContext } from "@/context";

export default function ProductsAdd() {
  const { productSelected } = useAppContext();
  const { category = [], isLoadingCategory, isErrorCategory } = useCategory();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("El valor es requerido"),
    description: Yup.string().required("El valor es requerido"),
    price: Yup.number()
      .typeError("Ingresa un valor válido")
      .required("El valor es requerido")
      .max(100000)
      .typeError("El valor maximo del producto es $100,000.00")
      .moreThan(0, "El valor mínimo es de $1.00"),
    category: Yup.string().required("El valor es requerido"),
    image: Yup.string(),
  });

  const handleSubmit = async (product: Product) => {
    try {
      if (productSelected) {
        const newProduct = await updateProduct(
          productSelected.id ? productSelected.id.toString() : "",
          product
        );
        console.log(newProduct);
      } else {
        const newProduct = await addProduct(product);
        console.log(newProduct);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {productSelected ? "Editar producto" : "Agregar Producto"}
          </h2>
          <Formik
            initialValues={{
              title: productSelected ? productSelected.title : "",
              category: productSelected ? productSelected.category : "",
              price: productSelected ? productSelected.price : 0,
              image: productSelected ? productSelected.image : "",
              description: productSelected ? productSelected.description : "",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Nombre de producto
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ingresa nombre de producto"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Categoría
                      </label>
                      <Field
                        as="select"
                        name="category"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                      >
                        {category.map((e: any) => (
                          <option key={e}>{e}</option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Precio
                      </label>
                      <Field
                        type="text"
                        id="price"
                        name="price"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ingresa precio"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Imagen de producto
                  </label>
                  <Field
                    type="text"
                    id="image"
                    name="image"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ingresa nombre de producto"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Descripción
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your message"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn">
                    Cancelar
                  </label>
                  <button className="btn" type="submit">
                    {productSelected
                      ? "Editar producto"
                      : "Crear nuevo producto"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
