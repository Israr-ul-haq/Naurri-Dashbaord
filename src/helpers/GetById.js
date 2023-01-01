export const GetById = async (service, body) => {
  try {
    const response = service(body)
    return response
  } catch (error) {
    return error
  }
}